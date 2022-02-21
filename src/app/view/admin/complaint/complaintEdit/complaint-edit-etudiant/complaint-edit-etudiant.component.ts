import {Component, OnInit} from '@angular/core';
import {ReclamationEtudiantService} from '../../../../../controller/service/reclamation-etudiant.service';
import {ReclamationEtudiant} from '../../../../../controller/model/reclamation-etudiant.model';
import {MenuItem} from 'primeng/api';
import {Admin} from '../../../../../controller/model/admin.model';
import {LoginService} from '../../../../../controller/service/login.service';

@Component({
    selector: 'app-complaint-edit-etudiant',
    templateUrl: './complaint-edit-etudiant.component.html',
    styleUrls: ['./complaint-edit-etudiant.component.scss']
})
export class ComplaintEditEtudiantComponent implements OnInit {
    processingStatus: MenuItem[];

    constructor(private reclamationEtudiantService: ReclamationEtudiantService, private serviceLogin: LoginService) {
        this.processingStatus = [];
        // @ts-ignore
        this.processingStatus.push({label: 'Processed', value: 1});
        // @ts-ignore
        this.processingStatus.push({label: 'Being Processed', value: 0});
    }

    ngOnInit(): void {
    }

    get displayReclamationEditEtudiant(): boolean {
        return this.reclamationEtudiantService.displayReclamationEditEtudiant;
    }

    set displayReclamationEditEtudiant(value: boolean) {
        this.reclamationEtudiantService.displayReclamationEditEtudiant = value;
    }

    get reclamationEtudiantEdit(): ReclamationEtudiant {
        return this.reclamationEtudiantService.reclamationEtudiantEdit;
    }

    set reclamationEtudiantEdit(value: ReclamationEtudiant) {
        this.reclamationEtudiantService.reclamationEtudiantEdit = value;
    }

    hide() {
        this.displayReclamationEditEtudiant = false;
    }

    public reponseReclamationEtudiant(admin: Admin, dateTraitementforEtudiant: Date) {
        this.reclamationEtudiantService.reponseReclamationEtudiant(admin, dateTraitementforEtudiant);
    }

    get dateTraitementforEtudiant(): Date {
        return this.reclamationEtudiantService.dateTraitementforEtudiant;
    }

    set dateTraitementforEtudiant(value: Date) {
        this.reclamationEtudiantService.dateTraitementforEtudiant = value;
    }



}
