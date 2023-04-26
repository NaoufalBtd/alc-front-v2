import {Component, OnInit} from '@angular/core';
import {PackStudent} from '../../../../controller/model/pack-student.model';
import {EtudiantService} from '../../../../controller/service/etudiant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {Cours} from '../../../../controller/model/cours.model';
import {AuthenticationService} from '../../../../controller/service/authentication.service';
import {InscriptionService} from '../../../../controller/service/inscription.service';
import {Inscription} from '../../../../controller/model/inscription.model';
import {MessageService} from 'primeng/api';
import {PackStudentService} from '../../../../controller/service/pack-student.service';
import {TranslateService} from '@ngx-translate/core';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {environment} from '../../../../../environments/environment';
import {AnimationService} from '../../../../controller/service/animation.service';

@Component({
    selector: 'app-pack-details',
    templateUrl: './pack-details.component.html',
    styleUrls: ['./pack-details.component.scss']
})
export class PackDetailsComponent implements OnInit {
    courses: Array<Cours> = new Array<Cours>();
    inscription: Inscription = new Inscription();
    userRequest: Etudiant;
    callbackUrl = environment.callbackUrl;
    shopUrl = environment.shopUrl;
    failUrl = environment.failUrl;
    okUrl = environment.okUrl;

    constructor(private etudiantService: EtudiantService,
                private inscriptionService: InscriptionService,
                private authService: AuthenticationService,
                public translate: TranslateService,
                private _activatedRoute: ActivatedRoute,
                private messageService: MessageService,
                private animation: AnimationService,
                private parcoursService: ParcoursService,
                private packService: PackStudentService,
                private router: Router) {
    }


    get selectedPack(): PackStudent {
        return this.etudiantService.selectedPack;
    }

    set selectedPack(value: PackStudent) {
        this.etudiantService.selectedPack = value;
    }

    ngOnInit(): void {
        this.userRequest = this.authService.getConnectedStudent();
        console.log(this.userRequest);
        if (this.userRequest === null
            || this.userRequest?.id === undefined
            || this.userRequest?.id === 0
            || this.userRequest?.id === null) {
            this.router.navigate(['/']);
            return;
        }

        const idCurrentPack = this._activatedRoute.snapshot.params.id;
        if (idCurrentPack === null || idCurrentPack === undefined || idCurrentPack === 0) {
            this.router.navigate(['/etudiant/dashboard']);
        } else {
            this.packService.findById(idCurrentPack).subscribe(pack => {
                this.selectedPack = pack;
                this.inscriptionService.findByEtudiantId(this.authService.getConnectedStudent().id).subscribe(
                    data => {
                        this.inscription = data;
                        if (this.inscription.packStudent !== null) {
                            this.selectedPack = this.inscription.packStudent;
                            this.findCoursesByLevel(this.selectedPack);
                        } else {
                            this.findCourses();
                        }
                    }
                );
            });
        }

        const timer = setInterval(() => {
            this.submitFormPayment();
            clearInterval(timer);
        }, 2000);
    }

    submitFormPayment() {
        const button = document.getElementById('submitButton');
        button.click();
    }

    private findCoursesByLevel(selected: PackStudent) {
        this.parcoursService.FindCoursByParcours(selected.level.id).subscribe(
            data => {
                this.courses = data;
                console.log(this.courses);
            }
        );
    }

    private findCourses() {
        this.parcoursService.FindCoursByParcours(this.selectedPack.level.id).subscribe(
            data => {
                this.courses = data;
            }
        );
    }


}
