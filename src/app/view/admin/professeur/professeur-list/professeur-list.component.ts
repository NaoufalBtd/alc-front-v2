import {Component, OnInit} from '@angular/core';
import {ProfessorService} from '../../../../controller/service/professor.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Prof} from '../../../../controller/model/prof.model';
import {ScheduleService} from '../../../../controller/service/schedule.service';
import {TrancheHoraireProfService} from '../../../../controller/service/tranche-horaire-prof.service';
import {TrancheHoraireProf} from '../../../../controller/model/tranche-horaire-prof.model';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-professeur-list',
    templateUrl: './professeur-list.component.html',
    styleUrls: ['./professeur-list.component.scss']
})
export class ProfesseurListComponent implements OnInit {

    constructor(private messageService: MessageService,
                private parcourService: ParcoursService,
                private trancheHoraireProfService: TrancheHoraireProfService,
                private scheduleService: ScheduleService,
                private router: Router,
                private confirmationService: ConfirmationService,
                private service: ProfessorService) {
    }


    get selected(): Prof {
        return this.service.selected;
    }

    set selected(value: Prof) {
        this.service.selected = value;
    }

    get items(): Array<Prof> {
        return this.service.items;
    }

    set items(value: Array<Prof>) {
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

    get selectes(): Array<Prof> {
        return this.service.selectes;
    }

    set selectes(value: Array<Prof>) {
        this.service.selectes = value;
    }



    get trancheHoraireProfList(): Array<TrancheHoraireProf> {
        return this.trancheHoraireProfService.trancheHoraireProfList;
    }

    set trancheHoraireProfList(value: Array<TrancheHoraireProf>) {
        this.trancheHoraireProfService.trancheHoraireProfList = value;
    }

    cols: any[];
    prof: Prof = new Prof();


    public findByCriteria() {
        return this.service.findByCriteria(this.prof).subscribe(data => this.items = data);
    }

    ngOnInit(): void {
        this.initCol();
        this.service.findAll().subscribe(data => this.items = data);
    }


    public delete(selected: Prof) {
        this.selected = selected;
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + selected.ref + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteByReference().subscribe(data => {
                    this.items = this.items.filter(val => val.id !== this.selected.id);
                    this.selected = new Prof();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Professor Deleted',
                        life: 3000
                    });
                });
            }
        });
    }

    public deleteMultiple() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected professors?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteMultipleByReference().subscribe(data => {
                    this.service.deleteMultipleIndexById();
                    this.selectes = null;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Professor Deleted',
                        life: 3000
                    });
                });
            }
        });
    }

    public openCreate() {
        this.selected = new Prof();
        this.submitted = false;
        this.createDialog = true;
    }

    public edit(professor: Prof) {
        this.selected = {...professor};
        this.router.navigate(['/admin/teacher-lists/teacher']);
    }

    public view(professor: Prof) {
        this.selected = {...professor};
        this.viewDialog = true;
    }

    public Search() {
        this.service.Search().subscribe(data => this.items = data);
    }

    private initCol() {
        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'reference', header: 'Reference'},
            {field: 'firstName', header: 'First Name'},
            {field: 'lastName', header: 'Last Name'},
            {field: 'phoneNumber', header: 'phoneNumber'},
            {field: 'email', header: 'email'}

        ];
    }

    public findByProfId(prof: Prof) {
        console.log(this.selected.trancheHoraireProfList);
        this.service.findByProfId(prof.id).subscribe(
            data => this.selected.trancheHoraireProfList = data);
    }


    get professors(): Array<Prof> {

        return this.scheduleService.professors;
    }

    set professors(value: Array<Prof>) {
        this.scheduleService.professors = value;
    }


    public getProf() {
        this.scheduleService.getProf().subscribe(data => this.professors = data);
    }


}
