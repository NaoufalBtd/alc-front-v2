import {Component, OnInit, ViewChild} from '@angular/core';
import {ProfessorService} from '../../../../controller/service/professor.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Prof} from '../../../../controller/model/prof.model';
import {EtudiantCours} from '../../../../controller/model/etudiant-cours.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {ScheduleProf} from '../../../../controller/model/calendrier-prof.model';
import {
    ActionEventArgs,
    EventSettingsModel, GroupModel,
    PopupOpenEventArgs, RenderCellEventArgs,
    ResourceDetails,
    ScheduleComponent,
    TimeScaleModel, View
} from '@syncfusion/ej2-angular-schedule';
import {DropDownList} from '@syncfusion/ej2-dropdowns';
import {DateTimePicker} from '@syncfusion/ej2-calendars';
import {ScheduleService} from '../../../../controller/service/schedule.service';
import {Islamic, TimePickerComponent} from '@syncfusion/ej2-angular-calendars';
import {addClass, Internationalization} from '@syncfusion/ej2-base';
import {TrancheHoraireProfService} from '../../../../controller/service/tranche-horaire-prof.service';
import {TrancheHoraireProf} from '../../../../controller/model/tranche-horaire-prof.model';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import timezones from 'timezones-list';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {EtatEtudiantSchedule} from '../../../../controller/model/etat-etudiant-schedule.model';
import {Cours} from '../../../../controller/model/cours.model';
import {ParcoursService} from '../../../../controller/service/parcours.service';


@Component({
    selector: 'app-professeur-list',
    templateUrl: './professeur-list.component.html',
    styleUrls: ['./professeur-list.component.scss']
})
export class ProfesseurListComponent implements OnInit {
    public profs: Array<Prof> = new Array<Prof>();
    @ViewChild('timezoneDropdown') public timezoneDropdownObj: DropDownListComponent;
    public dropDownValue = 'Africa/Casablanca';
    public fields: Record<string, any> = {text: 'label', value: 'tzCode'};
    public timezoneData: Record<string, any>[] = timezones;
    public profsDataSource: Record<string, any> = this.profs;
    public group: GroupModel = {enableCompactView: false, resources: ['profs']};

