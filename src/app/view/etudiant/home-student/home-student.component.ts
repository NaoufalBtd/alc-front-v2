import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../../controller/service/login.service';
import {ScheduleService} from '../../../controller/service/schedule.service';
import {GroupeEtudiantService} from '../../../controller/service/groupe-etudiant-service';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {GroupeEtudeService} from '../../../controller/service/groupe-etude.service';
import {ScheduleProf} from '../../../controller/model/calendrier-prof.model';
import {SessionCoursService} from '../../../controller/service/session-cours.service';
import {SessionCours} from '../../../controller/model/session-cours.model';
import {HomeWOrkEtudiant} from '../../../controller/model/home-work-etudiant.model';
import {HomeWorkEtudiantServiceService} from '../../../controller/service/home-work-etudiant-service.service';
import {Cours} from '../../../controller/model/cours.model';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {MenuService} from '../../shared/slide-bar/app.menu.service';
import {SimulateSectionService} from '../../../controller/service/simulate-section.service';
import {Router} from '@angular/router';
import {WebSocketService} from '../../../controller/service/web-socket.service';

@Component({
    selector: 'app-home-student',
    templateUrl: './home-student.component.html',
    styleUrls: ['./home-student.component.scss']
})
export class HomeStudentComponent implements OnInit {
    getRestOfTime: string;

    constructor(private loginService: LoginService,
                private scheduleService: ScheduleService,
                private groupeEtudiantService: GroupeEtudiantService,
                private sessionCourService: SessionCoursService,
                private parcoursService: ParcoursService,
                private menuService: MenuService,
                private simulateSectionService: SimulateSectionService,
                private router: Router,
                private webSocketService: WebSocketService,
                private homeWorkService: HomeWorkEtudiantServiceService
    ) {
    }

    set selectedcours(value: Cours) {
        this.parcoursService.selectedcours = value;
    }

    get showTpBar(): boolean {
        return this.menuService.showTpBar;
    }

    set showTpBar(value: boolean) {
        this.menuService.showTpBar = value;
    }

    set showLesson(value: boolean) {
        this.simulateSectionService.showLesson = value;
    }

    set tabViewActiveIndex(value: number) {
        this.webSocketService.tabViewActiveIndex = value;
    }

    student: Etudiant = this.loginService.getConnectedStudent();
    scheduleProfs: Array<ScheduleProf> = new Array<ScheduleProf>();
    lessonFinished: Array<ScheduleProf> = new Array<ScheduleProf>();
    nextLesson: ScheduleProf = new ScheduleProf();
    sessionCours: Array<SessionCours> = new Array<SessionCours>();
    homeWorkList: Array<HomeWOrkEtudiant> = new Array<HomeWOrkEtudiant>();

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
        this.groupeEtudiantService.findGroupeEtudiantDetailByEtudiantId(this.student.id).subscribe(
            data => {
                console.log(data);
                for (const item of data) {

                    this.scheduleService.findByGroupStudentId(item.groupeEtudiant).subscribe(
                        scheduleData => {
                            this.scheduleProfs = scheduleData;
                            this.sessionCourService.findSessionCoursByGroupeEtudiantId(item.groupeEtudiant).subscribe(sessionData => {
                                this.sessionCours = sessionData;
                                for (const schedule of this.scheduleProfs) {
                                    for (const session of this.sessionCours) {
                                        if (schedule.cours.id === session.cours.id) {
                                            this.lessonFinished.push({...schedule});
                                        }
                                    }
                                }
                                this.nextLesson = this.scheduleProfs[this.lessonFinished.length];

                                console.log(this.lessonFinished);
                                console.log(this.nextLesson);
                                setInterval(() => {
                                    this.updateRestOfTime();
                                }, 1000);
                            }, err => {
                                console.log(err);
                            });
                        }
                    );
                }
            }
        );
        this.homeWorkService.findbyetudiantId().subscribe(homeWorkData => {
            this.homeWorkList = homeWorkData;
        });
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

    isLessonCompleted(cours: Cours): number {
        if (this.sessionCours.length === 0) {
            return 1; // course and homework not completed yet ==> course locked
        } else {
            for (const session of this.sessionCours) {
                if (cours.id === session.cours.id) {
                    if (this.homeWorkList.length === 0) {
                        return 3; // course completed but home work not yet ===> take home work
                    } else {
                        for (const homeWork of this.homeWorkList) {
                            if (cours.id === homeWork.homeWork.cours.id) {
                                return 2; // course and homework completed ==> review course
                            }
                        }
                        return 3; // course completed but home work not yet ===> take home work
                    }
                }
            }
            return 1; // course and homework not completed yet ==> course locked
        }

    }

    openSession(cours: Cours, type: string) {
        if (type === 'HOMWORK') {
            this.tabViewActiveIndex = 1;
            this.showLesson = false;
        } else {
            this.tabViewActiveIndex = 0;
            this.showLesson = true;
        }
        console.log(cours);
        this.showTpBar = false;
        this.selectedcours = cours;
        this.simulateSectionService.findSectionOneByCoursId(cours);
        this.router.navigate(['etudiant/etudiant-simulate-sections']);
    }


    getProgressValue(): number {
        return (this.lessonFinished.length / this.scheduleProfs.length) * 100;
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

        console.log(myDay);
        console.log(myHour);
        console.log(myMinute);
        console.log(mySecond);
        this.getRestOfTime = (String(myDay) + 'd : ' + String(myHour) + 'h : ' + String(myMinute) + 'm : ' + String(mySecond) + 's');
    }


}
