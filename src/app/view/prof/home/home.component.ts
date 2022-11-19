import {Component, OnInit} from '@angular/core';
import {Cours} from '../../../controller/model/cours.model';
import {Prof} from '../../../controller/model/prof.model';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {LoginService} from '../../../controller/service/login.service';
import {ScheduleService} from '../../../controller/service/schedule.service';
import {ScheduleProf} from '../../../controller/model/calendrier-prof.model';
import {SessionCoursService} from '../../../controller/service/session-cours.service';
import {GroupeEtudiantService} from '../../../controller/service/groupe-etudiant-service';
import {SessionCours} from '../../../controller/model/session-cours.model';
import {WebSocketService} from '../../../controller/service/web-socket.service';
import {Router} from '@angular/router';
import {MenuService} from '../../shared/slide-bar/app.menu.service';
import {SimulateSectionService} from '../../../controller/service/simulate-section.service';
import {Section} from '../../../controller/model/section.model';
import {GroupeEtudiant} from '../../../controller/model/groupe-etudiant.model';
import {HomeworkService} from '../../../controller/service/homework.service';
import {Salary} from '../../../controller/model/salary.model';
import {SalaryService} from '../../../controller/service/salary.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    getRestOfTime: Map<GroupeEtudiant, string> = new Map<GroupeEtudiant, string>();
    getRestOfDay: Map<GroupeEtudiant, number> = new Map<GroupeEtudiant, number>();
    getRestOfHour: Map<GroupeEtudiant, number> = new Map<GroupeEtudiant, number>();
    getRestOfMinutes: Map<GroupeEtudiant, number> = new Map<GroupeEtudiant, number>();
    getRestOfSecond: Map<GroupeEtudiant, number> = new Map<GroupeEtudiant, number>();
    showStartCourseNow: Map<GroupeEtudiant, boolean> = new Map<GroupeEtudiant, boolean>();

    constructor(public serviceUser: LoginService, private scheduleService: ScheduleService,
                private groupeEtudiantService: GroupeEtudiantService,
                private webSocketService: WebSocketService,
                private router: Router,
                private salaryservice: SalaryService,
                private homeworkService: HomeworkService,
                private simulateSectionService: SimulateSectionService,
                private parcoursService: ParcoursService,
                private menuService: MenuService,
                private sessionCourService: SessionCoursService
    ) {
    }

    get salaryMonth(): Salary {
        return this.salaryservice.salaryMonth;
    }

    set groupStudent(value: GroupeEtudiant) {
        this.homeworkService.groupStudent = value;
    }

    get prof(): Prof {
        return this.serviceUser.prof;

    }

    nearestLesson: Map<GroupeEtudiant, ScheduleProf> = new Map<GroupeEtudiant, ScheduleProf>();
    allLesson: Array<ScheduleProf> = new Array<ScheduleProf>();
    lessonFinished: Array<SessionCours> = new Array<SessionCours>();
    actuallyDate: Date = new Date();
    numberOfHours = 0;
    numberOfFinishedOfHours = 0;
    studentList: Array<Etudiant> = new Array<Etudiant>();
    groupList: Array<GroupeEtudiant> = new Array<GroupeEtudiant>();
    getProgressValueForHours = 0;
    daysOptions = [
        {name: 'Sunday', value: 0},
        {name: 'Monday', value: 1},
        {name: 'Tuesday', value: 2},
        {name: 'Wednesday', value: 3},
        {name: 'Thursday', value: 4},
        {name: 'Friday', value: 5},
        {name: 'Saturday', value: 6},
    ];

    ngOnInit(): void {
        this.findByProf();

    }


    findByProf() {
        this.scheduleService.findByProf(this.prof).subscribe(
            data => {
                this.allLesson = data;
                this.getNumberOfHours(data);
                this.getNumberOfStudents(data);

            }, error => {
                console.log(error);
            }
        );
    }


    getProgressValueForLesson(): number {
        return (this.lessonFinished.length / this.allLesson.length) * 100;
    }

    getProgressValueForHoursFct(lessonFinished: Array<SessionCours>): number {
        this.numberOfFinishedOfHours = 0;
        for (const item of lessonFinished) {
            this.numberOfFinishedOfHours += item.duree;
        }
        this.getProgressValueForHours = (this.numberOfFinishedOfHours / this.numberOfHours) * 100;
        return this.getProgressValueForHours;
    }

    numberOfCourseInThisMonth(): number {
        return this.allLesson.filter(s => new Date(s.startTime).getMonth() === this.actuallyDate.getMonth()).length;
    }

    getNumberOfHours(allLesson: Array<ScheduleProf>): number {
        for (const item of allLesson) {
            this.numberOfHours += new Date(item.endTime).getHours() - new Date(item.startTime).getHours();
        }
        return this.numberOfHours;
    }

    numberOfHoursInThisMonth() {
        let hoursInThisMonth = 0;
        const data = this.allLesson.filter(s => new Date(s.startTime).getMonth() === this.actuallyDate.getMonth());
        for (const item of data) {
            hoursInThisMonth += new Date(item.endTime).getHours() - new Date(item.startTime).getHours();
        }
        return hoursInThisMonth;
    }

    getNumberOfStudents(scheduleProfs: Array<ScheduleProf>) {
        this.groupeEtudiantService.findAllByProfId(this.prof.id).subscribe(data => {
            this.groupList = data;
            for (const item1 of data) {
                this.groupeEtudiantService.findAllGroupeEtudiantDetail(item1.id).subscribe(dataGrpEtd => {
                    for (const value of dataGrpEtd) {
                        this.studentList.push({...value.etudiant});
                    }
                });
            }
            this.getNearestLessonForEveryGroup(data, scheduleProfs);

        });
    }

    getDay(nextLesson: ScheduleProf): string {
        const date = new Date(nextLesson.startTime);
        const day = date.getDay();
        for (const item of this.daysOptions) {
            if (day === item.value) {
                return item.name;
            }
        }
    }

    getHours(startTime: Date): number {
        const date = new Date(startTime);
        const hour = date.getHours();
        return hour;
    }

    getMinute(startTime: Date): string {
        const date = new Date(startTime);
        const minute = date.getMinutes();
        if (minute === 0) {
            return '00';
        } else {
            return String(minute);
        }

    }

    set showTpBar(value: boolean) {
        this.menuService.showTpBar = value;
    }

    set selectedcours(value: Cours) {
        this.parcoursService.selectedcours = value;
    }

    get selectedsection(): Section {
        return this.parcoursService.selectedsection;
    }

    set selectedsection(value: Section) {
        this.parcoursService.selectedsection = value;
    }

    set selectedSession(value: ScheduleProf) {
        this.webSocketService.selectedSession = value;
    }

    startSession(nextLesson: ScheduleProf) {
        this.router.navigate(['prof/sections-simulate/' + nextLesson?.id]);
    }

    public findAllGroupeEtudiantDetail(id: number) {
        this.groupeEtudiantService.findAllGroupeEtudiantDetail(id).subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    this.webSocketService.connectedUsers.push(data[i].etudiant);
                }
            }
        );
    }


    isTimeForLesson(group: GroupeEtudiant) {
        if (this.getRestOfDay.get(group) === 0 && this.getRestOfHour.get(group) === 0 && 0 >= this.getRestOfMinutes.get(group)
            && this.getRestOfMinutes.get(group) >= -30) {
            this.showStartCourseNow.set(group, true);
        } else {
            this.showStartCourseNow.set(group, false);
        }
    }

    updateRestOfTime(nearestLesson: Map<GroupeEtudiant, ScheduleProf>) {
        this.getRestOfDay.clear();
        this.getRestOfHour.clear();
        this.getRestOfMinutes.clear();
        this.getRestOfSecond.clear();
        this.getRestOfTime.clear();
        for (const group of nearestLesson.keys()) {

            const date = new Date(nearestLesson.get(group).startTime);
            const dateNow = new Date();
            const milliseconds = date.getTime() - dateNow.getTime();
            // ----------------------- Days -----------------------------
            const firstValueOfDay = String((milliseconds / (24 * 60 * 60 * 1000)));
            const myDay = Number(firstValueOfDay.substring(0, firstValueOfDay.indexOf('.')));
            const stringRestday = String(0 + firstValueOfDay.toString().substring(firstValueOfDay.indexOf('.')));
            const numberOfRstDay = Number(stringRestday);
            // -----------------------Hour-----------------------------
            const firstValueOfHour = String(numberOfRstDay * (24));
            const myHour = Number(firstValueOfHour.substring(0, firstValueOfHour.indexOf('.')));
            const stringRestHour = String(0 + firstValueOfHour.toString().substring(firstValueOfHour.indexOf('.')));
            const numberOfRstHour = Number(stringRestHour);
            // -----------------------Minutes-----------------------------
            const firstValueOfMinute = String(numberOfRstHour * (60));
            const myMinute = Number(firstValueOfMinute.substring(0, firstValueOfMinute.indexOf('.')));
            const stringRestMinute = String(0 + firstValueOfMinute.toString().substring(firstValueOfMinute.indexOf('.')));
            const numberOfRstMinute = Number(stringRestMinute);
            // -----------------------Seconds-----------------------------
            const firstValueOfSecond = String(numberOfRstMinute * (60));
            const mySecond = Number(firstValueOfSecond.substring(0, firstValueOfSecond.indexOf('.')));
            const stringRestSecond = String(0 + firstValueOfSecond.toString().substring(firstValueOfSecond.indexOf('.')));
            const numberOfRstSecond = Number(stringRestSecond);

            if (milliseconds < 0) {
                this.getRestOfDay.set(group, myDay);
                this.getRestOfHour.set(group, 0 - myHour);
                this.getRestOfMinutes.set(group, 0 - myMinute);
                this.getRestOfSecond.set(group, 0 - mySecond);
                this.getRestOfTime.set(group, (String(myDay) + 'd : -' + String(myHour) + 'h : -' + String(myMinute) +
                    'm : -' + String(mySecond) + 's'));
            } else {
                this.getRestOfDay.set(group, myDay);
                this.getRestOfHour.set(group, myHour);
                this.getRestOfMinutes.set(group, myMinute);
                this.getRestOfSecond.set(group, mySecond);
                this.getRestOfTime.set(group, (String(myDay) + 'd : ' + String(myHour) + 'h : ' + String(myMinute) +
                    'm : ' + String(mySecond) + 's'));
            }
            this.isTimeForLesson(group);
        }
    }


    viewLesson(nextLesson: ScheduleProf) {
        this.router.navigate(['prof/sections-simulate/view-' + nextLesson?.id]);
    }

    private getNearestLessonForEveryGroup(groupeEtudiantList: Array<GroupeEtudiant>, scheduleProfs: Array<ScheduleProf>) {
        this.nearestLesson.clear();
        this.sessionCourService.findSessionByProfId(this.prof.id).subscribe(
            data => {
                for (const group of groupeEtudiantList) {
                    const courseList = scheduleProfs.filter(s => s.groupeEtudiant.id === group.id);
                    const sessionList = data.filter(s => s.groupeEtudiant.id === group.id);
                    for (let i = 0; i < courseList.length; i++) {
                        for (const item of sessionList) {
                            if (courseList[i].cours.id === item.cours.id) {
                                this.lessonFinished.push({...item});
                                this.nearestLesson.set(group, courseList[i + 1]);
                            }
                        }
                    }
                    if (this.nearestLesson.has(group) === false) {
                        this.nearestLesson.set(group, courseList[0]);

                    }
                }
                this.getProgressValueForHoursFct(this.lessonFinished);
                setInterval(() => {
                    this.updateRestOfTime(this.nearestLesson);
                }, 1000);
            }
        );
    }
}
