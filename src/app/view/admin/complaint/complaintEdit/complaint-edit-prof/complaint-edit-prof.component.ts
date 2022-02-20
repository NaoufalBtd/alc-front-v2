import {Component, OnInit} from '@angular/core';
import {ReclamationProfService} from '../../../../../controller/service/reclamation-prof.service';
import {ReclamationProf} from '../../../../../controller/model/reclamation-prof.model';

@Component({
    selector: 'app-complaint-edit-prof',
    templateUrl: './complaint-edit-prof.component.html',
    styleUrls: ['./complaint-edit-prof.component.scss']
})
export class ComplaintEditProfComponent implements OnInit {

    constructor(private reclamationProfService: ReclamationProfService) {
    }

    ngOnInit(): void {
    }

    get displayReclamationEditProf(): boolean {
        return this.reclamationProfService.displayReclamationEditProf;
    }

    set displayReclamationEditProf(value: boolean) {
        this.reclamationProfService.displayReclamationEditProf = value;
    }

    get reclamationProfEdit(): ReclamationProf {
        return this.reclamationProfService.reclamationProfEdit;
    }

    set reclamationProfEdit(value: ReclamationProf) {
        this.reclamationProfService.reclamationProfEdit = value;
    }

    public findReclamationEtudiantByIdEdit(idreclamationProf: number) {
        this.reclamationProfService.findReclamationEtudiantByIdEdit(idreclamationProf);
    }

    public reponseReclamationProf(idreclamationProf: number, commentaireTraiteur: string) {
        this.reclamationProfService.reponseReclamationProf(idreclamationProf, commentaireTraiteur);
    }

    get idreclamationprofedite(): number {
        return this.reclamationProfService.idreclamationprofedite;
    }

    set idreclamationprofedite(value: number) {
        this.reclamationProfService.idreclamationprofedite = value;
    }

    get commentaire(): string {
        return this.reclamationProfService.commentaire;
    }

    set commentaire(value: string) {
        this.reclamationProfService.commentaire = value;
    }

    hide() {
        this.displayReclamationEditProf = false;
    }
}
