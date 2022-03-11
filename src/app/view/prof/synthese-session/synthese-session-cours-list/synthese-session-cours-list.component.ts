import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SyntheseSessionCoursService} from '../../../../controller/service/synthese-session-cours.service';
import {SyntheseSessionCours} from '../../../../controller/model/synthese-session-cours.model';
import {City} from '../../../../controller/model/city.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {Prof} from '../../../../controller/model/prof.model';
import {SessionCours} from '../../../../controller/model/session-cours.model';
import {ProfessorService} from '../../../../controller/service/professor.service';
import {EtudiantCours} from '../../../../controller/model/etudiant-cours.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';

@Component({
    selector: 'app-synthese-session-cours-list',
    templateUrl: './synthese-session-cours-list.component.html',
    styleUrls: ['./synthese-session-cours-list.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class SyntheseSessionCoursListComponent implements OnInit {
    cities: City[];

    selectedCity: City;
    cols: any[];
    public etat = 1;
    public p = 2;
    public j = 0;
    public k = 0;
    public c = 0;
    public m = 0;

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
                private service: SyntheseSessionCoursService, private servicePrf: ProfessorService) {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }
    private initCol() {
        this.cols = [
            {field: 'id', header: 'STUDENtT'},
            {field: 'reference', header: 'SCHEDULE'},
            {field: '', header: 'LAST CLASS'},
            {field: '', header: 'BALANCE'},
            {field: '', header: 'ED CLASS'}
        ];
    }
    groupeEtudiant = new GroupeEtudiant;
    groupeEtudiants = new Array<GroupeEtudiant>();
    ngOnInit(): void {
        this.initCol();
        console.log('hi');
        this.service.findAllStudent2().subscribe(

            data => {
                this.groupeEtudiants = data;

                console.log(this.groupeEtudiants );
            }
        );
        this.service.findAllStudent().subscribe(
            data => {
                this.itemsEtudiant = data;

                console.log(this.itemsEtudiant);
            }
        );


        console.log(this.itemsEtudiant);
        this.service.findAll().subscribe(data => {
            this.items = data;
            for (let i = 0; i < this.items.length; i++) {
                // tslint:disable-next-line:triple-equals
                if (this.items[i].etatNumber == 1) {
                    console.log(this.j);
                    this.j++;
                    console.log(this.j);
                    // tslint:disable-next-line:triple-equals
                } else if (this.items[i].etatNumber == 2) {
                    this.k++;
                    // tslint:disable-next-line:triple-equals
                } else if (this.items[i].etatNumber == 4) {
                    this.m++;
                } else {
                    this.c++;
                }
            }
        });

    }
    public findAllGroupeEtudiantDetail(groupeEtudiant: GroupeEtudiant) {
        console.log(groupeEtudiant.id);

        this.servicePrf.findAllGroupeEtudiantDetail(groupeEtudiant.id).subscribe(
            data => this.groupeEtudiant.groupeEtudiantDetails = data);
        console.log(this.groupeEtudiant.groupeEtudiantDetails);
    }

    get sessionCours(): Array<SessionCours> {


        return this.servicePrf.sessionCours;
    }

    set sessionCours(value: Array<SessionCours>) {
        this.servicePrf.sessionCours = value;
    }
    public findEtudiantById(etudiant: Etudiant) {
         console.log(etudiant.id);
        this.submitted = false;
        this.profilDiaglog = true;
        this.servicePrf.findCoursByEtudiantId(etudiant.id).subscribe(data =>
        { this.sessionCours = data;
        console.log( 'hahoa l cours ' + this.sessionCours); }) ;
        this.servicePrf.findEtudiantById(etudiant.id).subscribe(
            data =>
            {this.etudiant = data;
             console.log(this.etudiant);
            },
            error => { console.log(error); }
        );
    }

    public findEtudiantById2(etudiant: Etudiant) {
        console.log('.id');
        console.log(etudiant.id);
        this.profilDiaglog = true;
        this.servicePrf.findEtudiantById(etudiant.id).subscribe(

            data =>
            {this.etudiant = data;
                console.log(this.etudiant);
            },

            error => { console.log(error); }
        );
    }

    public viewSession(etd: Etudiant) {
        this.servicePrf.afficheSessionStd(etd.id).subscribe(
            data => {
                // @ts-ignore
                this.itemsSession = data;
            });
        this.viewDialogProf = true;
    }



    public delete(selected: SyntheseSessionCours) {
        this.selected = selected;
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + selected.reference + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteByReference().subscribe(data => {
                    this.items = this.items.filter(val => val.id !== this.selected.id);
                    this.selected = new SyntheseSessionCours();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Synthese Deleted',
                        life: 3000
                    });
                });
            }
        });
    }

    public deleteMultiple() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected synthese?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteMultipleByReference().subscribe(data => {
                    this.service.deleteMultipleIndexById();
                    this.selectes = null;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Synthese Deleted',
                        life: 3000
                    });
                });
            }
        });
    }

    public openCreate() {
        this.selected = new SyntheseSessionCours();
        this.submitted = false;
        this.createDialog = true;
    }

    public viewProfiel() {
        this.submitted = false;
        this.profilDiaglog = true;

    }
    public edit(synthese: SyntheseSessionCours) {
        this.selected = {...synthese};
        this.editDialog = true;
    }

    public view(synthese: SyntheseSessionCours) {
        this.selected = {...synthese};
        this.viewDialog = true;
    }

    incrementer(synthese: SyntheseSessionCours) {
        synthese.nbrClass++;
    }

    public setetat(nbr: number): number {
        this.etat = nbr;
        return this.etat;
    }
    get itemsEtudiant(): Array<Etudiant> {
        return this.service.itemsEtudiant;
    }

    set itemsEtudiant(value: Array<Etudiant>) {
        this.service.itemsEtudiant = value;
    }
    get etudiant(): Etudiant{
        return  this.servicePrf.etudiant;
    }

    set etudiant(value: Etudiant) {
        this.servicePrf.etudiant = value;
    }
    get selected(): SyntheseSessionCours {

        return this.service.selected;
    }

    set selected(value: SyntheseSessionCours) {
        this.service.selected = value;
    }

    get items(): Array<SyntheseSessionCours> {
        return this.service.items;

    }

    set items(value: Array<SyntheseSessionCours>) {
        this.service.items = value;
    }

    get submitted(): boolean {
        return this.service.submitted;
    }

    set submitted(value: boolean) {
        this.service.submitted = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }
    get profilDiaglog(): boolean {
        return this.service.profilDiaglog;
    }

    set profilDiaglog(value: boolean) {
        this.service.profilDiaglog = value;
    }

    get selectes(): Array<SyntheseSessionCours> {
        return this.service.selectes;
    }

    set selectes(value: Array<SyntheseSessionCours>) {
        this.service.selectes = value;
    }
    get itemsSession(): Array<EtudiantCours> {
        return this.servicePrf.itemsSession;
    }

    set itemsSession(value: Array<EtudiantCours>) {
        this.servicePrf.itemsSession = value;
    }
    get viewDialogProf(): boolean {
        return this.servicePrf.viewDialogProf;
    }

    set viewDialogProf(value: boolean) {
        this.servicePrf.viewDialogProf = value;
    }

}
