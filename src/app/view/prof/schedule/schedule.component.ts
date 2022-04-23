import {Component, OnInit, ViewChild} from '@angular/core';
import {ScheduleService} from '../../../controller/service/schedule.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {EtatEtudiantSchedule} from '../../../controller/model/etat-etudiant-schedule.model';
import {CalendrierProf} from '../../../controller/model/schedule-prof.model';
import {CalendrierVo} from '../../../controller/model/calendrier-vo.model';
import {LoginService} from '../../../controller/service/login.service';
import {ScheduleProf} from '../../../controller/model/calendrier-prof.model';
import {L10n} from '@syncfusion/ej2-base';
import {
    EventSettingsModel,
    CurrentAction,
    ScheduleComponent,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    PopupOpenEventArgs, TimeScaleModel
} from '@syncfusion/ej2-angular-schedule';
import {Prof} from '../../../controller/model/prof.model';
import {GroupeEtudiantService} from '../../../controller/service/groupe-etudiant-service';
import {GroupeEtudiantDetail} from '../../../controller/model/groupe-etudiant-detail.model';
import {WebSocketService} from '../../../controller/service/web-socket.service';
import {Router} from '@angular/router';
import {SimulateSectionService} from '../../../controller/service/simulate-section.service';
import {Section} from '../../../controller/model/section.model';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import timezones from 'timezones-list';
import {TrancheHoraireProf} from '../../../controller/model/tranche-horaire-prof.model';
import {TrancheHoraireProfService} from '../../../controller/service/tranche-horaire-prof.service';
import {ProfessorService} from '../../../controller/service/professor.service';
import {SessionCoursService} from '../../../controller/service/session-cours.service';
import {MenuService} from '../../shared/slide-bar/app.menu.service';
import {Cours} from '../../../controller/model/cours.model';

