import {Component, OnInit, ViewChild} from '@angular/core';
import {ScheduleService} from '../../../controller/service/schedule.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {EtatEtudiantSchedule} from '../../../controller/model/etat-etudiant-schedule.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {Prof} from '../../../controller/model/prof.model';
import {L10n} from '@syncfusion/ej2-base';
import {EventSettingsModel, PopupOpenEventArgs, ScheduleComponent} from '@syncfusion/ej2-angular-schedule';
import {ScheduleProf} from '../../../controller/model/calendrier-prof.model';
import {GroupeEtudiantDetail} from '../../../controller/model/groupe-etudiant-detail.model';

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
    selector: 'app-schedule-admin',
    templateUrl: './schedule-admin.component.html',
    styleUrls: ['./schedule-admin.component.scss'],
})
export class ScheduleAdminComponent implements OnInit {

    public schedule: ScheduleProf = new ScheduleProf();
    @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
    display = false;
    public data: ScheduleProf = new ScheduleProf();
    private selectionTarget: Element;
    // public selectedDate: Date = new Date(2021, 4, 18);
    public selectedDate: Date = new Date();
    public showWeekend = false;
    public eventSettings: EventSettingsModel;


    constructor(private scheduleService: ScheduleService, private messageService: MessageService) {
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

    findAll() {
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

    ngOnInit() {
        this.findAll();
        this.scheduleService.getAllStudents().subscribe(data => this.students = data);
        this.scheduleService.getProf().subscribe(data => this.professors = data);
        this.scheduleService.findEtat().subscribe(data => this.scheduleService.etatEtudiantSchedule = data);
        console.log(this.scheduleProfs);
    }


    findAllByStudent() {
        const scheduleObj = this.scheduleObj;
        scheduleObj.eventSettings.dataSource = null;
        this.scheduleService.findAllByStudent(this.schedule).subscribe(
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

    save() {
        console.log(this.scheduleProf);
        const scheduleObj = this.scheduleObj;
        scheduleObj.eventSettings.dataSource = null;
        console.log(scheduleObj.eventSettings.dataSource);
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
                        this.eventSettings = {
                            dataSource: this.scheduleProfs,
                            fields: {
                                id: 'Id',
                                subject: {name: 'subject', title: 'subject'},
                                startTime: {name: 'startTime', title: 'startTime'},
                                endTime: {name: 'endTime', title: 'endTime'}
                            }
                        };
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
            );
        } else {
            this.scheduleService.save().subscribe(
                data => {
                    for (let i = 0; i < this.scheduleProfs.length; i++) {
                        if (this.scheduleProfs[i].id === data.id) {
                            this.scheduleProfs.splice(i, 1);
                            this.scheduleProfs[i] = data;
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
        this.scheduleObj.eventWindow.refresh();
    }

    public onPopupOpen(args: PopupOpenEventArgs): void {
        this.data.subject = args.data.subject;
        this.data.startTime = args.data.startTime;
        this.data.endTime = args.data.endTime;
        this.selectionTarget = null;
        this.selectionTarget = args.target;
    }

    public onDetailsClick(event: any): void {
        this.scheduleProf = new ScheduleProf();
        const data = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) ;
        console.log(data);
        this.scheduleProf.startTime = data.startTime;
        this.scheduleProf.endTime = data.endTime;
        this.scheduleObj.openEditor(data, 'Add');
        console.log(this.scheduleProf);
    }

    public onEditClick(data: any): void {
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
        this.eventSettings = {
            dataSource: this.scheduleProfs,
            fields: {
                id: 'Id',
                subject: {name: 'subject', title: 'subject'},
                startTime: {name: 'startTime', title: 'startTime'},
                endTime: {name: 'endTime', title: 'endTime'}
            }
        };
        this.hideDialog();
    }

    public onCloseClick(): void {
        this.scheduleObj.closeEditor();
    }

    public getData() {
        this.scheduleObj.eventSettings.dataSource = null;
        this.findAll();
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
