import {Component, OnInit, ViewChild} from '@angular/core';

import {FullCalendar} from 'primeng/fullcalendar';
import {ScheduleService} from '../../../controller/service/schedule.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {EtatEtudiantSchedule} from '../../../controller/model/etat-etudiant-schedule.model';
import {CalendrierProf} from '../../../controller/model/schedule-prof.model';
import {CalendrierVo} from '../../../controller/model/calendrier-vo.model';
import {LoginService} from '../../../controller/service/login.service';
import {DataManager, UrlAdaptor} from '@syncfusion/ej2-data';
import {ScheduleProf} from '../../../controller/model/calendrier-prof.model';
import {ScheduleTemplateVO} from '../../../controller/vo/schedule-template-vo.model';
import {L10n} from '@syncfusion/ej2-base';
import {
    EventSettingsModel,
    CurrentAction,
    ScheduleComponent,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    PopupOpenEventArgs
} from '@syncfusion/ej2-angular-schedule';
import {Prof} from '../../../controller/model/prof.model';
import {isNullOrUndefined} from 'util';

L10n.load({
    'en-US': {
        schedule: {
            saveButton: '',
            cancelButton: '',
            deleteButton: '',
            newEvent: 'Add event',
        },
    }
});

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
    providers: [MessageService, ConfirmationService]

})
export class ScheduleLocalComponent implements OnInit {
    dataSource: Array<ScheduleTemplateVO> = new Array<ScheduleTemplateVO>();
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public eventSettings: EventSettingsModel = {};
    private selectionTarget: Element;
    // public selectedDate: Date = new Date(2021, 4, 18);
    public selectedDate: Date = new Date();
    public showWeekend = false;

    constructor(private scheduleService: ScheduleService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private user: LoginService) {
    }


    get scheduleProfs(): Array<ScheduleProf> {
        return this.scheduleService.scheduleProfs;
    }

    set scheduleProfs(value: Array<ScheduleProf>) {
        this.scheduleService.scheduleProfs = value;
    }

    get scheduleProf(): ScheduleProf {
        return this.scheduleService.scheduleProf;
    }

    get professors(): Array<Prof> {

        return this.scheduleService.professors;
    }

    set professors(value: Array<Prof>) {
        this.scheduleService.professors = value;
    }

    get displayBasic(): boolean {
        return this.scheduleService.displayBasic;
    }

    set displayBasic(value: boolean) {
        this.scheduleService.displayBasic = value;
    }

    showBasicDialog() {
        this.displayBasic = true;
    }

    get createDialog(): boolean {
        return this.scheduleService.createDialog;
    }

    set createDialog(value: boolean) {
        this.scheduleService.createDialog = value;
    }

    public openCreate() {
        this.submitted = false;
        this.createDialog = true;
    }

    public hideCreateDialog() {
        this.createDialog = false;
        this.submitted = false;
    }

    get students(): Array<Etudiant> {
        return this.scheduleService.students;
    }

    set students(value: Array<Etudiant>) {
        this.scheduleService.students = value;
    }

    public getProf() {
        this.scheduleService.getProf().subscribe(data => this.professors = data);
    }

    get etatEtudiantSchedule(): Array<EtatEtudiantSchedule> {
        return this.scheduleService.etatEtudiantSchedule;
    }

    get submitted(): boolean {
        return this.scheduleService.submitted;
    }

    set submitted(value: boolean) {
        this.scheduleService.submitted = value;
    }


    ngOnInit() {
        this.scheduleService.findAll().subscribe(data => this.scheduleProfs = data);
        this.getData();
        this.scheduleService.getAllStudents().subscribe(data => this.students = data);
        this.scheduleService.getProf().subscribe(data => this.professors = data);
        this.scheduleService.findEtat().subscribe(data => this.scheduleService.etatEtudiantSchedule = data);

    }


    save() {
        alert('clicked');
        console.log(this.scheduleProf);
        this.scheduleService.save();
        this.scheduleService.findAll().subscribe(data => this.scheduleProfs = data);
        window.location.reload();
        this.getData();
    }

    getData() {
        this.dataSource = new Array<ScheduleTemplateVO>();
        for (const item of this.scheduleProfs) {
            const schedule: ScheduleTemplateVO = new ScheduleTemplateVO();
            schedule.Id = item.id;
            schedule.Subject = item.ref;
            schedule.StartTime = item.dateDebut;
            schedule.EndTime = item.dateFin;
            this.dataSource.push(schedule);
        }
    }


    public onPopupOpen(args: PopupOpenEventArgs): void {
        this.selectionTarget = null;
        this.selectionTarget = args.target;
    }

    public onDetailsClick(): void {
        this.onCloseClick();
        const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
        this.scheduleObj.openEditor(data, 'Add');
    }

    public onAddClick(): void {
        this.onCloseClick();
        const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
        const eventData: { [key: string]: Object } = this.scheduleObj.eventWindow.getObjectFromFormData('e-quick-popup-wrapper');
        this.scheduleObj.eventWindow.convertToEventData(data as { [key: string]: Object }, eventData);
        eventData.Id = this.scheduleObj.eventBase.getEventMaxID() as number + 1;
        this.scheduleObj.addEvent(eventData);
    }

    public onEditClick(args: any): void {
        if (this.selectionTarget) {
            let eventData: { [key: string]: Object } = this.scheduleObj.getEventDetails(this.selectionTarget) as { [key: string]: Object };
            let currentAction: CurrentAction = 'Save';
            if (!isNullOrUndefined(eventData.RecurrenceRule) && eventData.RecurrenceRule !== '') {
                if (args.target.classList.contains('e-edit-series')) {
                    currentAction = 'EditSeries';
                    eventData = this.scheduleObj.eventBase.getParentEvent(eventData, true);
                } else {
                    currentAction = 'EditOccurrence';
                }
            }
            this.scheduleObj.openEditor(eventData, currentAction);
        }
    }

    public onDeleteClick(args: any): void {
        this.onCloseClick();
        if (this.selectionTarget) {
            const eventData: { [key: string]: Object } = this.scheduleObj.getEventDetails(this.selectionTarget) as { [key: string]: Object };
            let currentAction: CurrentAction;
            if (!isNullOrUndefined(eventData.RecurrenceRule) && eventData.RecurrenceRule !== '') {
                currentAction = args.target.classList.contains('e-delete-series') ? 'DeleteSeries' : 'DeleteOccurrence';
            }
            this.scheduleObj.deleteEvent(eventData, currentAction);
        }
    }

    public onCloseClick(): void {
        this.scheduleObj?.closeEditor();
    }
}
