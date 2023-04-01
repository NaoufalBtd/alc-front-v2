import {Component, OnInit} from '@angular/core';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {Parcours} from '../../../../controller/model/parcours.model';
import {Cours} from '../../../../controller/model/cours.model';
import {WebSocketService} from '../../../../controller/service/web-socket.service';
import {SimulateSectionService} from '../../../../controller/service/simulate-section.service';
import {Router} from '@angular/router';
import {MenuService} from '../../../shared/slide-bar/app.menu.service';
import {Inscription} from '../../../../controller/model/inscription.model';
import {InscriptionService} from '../../../../controller/service/inscription.service';
import {AuthenticationService} from '../../../../controller/service/authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {ScheduleProf} from '../../../../controller/model/calendrier-prof.model';
import {ScheduleService} from '../../../../controller/service/schedule.service';
import {GroupeEtudiantService} from '../../../../controller/service/groupe-etudiant-service';

@Component({
    selector: 'app-home-free-trial',
    templateUrl: './home-free-trial.component.html',
    styleUrls: ['./home-free-trial.component.scss']
})
export class HomeFreeTrialComponent implements OnInit {
    freeLevelsList: Array<Parcours> = new Array<Parcours>();
    freeCourseList: Array<Cours> = new Array<Cours>();
    displayCourses: boolean;
    nextLesson: ScheduleProf = null;
    insecrption: Inscription = new Inscription();
    countdownDate: Date = new Date(2023, 3, 2); // Set the countdown date and time
    countdown: any = {};
    timeForLesson: boolean;

    constructor(private parcoursService: ParcoursService,
                private webSocketService: WebSocketService,
                private simulateSectionService: SimulateSectionService,
                private scheduleService: ScheduleService,
                private groupeEtudiantService: GroupeEtudiantService,
                private router: Router,
                public translate: TranslateService,
                private login: AuthenticationService,
                private insriptionService: InscriptionService,
                private menuService: MenuService
    ) {
    }

    ngOnInit(): void {
        this.insriptionService.findByEtudiantId(this.login.getConnectedStudent().id).subscribe(
            data => {
                this.insecrption = data;
                if (data?.quizFinished) {
                    this.freeLevelsList.push({...data.parcours});
                } else {
                    this.parcoursService.FindAllParcours().subscribe(dataParcours => {
                        this.freeLevelsList = dataParcours;
                    });
                }
                console.log(data);
            }, error => {
                console.log(error);
            }
        );

        this.groupeEtudiantService.findGroupeEtudiantDetailByEtudiantId(this.login.getUserFromLocalCache().id).subscribe(
            data => {
                console.log(data);
                for (const item of data) {
                    this.scheduleService.findByGroupStudentId(item.groupeEtudiant).subscribe(
                        scheduleData => {
                            if (scheduleData?.length > 0) {
                                this.nextLesson = scheduleData[scheduleData.length - 1];
                                setInterval(() => {
                                    this.updateCountdown();
                                }, 1000);
                            }
                        });
                }
            });

    }

    showCoursesForLevel(level: Parcours) {
        this.parcoursService.findCousByParcoursIdOrderByNumeroOrder(level.id).subscribe(data => {
            this.freeCourseList = data.slice(0, 3);
            this.displayCourses = true;
        });
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

    openSession(cours: Cours) {
        this.webSocketService.isInSession = false;
        this.tabViewActiveIndex = 0;
        this.showLesson = true;
        this.showTpBar = false;
        this.selectedcours = cours;
        this.simulateSectionService.findSectionOneByCoursId(cours);
        this.router.navigate(['etudiant/simulate-sections/' + 'free-trial']);
    }

    scrollToPrices() {
        document.getElementById('pricingTableComponent').scrollIntoView();
    }

    updateCountdown() {
        if (this.nextLesson === null) {
            this.countdown = {days: 0, hours: 0, minutes: 0, seconds: 0};
            return;
        }
        const now = new Date().getTime();
        this.countdownDate = new Date(this.nextLesson?.startTime);
        const distance = this.countdownDate?.getTime() - now;
        if (distance < 0) {
            this.countdown = {days: 0, hours: 0, minutes: 0, seconds: 0};
            this.timeForLesson = true;
        } else {
            this.countdown = {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            };
        }
    }

    joinSession() {
        this.router.navigate(['etudiant/simulate-sections/' + this.nextLesson?.id]);
    }
}
