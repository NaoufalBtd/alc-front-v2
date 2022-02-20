import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {InscriptionService} from '../../../../controller/service/inscription.service';
import {Inscription} from '../../../../controller/model/inscription.model';
import {Parcours} from '../../../../controller/model/parcours.model';
import {EtatInscription} from '../../../../controller/model/etat-inscription.model';
import {Prof} from '../../../../controller/model/prof.model';
import {InteretEtudiant} from '../../../../controller/model/interet-etudiant.model';
import {Fonction} from '../../../../controller/model/fonction.model';
import {StatutSocial} from '../../../../controller/model/statut-social.model';
import {NiveauEtude} from '../../../../controller/model/niveau-etude.model';
import {GroupeEtudeService} from '../../../../controller/service/groupe-etude.service';
import {PackStudentService} from '../../../../controller/service/pack-student.service';
import {PackStudent} from '../../../../controller/model/pack-student.model';
import {GroupeEtude} from '../../../../controller/model/groupe-etude.model';
import {Skill} from '../../../../controller/model/skill.model';

@Component({
    selector: 'app-inscription-edit',
    templateUrl: './inscription-edit.component.html',
    styleUrls: ['./inscription-edit.component.scss']
})
export class InscriptionEditComponent implements OnInit {

    // tslint:disable-next-line:max-line-length
    sel = ' ';
    packStudents = new Array<PackStudent>();
    allgroupes: Array<GroupeEtude>;
    constructor(private messageService: MessageService,
                private service: InscriptionService,
                private confirmationService: ConfirmationService,
                public packStudentService: PackStudentService,
                public groupeEtudeService: GroupeEtudeService) {
    }
    public view(inscription: Inscription) {
        this.selected = {...inscription};
        this.viewDialog = true;
    }
    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get parcoursList(): Array<Parcours> {
        return this.service.parcoursList;
    }

    set parcoursList(value: Array<Parcours>) {
        this.service.parcoursList = value;
    }

    get profList(): Array<Prof> {
        return this.service.prof;
    }

    set profList(value: Array<Prof>) {
        this.service.prof = value;
    }

    get etatinscriptionslist(): Array<EtatInscription> {
        return this.service.etatinscriptionslist;
    }

    set etatinscriptionslist(value: Array<EtatInscription>) {
        this.service.etatinscriptionslist = value;
    }

    get selected(): Inscription {
        return this.service.selected;
    }

    set selected(value: Inscription) {
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

    get items(): Array<Inscription> {
        return this.service.items;
    }

    set items(value: Array<Inscription>) {
        this.service.items = value;
    }
    get prof(): Array<Prof> {
        return this.service.prof;
    }

    set prof(value: Array<Prof>) {
        this.service.prof = value;
    }
    ngOnInit(): void {
        this.service.findAllProf().subscribe(
            data => {
                this.profList = data;
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
        this.service.findAllNiveauEtude().subscribe(
            data => {
                this.niveauEtudes = data;
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
        this.service.findAllEtat().subscribe(
            data => {
                this.etatinscriptionslist = data;
                console.log(data);

            }, error => {
                console.log(error);
            }
        );

        this.service.findAllParcours().subscribe(
            data => {
                console.log(data);
                this.parcoursList = data;
            },error => {
                 console.log(error);
            }
        );
        this.groupeEtudeService.findAll().subscribe(
            data => {
                this.allgroupes = data;
            }
        );
        this.packStudentService.findPackIndividualOrgroupe(true);
        this.packStudentService.findPackIndividualOrgroupe(false);
    }

    findAllProf(): void {
        this.service.findAllProf();
    }

    findAllEtat(): void {
        this.service.findAllEtat().subscribe(
            data => {
                this.etatinscriptionslist = data;
            }, error => {
                console.log(error);
            }
        );
        console.log(this.etatinscriptionslist);
        console.log(this.selected.etatInscription.libelle);
    }

    public edit() {
        this.service.findAll().subscribe(data => this.items = data);
        console.log(this.selected);
        this.submitted = true;
        this.items[this.service.findIndexById(this.service.selected.id)] = this.selected;
        this.service.valider().subscribe(data => {
            this.selected = data;
            // tslint:disable-next-line:no-shadowed-variable
            this.service.findAll().subscribe(data => this.items = data);
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'InscriptionUpdated',
                life: 3000
            });
            this.service.findAll().subscribe(  data => this.items = data);
        });
        this.editDialog = false;
        this.selected = new Inscription();
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
                    this.hideEditDialog();
                });
            }
        });
    }

    public hideEditDialog() {
        this.editDialog = false;
    }
    public findTypeOfPack(){
        if (this.selected.groupeEtude.nombreEtudiant > 1){
            this.packStudents = this.packStudentService.packstudentgroupeList;
        }else {
            this.packStudents = this.packStudentService.packstudentIndividialList;
        }
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

    set skills(value: Array<Skill>) {
        this.service.skills = value;
    }
    get skill(): Skill {
        return this.service.skill;
    }

}
