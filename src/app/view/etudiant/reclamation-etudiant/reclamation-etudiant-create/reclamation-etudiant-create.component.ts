import {Component, OnInit} from '@angular/core';
import {ReclamationEtudiantService} from '../../../../controller/service/reclamation-etudiant.service';
import {ReclamationEtudiant} from '../../../../controller/model/reclamation-etudiant.model';
import {TypeReclamationEtudiant} from '../../../../controller/model/type-reclamation-etudiant.model';
import {TypeReclamationEtudiantService} from '../../../../controller/service/type-reclamation-etudiant.service';
import {LoginService} from '../../../../controller/service/login.service';

@Component({
    selector: 'app-reclamation-etudiant-create',
    templateUrl: './reclamation-etudiant-create.component.html',
    styleUrls: ['./reclamation-etudiant-create.component.scss']
})
export class ReclamationEtudiantCreateComponent implements OnInit {

    constructor(private typeReclamationEtudiantService: TypeReclamationEtudiantService, private reclamationEtudiantService: ReclamationEtudiantService, private serviceLogin: LoginService) {
    }

    ngOnInit(): void {
        this.typeReclamationEtudiantService.findAll();

    }

    get typeReclamationEtudiantList(): Array<TypeReclamationEtudiant> {
        return this.typeReclamationEtudiantService.typeReclamationEtudiantList;
    }

    set typeReclamationEtudiantList(value: Array<TypeReclamationEtudiant>) {
        this.typeReclamationEtudiantService.typeReclamationEtudiantList = value;
    }

    get reclamationEtudiant(): ReclamationEtudiant {
        return this.reclamationEtudiantService.reclamationEtudiant;
    }

    set reclamationEtudiant(value: ReclamationEtudiant) {
        this.reclamationEtudiantService.reclamationEtudiant = value;
    }

    get displayReclamationEtudiant(): boolean {
        return this.reclamationEtudiantService.displayReclamationEtudiant;
    }

    set displayReclamationEtudiant(value: boolean) {
        this.reclamationEtudiantService.displayReclamationEtudiant = value;
    }

    public saveReclamationEtudiant() {
        this.reclamationEtudiant.user = this.serviceLogin.getConnectedStudent();
        this.reclamationEtudiantService.saveReclamationEtudiant();
    }

    hide() {
        this.reclamationEtudiantService.displayReclamationEtudiant = false;
    }
}
