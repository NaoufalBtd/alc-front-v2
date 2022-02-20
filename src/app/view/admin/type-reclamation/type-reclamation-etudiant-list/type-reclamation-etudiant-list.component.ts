import {Component, OnInit} from '@angular/core';
import {TypeReclamationProf} from '../../../../controller/model/type-reclamation-prof.model';
import {TypeReclamationProfService} from '../../../../controller/service/type-reclamation-prof.service';
import {TypeReclamationEtudiantService} from '../../../../controller/service/type-reclamation-etudiant.service';
import {TypeReclamationEtudiant} from '../../../../controller/model/type-reclamation-etudiant.model';

@Component({
    selector: 'app-type-reclamation-etudiant-list',
    templateUrl: './type-reclamation-etudiant-list.component.html',
    styleUrls: ['./type-reclamation-etudiant-list.component.scss']
})
export class TypeReclamationEtudiantListComponent implements OnInit {

    constructor(private typeReclamationEtudiantService: TypeReclamationEtudiantService) {
    }

    ngOnInit(): void {
        this.typeReclamationEtudiantService.findAll();
    }

    showReclamation() {
        this.typeReclamationEtudiantService.displayTypeReclamationEtudiant = true;
    }
    get typeReclamationEtudiantList(): Array<TypeReclamationEtudiant> {
        return this.typeReclamationEtudiantService.typeReclamationEtudiantList;

    }

    set typeReclamationEtudiantList(value: Array<TypeReclamationEtudiant>) {
        this.typeReclamationEtudiantService.typeReclamationEtudiantList = value;
    }
}
