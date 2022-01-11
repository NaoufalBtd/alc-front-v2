import {Component, OnInit, ViewChild} from '@angular/core';
import {ProfessorService} from '../../../../controller/service/professor.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Prof} from '../../../../controller/model/prof.model';
import {EtudiantCours} from '../../../../controller/model/etudiant-cours.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {ScheduleProf} from '../../../../controller/model/calendrier-prof.model';
import {EventSettingsModel, ScheduleComponent} from '@syncfusion/ej2-angular-schedule';
import {ScheduleService} from '../../../../controller/service/schedule.service';


@Component({
    selector: 'app-professeur-list',
    templateUrl: './professeur-list.component.html',
    styleUrls: ['./professeur-list.component.scss']
})
export class ProfesseurListComponent implements OnInit {

    cols: any[];
    prof: Prof = new Prof();
    scheduleDialog = true;
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    display = false;
    private selectionTarget: Element;
    // public selectedDate: Date = new Date(2021, 4, 18);
    public selectedDate: Date = new Date();
    public showWeekend = false;
    public eventSettings: EventSettingsModel;

    constructor(private messageService: MessageService,
                private scheduleService: ScheduleService,
                private confirmationService: ConfirmationService,
                private service: ProfessorService) {
    }

    get viewDialogProf(): boolean {
        return this.service.viewDialogProf;
    }

    set viewDialogProf(value: boolean) {
        this.service.viewDialogProf = value;
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

    get itemsSession(): Array<EtudiantCours> {
        return this.service.itemsSession;
    }

    set itemsSession(value: Array<EtudiantCours>) {
        this.service.itemsSession = value;
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

    public findByCriteria() {
        return this.service.findByCriteria(this.prof).subscribe(data => this.items = data);
    }

    ngOnInit(): void {
        this.initCol();
        this.service.findAll().subscribe(data => this.items = data);
    }

    public FindSession(profSession1: Prof) {
        this.service.afficheSession(profSession1.id).subscribe(
            data => {
                // @ts-ignore
                this.items = data;
            });
    }

    public viewSession(sessionProf1: Prof) {
        this.service.afficheSession(sessionProf1.id).subscribe(
            data => {
                // @ts-ignore
                this.itemsSession = data;
            });
        this.viewDialogProf = true;
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
        this.editDialog = true;
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
    showScheduleDialog(prof: Prof) {
        this.scheduleProfs.splice(0, this.scheduleProfs.length);
        this.scheduleDialog = false;
        this.scheduleProfs.splice(0, this.scheduleProfs.length);
        const scheduleObj = this.scheduleObj;
        scheduleObj.eventSettings.dataSource = null;
        console.log(prof);
        this.scheduleService.findByProf(prof).subscribe(
            scheduleData => {
                console.log(this.scheduleProfs);
                for (const item1 of scheduleData) {
                    this.scheduleProfs.push({...item1});
                    this.eventSettings = {
                        dataSource: this.scheduleProfs,
                        fields: {
                            id: 'Id',
                            subject: {name: 'subject', title: 'subject'},
                            startTime: {name: 'startTime', title: 'startTime'},
                            endTime: {name: 'endTime', title: 'endTime'}
                        }
                    };
                }
                console.log(this.scheduleProfs);
            }
        );
        this.scheduleObj.eventWindow.refresh();
    }

    get scheduleProfs(): Array<ScheduleProf> {
        return this.scheduleService.scheduleProfs;
    }


    set scheduleProfs(value: Array<ScheduleProf>) {
        this.scheduleService.scheduleProfs = value;
    }

    hideDialog() {
        this.scheduleDialog = true;
        const scheduleObj = this.scheduleObj;
        scheduleObj.eventSettings.dataSource = null;
        this.scheduleObj.eventWindow.refresh();

    }

}
