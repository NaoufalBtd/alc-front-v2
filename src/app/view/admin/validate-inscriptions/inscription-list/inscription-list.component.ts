import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {InscriptionService} from '../../../../controller/service/inscription.service';

import {Inscription} from '../../../../controller/model/inscription.model';
import {EtatInscription} from '../../../../controller/model/etat-inscription.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {EtudiantVo} from '../../../../controller/model/etudiant-vo.model';
import {Parcours} from '../../../../controller/model/parcours.model';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {Prof} from '../../../../controller/model/prof.model';
import {ProfService} from '../../../../controller/service/prof.service';
import {GroupeEtude} from '../../../../controller/model/groupe-etude.model';
import {GroupeEtudeService} from '../../../../controller/service/groupe-etude.service';
import {PackStudent} from '../../../../controller/model/pack-student.model';
import {PackStudentService} from '../../../../controller/service/pack-student.service';
import {NiveauEtude} from '../../../../controller/model/niveau-etude.model';
import {InteretEtudiant} from '../../../../controller/model/interet-etudiant.model';
import {Fonction} from '../../../../controller/model/fonction.model';
import {StatutSocial} from '../../../../controller/model/statut-social.model';
import {Skill} from '../../../../controller/model/skill.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-inscription-list',
    templateUrl: './inscription-list.component.html',
    styleUrls: ['./inscription-list.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class InscriptionListComponent implements OnInit {
    cols: any[];

    isRequired = false;


    index: number;
    student: Etudiant = new Etudiant();
    editInscDialog: boolean;
    inscription: Inscription = new Inscription();
    parcours: Array<Parcours> = new Array<Parcours>();
    etatInsc: Array<EtatInscription> = new Array<EtatInscription>();
    teachers: Array<Prof> = new Array<Prof>();
    groupEtudes: Array<GroupeEtude> = new Array<GroupeEtude>();
    packStudents = new Array<PackStudent>();
     isRequired22= false;
    errorMessage = '';
    isSuccessful = false;
    isSignUpFailed = false;
    constructor(private messageService: MessageService,
                private profService: ProfService,
                private parcourService: ParcoursService,
                private groupeEtudeService: GroupeEtudeService,
                private confirmationService: ConfirmationService,
                private service: InscriptionService,
                private packStudentService: PackStudentService) {
    }

    get valideDialog(): boolean {
        return this.service.valideDialog;
    }

    set valideDialog(value: boolean) {
        this.service.valideDialog = value;
    }

    get selected(): Inscription {
        return this.service.selected;
    }

    set selected(value: Inscription) {
        this.service.selected = value;
    }

    get items(): Array<Inscription> {
        return this.service.items;
    }

    set items(value: Array<Inscription>) {
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

    get selectes(): Array<Inscription> {
        return this.service.selectes;
    }

    set selectes(value: Array<Inscription>) {
        this.service.selectes = value;
    }

    get etatInscription(): EtatInscription {
        return this.service.etatInscription;
    }

    set etatInscription(value: EtatInscription) {
        this.service.etatInscription = value;
    }

    get etudiant(): Etudiant {
        return this.service.etudiant;
    }

    set etudiant(value: Etudiant) {
        this.service.etudiant = value;
    }

    get etudiantVo(): EtudiantVo {
        return this.service.etudiantVo;
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
    exform: FormGroup;
    ngOnInit(): void {

        this.isRequired = false;

        this.exform = new FormGroup({
           fullName: new FormControl(null, Validators.required),
            level: new FormControl(null, Validators.required),
            nom: new FormControl(null, Validators.required),
            state: new FormControl(null, Validators.required),
            groupeEtude: new FormControl(null, Validators.required),
            packOption: new FormControl(null, Validators.required)
             });


        this.packStudentService.findPackIndividualOrgroupe(true);
        this.packStudentService.findPackIndividualOrgroupe(false);
        console.log(this.packStudentService.packstudentIndividialList);
        console.log(this.packStudentService.packstudentgroupeList);
        this.initCol();
        this.findAll();
        this.parcourService.FindAllParcours().subscribe(
            data => {
                this.parcours = data;
            }
        );
        this.service.findAllNiveauEtude().subscribe(
            data => {
                this.niveauEtudes = data;
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
        this.service.findAllSkill().subscribe(
            data => {
                this.skills = data;
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
        this.service.findAllStatutSocial().subscribe(
            data => {
                this.statutSocials = data;
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
        this.service.findAllFonction().subscribe(
            data => {
                this.fonctions = data;
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
        this.service.findAllInteretEtudiant().subscribe(
            data => {
                this.interetEtudiants = data;
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
        this.service.findAllEtat().subscribe(
            data => {
                this.etatInsc = data;
            }
        );

        this.profService.findAll().subscribe(
            data => {
                this.teachers = data;
            }
        );

        this.groupeEtudeService.findAll().subscribe(
            data => {
                this.groupEtudes = data;
            }
        );
    }

    findAll() {
        this.service.findAll().subscribe(data => {
            this.items = data;
            console.log(this.items);
        });
    }

    public delete(selected: Inscription) {
        this.selected = selected;
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + selected.etudiant.nom + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteByNumeroInscription().subscribe(data => {
                    this.items = this.items.filter(val => val.id !== this.selected.id);
                    this.selected = new Inscription();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Inscription Deleted',
                        life: 3000
                    });
                });
            }
        });
    }

    public findByCriteria() {
        return this.service.findByCriteria(this.student).subscribe(data => {
            this.items = data;
            console.log(data);
        });
    }

    public deleteMultiple() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected inscription?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteMultipleByNumeroInscription().subscribe(data => {
                    this.service.deleteMultipleIndexById();
                    this.selectes = null;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Commandes Deleted',
                        life: 3000
                    });
                });
            }
        });
    }

    public openCreate() {
        this.selected = new Inscription();
        this.submitted = false;
        this.createDialog = true;
    }

    public openValide() {
        this.selected = new Inscription();
        this.submitted = false;
        this.valideDialog = true;
    }

    public edit(inscriptions: Inscription) {
        this.findTypeOfPack(inscriptions);
        this.selected = {...inscriptions};
        this.editDialog = true;
    }

    public view(inscription: Inscription) {

        this.selected = {...inscription};
        this.viewDialog = true;

    }

    public update(index: number, inscription: Inscription) {
        this.service.update(index, inscription);
    }

    private initCol() {
        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'numeroInscription', header: 'NumeroInscription'},
            {field: 'datedebutinscription', header: 'Datedebutinscription'},
            {field: 'datefininscription', header: 'Datefininscription'},
            {field: 'nom', header: 'Nom'},
            {field: 'prenom', header: 'Prenom'},
            {field: 'prof', header: 'Prof'},
            {field: 'etatInscription', header: 'EtatInscription'}
        ];
    }

    handleChange(e) {
        const index = e.index;
        if (index === 0) {
            this.findAll();
        } else {
            this.service.findByEtatInscription('Pending').subscribe(
                data => {
                    this.items = data;
                }, error => {
                    console.log(error);
                }
            );
        }
    }

    updateInsc(inscription: Inscription) {

        this.isRequired = false;
            this.service.edit(inscription).subscribe(data => console.log(data));

            this.editInscDialog = false;

        console.log(inscription);
       // this.service.edit(inscription).subscribe(data => console.log(data));
    }

    showEditDialog(inscription: Inscription) {
        this.inscription = new Inscription();
        this.editInscDialog = true;
        this.inscription = inscription;
        this.findTypeOfPack(this.inscription);
        console.log(inscription);

    }

    public findTypeOfPack(inscription: Inscription){
        if (inscription.groupeEtude.nombreEtudiant > 1){
            this.packStudents = this.packStudentService.packstudentgroupeList;
        }else {
            this.packStudents = this.packStudentService.packstudentIndividialList;
        }
        console.log(this.packStudents);

    }
    get skills(): Array<Skill> {

        return this.service.skills;
    }
    set skill(value: Skill) {
        this.service.skill = value;
    }

    set skills(value: Array<Skill>) {
        this.service.skills = value;
    }
    get skill(): Skill {
        return this.service.skill;
    }
}
