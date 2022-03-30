import {Component, OnInit} from '@angular/core';
import {Cours} from '../../../controller/model/cours.model';
import {RecommendTeacher} from '../../../controller/model/recommend-teacher.model';
import {Prof} from '../../../controller/model/prof.model';
import {RecommendTeacherService} from '../../../controller/service/recommend-teacher.service';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {ClassRoomService} from '../../../controller/service/class-room.service';
import {SalaryVo} from '../../../controller/model/salary-vo.model';
import {EtudiantService} from '../../../controller/service/etudiant.service';
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

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    getRestOfTime: string;
    getRestOfDay: number;
    getRestOfHour: number;
    getRestOfMinutes: number;
    getRestOfSecond: number;
    showStartCourseNow: boolean;

    constructor(public serviceUser: LoginService, private scheduleService: ScheduleService,
                private groupeEtudiantService: GroupeEtudiantService,
                private webSocketService: WebSocketService,
                private router: Router,
                private simulateSectionService: SimulateSectionService,
                private parcoursService: ParcoursService,
                private menuService: MenuService,
                private sessionCourService: SessionCoursService
    ) {
    }

    get prof(): Prof {
        return this.serviceUser.prof;

    }

    allLesson: Array<ScheduleProf> = new Array<ScheduleProf>();
    lessonFinished: Array<SessionCours> = new Array<SessionCours>();
    nextLesson: ScheduleProf = new ScheduleProf();
    actuallyDate: Date = new Date();
    numberOfHours = 0;
    numberOfFinishedOfHours = 0;
    studentList: Array<Etudiant> = new Array<Etudiant>();
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
        setInterval(() => {
            this.updateRestOfTime();
        }, 1000);
    }


    findByProf() {
        this.scheduleService.findByProf(this.prof).subscribe(
            data => {
                this.allLesson = data;
                this.getNumberOfHours(data);
                console.log(data);
                this.findFirstLesson(data);

            }, error => {
                console.log(error);
            }
        );
    }

    private findFirstLesson(scheduleProfs1: Array<ScheduleProf>) {
        this.sessionCourService.findSessionByProfId(this.prof.id).subscribe(
            data => {
                console.log('--------------------------- SESSION COURS ______________________');
                console.log(data);
                this.nextLesson = scheduleProfs1[0];
                for (let i = 0; i < scheduleProfs1.length; i++) {
                    for (const item of data) {
                        if (scheduleProfs1[i].cours.id === item.cours.id) {
                            this.nextLesson = scheduleProfs1[i + 1];
                            this.lessonFinished.push({...item});
                            this.getNumberOfStudents(this.nextLesson);
                        }
                    }
                }
                this.getProgressValueForHoursFct(this.lessonFinished);
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

    getNumberOfStudents(lesson: ScheduleProf) {

        this.groupeEtudiantService.findAllGroupeEtudiantDetail(lesson.groupeEtudiant.id).subscribe(data => {
            for (const item of data) {
                this.studentList.push({...item.etudiant});
            }
        });
    }

    getDay(): string {
        const date = new Date(this.nextLesson.startTime);
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

    startSession() {
        this.showTpBar = false;
        console.log(this.nextLesson.groupeEtudiant.id);
        this.webSocketService.sessionHasStarted = true;
        this.webSocketService.isInSession = true;
        this.findAllGroupeEtudiantDetail(this.nextLesson.groupeEtudiant.id);
        console.log(this.nextLesson);
        this.selectedcours = this.nextLesson.cours;
        this.simulateSectionService.findSectionOneByCoursId(this.nextLesson.cours);
        this.parcoursService.afficheOneSectionByProf(this.nextLesson.cours).subscribe(
            dataSection => {
                this.webSocketService.saveCurrentSection(this.prof.id, dataSection);
            }
        );
        console.log(this.selectedsection);
        this.webSocketService.openWebSocket(this.prof, this.prof, this.nextLesson.groupeEtudiant, 'PROF');
        this.sessionCourService._idgroup = this.nextLesson.groupeEtudiant.id;
        this.router.navigate(['prof/sections-simulate']);
    }

    public findAllGroupeEtudiantDetail(id: number) {
        this.groupeEtudiantService.findAllGroupeEtudiantDetail(id).subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    this.webSocketService.connectedUsers.push(data[i].etudiant);
                }
                console.log(this.webSocketService.connectedUsers);
            }
        );
    }


    isTimeForLesson(): boolean {
        if (this.getRestOfDay === 0 && this.getRestOfHour === 0 && 0 >= this.getRestOfMinutes && this.getRestOfMinutes >= -30) {
            this.showStartCourseNow = true;
            return false;
        } else {
            this.showStartCourseNow = false;
            return true;
        }
    }

    updateRestOfTime() {
        const date = new Date(this.nextLesson.startTime);
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
            this.getRestOfDay = myDay;
            this.getRestOfHour = 0 - myHour;
            this.getRestOfMinutes = 0 - myMinute;
            this.getRestOfSecond = 0 - mySecond;
            this.getRestOfTime = (String(myDay) + 'd : -' + String(myHour) + 'h : -' + String(myMinute) + 'm : -' + String(mySecond) + 's');
        } else {
            this.getRestOfDay = myDay;
            this.getRestOfHour = myHour;
            this.getRestOfMinutes = myMinute;
            this.getRestOfSecond = mySecond;
            this.getRestOfTime = (String(myDay) + 'd : ' + String(myHour) + 'h : ' + String(myMinute) + 'm : ' + String(mySecond) + 's');
        }
        this.isTimeForLesson();
    }


    viewLesson() {
        this.showTpBar = false;
        console.log(this.nextLesson.groupeEtudiant.id);
        this.webSocketService.sessionHasStarted = false;
        this.webSocketService.isInSession = false;
        this.findAllGroupeEtudiantDetail(this.nextLesson.groupeEtudiant.id);
        console.log(this.nextLesson);
        this.selectedcours = this.nextLesson.cours;
        this.simulateSectionService.findSectionOneByCoursId(this.nextLesson.cours);
        console.log(this.selectedsection);
        this.sessionCourService._idgroup = this.nextLesson.groupeEtudiant.id;
        this.router.navigate(['prof/sections-simulate']);
    }
}
