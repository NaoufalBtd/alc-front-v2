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
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-complaint-list',
    templateUrl: './complaint-list.component.html',
    styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {
    processingStatus: MenuItem[];

    constructor(private typeReclamationEtudiantService: TypeReclamationEtudiantService, private typeReclamationProfService: TypeReclamationProfService, private reclamationProfService: ReclamationProfService, private reclamationEtudiantService: ReclamationEtudiantService, private profService: ProfService, private studentService: EtudiantService) {
        this.processingStatus = [];
        // @ts-ignore
        this.processingStatus.push({label: 'Processed', value: 1});
        // @ts-ignore
        this.processingStatus.push({label: 'Being Processed', value: 0});
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

    showReclamationViewEtudiant(id: number, idStudent: number) {
        this.displayReclamationViewEtudiant = true;
        this.findReclamationEtudiantByIdAndStudentId(id, idStudent);
    }

    showReclamationViewProf(idReclamation: number) {
        this.displayReclamationViewProf = true;
        // this.reclamationProfService.idReclamationProf = idReclamation;
        this.reclamationProfService.findReclamationEtudiantById(idReclamation);

    }

    ngOnInit(): void {
        this.reclamationProfService.findAll();
        this.reclamationEtudiantService.findAll();
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

    showReclamationEditProf(reclamationProf: ReclamationProf) {
        this.displayReclamationEditProf = true;
        this.reclamationProfService.findReclamationEtudiantByIdEdit(reclamationProf.id);
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
    get displayReclamationEditEtudiant(): boolean {
        return this.reclamationEtudiantService.displayReclamationEditEtudiant;
    }

    set displayReclamationEditEtudiant(value: boolean) {
        this.reclamationEtudiantService.displayReclamationEditEtudiant = value;
    }

    showEtudiantEdit(id: number, idStudent: number) {
        this.displayReclamationEditEtudiant = true;
        this.findReclamationEtudiantByIdAndStudentId(id, idStudent);
    }

    public findReclamationEtudiantByIdAndStudentId(id: number, idStudent: number) {
        this.reclamationEtudiantService.findReclamationEtudiantByIdAndStudentId(id, idStudent);
    }

    get reclamationEtudiantSerch(): ReclamationEtudiant {
        return this.reclamationEtudiantService.reclamationEtudiantSerch;
    }

    set reclamationEtudiantSerch(value: ReclamationEtudiant) {
        this.reclamationEtudiantService.reclamationEtudiantSerch = value;
    }

    public findAllByCriteria() {
        this.reclamationEtudiantService.findAllByCriteria();
    }

    public findAllByCriteriaProf() {
        this.reclamationProfService.findAllByCriteria();
    }

    get reclamationProfSearch(): ReclamationProf {
        return this.reclamationProfService.reclamationProfSearch;
    }

    set reclamationProfSearch(value: ReclamationProf) {
        this.reclamationProfService.reclamationProfSearch = value;
    }
    get reclamationEtudiantEdit(): ReclamationEtudiant {
        return this.reclamationEtudiantService.reclamationEtudiantEdit;
    }

    set reclamationEtudiantEdit(value: ReclamationEtudiant) {
        this.reclamationEtudiantService.reclamationEtudiantEdit = value;
    }
}
