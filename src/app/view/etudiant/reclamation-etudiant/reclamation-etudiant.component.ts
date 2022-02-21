import {Component, OnInit} from '@angular/core';
import {ReclamationEtudiantService} from '../../../controller/service/reclamation-etudiant.service';
import {ReclamationEtudiant} from '../../../controller/model/reclamation-etudiant.model';
import {LoginService} from '../../../controller/service/login.service';

@Component({
    selector: 'app-reclamation-etudiant',
    templateUrl: './reclamation-etudiant.component.html',
    styleUrls: ['./reclamation-etudiant.component.scss']
})
export class ReclamationEtudiantComponent implements OnInit {

    constructor(private reclamationEtudiantService: ReclamationEtudiantService, private serviceLogin: LoginService) {
    }

    ngOnInit(): void {
        this.findAllReclamationByEtudiantId(this.serviceLogin.getConnectedStudent().id);
        //  this.reclamationEtudiantService.findAll();
    }

    findAllReclamationByEtudiantId(id: number) {
        this.reclamationEtudiantService.findAllReclamationByEtudiantId(id);
    }

    get reclamationEtudiantEtudiantList(): Array<ReclamationEtudiant> {
        return this.reclamationEtudiantService.reclamationEtudiantEtudiantList;
    }

    set reclamationEtudiantEtudiantList(value: Array<ReclamationEtudiant>) {
        this.reclamationEtudiantService.reclamationEtudiantEtudiantList = value;
    }

    showReclamationEtudiant() {
        this.displayReclamationEtudiant = true;
    }

    get reclamationEtudiantList(): Array<ReclamationEtudiant> {
        return this.reclamationEtudiantService.reclamationEtudiantList;
    }

    set reclamationEtudiantList(value: Array<ReclamationEtudiant>) {
        this.reclamationEtudiantService.reclamationEtudiantList = value;
    }

    showView(id: number, idprof: number) {
        this.reclamationEtudiantService.displayReclamationViewEtudiant = true;
        this.reclamationEtudiantService.findReclamationEtudiantById(id, idprof);


    }

    get displayReclamationEtudiant(): boolean {
        return this.reclamationEtudiantService.displayReclamationEtudiant;
    }

    set displayReclamationEtudiant(value: boolean) {
        this.reclamationEtudiantService.displayReclamationEtudiant = value;
    }

    public findReclamationEtudiantById(id: number, idprof: number) {
        this.reclamationEtudiantService.findReclamationEtudiantById(id, idprof);
    }
}
