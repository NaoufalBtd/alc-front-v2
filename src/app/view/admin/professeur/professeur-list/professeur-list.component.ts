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
import {ScheduleService} from '../../../../controller/service/schedule.service';
import {Islamic, TimePickerComponent} from '@syncfusion/ej2-angular-calendars';
import {addClass, Internationalization} from '@syncfusion/ej2-base';
import {TrancheHoraireProfService} from '../../../../controller/service/tranche-horaire-prof.service';
import {TrancheHoraireProf} from '../../../../controller/model/tranche-horaire-prof.model';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import timezones from 'timezones-list';


@Component({
    selector: 'app-professeur-list',
    templateUrl: './professeur-list.component.html',
    styleUrls: ['./professeur-list.component.scss']
})
export class ProfesseurListComponent implements OnInit {

    @ViewChild('timezoneDropdown') public timezoneDropdownObj: DropDownListComponent;
    public dropDownValue = 'Africa/Casablanca';
    public fields: Record<string, any> = {text: 'label', value: 'tzCode'};
    public timezoneData: Record<string, any>[] = timezones;


    constructor(private messageService: MessageService,
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
    public eventSettings: EventSettingsModel;

    public currentView: View = 'Week';
    public allowDragDrop: boolean = false;
    public resourceDataSource: Object[] = [
        {
            text: this.scheduleProfs[0]?.prof?.nom,
            id: 0,
            color: '#ea7a57',
            startHour: '08:00',
            endHour: '15:00',
        }
    ];
    public group: GroupModel = {byDate: true, resources: ['Profs']};
    // public eventSettings: EventSettingsModel = {
    //     dataSource: this.scheduleProfs,
    //     fields: {
    //         id: 'id',
    //         subject: {name: 'subject', title: 'subject'},
    //         startTime: {name: 'startTime', title: 'startTime'},
    //         endTime: {name: 'endTime', title: 'endTime'}
    //     }
    // };


    public islayoutChanged: boolean = false;

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

    hideDialog() {
        this.scheduleDialog = true;
        const scheduleObj = this.scheduleObj;
        scheduleObj.eventSettings.dataSource = null;
        this.scheduleObj.eventWindow.refresh();

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
        if (args.target && args.target.classList.contains('e-work-cells')) {
            args.cancel = !args.target.classList.contains('e-work-hours');
        }
    }

    onDataBound(trancheHoraireProfList: Array<TrancheHoraireProf>): void {
        console.log('==================== list tranche Horraire=============================');
        console.log(trancheHoraireProfList);
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
    }

    onRenderCell(args: RenderCellEventArgs): void {
        if (
            args.element.classList.contains('e-work-hours') ||
            args.element.classList.contains('e-work-cells')
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

}
