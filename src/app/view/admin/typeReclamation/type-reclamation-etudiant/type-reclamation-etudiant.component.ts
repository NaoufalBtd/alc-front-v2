import {Component, OnInit} from '@angular/core';
import {TypeReclamationEtudiant} from '../../../../controller/model/type-reclamation-etudiant.model';
import {TypeReclamationEtudiantService} from '../../../../controller/service/type-reclamation-etudiant.service';

@Component({
    selector: 'app-type-reclamation-etudiant',
    templateUrl: './type-reclamation-etudiant.component.html',
    styleUrls: ['./type-reclamation-etudiant.component.scss']
})
export class TypeReclamationEtudiantComponent implements OnInit {
    ngOnInit(): void {
        this.typeReclamationEtudiantService.findAll();
    }

    constructor(private typeReclamationEtudiantService: TypeReclamationEtudiantService) {
    }


    get displayTypeReclamationEtudiant(): boolean {
        return this.typeReclamationEtudiantService.displayTypeReclamationEtudiant;
    }

    set displayTypeReclamationEtudiant(value: boolean) {
        this.typeReclamationEtudiantService.displayTypeReclamationEtudiant = value;
    }
    get typeReclamationEtudiant(): TypeReclamationEtudiant {
     return this.typeReclamationEtudiantService.typeReclamationEtudiant;
    }

    set typeReclamationEtudiant(value: TypeReclamationEtudiant) {
        this.typeReclamationEtudiantService.typeReclamationEtudiant = value;
    }

    get typeReclamationEtudiantList(): Array<TypeReclamationEtudiant> {
        return this.typeReclamationEtudiantService.typeReclamationEtudiantList;

    }

    set typeReclamationEtudiantList(value: Array<TypeReclamationEtudiant>) {
        this.typeReclamationEtudiantService.typeReclamationEtudiantList = value;
    }
    public saveTypeReclamationEtudiant() {
        this.typeReclamationEtudiantService.saveTypeReclamationEtudiant();
    }
}
