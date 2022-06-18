import {Component, OnInit} from '@angular/core';
import {PackStudent} from '../../../../controller/model/pack-student.model';
import {EtudiantService} from '../../../../controller/service/etudiant.service';
import {Router} from '@angular/router';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {Cours} from '../../../../controller/model/cours.model';
import {AuthenticationService} from '../../../../controller/service/authentication.service';
import {InscriptionService} from '../../../../controller/service/inscription.service';
import {Inscription} from '../../../../controller/model/inscription.model';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-pack-details',
    templateUrl: './pack-details.component.html',
    styleUrls: ['./pack-details.component.scss']
})
export class PackDetailsComponent implements OnInit {
    courses: Array<Cours> = new Array<Cours>();
    inscription: Inscription = new Inscription();

    constructor(private etudiantService: EtudiantService,
                private inscriptionService: InscriptionService,
                private authService: AuthenticationService,
                private messageService: MessageService,
                private parcoursService: ParcoursService,
                private router: Router) {
    }


    get selectedPack(): PackStudent {
        return this.etudiantService.selectedPack;
    }

    set selectedPack(value: PackStudent) {
        this.etudiantService.selectedPack = value;
    }

    ngOnInit(): void {
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
                console.log(this.courses);
            }
        );
    }

    isForGroupOrindev(forGroupe: boolean): string {
        if (forGroupe) {
            return 'Group';
        } else {
            return 'Individual';
        }
    }


    backTollPacks() {
        this.router.navigate(['/etudiant/profile']);
    }

    startPack() {
        this.inscription.packStudent = this.selectedPack;
        this.inscription.parcours = this.selectedPack.level;
        this.inscription.datedebutinscription = new Date();
        this.inscriptionService.updateInsc(this.inscription).subscribe(
            data => {
                this.inscription = data;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Operation success',
                    life: 3000,

                });
                this.backTollPacks();
            }, error => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'error',
                    detail: error?.error?.message,
                    life: 3000,
                });
            }
        );
    }
}
