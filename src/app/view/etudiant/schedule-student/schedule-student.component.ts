import {Component, OnInit, ViewChild} from '@angular/core';
import {ScheduleService} from '../../../controller/service/schedule.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LoginService} from '../../../controller/service/login.service';
import {L10n} from '@syncfusion/ej2-base';
import {EventSettingsModel, PopupOpenEventArgs, ScheduleComponent} from '@syncfusion/ej2-angular-schedule';
import {ScheduleProf} from '../../../controller/model/calendrier-prof.model';
import {Prof} from '../../../controller/model/prof.model';
import {Etudiant} from '../../../controller/model/etudiant.model';


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
    selector: 'app-schedule-student',
    templateUrl: './schedule-student.component.html',
    styleUrls: ['./schedule-student.component.scss']
})
export class ScheduleStudentComponent implements OnInit {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
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

    constructor(private scheduleService: ScheduleService, private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private user: LoginService) {
    }


    get scheduleProfs(): Array<ScheduleProf> {
        return this.scheduleService.scheduleProfs;
    }


    get displayBasic(): boolean {
        return this.scheduleService.displayBasic;
    }

    set displayBasic(value: boolean) {
        this.scheduleService.displayBasic = value;
    }


    set students(value: Array<Etudiant>) {
        this.scheduleService.students = value;
    }


    set professors(value: Array<Prof>) {
        this.scheduleService.professors = value;
    }


    ngOnInit() {
        this.scheduleService.findAll();
        this.getData();
        this.scheduleService.getAllStudents().subscribe(data => this.students = data);
        this.scheduleService.getProf().subscribe(data => this.professors = data);
        this.scheduleService.findEtat().subscribe(data => this.scheduleService.etatEtudiantSchedule = data);
        console.log(this.scheduleProfs);
    }

    showBasicDialog() {
        this.displayBasic = true;
    }


    public getData() {
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
}