    constructor(private messageService: MessageService,
                private parcourService: ParcoursService,
                private trancheHoraireProfService: TrancheHoraireProfService,
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

    get scheduleProfs(): Array<ScheduleProf> {
        return this.scheduleService.scheduleProfs;
    }


    set scheduleProfs(value: Array<ScheduleProf>) {
        this.scheduleService.scheduleProfs = value;
    }


    get trancheHoraireProfList(): Array<TrancheHoraireProf> {
        return this.trancheHoraireProfService.trancheHoraireProfList;
    }

    set trancheHoraireProfList(value: Array<TrancheHoraireProf>) {
        this.trancheHoraireProfService.trancheHoraireProfList = value;
    }

    cols: any[];
    public timeScale: TimeScaleModel = {interval: 60, slotCount: 1};
    prof: Prof = new Prof();
    scheduleDialog = true;
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    @ViewChild('startTime') public startTimeObj: TimePickerComponent;
    @ViewChild('endTime') public endTimeObj: TimePickerComponent;
    public instance: Internationalization = new Internationalization();
    endDate: Date = new Date();
    display = false;
    private selectionTarget: Element;
    // public selectedDate: Date = new Date(2021, 4, 18);
    public selectedDate: Date = new Date();
    public showWeekend = false;
    public eventSettings: EventSettingsModel = {
        dataSource: this.scheduleProfs,
        fields: {
            id: 'Id',
            subject: {name: 'subject', title: 'subject'},
            startTime: {name: 'startTime', title: 'startTime'},
            endTime: {name: 'endTime', title: 'endTime'}
        }
    };
    public data: ScheduleProf = new ScheduleProf();
    public currentView: View = 'Day';

    public islayoutChanged: boolean = false;

    public findByCriteria() {
        return this.service.findByCriteria(this.prof).subscribe(data => this.items = data);
    }

    ngOnInit(): void {
        this.initCol();
        this.service.findAll().subscribe(data => this.items = data);
        this.findAll();
        this.selectedDate = new Date();
        this.scheduleService.getAllStudentsGroup().subscribe(data => this.groupeStudent = data);
        this.scheduleService.getProf().subscribe(data => {
            this.professors = data;
            this.profsDataSource = this.professors;
        });
        this.scheduleService.findEtat().subscribe(data => this.scheduleService.etatEtudiantSchedule = data);
        console.log(this.scheduleProfs);
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
        this.selected = prof;
        this.profs = new Array<Prof>();
        this.scheduleProfs.splice(0, this.scheduleProfs.length);
        this.scheduleDialog = false;
        this.scheduleProfs.splice(0, this.scheduleProfs.length);
        const scheduleObj = this.scheduleObj;
        scheduleObj.eventSettings.dataSource = null;
        this.scheduleProf.prof = prof;
        console.log(prof);
        this.trancheHoraireProfService.findTrancheHoraireByProfId(prof).subscribe(
            data => {
                this.trancheHoraireProfList = data;
                console.log(data);
                this.onDataBound(data);
            }, err => {
                console.log(err);
            }
        );

        this.scheduleService.findByProf(prof).subscribe(
            scheduleData => {
                console.log(this.scheduleProfs);
                for (const item1 of scheduleData) {
                    this.scheduleProfs.push({...item1});
                }
                console.log(this.scheduleProfs);
                this.eventSettings = {
                    dataSource: this.scheduleProfs,
                    fields: {
                        id: 'id',
                        subject: {name: 'subject', title: 'subject'},
                        startTime: {name: 'startTime', title: 'startTime'},
                        endTime: {name: 'endTime', title: 'endTime'}
                    }
                };
                this.profs.push({...prof});
                console.log(this.profs);
                this.profsDataSource = this.profs;

            }
        );
        this.groupeStudent = this.groupeStudent.filter(e => e.prof.id === prof.id);
        this.scheduleObj.eventWindow.refresh();
    }

    hideDialog() {
        this.scheduleDialog = true;
        const scheduleObj = this.scheduleObj;
        scheduleObj.eventSettings.dataSource = null;
        this.scheduleObj.eventWindow.refresh();
        this.scheduleService.getAllStudentsGroup().subscribe(data => this.groupeStudent = data);
    }

    hideDeleteDialog() {
        this.display = false;
    }


    isValidateTime(startDate: Date, endDate: Date, resIndex: number): boolean {
        let resource: ResourceDetails = this.scheduleObj.getResourcesByIndex(resIndex);
        let startHour: number = parseInt(
            resource.resourceData.startHour.toString().slice(0, 2),
            10
        );
        let endHour: number = parseInt(
            resource.resourceData.endHour.toString().slice(0, 2),
            10
        );
        return startHour <= startDate.getHours() && endHour >= endDate.getHours();
    }

    onPopupOpen(args: PopupOpenEventArgs): void {
        console.log(this.scheduleObj.eventSettings.dataSource);
        console.log(this.scheduleProfs);
        this.data.subject = args.data.subject;
        this.data.startTime = args.data.startTime;
        this.data.endTime = args.data.endTime;
        this.scheduleProf.startTime = args.data.startTime;
        this.scheduleProf.endTime = args.data.endTime;
        this.scheduleProf.grpName = args.data?.groupeEtudiant?.libelle;
        this.scheduleProf.profName = args.data?.prof?.nom;
        this.scheduleProf.subject = args.data.subject;
        this.scheduleProf.prof = args.data.prof;
        this.scheduleProf.id = args.data.id;
        console.log(this.scheduleProf.id);
        this.scheduleProf.groupeEtudiant = args.data.groupeEtudiant;
        this.grpEtudiant = this.scheduleProf.groupeEtudiant;
        this.selectionTarget = null;
        this.selectionTarget = args.target;
    }

    onDataBound(trancheHoraireProfList: Array<TrancheHoraireProf>): void {
        this.scheduleObj.eventSettings.dataSource = this.scheduleProfs;
        this.eventSettings = {
            dataSource: this.scheduleProfs,
            fields: {
                id: 'id',
                subject: {name: 'subject', title: 'subject'},
                startTime: {name: 'startTime', title: 'startTime'},
                endTime: {name: 'endTime', title: 'endTime'}
            }
        };
        this.scheduleObj.resetWorkHours();
        if (this.islayoutChanged) {
            const dates = this.scheduleObj.activeView.getRenderDates();
            for (const tranche of trancheHoraireProfList) {
                for (const date of dates) {
                    if (tranche.day === date.getDay()) {
                        this.scheduleObj.setWorkHours(
                            [date],
                            tranche.startHour,
                            tranche.endHour,
                            tranche.groupIndex
                        );
                    }
                }
            }
        }
    }


    onActionComplete(args: ActionEventArgs): void {
        if (
            args.requestType === 'toolBarItemRendered' ||
            args.requestType === 'dateNavigate' ||
            args.requestType === 'viewNavigate'
        ) {
            this.islayoutChanged = true;
            this.onDataBound(this.trancheHoraireProfList);
        }
        this.scheduleObj.eventSettings.dataSource = null;
        this.scheduleObj.eventSettings.dataSource = this.scheduleProfs;
        console.log(this.scheduleObj.eventSettings.dataSource);
    }

    onRenderCell(args: RenderCellEventArgs): void {
        if (
            args.element?.classList?.contains('e-work-hours') ||
            args.element?.classList?.contains('e-work-cells')
        ) {
            addClass(
                [args.element], 'willsmith'[
                    parseInt(args.element.getAttribute('data-group-index'), 10)
                    ]
            );
        }
    }


    public onTimezoneDropDownChange(args: any): void {
        this.scheduleObj.timezone = this.timezoneDropdownObj.value.toString();
    }

    public onCloseClick(): void {
        this.scheduleObj.quickPopup.quickPopupHide(true);
    }

    save() {
        console.log(this.selected);
        this.scheduleProf.prof = this.scheduleProf.groupeEtudiant.prof;
        const fixedRef = this.scheduleProf.ref;
        const startedDate = this.scheduleProf.startTime;
        const endedDate = this.scheduleProf.endTime;
        const scheduleObj = this.scheduleObj;
        scheduleObj.eventSettings.dataSource = null;
        this.scheduleProf.subject = this.scheduleProf.cours.libelle;
        this.scheduleProf.grpName = this.scheduleProf.groupeEtudiant.libelle;
        this.scheduleProf.profName = this.scheduleProf.prof.nom;
        console.log(this.scheduleProf);
        if (this.optionSelected.option === 'Daily') {
            while (this.scheduleProf.startTime < this.endDate) {
                this.saveSchedule(scheduleObj);
                this.scheduleProf.startTime.setDate(startedDate.getDate() + this.repeatNumber);
                this.scheduleProf.endTime.setDate(endedDate.getDate() + this.repeatNumber);
            }
        } else if (this.optionSelected.option === 'Weekly') {
            let firstSubject = this.scheduleProf.subject;
            console.log(this.selectedDays);
            while (this.scheduleProf.startTime < this.endDate) {
                for (const day of this.selectedDays) {
                    if (this.scheduleProf.startTime.getDay() === day) {
                        console.log(this.scheduleProf.startTime.getDay());
                        console.log(this.scheduleProf.startTime.getDate());
                        this.scheduleProf.ref = fixedRef + String(this.scheduleProf.startTime.getDay());
                        console.log(this.courses);
                        for (let i = 0; i < this.courses.length; i++) {
                            if (this.scheduleProf.cours.libelle === this.courses[i].libelle) {
                                if (this.scheduleProf.subject === firstSubject) {
                                    firstSubject = null;
                                    break;
                                } else {
                                    console.log(this.courses[i]);
                                    console.log(this.courses[i + 1]);
                                    this.scheduleProf.cours = this.courses[i + 1];
                                    this.scheduleProf.subject = this.scheduleProf.cours.libelle;
                                    break;
                                }
                            }
                        }
                        this.saveSchedule(scheduleObj);
                    }
                }
                this.scheduleProf.startTime.setDate(startedDate.getDate() + 1);
                this.scheduleProf.endTime.setDate(endedDate.getDate() + 1);
            }


        } else {
            this.saveSchedule(scheduleObj);
        }
        this.scheduleProf = new ScheduleProf();
        this.scheduleObj.eventWindow.refresh();
        this.optionSelected = 'Never';
    }


    get scheduleProf(): ScheduleProf {
        return this.scheduleService.scheduleProf;
    }

    set scheduleProf(value: ScheduleProf) {
        this.scheduleService.scheduleProf = value;
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


    get students(): Array<Etudiant> {
        return this.scheduleService.students;
    }

    set students(value: Array<Etudiant>) {
        this.scheduleService.students = value;
    }

    get etatEtudiantSchedule(): Array<EtatEtudiantSchedule> {
        return this.scheduleService.etatEtudiantSchedule;
    }

    optionSelected: any = [
        {option: 'Never'},
    ];
    repeatNumber = 1;
    grpEtudiant: GroupeEtudiant = new GroupeEtudiant();
    selectedDays: any;
    deleteOption = false;
    daysOptions = [
        {name: 'Sun', value: 0},
        {name: 'Mon', value: 1},
        {name: 'Tue', value: 2},
        {name: 'Wed', value: 3},
        {name: 'Thu', value: 4},
        {name: 'Fri', value: 5},
        {name: 'Sat', value: 6},
    ];
    groupeStudent: Array<GroupeEtudiant> = new Array<GroupeEtudiant>();
    courses: Array<Cours> = new Array<Cours>();
    repeats = [
        {option: 'Never'},
        {option: 'Daily'},
        {option: 'Weekly'},
    ];


    private saveSchedule(scheduleObj: any) {
        if (this.scheduleProf.id === 0 || this.scheduleProf.id === null) {
            this.scheduleService.save().subscribe
            (
                data => {
                    if (data === null) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Warning',
                            detail: 'Registration canceled, please try again.',
                            life: 3000
                        });
                    } else {
                        this.scheduleProfs.push({...data});
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Schedule added.',
                            life: 3000
                        });
                        console.log(this.scheduleProfs);
                        scheduleObj.eventSettings.dataSource = this.scheduleProfs;
                        console.log(scheduleObj.eventSettings.dataSource);
                    }

                }, error => {
                    console.log(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Warning',
                        detail: 'Registration canceled',
                        life: 3000
                    });
                    scheduleObj.eventSettings.dataSource = this.scheduleProfs;
                }
            );
        } else {
            console.log(this.scheduleProf);
            this.scheduleService.save().subscribe(
                data => {
                    for (let i = 0; i < this.scheduleProfs.length; i++) {
                        if (this.scheduleProfs[i].id === data.id) {
                            console.log(data);
                            // this.scheduleProfs.splice(i, 1);
                            this.scheduleProfs[i] = data;
                        }
                    }
                }
            );
            console.log(this.scheduleProfs);
            scheduleObj.eventSettings.dataSource = this.scheduleProfs;
            console.log(scheduleObj.eventSettings.dataSource);
            this.scheduleObj.eventWindow.refresh();

        }
    }


    public onEditClick(): void {
        const scheduleProf = this.scheduleObj.getEventDetails(this.selectionTarget) as ScheduleProf;
        this.scheduleService.update(scheduleProf);
        this.scheduleProf = scheduleProf;
        console.log(this.scheduleProf);
        this.scheduleObj.openEditor(scheduleProf, 'Add');
    }


    public onDeleteClick(): void {
        const scheduleObj = this.scheduleObj;
        this.scheduleObj.eventSettings.dataSource = null;
        const scheduleProf = this.scheduleObj.getEventDetails(this.selectionTarget) as ScheduleProf;
        console.log(scheduleProf);
        if (this.deleteOption === false) {
            this.scheduleService.deleteScheduleProfById(scheduleProf).subscribe(
                data => {
                }, error => {
                    console.log(error);
                }
            );
            for (let i = 0; i < this.scheduleProfs.length; i++) {
                if (this.scheduleProfs[i].id === scheduleProf.id) {
                    this.scheduleProfs.splice(i, 1);
                }
            }
        } else {
            this.scheduleService.deleteByRef(scheduleProf.ref);
            for (let i = 0; i < this.scheduleProfs.length; i++) {
                if (this.scheduleProfs[i].ref === scheduleProf.ref) {
                    this.scheduleProfs.splice(i, 1);
                }
            }
        }
        scheduleObj.eventSettings.dataSource = this.scheduleProfs;
        console.log(scheduleObj.eventSettings.dataSource);
        this.hideDialog();
        this.scheduleObj.eventWindow.refresh();
        this.deleteOption = false;
    }

    showDialog() {
        this.display = true;
    }

    public onDetailsClick(event: any): void {
        this.scheduleProf = new ScheduleProf();
        this.scheduleProf.prof = this.selected;
        console.log(this.scheduleProf.prof);
        const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
        this.scheduleObj.openEditor(data, 'Add');
    }

    public getProf() {
        this.scheduleService.getProf().subscribe(data => this.professors = data);
    }

    getCourses(groupeEtudiant: GroupeEtudiant) {
        this.parcourService.FindCoursByParcours(groupeEtudiant.parcours.id).subscribe(data => this.courses = data);
        console.log(this.scheduleProf.prof);
    }

    findAll() {
        this.getProf();
        this.scheduleService.findAll().subscribe(data => {
                this.scheduleProfs = data;
                this.eventSettings = {
                    dataSource: this.scheduleProfs,
                    fields: {
                        id: 'Id',
                        subject: {name: 'subject', title: 'subject'},
                        startTime: {name: 'startTime', title: 'startTime'},
                        endTime: {name: 'endTime', title: 'endTime'}
                    }
                };
                console.log(this.scheduleProfs);
            }, error => {
                console.log(error);
            }
        );
    }
}
