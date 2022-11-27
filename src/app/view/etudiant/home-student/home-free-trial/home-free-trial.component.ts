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

@Component({
    selector: 'app-home-free-trial',
    templateUrl: './home-free-trial.component.html',
    styleUrls: ['./home-free-trial.component.scss']
})
export class HomeFreeTrialComponent implements OnInit {
    freeLevelsList: Array<Parcours> = new Array<Parcours>();
    freeCourseList: Array<Cours> = new Array<Cours>();
    displayCourses: boolean;
    insecrption: Inscription = new Inscription();

    constructor(private parcoursService: ParcoursService,
                private webSocketService: WebSocketService,
                private simulateSectionService: SimulateSectionService,
                private router: Router,
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
}
