import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

import {EtudiantService} from '../../../../controller/service/etudiant.service';

import {Etudiant} from '../../../../controller/model/etudiant.model';
import {Centre} from '../../../../controller/model/centre.model';
import {Parcours} from '../../../../controller/model/parcours.model';
import {Prof} from '../../../../controller/model/prof.model';
import {InteretEtudiant} from '../../../../controller/model/interet-etudiant.model';
import {Fonction} from '../../../../controller/model/fonction.model';
import {StatutSocial} from '../../../../controller/model/statut-social.model';
import {NiveauEtude} from '../../../../controller/model/niveau-etude.model';
import {Skill} from '../../../../controller/model/skill.model';

@Component({
    selector: 'app-etudiant-edit',
    templateUrl: './etudiant-edit.component.html',
    styleUrls: ['./etudiant-edit.component.scss']
})
export class EtudiantEditComponent implements OnInit {

    constructor(private messageService: MessageService, private service: EtudiantService) {
    }

    get itemsprof(): Array<Prof> {
        return this.service.itemsprof;
    }

    set itemsprof(value: Array<Prof>) {
        this.service.itemsprof = value;
    }

    get centreList(): Array<Centre> {

        return this.service.centreList;
    }

    set centreList(value: Array<Centre>) {
        this.service.centreList = value;
    }

    get parcoursList(): Array<Parcours> {
        return this.service.parcoursList;
    }

    set parcoursList(value: Array<Parcours>) {
        this.service.parcoursList = value;
    }

    get selected(): Etudiant {
        return this.service.selected;
    }

    set selected(value: Etudiant) {
        this.service.selected = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get submitted(): boolean {
        return this.service.submitted;
    }

    set submitted(value: boolean) {
        this.service.submitted = value;
    }

    get items(): Array<Etudiant> {
        return this.service.items;
    }

    set items(value: Array<Etudiant>) {
        this.service.items = value;
    }

    ngOnInit(): void {
    }

    public findAllCentre() {
        this.service.findAllCentre().subscribe(data => this.centreList = data);
    }

    public findAllParcours() {
        this.service.findAllParcours().subscribe(data => this.parcoursList = data);
    }

    public findAllProf() {
        this.service.findAllProf().subscribe(data => this.itemsprof = data);
    }

    public edit() {
        this.submitted = true;

        this.items[this.service.findIndexById(this.selected.id)] = this.selected;
        this.service.edit().subscribe(data => {
            this.selected = data;
            this.service.findAll();
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Etudiant Updated',
                life: 3000
            });
        });
        this.editDialog = false;
        this.selected = new Etudiant();
    }

    public hideEditDialog() {
        this.editDialog = false;
    }

    get interetEtudiant(): InteretEtudiant {
        return this.service.interetEtudiant;
    }

    set interetEtudiant(value: InteretEtudiant) {
        this.service.interetEtudiant = value;
    }

    get interetEtudiants(): Array<InteretEtudiant> {
        return this.service.interetEtudiants;
    }

    set interetEtudiants(value: Array<InteretEtudiant>) {
        this.service.interetEtudiants = value;
    }

    get fonctions(): Array<Fonction> {
        return this.service.fonctions;
    }

    set fonctions(value: Array<Fonction>) {
        this.service.fonctions = value;
    }

    get fonction(): Fonction {
        return this.service.fonction;
    }

    set fonction(value: Fonction) {
        this.service.fonction = value;
    }

    get statutSocial(): StatutSocial {
        return this.service.statutSocial;
    }

    set statutSocial(value: StatutSocial) {
        this.service.statutSocial = value;
    }

    get statutSocials(): Array<StatutSocial> {
        return this.service.statutSocials;
    }

    set statutSocials(value: Array<StatutSocial>) {
        this.service.statutSocials = value;
    }

    get niveauEtudes(): Array<NiveauEtude> {
        return this.service.niveauEtudes;
    }

    set niveauEtudes(value: Array<NiveauEtude>) {
        this.service.niveauEtudes = value;
    }

    get niveauEtude(): NiveauEtude {
        return this.service.niveauEtude;
    }

    set niveauEtude(value: NiveauEtude) {
        this.service.niveauEtude = value;
    }

    get skills(): Array<Skill> {

        return this.service.skills;
    }

    set skill(value: Skill) {
        this.service.skill = value;
    }


}
