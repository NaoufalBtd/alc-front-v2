import {Component, OnInit} from '@angular/core';
import {GroupeEtudiantService} from '../../../../controller/service/groupe-etudiant-service';
import {GroupeEtude} from '../../../../controller/model/groupe-etude.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {Parcours} from '../../../../controller/model/parcours.model';
import {Prof} from '../../../../controller/model/prof.model';
import {GroupeEtudiantDetail} from '../../../../controller/model/groupe-etudiant-detail.model';

@Component({
    selector: 'app-groupe-etudiant-create',
    templateUrl: './groupe-etudiant-create.component.html',
    styleUrls: ['./groupe-etudiant-create.component.scss']
})
export class GroupeEtudiantCreateComponent implements OnInit {
    constructor(private groupeEtudiantService: GroupeEtudiantService,
                private confirmation: ConfirmationService,
                private messageService: MessageService) {
    }

    students: Array<Etudiant> = new Array<Etudiant>();
    student: Etudiant = null;
    groupNotValid: boolean;
    profNotValid: boolean;
    levelNotValid: boolean;

    set groupeEtudiants(value: Array<GroupeEtudiant>) {
        this.groupeEtudiantService.groupeEtudiants = value;
    }


    get createDialogEtud(): boolean {
        return this.groupeEtudiantService.createDialog;
    }

    set createDialogEtud(value: boolean) {
        this.groupeEtudiantService.createDialog = value;
    }

    get groupeEtudeList(): Array<GroupeEtude> {
        return this.groupeEtudiantService.groupeEtudeList;
    }

    set groupeEtudeList(value: Array<GroupeEtude>) {
        this.groupeEtudiantService.groupeEtudeList = value;
    }

    get parcoursList(): Array<Parcours> {
        return this.groupeEtudiantService.parcoursList;
    }

    set parcoursList(value: Array<Parcours>) {
        this.groupeEtudiantService.parcoursList = value;
    }


    get profs(): Array<Prof> {
        return this.groupeEtudiantService.profs;

    }

    set profs(value: Array<Prof>) {
        this.groupeEtudiantService.profs = value;
    }


    get etudiantList(): Array<Etudiant> {
        return this.groupeEtudiantService.etudiantList;
    }

    set etudiantList(value: Array<Etudiant>) {
        this.groupeEtudiantService.etudiantList = value;
    }


    get selected(): GroupeEtudiant {
        return this.groupeEtudiantService.groupeEtudiant;
    }

    set selected(value: GroupeEtudiant) {
        this.groupeEtudiantService.groupeEtudiant = value;
    }


    ngOnInit(): void {
        this.findAllProf();
        this.findAllEtudiant();
        this.findAllGroupeEtude();
        this.findAllParcours();
        console.log(this.selected);
        if (this.selected?.id !== undefined && this.selected?.id !== 0 && this.selected?.id !== null) {
            this.groupeEtudiantService.findAllGroupeEtudiantDetail(this.selected.id).subscribe(
                data => this.selected.groupeEtudiantDetails = data);
        } else {
            this.selected = new GroupeEtudiant();
            this.selected.groupeEtude = null;
            this.selected.prof = null;
            this.selected.parcours = null;
        }
    }


    public findAllGroupeEtude() {
        this.groupeEtudiantService.findAllGroupeEtude().subscribe(data => this.groupeEtudeList = data);
    }

    public findAllParcours() {
        this.groupeEtudiantService.findAllParcours().subscribe(data => this.parcoursList = data);
    }

    public findAllEtudiant() {
        this.groupeEtudiantService.findAllEtudiant().subscribe(data => this.etudiantList = data);
    }

    public findAllProf() {
        this.groupeEtudiantService.findAllProf().subscribe(data => this.profs = data);

    }


    public save() {
        console.log(this.selected);
        this.selected.nombrePlacevide = this.selected.groupeEtude.nombreEtudiant - this.selected.groupeEtudiantDetails.length;
        this.selected.nombrePlaceNonVide = this.selected.groupeEtudiantDetails.length;
        this.groupeEtudiantService.save().subscribe(data => {
            this.groupeEtudiants?.push({...data});
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'group Created',
                life: 3000
            });
        });
        this.createDialogEtud = false;
        this.selected = new GroupeEtudiant();
    }


    public addEtudiant() {
        for (const groupeEtudiantDetail of this.selected.groupeEtudiantDetails) {
            if (groupeEtudiantDetail?.etudiant?.id === this.student?.id) {
                this.messageService.add({
                    severity: 'info',
                    detail: 'Student already exist !',
                    life: 10000
                });
                return;
            }
        }
        console.log(this.student);
        const grp: GroupeEtudiantDetail = new GroupeEtudiantDetail();
        grp.etudiant = this.student;
        grp.groupeEtudiant = null;
        this.selected.groupeEtudiantDetails.push(grp);
        this.student = null;
    }


    filterStudentByLevels() {
        console.log(this.selected.parcours);
        this.students = this.etudiantList.filter(s => s.parcours?.id === this.selected?.parcours?.id);
    }

    removeGrouEtudiantDetail(item: GroupeEtudiantDetail) {
        if (item?.id !== undefined && item?.id !== null && item?.id !== 0) {
            this.confirmation.confirm({
                message: 'Are you sure you want to delete ' + item?.etudiant.nom + ' ?',
                header: 'Confirm',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.groupeEtudiantService.deleteGroupeEtudiantDetailById(item.id).subscribe(
                        data => {

                        }, error => {
                            console.log(error);
                        }
                    );
                }
            });
        }

        for (let i = 0; i < this.selected?.groupeEtudiantDetails?.length; i++) {
            if (item?.etudiant?.id === this.selected?.groupeEtudiantDetails[i]?.etudiant?.id) {
                this.selected?.groupeEtudiantDetails.splice(i, 1);
            }
        }
    }
}

