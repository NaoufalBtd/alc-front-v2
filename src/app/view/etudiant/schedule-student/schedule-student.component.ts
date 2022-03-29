import {Component, OnInit, ViewChild} from '@angular/core';
import {ScheduleService} from '../../../controller/service/schedule.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LoginService} from '../../../controller/service/login.service';
import {L10n} from '@syncfusion/ej2-base';
import {EventSettingsModel, PopupOpenEventArgs, ScheduleComponent, TimeScaleModel} from '@syncfusion/ej2-angular-schedule';
import {ScheduleProf} from '../../../controller/model/calendrier-prof.model';
import {Prof} from '../../../controller/model/prof.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {GroupeEtudiantService} from '../../../controller/service/groupe-etudiant-service';
import {WebSocketService} from '../../../controller/service/web-socket.service';
import {Router} from '@angular/router';
import {SimulateSectionService} from '../../../controller/service/simulate-section.service';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import timezones from 'timezones-list';
import {MenuService} from '../../shared/slide-bar/app.menu.service';
import {Cours} from '../../../controller/model/cours.model';


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
    public timeScale: TimeScaleModel = {interval: 60, slotCount: 1};
    public selectedDate: Date = new Date();
    public showWeekend = false;
    public eventSettings: EventSettingsModel;
    public selectedMeeting: ScheduleProf = new ScheduleProf();


    @ViewChild('timezoneDropdown') public timezoneDropdownObj: DropDownListComponent;
    public dropDownValue = 'Africa/Casablanca';
    public fields: Record<string, any> = {text: 'label', value: 'tzCode'};
    public timezoneData: Record<string, any>[] = timezones;


    constructor(private scheduleService: ScheduleService, private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private groupeEtudiantService: GroupeEtudiantService,
                private authenticationService: AuthenticationService,
                private webSocketService: WebSocketService,
                private router: Router,
                private simulatesectionService: SimulateSectionService,
                private simulateSection: SimulateSectionService,
                private menuService: MenuService,
                private parcoursService: ParcoursService) {
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

    private findByGroupStudent() {
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

    ngOnInit() {
        this.findByGroupStudent();

    }

    showBasicDialog() {
        this.displayBasic = true;
    }

    public onPopupOpen(args: PopupOpenEventArgs): void {
        this.selectionTarget = null;
        this.selectionTarget = args.target;
        this.selectedMeeting.groupeEtudiant = args.data.groupeEtudiant;
        this.selectedMeeting.id = args.data.id;
        this.selectedMeeting.prof = args.data.prof;
        this.selectedMeeting.grpName = args.data.grpName;
        this.selectedMeeting.cours = args.data.cours;
        this.selectedMeeting.subject = args.data.subject;
        this.selectedMeeting.startTime = args.data.startTime;
        this.selectedMeeting.endTime = args.data.endTime;
        console.log(this.selectedMeeting);
        this.parcoursService.selectedcours = args.data.cours;
    }

    public getData() {
        this.scheduleObj.eventSettings.dataSource = null;
        this.findByGroupStudent();
    }
    set selectedcours(value: Cours) {
        this.parcoursService.selectedcours = value;
    }

    joinSession() {
        this.showTpBar = false;
        this.webSocketService.openWebSocket(this.etudiant, this.selectedMeeting.groupeEtudiant.prof, this.selectedMeeting.groupeEtudiant, 'STUDENT');
        this.webSocketService.isInSession = true;
        this.selectedcours = this.selectedMeeting.cours;
        this.simulatesectionService.findSectionOneByCoursId(this.selectedMeeting.cours);
        this.router.navigate(['etudiant/etudiant-simulate-sections']);

        // this.webSocketService.findCurrentSectionForstudent(this.parcoursService.selectedcours, this.selectedMeeting.prof );
    }

    onActionComplete() {
        this.scheduleObj.workHours.start = '00:00';
        this.scheduleObj.workHours.end = '23:59';
        this.scheduleObj.workHours.highlight = true;
    }

    public onTimezoneDropDownChange(args: any): void {
        this.scheduleObj.timezone = this.timezoneDropdownObj.value.toString();
    }
}
