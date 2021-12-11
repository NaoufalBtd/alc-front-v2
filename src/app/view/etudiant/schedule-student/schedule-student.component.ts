import {Component, OnInit, ViewChild} from '@angular/core';
import {ScheduleService} from '../../../controller/service/schedule.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LoginService} from '../../../controller/service/login.service';
import {L10n} from '@syncfusion/ej2-base';
import {EventSettingsModel, PopupOpenEventArgs, ScheduleComponent} from '@syncfusion/ej2-angular-schedule';
import {ScheduleProf} from '../../../controller/model/calendrier-prof.model';
import {Prof} from '../../../controller/model/prof.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {GroupeEtudiantService} from '../../../controller/service/groupe-etudiant-service';


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
    private etudiant: Etudiant = new Etudiant();
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    display = false;
    private selectionTarget: Element;
    // public selectedDate: Date = new Date(2021, 4, 18);
    public selectedDate: Date = new Date();
    public showWeekend = false;
    public eventSettings: EventSettingsModel ;

    constructor(private scheduleService: ScheduleService, private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private groupeEtudiantService: GroupeEtudiantService,
                private authenticationService: AuthenticationService) {
    }


    get scheduleProfs(): Array<ScheduleProf> {
        return this.scheduleService.scheduleProfs;
    }


    set scheduleProfs(value: Array<ScheduleProf>) {
        this.scheduleService.scheduleProfs = value;
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
        this.scheduleProfs.splice(0, this.scheduleProfs.length);
        const scheduleObj = this.scheduleObj;
        this.etudiant = this.authenticationService.getConnectedStudent();
        console.log(this.etudiant);
        this.groupeEtudiantService.findGroupeEtudiantDetailByEtudiantId(this.etudiant.id).subscribe(
            data => {
                console.log(data);
                for (const item of data) {
                    this.scheduleService.findByGroupStudentId(item.groupeEtudiant).subscribe(
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
                }
            }
        );


    }

    showBasicDialog() {
        this.displayBasic = true;
    }

    public onPopupOpen(args: PopupOpenEventArgs): void {
        this.selectionTarget = null;
        this.selectionTarget = args.target;
        console.log(args.data);
    }

    public getData() {
        this.scheduleObj.eventSettings.dataSource = null;
        // this.scheduleService.findByGroupStudentId(this.etudiant).subscribe(
        //     data => {
        //         this.scheduleProfs = data;
        //         this.eventSettings = {
        //             dataSource: this.scheduleProfs,
        //             fields: {
        //                 id: 'Id',
        //                 subject: {name: 'subject', title: 'subject'},
        //                 startTime: {name: 'startTime', title: 'startTime'},
        //                 endTime: {name: 'endTime', title: 'endTime'}
        //             }
        //         };
        //     }
        // );
    }
}
