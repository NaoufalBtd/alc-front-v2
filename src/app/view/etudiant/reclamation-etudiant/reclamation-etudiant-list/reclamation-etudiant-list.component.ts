import {Component, OnInit} from '@angular/core';
import {ReclamationEtudiant} from '../../../../controller/model/reclamation-etudiant.model';
import {ReclamationEtudiantService} from '../../../../controller/service/reclamation-etudiant.service';

@Component({
    selector: 'app-reclamation-etudiant-list',
    templateUrl: './reclamation-etudiant-list.component.html',
    styleUrls: ['./reclamation-etudiant-list.component.scss']
})
export class ReclamationEtudiantListComponent implements OnInit {

    constructor(private reclamationEtudiantService: ReclamationEtudiantService) {
    }

    ngOnInit(): void {
    }

    get reclamationEtudiantEtudiantList(): Array<ReclamationEtudiant> {
        return this.reclamationEtudiantService.reclamationEtudiantEtudiantList;
    }

    set reclamationEtudiantEtudiantList(value: Array<ReclamationEtudiant>) {
        this.reclamationEtudiantService.reclamationEtudiantEtudiantList = value;
    }

    showReclamationEtudiant() {
        this.reclamationEtudiantService.displayReclamationEtudiant = true;
    }
}