L10n.load({
    'en-US': {
        schedule: {
            saveButton: '',
            cancelButton: 'Close',
            deleteButton: 'Delete',
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


    constructor(private scheduleService: ScheduleService,
                private messageService: MessageService,
                private trancheHoraireService: TrancheHoraireProfService,
                private service: ProfessorService,
                private sessionService: SessionCoursService,
                private parcoursService: ParcoursService,
                private confirmationService: ConfirmationService,
                private loginService: LoginService,
                private groupeEtudiantService: GroupeEtudiantService,
                private webSocketService: WebSocketService,
                private router: Router,
                private menuService: MenuService,
                private simulateSectionService: SimulateSectionService) {
    }

    get selectedSchedule(): ScheduleProf {
        return this.webSocketService.selectedSchedule;
    }

    set selectedSchedule(value: ScheduleProf) {
        this.webSocketService.selectedSchedule = value;
    }

    get showTpBar(): boolean {
        return this.menuService.showTpBar;
    }

    set showTpBar(value: boolean) {
        this.menuService.showTpBar = value;
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

    get createDialog(): boolean {
        return this.scheduleService.createDialog;
    }

    set createDialog(value: boolean) {
        this.scheduleService.createDialog = value;
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

    get submitted(): boolean {
        return this.scheduleService.submitted;
    }

    set submitted(value: boolean) {
        this.scheduleService.submitted = value;
    }

    get selectedsection(): Section {
        return this.parcoursService.selectedsection;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set selectedsection(value: Section) {
        this.parcoursService.selectedsection = value;
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

    showAddTranche: boolean;
    displayModal: boolean;
    trancheEdit: TrancheHoraireProf = new TrancheHoraireProf();
    public trancheHoraireProfs: Array<TrancheHoraireProf> = new Array<TrancheHoraireProf>();
    daysOptions = [
        {name: 'Select a day', value: -1},
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


    private prof: Prof = new Prof();
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    display = false;
    private selectionTarget: Element;

    public timeScale: TimeScaleModel = {interval: 60, slotCount: 1};
    public selectedDate: Date = new Date();
    public showWeekend = true;
    public groupeEtudiantDetails = new Array<GroupeEtudiantDetail>();
    public sessionHasStarted = false;
    public eventSettings: EventSettingsModel = {
        dataSource: this.scheduleProfs,
        fields: {
            id: 'Id',
            subject: {name: 'subject', title: 'subject'},
            startTime: {name: 'startTime', title: 'startTime'},
            endTime: {name: 'endTime', title: 'endTime'}
        }
    };

    @ViewChild('timezoneDropdown') public timezoneDropdownObj: DropDownListComponent;
    public dropDownValue = 'Africa/Casablanca';
    public fields: Record<string, any> = {text: 'label', value: 'tzCode'};
    public timezoneData: Record<string, any>[] = timezones;

    public schedule: ScheduleProf = new ScheduleProf();
    displayDeleteDialog: boolean;
    deletedTranche: TrancheHoraireProf = new TrancheHoraireProf();

    showBasicDialog() {
        this.displayBasic = true;
    }

    public openCreate() {
        this.submitted = false;
        this.createDialog = true;
    }

    public hideCreateDialog() {
        this.createDialog = false;
        this.submitted = false;
    }

    public getProf() {
        this.scheduleService.getProf().subscribe(data => this.professors = data);
    }


    ngOnInit() {
        this.prof = this.loginService.getConnectedProf();
        console.log(this.prof);
        this.findByProf();
        // this.scheduleService.getAllStudentsGroup().subscribe(data => this.students = data);
        this.scheduleService.getProf().subscribe(data => this.professors = data);
        this.scheduleService.findEtat().subscribe(data => this.scheduleService.etatEtudiantSchedule = data);
        console.log(this.scheduleProfs);
        this.showTranche();
    }

    findByProf() {
        this.scheduleService.findByProf(this.prof).subscribe(
            data => {
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
            }, error => {
                console.log(error);
            }
        );
    }

    save() {
        this.scheduleProf.prof = this.prof;
        const scheduleObj = this.scheduleObj;
        scheduleObj.eventSettings.dataSource = null;
        console.log(scheduleObj.eventSettings.dataSource);
        if (this.scheduleProf.id === 0 || this.scheduleProf.id === null) {
            this.scheduleService.saveByProf().subscribe
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
            console.log(this.scheduleProfs);

            this.scheduleService.saveByProf().subscribe(
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


        this.scheduleProf = new ScheduleProf();
        this.scheduleObj.eventWindow.refresh();

    }


    public onPopupOpen(args: PopupOpenEventArgs): void {
        this.selectedSchedule.subject = args.data.subject;
        this.selectedSchedule.startTime = args.data.startTime;
        this.selectedSchedule.endTime = args.data.endTime;
        this.selectedSchedule.cours = args.data.cours;
        this.scheduleProf.startTime = args.data.startTime;
        this.scheduleProf.endTime = args.data.endTime;
        this.selectionTarget = null;
        this.selectionTarget = args.target;
        this.selectedSchedule.groupeEtudiant = args.data.groupeEtudiant;
        console.log(args.data);
    }

    public onDetailsClick(event: any): void {
        this.scheduleProf = new ScheduleProf();
        const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
        this.scheduleObj.openEditor(data, 'Add');
    }

    public onEditClick(): void {
        const scheduleProf = this.scheduleObj.getEventDetails(this.selectionTarget) as ScheduleProf;
        this.scheduleService.update(scheduleProf);
        this.scheduleObj.openEditor(scheduleProf, 'EditFollowingEvents');
    }


    public onDeleteClick(): void {
        const scheduleObj = this.scheduleObj;
        this.scheduleObj.eventSettings.dataSource = null;
        const scheduleProf = this.scheduleObj.getEventDetails(this.selectionTarget) as ScheduleProf;
        this.scheduleService.deleteByRef(scheduleProf.ref);
        for (let i = 0; i < this.scheduleProfs.length; i++) {
            if (this.scheduleProfs[i].id === scheduleProf.id) {
                this.scheduleProfs.splice(i, 1);
            }
        }
        scheduleObj.eventSettings.dataSource = this.scheduleProfs;
        console.log(scheduleObj.eventSettings.dataSource);
        this.hideDialog();
    }

    findByCriteriaStudent() {
        const scheduleObj = this.scheduleObj;
        scheduleObj.eventSettings.dataSource = null;
        this.scheduleService.findByCriteriaStudent(this.schedule).subscribe(
            data => {
                console.log(data);
                this.eventSettings = {
                    dataSource: data,
                    fields: {
                        id: 'Id',
                        subject: {name: 'subject', title: 'subject'},
                        startTime: {name: 'startTime', title: 'startTime'},
                        endTime: {name: 'endTime', title: 'endTime'}
                    }
                };
            }, error => {
                console.log(error);
            }
        );
    }

    public onCloseClick(): void {
        this.scheduleObj.closeEditor();
    }

    public getData() {
        this.scheduleObj.eventSettings.dataSource = null;
        this.findByProf();
    }


    showDialog() {
        this.display = true;
    }

    hideDialog() {
        this.display = false;
    }


    onAddClick($event: MouseEvent) {
    }

    public findAllGroupeEtudiantDetail(id: number) {
        this.groupeEtudiantService.findAllGroupeEtudiantDetail(id).subscribe(
            data => {
                this.groupeEtudiantDetails = data;
                for (let i = 0; i < this.groupeEtudiantDetails.length; i++) {
                    this.webSocketService.connectedUsers.push(this.groupeEtudiantDetails[i].etudiant);
                }
                console.log(this.webSocketService.connectedUsers);
            }
        );
    }

    set selectedcours(value: Cours) {
        this.parcoursService.selectedcours = value;
    }
    set selectedSession(value: ScheduleProf) {
        this.webSocketService.selectedSession = value;
    }

    startSession() {
        this.selectedSession = this.selectedSchedule;
        this.webSocketService.isInSession = true;
        this.showTpBar = false;
        console.log(this.selectedSchedule.groupeEtudiant.id);
        this.webSocketService.sessionHasStarted = true;
        this.findAllGroupeEtudiantDetail(this.selectedSchedule.groupeEtudiant.id);
        console.log(this.selectedSchedule);
        this.selectedcours = this.selectedSchedule.cours;
        this.simulateSectionService.findSectionOneByCoursId(this.selectedSchedule.cours);
        this.parcoursService.afficheOneSectionByProf(this.selectedSchedule.cours).subscribe(
            dataSection => {
                this.webSocketService.saveCurrentSection(this.prof.id, dataSection);

            }
        );
        console.log(this.selectedsection);
        this.webSocketService.openWebSocket(this.prof, this.prof, this.selectedSchedule.groupeEtudiant, 'PROF');
        this.sessionService._idgroup = this.selectedSchedule.groupeEtudiant.id;
        this.router.navigate(['prof/sections-simulate']);
    }

    onActionComplete() {
        this.scheduleObj.workHours.start = '00:00';
        this.scheduleObj.workHours.end = '23:59';
        this.scheduleObj.workHours.highlight = true;
    }

    public onTimezoneDropDownChange(args: any): void {
        this.scheduleObj.timezone = this.timezoneDropdownObj.value.toString();
    }

    addNewTranche() {
        this.trancheEdit = new TrancheHoraireProf();
        this.displayModal = true;
    }

    getDay(day: number): string {
        for (const item of this.daysOptions) {
            if (item.value === day) {
                return item.name;
            }
        }
    }

    editTranche(tranche: TrancheHoraireProf) {
        this.trancheEdit = new TrancheHoraireProf();
        this.showModalDialog();
        console.log(tranche);
        this.trancheEdit = tranche;
    }

    deleteTranche() {
        const index = this.trancheHoraireProfs.indexOf(this.deletedTranche);
        this.trancheHoraireProfs.splice(index, 1);
        this.trancheHoraireService.deleteTrancheById(this.deletedTranche.id);
        this.displayDeleteDialog = false;
    }

    showModalDialog() {
        this.displayModal = true;
    }

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

    showTranche() {
        this.trancheHoraireService.findTrancheHoraireByProfId(this.loginService.prof).subscribe(
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
        this.trancheEdit.prof = this.prof;
        console.log(this.selectedDay);
        if (this.trancheEdit.id === 0) {
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

    hideTrancheDialog() {
        this.displayModal = false;
        this.trancheEdit = new TrancheHoraireProf();
    }

    displayDeleteDialogFct(e: TrancheHoraireProf) {
        this.displayDeleteDialog = true;
        console.log(e);
        this.deletedTranche = e;
    }
}
