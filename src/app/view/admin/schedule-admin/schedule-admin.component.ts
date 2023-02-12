import {Component, OnInit, ViewChild} from '@angular/core';
import {ScheduleService} from '../../../controller/service/schedule.service';
import {MessageService} from 'primeng/api';
import {EtatEtudiantSchedule} from '../../../controller/model/etat-etudiant-schedule.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {Prof} from '../../../controller/model/prof.model';
import {EventSettingsModel, GroupModel, PopupOpenEventArgs, ScheduleComponent, TimeScaleModel} from '@syncfusion/ej2-angular-schedule';
import {ScheduleProf} from '../../../controller/model/calendrier-prof.model';
import {GroupeEtudiant} from '../../../controller/model/groupe-etudiant.model';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {Cours} from '../../../controller/model/cours.model';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import timezones from 'timezones-list';
import {GroupeEtudiantService} from '../../../controller/service/groupe-etudiant-service';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {InscriptionService} from '../../../controller/service/inscription.service';


@Component({
    selector: 'app-schedule-admin',
    templateUrl: './schedule-admin.component.html',
    styleUrls: ['./schedule-admin.component.scss'],
})
export class ScheduleAdminComponent implements OnInit {

    constructor(private scheduleService: ScheduleService,
                private parcourService: ParcoursService,
                private packService: PackStudentService,
                private inscriptionService: InscriptionService,
                private groupEtudiantService: GroupeEtudiantService,
                private messageService: MessageService) {
    }

    @ViewChild('timezoneDropdown') public timezoneDropdownObj: DropDownListComponent;
    public dropDownValue = 'Africa/Casablanca';
    public fields: Record<string, any> = {text: 'label', value: 'tzCode'};
    public timezoneData: Record<string, any>[] = timezones;

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

    optionSelected: any = [
        {option: 'Never'},
    ];
    repeatNumber = 1;
    grpEtudiant: GroupeEtudiant = new GroupeEtudiant();
    endDate: Date = new Date();
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
    public schedule: ScheduleProf = new ScheduleProf();
    public timeScale: TimeScaleModel = {interval: 60, slotCount: 1};
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;

    display = false;
    private selectionTarget: Element;
    public data: ScheduleProf = new ScheduleProf();
    public selectedDate: Date = new Date();
    public showWeekend = true;
    public eventSettings: EventSettingsModel = {
        dataSource: this.scheduleProfs,
        fields: {
            id: 'Id',
            subject: {name: 'subject', title: 'subject'},
            startTime: {name: 'startTime', title: 'startTime'},
            endTime: {name: 'endTime', title: 'endTime'}
        }
    };

