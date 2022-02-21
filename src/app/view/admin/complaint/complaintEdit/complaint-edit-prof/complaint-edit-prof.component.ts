import {Component, OnInit} from '@angular/core';
import {ReclamationProfService} from '../../../../../controller/service/reclamation-prof.service';
import {ReclamationProf} from '../../../../../controller/model/reclamation-prof.model';
import {LoginService} from '../../../../../controller/service/login.service';
import {MenuItem} from 'primeng/api';
import {Admin} from '../../../../../controller/model/admin.model';

@Component({
    selector: 'app-complaint-edit-prof',
    templateUrl: './complaint-edit-prof.component.html',
    styleUrls: ['./complaint-edit-prof.component.scss']
})
export class ComplaintEditProfComponent implements OnInit {
    processingStatus: MenuItem[];

    constructor(private reclamationProfService: ReclamationProfService, private serviceLogin: LoginService) {
        this.processingStatus = [];
        // @ts-ignore
        this.processingStatus.push({label: 'Processed', value: 1});
        // @ts-ignore
        this.processingStatus.push({label: 'Being Processed', value: 0});
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

    public reponseReclamationProf(admin: Admin, dateTraitement: Date) {
        // this.reclamationProfEdit.admin.id = this.serviceLogin.getConnectedAdmin().id;
        this.reclamationProfService.reponseReclamationProf(admin, dateTraitement);
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

    get dateTraitement(): Date {
        return this.reclamationProfService.dateTraitement;
    }

    set dateTraitement(value: Date) {
        this.reclamationProfService.dateTraitement = value;
    }

}
