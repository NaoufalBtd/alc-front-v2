import {Component, OnInit} from '@angular/core';
import {Prof} from '../../../../controller/model/prof.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ProfessorService} from '../../../../controller/service/professor.service';
import {Parcours} from '../../../../controller/model/parcours.model';
import {TrancheHoraireProf} from '../../../../controller/model/tranche-horaire-prof.model';
import {newArray} from '@angular/compiler/src/util';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {GroupeEtudiantDetail} from '../../../../controller/model/groupe-etudiant-detail.model';
import {TrancheHoraireProfService} from '../../../../controller/service/tranche-horaire-prof.service';

@Component({
    selector: 'app-professeur-edit',
    templateUrl: './professeur-edit.component.html',
    styleUrls: ['./professeur-edit.component.scss']
})
export class ProfesseurEditComponent implements OnInit {
    showAddTranche: boolean;
    displayModal: boolean;
    trancheEdit: TrancheHoraireProf = new TrancheHoraireProf();

    constructor(private messageService: MessageService,
                private trancheHoraireService: TrancheHoraireProfService,
                private service: ProfessorService,
                private confirmationService: ConfirmationService) {
    }

    public parcoursList2: Array<Parcours> = new Array<Parcours>();
    daysOptions = [
        {name: 'Sun', value: 0},
        {name: 'Mon', value: 1},
        {name: 'Tue', value: 2},
        {name: 'Wed', value: 3},
        {name: 'Thu', value: 4},
        {name: 'Fri', value: 5},
        {name: 'Sat', value: 6},
    ];
    selectedDay: any;
    dateDebut: Date;
    dateFin: Date;


    public findAllParcours() {
        this.service.findAllParcours().subscribe(data => {
            this.parcoursList = data,
                this.parcoursList2 = data;
        });
    }

    ngOnInit(): void {
        this.trancheHoraireProfList = new Array<TrancheHoraireProf>();
        this.findAllParcours();
    }

    get parcoursList(): Array<Parcours> {
        return this.service.parcoursList;
    }

    set parcoursList(value: Array<Parcours>) {
        this.service.parcoursList = value;
    }


    get selected(): Prof {
        return this.service.selected;
    }

    set selected(value: Prof) {
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

    get items(): Array<Prof> {
        return this.service.items;
    }

    set items(value: Array<Prof>) {
        this.service.items = value;
    }


    public trancheHoraireProfs: Array<TrancheHoraireProf> = new Array<TrancheHoraireProf>();

    public addHoraire() {

        if (this.dateFin.getMinutes() < 10) {
            this.trancheHoraireProf.endHour = String(this.dateFin.getHours() + ':' + '0' + this.dateFin.getMinutes());
        } else {
            this.trancheHoraireProf.endHour = String(this.dateFin.getHours() + ':' + this.dateFin.getMinutes());
        }

        if (this.dateDebut.getMinutes() < 10) {
            this.trancheHoraireProf.startHour = String(this.dateDebut.getHours() + ':' + '0' + this.dateDebut.getMinutes());
        } else {
            this.trancheHoraireProf.startHour = String(this.dateDebut.getHours() + ':' + this.dateDebut.getMinutes());
        }
        this.trancheHoraireProf.day = this.selectedDay.value;
        this.trancheHoraireProf.groupIndex = 0;
        console.log(this.trancheHoraireProf);
        this.trancheHoraireProfList.push({...this.trancheHoraireProf});
        this.trancheHoraireProf = new TrancheHoraireProf();
        this.dateFin = undefined;
        this.dateDebut = undefined;
    }

    get trancheHoraireProfList(): Array<TrancheHoraireProf> {
        return this.service.trancheHoraireProfList;
    }

    set trancheHoraireProfList(value: Array<TrancheHoraireProf>) {
        this.service.trancheHoraireProfList = value;
    }

    get trancheHoraireProf(): TrancheHoraireProf {
        return this.service.trancheHoraireProf;
    }

    set trancheHoraireProf(value: TrancheHoraireProf) {
        this.service.trancheHoraireProf = value;
    }

    public edit() {
        this.selected.trancheHoraireProfList = this.trancheHoraireProfList;
        console.log(this.selected.trancheHoraireProfList);
        console.log(this.selected);
        this.submitted = true;
        this.service.edit().subscribe(data => {
            this.selected = data;
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'prof Updated',
                life: 3000
            });
        });
        this.editDialog = false;
        this.selected = new Prof();
        this.trancheHoraireProfList = new Array<TrancheHoraireProf>();

    }

    public hideEditDialog() {
        this.editDialog = false;
    }

    public delete(trancheHoraireProf: TrancheHoraireProf) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this date ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const index = this.trancheHoraireProfList.indexOf(trancheHoraireProf);
                this.trancheHoraireProfList.splice(index, 1);
            }
        });
    }


    getDay(day: number): string {
        for (const item of this.daysOptions) {
            if (item.value === day) {
                return item.name;
            }
        }
    }

    showTranche() {
        this.trancheHoraireService.findTrancheHoraireByProfId(this.selected).subscribe(
            dataTranche => {
                this.trancheHoraireProfs = dataTranche;
                console.log(this.trancheHoraireProfs);
                if (dataTranche.length <= 0) {
                    this.showAddTranche = true;
                } else {
                    this.showAddTranche = false;
                }
            }, error => {
                console.log(error);
            }
        );
    }

    editTranche(tranche: TrancheHoraireProf) {
        this.trancheEdit = new TrancheHoraireProf();
        this.showModalDialog();
        console.log(tranche);
        this.trancheEdit = tranche;
    }

    deleteTranche(tranche: TrancheHoraireProf) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this date ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const index = this.trancheHoraireProfs.indexOf(tranche);
                this.trancheHoraireProfs.splice(index, 1);
                this.trancheHoraireService.deleteTrancheById(tranche.id);
            }
        });
    }

    showModalDialog() {
        this.displayModal = true;
    }

    saveTranche() {
        if (this.dateFin.getMinutes() < 10) {
            this.trancheEdit.endHour = String(this.dateFin.getHours() + ':' + '0' + this.dateFin.getMinutes());
        } else {
            this.trancheEdit.endHour = String(this.dateFin.getHours() + ':' + this.dateFin.getMinutes());
        }

        if (this.dateDebut.getMinutes() < 10) {
            this.trancheEdit.startHour = String(this.dateDebut.getHours() + ':' + '0' + this.dateDebut.getMinutes());
        } else {
            this.trancheEdit.startHour = String(this.dateDebut.getHours() + ':' + this.dateDebut.getMinutes());
        }
        this.trancheEdit.groupIndex = 0;
        this.trancheEdit.prof = this.selected;
        console.log(this.selectedDay);
        if (this.selectedDay !== null && undefined){
           this.trancheEdit.day = this.selectedDay.value;
        }
        console.log(this.trancheEdit);
        this.trancheHoraireService.edit(this.trancheEdit).subscribe(
            data => {
                for (let tr of this.trancheHoraireProfs) {
                    if (tr.id === data.id) {
                        tr = data;
                        break;
                    } else if (tr.id === this.trancheHoraireProfs[this.trancheHoraireProfs.length - 1].id) {
                        this.trancheHoraireProfs.push(data);
                        break;
                    }
                }

            }, error => {
                console.log(error);
            }
        );
        this.selectedDay = undefined;
        this.dateFin = undefined;
        this.dateDebut = undefined;
    }

    addNewTranche() {
        this.trancheEdit = new TrancheHoraireProf();
        this.displayModal = true;
    }

    hideDialog() {
        this.displayModal=false
        this.trancheEdit = new TrancheHoraireProf();
    }
}
