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
    public currentDate: Date = new Date();
    private prof: Prof = new Prof();
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    display = false;
    private selectionTarget: Element;
    public data: ScheduleProf = new ScheduleProf();
    public timeScale: TimeScaleModel = { interval: 60, slotCount: 1 };
    public selectedDate: Date = new Date();
    public showWeekend = true;
    public groupeEtudiantDetails  = new Array<GroupeEtudiantDetail>();
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


    constructor(private scheduleService: ScheduleService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private loginService: LoginService,
                private groupeEtudiantService: GroupeEtudiantService, private webSocketService: WebSocketService,
                private router: Router, private simulateSectionService: SimulateSectionService) {
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
        this.prof = this.loginService.getConnectedProf();
        console.log(this.prof);
        this.findByProf();
        // this.scheduleService.getAllStudentsGroup().subscribe(data => this.students = data);
        this.scheduleService.getProf().subscribe(data => this.professors = data);
        this.scheduleService.findEtat().subscribe(data => this.scheduleService.etatEtudiantSchedule = data);
        console.log(this.scheduleProfs);
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
        console.log(scheduleObj.eventSettings.dataSource );
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
                        console.log(scheduleObj.eventSettings.dataSource );
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
        this.data.subject = args.data.subject;
        this.data.startTime = args.data.startTime;
        this.data.endTime = args.data.endTime;
        this.data.cours = args.data.cours;
        this.scheduleProf.startTime = args.data.startTime;
        this.scheduleProf.endTime = args.data.endTime;
        this.selectionTarget = null;
        this.selectionTarget = args.target;
        this.data.groupeEtudiant = args.data.groupeEtudiant;
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
        for (let i = 0; i < this.scheduleProfs.length; i++){
            if (this.scheduleProfs[i].id === scheduleProf.id){
                this.scheduleProfs.splice(i, 1);
            }
        }
        scheduleObj.eventSettings.dataSource = this.scheduleProfs;
        console.log(scheduleObj.eventSettings.dataSource);
        this.hideDialog();
    }
    public schedule: ScheduleProf = new ScheduleProf();
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

    public findAllGroupeEtudiantDetail(id: number){
        this.groupeEtudiantService.findAllGroupeEtudiantDetail(id).subscribe(
            data => {
                this.groupeEtudiantDetails = data ;
                for (let i = 0 ; i < this.groupeEtudiantDetails.length; i++){
                    this.webSocketService.connectedUsers.push(this.groupeEtudiantDetails[i].etudiant);
                }
                console.log(this.webSocketService.connectedUsers);
            }
        );
    }

    startSession() {
        console.log(this.data.groupeEtudiant.id);
        this.webSocketService.sessionHasStarted = true;
        this.findAllGroupeEtudiantDetail(this.data.groupeEtudiant.id);
        console.log(this.data.cours);
        this.simulateSectionService.findSectionOneByOne(this.data.cours);
        this.webSocketService.openWebSocket(this.prof);
        this.webSocketService.saveCurrentSection(this.prof.id, this.simulateSectionService.selectedsection);
        this.router.navigate(['prof/sections-simulate']);
    }
}
