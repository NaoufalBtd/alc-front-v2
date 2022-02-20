import {Component, OnInit} from '@angular/core';
import {TypeReclamationEtudiantService} from '../../../../controller/service/type-reclamation-etudiant.service';
import {TypeReclamationProfService} from '../../../../controller/service/type-reclamation-prof.service';
import {ReclamationProf} from '../../../../controller/model/reclamation-prof.model';
import {ReclamationProfService} from '../../../../controller/service/reclamation-prof.service';
import {ReclamationEtudiantService} from '../../../../controller/service/reclamation-etudiant.service';
import {ReclamationEtudiant} from '../../../../controller/model/reclamation-etudiant.model';
import {ProfService} from '../../../../controller/service/prof.service';
import {Prof} from '../../../../controller/model/prof.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {EtudiantService} from '../../../../controller/service/etudiant.service';

@Component({
    selector: 'app-complaint-list',
    templateUrl: './complaint-list.component.html',
    styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {

    constructor(private typeReclamationEtudiantService: TypeReclamationEtudiantService, private typeReclamationProfService: TypeReclamationProfService, private reclamationProfService: ReclamationProfService, private reclamationEtudiantService: ReclamationEtudiantService, private profService: ProfService, private studentService: EtudiantService) {
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

    showReclamationViewProf(idReclamation: number) {
        this.displayReclamationViewProf = true;
        // this.reclamationProfService.idReclamationProf = idReclamation;
        this.reclamationProfService.findReclamationEtudiantById(idReclamation);

    }

    ngOnInit(): void {
        this.reclamationProfService.findAll();
        this.profService.findAll().subscribe(
            data => {
                if (data != null) {
                    this.profListReclamation = data;
                }
            }
        );
        this.studentService.findAll().subscribe(
            data => {
                if (data != null) {
                    this.studentList = data;
                }
            }
        );
    }

    get studentList(): Array<Etudiant> {
        return this.studentService.studentList;
    }
    set studentList(value: Array<Etudiant>) {
        this.studentService.studentList = value;
    }

    get profListReclamation(): Array<Prof> {

        return this.profService.profListReclamation;
    }

    set profListReclamation(value: Array<Prof>) {
        this.profService.profListReclamation = value;
    }

    showTypeReclamationProf() {
        this.displayTypeReclamationProf = true;
    }

    showTypeReclamationEtudiant() {
        this.displayTypeReclamationEtudiant = true;
    }

    get displayReclamationEditProf(): boolean {
        return this.reclamationProfService.displayReclamationEditProf;
    }

    set displayReclamationEditProf(value: boolean) {
        this.reclamationProfService.displayReclamationEditProf = value;
    }

    showReclamationEditProf(idReclamation: number) {
        this.displayReclamationEditProf = true;
        this.reclamationProfService.findReclamationEtudiantByIdEdit(idReclamation);
        this.idreclamationprofedite = idReclamation;
    }

    public findReclamationEtudiantByIdEdit(idreclamationProf: number) {
        this.reclamationProfService.findReclamationEtudiantByIdEdit(idreclamationProf);
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

    get reclamationEtudiantList(): Array<ReclamationEtudiant> {
        return this.reclamationEtudiantService.reclamationEtudiantList;
    }

    set reclamationEtudiantList(value: Array<ReclamationEtudiant>) {
        this.reclamationEtudiantService.reclamationEtudiantList = value;
    }
}