    public group: GroupModel = {byDate: true, resources: ['Profs']};

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
        this.selectedDate = new Date();
        this.scheduleService.getAllStudentsGroup().subscribe(data => this.groupeStudent = data);
        this.scheduleService.getProf().subscribe(data => this.professors = data);
        this.scheduleService.findEtat().subscribe(data => this.scheduleService.etatEtudiantSchedule = data);
        console.log(this.scheduleProfs);
    }


    findAllByGroupOrTeahcer() {
        const scheduleObj = this.scheduleObj;
        scheduleObj.eventSettings.dataSource = null;
        this.scheduleService.findAllByCriteria(this.schedule).subscribe(
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
        if (this.scheduleProf.prof === null) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Operation canceled, Group ' + this.scheduleProf.groupeEtudiant.libelle + ' has not a teacher yet!',
                life: 5000
            });
        } else {
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
                            this.scheduleProf.ref = fixedRef + String(this.scheduleProf.startTime.getDay());
                            console.log(this.courses);
                            for (let i = 0; i < this.courses.length; i++) {
                                if (this.scheduleProf.cours.libelle === this.courses[i].libelle) {
                                    if (this.scheduleProf.subject === firstSubject) {
                                        firstSubject = null;
                                        break;
                                    } else {
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
    }

    private saveSchedule(scheduleObj: any) {
        console.log(this.scheduleProf);
        if (this.scheduleProf.id === 0 || this.scheduleProf.id === null || this.scheduleProf.id === undefined) {
            this.scheduleService.save().subscribe
            (
                data => {
                    if (data === null) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Warning',
                            detail: 'Schedule canceled, please try again.',
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
                        scheduleObj.eventSettings.dataSource = this.scheduleProfs;
                    }

                }, error => {
                    console.log(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Warning',
                        detail: 'Schedule canceled',
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


    public onPopupOpen(args: PopupOpenEventArgs): void {
        this.scheduleProf = new ScheduleProf();
        console.log(args);
        this.scheduleProf = new ScheduleProf();
        if (args.data?.id !== undefined) {
            this.data.subject = args.data?.subject;
            this.data.startTime = args.data?.startTime;
            this.data.endTime = args.data?.endTime;
            this.scheduleProf.startTime = args.data?.startTime;
            this.scheduleProf.endTime = args.data?.endTime;
            this.scheduleProf.grpName = args.data?.groupeEtudiant?.libelle;
            this.scheduleProf.profName = args.data?.prof?.nom;
            this.scheduleProf.subject = args.data?.subject;
            this.scheduleProf.cours = args.data?.cours;
            this.scheduleProf.ref = args.data?.ref;
            this.scheduleProf.prof = args.data?.prof;
            this.scheduleProf.id = args.data.id;
            this.scheduleProf.groupeEtudiant = args.data?.groupeEtudiant;
            this.grpEtudiant = this.scheduleProf?.groupeEtudiant;
            this.selectionTarget = null;
            this.selectionTarget = args.target;
        } else if (args.type === 'DeleteAlert') {
        } else if (args.type === 'Editor') {
            this.scheduleProf.startTime = args.data?.startTime;
            this.scheduleProf.endTime = args.data?.endTime;
        }
        if (args.data?.ref === null || args.data?.ref === undefined || args.data?.ref === '' || args.data?.ref === 0) {
            this.scheduleProf.id = null;
        }
    }

    public onDetailsClick(event: any): void {
        this.scheduleProf = new ScheduleProf();
        const data: Object = this.scheduleObj?.getCellDetails(this.scheduleObj?.getSelectedElements()) as Object;
        this.scheduleObj?.openEditor(data, 'Add');
    }


    public onDeleteClick(data: any): void {
        const scheduleObj = this.scheduleObj;
        this.scheduleObj.eventSettings.dataSource = null;
        const scheduleProf = data[0];
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

    public onCloseClick(): void {
        this.scheduleObj.quickPopup.quickPopupHide(true);
    }

    public getData() {
        this.scheduleObj.eventSettings.dataSource = null;
        this.findAll();
        this.scheduleObj.workHours.start = '00:00';
        this.scheduleObj.workHours.end = '23:59';
        this.scheduleObj.workHours.highlight = true;
    }


    showDialog() {
        this.display = true;
    }

    hideDialog() {
        this.display = false;
    }

    getCourses(groupeEtudiant: GroupeEtudiant) {
        this.groupEtudiantService.findAllGroupeEtudiantDetail(groupeEtudiant.id).subscribe(
            list => {
                this.inscriptionService.findByEtudiantId(list[0].etudiant?.id).subscribe(
                    inscription => {
                        console.log(inscription);
                        this.parcourService.FindCoursByParcours(groupeEtudiant.parcours.id).subscribe(data => {
                            this.courses = data.slice(0, inscription.packStudent.nombreCours);
                            console.log(this.courses);
                        });
                    }, error => {
                        console.log(error);
                    }
                );
            }, error => {
                console.log(error);
            }
        );
        this.scheduleProf.prof = this.scheduleProf.groupeEtudiant.prof;
    }

    getDaysSelected(data: any) {
        console.log(this.selectedDays);
        console.log(data);
    }


    onActionComplete(event: any) {
        console.log(event);
        if (event.requestType === 'eventRemoved' && event.cancel === false) {
            this.onDeleteClick(event.data);
        }
        this.scheduleObj.workHours.start = '00:00';
        this.scheduleObj.workHours.end = '23:59';
        this.scheduleObj.workHours.highlight = true;
    }

    public onTimezoneDropDownChange(args: any): void {
        this.scheduleObj.timezone = this.timezoneDropdownObj.value.toString();
    }

    setProf(prof: Prof) {
        console.log(prof);
        this.scheduleProf.prof = prof;
    }

    generateRef() {
        console.log(this.scheduleProf.cours);
        this.scheduleProf.ref = 'R-' + this.scheduleProf.cours.id;
    }
}
