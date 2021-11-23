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
    PopupOpenEventArgs
} from '@syncfusion/ej2-angular-schedule';
import {Prof} from '../../../controller/model/prof.model';

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
    public currentDate: Date = new Date();
    private prof: Prof = new Prof();
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    display = false;
    private selectionTarget: Element;
    public data: ScheduleProf = new ScheduleProf();
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


    constructor(private scheduleService: ScheduleService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private loginService: LoginService) {
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
        this.scheduleService.getAllStudents().subscribe(data => this.students = data);
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
                    }

                }, error => {
                    console.log(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Warning',
                        detail: 'Registration canceled',
                        life: 3000
                    });
                }
            );
        } else {
            this.scheduleService.saveByProf().subscribe(
                data => {
                    for (let i = 0; i < this.scheduleProfs.length; i++) {
                        if (this.scheduleProfs[i].id === data.id) {
                            this.scheduleProfs[i] = {...data};
                        }
                    }
                }
            );
            console.log(this.scheduleProfs);
            scheduleObj.eventSettings.dataSource = this.scheduleProfs;
            console.log(scheduleObj.eventSettings.dataSource);

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

        this.scheduleProf = new ScheduleProf();

    }

    // save() {
    //     this.scheduleProf.prof = this.prof;
    //     console.log(this.scheduleProf);
    //     this.scheduleObj.eventSettings.dataSource = null;
    //     this.scheduleService.saveByProf().subscribe
    //     (
    //         data => {
    //             if (data === null) {
    //                 this.messageService.add({
    //                     severity: 'error',
    //                     summary: 'Warning',
    //                     detail: 'Registration canceled, please try again.',
    //                     life: 3000
    //                 });
    //             } else {
    //                 this.scheduleProfs.push({...data});
    //                 this.messageService.add({
    //                     severity: 'success',
    //                     summary: 'Successful',
    //                     detail: 'Schedule added.',
    //                     life: 3000
    //                 });
    //                 this.scheduleObj.eventSettings.dataSource = this.scheduleProfs;
    //                 this.eventSettings = {
    //                     dataSource: this.scheduleProfs,
    //                     fields: {
    //                         id: 'Id',
    //                         subject: {name: 'subject', title: 'subject'},
    //                         startTime: {name: 'startTime', title: 'startTime'},
    //                         endTime: {name: 'endTime', title: 'endTime'}
    //                     }
    //                 };
    //                 console.log(this.scheduleProfs);
    //             }
    //
    //         }, error => {
    //             console.log(error);
    //             this.messageService.add({
    //                 severity: 'error',
    //                 summary: 'Warning',
    //                 detail: 'Registration canceled',
    //                 life: 3000
    //             });
    //             this.scheduleObj.eventSettings.dataSource = this.scheduleProfs;
    //             this.eventSettings = {
    //                 dataSource: this.scheduleProfs,
    //                 fields: {
    //                     id: 'Id',
    //                     subject: {name: 'subject', title: 'subject'},
    //                     startTime: {name: 'startTime', title: 'startTime'},
    //                     endTime: {name: 'endTime', title: 'endTime'}
    //                 }
    //             };
    //         }
    //     );
    //     this.scheduleProf = new ScheduleProf();
    //     this.findByProf();
    // }


    public onPopupOpen(args: PopupOpenEventArgs): void {
        this.data.subject = args.data.subject;
        this.data.startTime = args.data.startTime;
        this.data.endTime = args.data.endTime;
        this.scheduleProf.startTime = args.data.startTime;
        this.scheduleProf.endTime = args.data.endTime;
        this.selectionTarget = null;
        this.selectionTarget = args.target;
    }

    public onDetailsClick(event: any): void {
        this.scheduleProf = new ScheduleProf();
        const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
        this.scheduleObj.openEditor(data, 'Add');
    }

    public onEditClick(): void {
        const scheduleProf = this.scheduleObj.getEventDetails(this.selectionTarget) as ScheduleProf;
        this.scheduleService.update(scheduleProf);
        this.scheduleObj.openEditor(scheduleProf, 'Add');
    }

    public onDeleteClick(): void {
        const scheduleProf = this.scheduleObj.getEventDetails(this.selectionTarget) as ScheduleProf;
        this.scheduleService.deleteByRef(scheduleProf.ref);
        const index = this.scheduleProfs.indexOf(scheduleProf);
        alert(index);
        if (index !== -1) {
            this.scheduleProfs.splice(index, 1);
        }
        this.getData();
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
}
