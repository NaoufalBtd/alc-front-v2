import {Component, OnInit} from '@angular/core';
import {TypeReclamationEtudiantService} from '../../../../controller/service/type-reclamation-etudiant.service';
import {TypeReclamationProfService} from '../../../../controller/service/type-reclamation-prof.service';
import {ReclamationProf} from '../../../../controller/model/reclamation-prof.model';
import {ReclamationProfService} from '../../../../controller/service/reclamation-prof.service';
import {ReclamationEtudiantService} from '../../../../controller/service/reclamation-etudiant.service';

@Component({
    selector: 'app-complaint-list',
    templateUrl: './complaint-list.component.html',
    styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {

    constructor(private typeReclamationEtudiantService: TypeReclamationEtudiantService, private typeReclamationProfService: TypeReclamationProfService, private reclamationProfService: ReclamationProfService, private reclamationEtudiantService: ReclamationEtudiantService) {
    }


    get displayTypeReclamationEtudiant(): boolean {
        return this.typeReclamationEtudiantService.displayTypeReclamationEtudiant;
    }

    set displayTypeReclamationEtudiant(value: boolean) {
        this.typeReclamationEtudiantService.displayTypeReclamationEtudiant = value;
    }

    get displayTypeReclamationProf(): boolean {
        return this.typeReclamationProfService.displayTypeReclamationProf;
    }

    set displayTypeReclamationProf(value: boolean) {
        this.typeReclamationProfService.displayTypeReclamationProf = value;
    }

    get reclamationProfList(): Array<ReclamationProf> {
        return this.reclamationProfService.reclamationProfList;
    }

    set reclamationProfList(value: Array<ReclamationProf>) {
        this.reclamationProfService.reclamationProfList = value;
    }

    get displayReclamationViewProf(): boolean {
        return this.reclamationProfService.displayReclamationViewProf;
    }

    set displayReclamationViewProf(value: boolean) {
        this.reclamationProfService.displayReclamationViewProf = value;
    }

    get displayReclamationViewEtudiant(): boolean {
        return this.reclamationEtudiantService.displayReclamationViewEtudiant;
    }

    set displayReclamationViewEtudiant(value: boolean) {
        this.reclamationEtudiantService.displayReclamationViewEtudiant = value;
    }

    showReclamationViewEtudiant() {
        this.displayReclamationViewEtudiant = true;
    }

    showReclamationViewProf() {
        this.displayReclamationViewProf = true;

    }

    ngOnInit(): void {
        this.reclamationProfService.findAll();
    }

    showTypeReclamationProf() {
        this.displayTypeReclamationProf = true;
    }

    showTypeReclamationEtudiant() {
        this.displayTypeReclamationEtudiant = true;

    }
}
