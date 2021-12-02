import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {InscriptionService} from '../../../controller/service/inscription.service';
import {Inscription} from '../../../controller/model/inscription.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {Parcours} from '../../../controller/model/parcours.model';
import {Centre} from '../../../controller/model/centre.model';
import {Router} from '@angular/router';
import {EtudiantService} from '../../../controller/service/etudiant.service';
import {GroupeEtude} from '../../../controller/model/groupe-etude.model';

@Component({
    selector: 'app-formlayoutdemo',
    templateUrl: './formlayoutdemo.component.html',
    styleUrls: ['./formlayoutdemo.component.css']
})
export class FormLayoutDemoComponent implements OnInit {
    locality = [
        {name: 'native'},
        {name: 'non-native'},
    ];
    id: number;

    constructor(private messageService: MessageService,
                private etudiantService: EtudiantService,
                private confirmationService: ConfirmationService,
                private service: InscriptionService, private router: Router) {
    }

    Undefinded: string;

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get submitted(): boolean {
        return this.service.submitted;
    }

    set submitted(value: boolean) {
        this.service.submitted = value;
    }

    get selected(): Inscription {
        return this.service.selected;
    }

    set selected(value: Inscription) {
        this.service.selected = value;
    }

    get selectes(): Array<Inscription> {
        return this.service.selectes;
    }

    set selectes(value: Array<Inscription>) {
        this.service.selectes = value;
    }

    get selectedetudiant(): Etudiant {
        return this.service.selectedetudiant;
    }

    set selectedetudiant(value: Etudiant) {
        this.service.selectedetudiant = value;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    get etudiant(): Etudiant {
        return this.etudiantService.selected;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    get etudiants(): Array<Etudiant> {
        return this.etudiantService.selectes;
    }

    set etudiant(value: Etudiant) {
        this.etudiantService.selected = value;
    }

    get parcours(): Parcours {
        return this.service.etudiant.parcours;
    }

    get centre(): Centre {
        return this.service.etudiant.parcours.centre;
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

    ngOnInit(): void {
        this.selected = new Inscription();
        this.selected.datedebutinscription = new Date();
    }

    public save() {
        if (this.etudiant.parcours.id === 0 || this.etudiant.parcours.id === undefined || this.etudiant.parcours.id === null) {
            this.messageService.add({
                severity: 'info',
                summary: 'Warning',
                detail: 'Please select a level!',
                life: 5000
            });
            return;
        }
        if (this.etudiant.groupeEtude.id === 0 || this.etudiant.groupeEtude.id === undefined || this.etudiant.groupeEtude.id === null) {
            this.messageService.add({
                severity: 'info',
                summary: 'Warning',
                detail: 'Please select your group option!',
                life: 5000
            });
            return;
        }
        console.log(this.etudiant);
        this.submitted = true;
        console.log(this.etudiant.parcours.id);
        this.etudiantService.create().subscribe(data => {
            if (data === -1) {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Warning',
                    detail: 'Email already exist, please try another one.',
                    life: 4000
                });
            } else {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Registration added, please check your email to get your password.',
                    life: 4000
                });
            }
        }, error => {
            this.messageService.add({
                severity: 'error',
                summary: 'Warning',
                detail: 'Registration canceled',
                life: 3000
            });
            console.log(error);
        });
        this.etudiant = new Etudiant();
    }

    public findAllCentre() {
        this.service.findAllCentre().subscribe(data => this.centreList = data);
    }

    public findAllGroupeEtude() {
        this.etudiantService.findAllGroupeEtude().subscribe(data => this.groupeEtudeList = data);
    }

    public findAllParcoursList() {
        this.etudiantService.findAllParcoursList().subscribe(data => {
                this.parcoursList = data;
                console.log(this.parcoursList);
            }
        );

    }

    get groupeEtudeList(): Array<GroupeEtude> {
        return this.etudiantService.groupeEtudeList;
    }

    set groupeEtudeList(value: Array<GroupeEtude>) {
        this.etudiantService.groupeEtudeList = value;
    }

    affecterParcours(idParcours: any) {
        this.etudiant.parcours.id = idParcours.target.value;
        console.log(idParcours.target.value);
    }
}
