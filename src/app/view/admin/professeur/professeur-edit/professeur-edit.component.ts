import {Component, OnInit, ViewChild} from '@angular/core';
import {Prof} from '../../../../controller/model/prof.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ProfessorService} from '../../../../controller/service/professor.service';
import {Parcours} from '../../../../controller/model/parcours.model';
import {TrancheHoraireProf} from '../../../../controller/model/tranche-horaire-prof.model';
import {TrancheHoraireProfService} from '../../../../controller/service/tranche-horaire-prof.service';
import {TypeTeacher} from '../../../../controller/model/type-teacher.model';
import {CategorieProf} from '../../../../controller/model/categorie-prof.model';
import {ClassRoomService} from '../../../../controller/service/class-room.service';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import timezones from 'timezones-list';
import {
    ActionEventArgs,
    EventSettingsModel,
    GroupModel,
    PopupOpenEventArgs,
    RenderCellEventArgs,
    ScheduleComponent,
    ScheduleModel,
    TimeScaleModel,
    View,
    WorkHoursModel
} from '@syncfusion/ej2-angular-schedule';
import {addClass, Internationalization} from '@syncfusion/ej2-base';
import {ScheduleProf} from '../../../../controller/model/calendrier-prof.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {EtatEtudiantSchedule} from '../../../../controller/model/etat-etudiant-schedule.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {Cours} from '../../../../controller/model/cours.model';
import {ScheduleService} from '../../../../controller/service/schedule.service';
import {TimePickerComponent} from '@syncfusion/ej2-angular-calendars';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {AdminService} from '../../../../controller/service/admin.service';
import {AnimationService} from '../../../../controller/service/animation.service';

@Component({
    selector: 'app-professeur-edit',
    templateUrl: './professeur-edit.component.html',
    styleUrls: ['./professeur-edit.component.scss']
})
export class ProfesseurEditComponent implements OnInit {
    public workHours: WorkHoursModel = {
        start: '06:00',
        end: '20:00',
        highlight: true,
    };
    showAddTranche: boolean;
    displayModal: boolean;
    trancheEdit: TrancheHoraireProf = new TrancheHoraireProf();
    categories: CategorieProf[] = new Array<CategorieProf>();
    public trancheHoraireProfs: Array<TrancheHoraireProf> = new Array<TrancheHoraireProf>();
    showAddCategoryDialog: boolean;
    selectedCategory: CategorieProf = new CategorieProf();
    index = 0;
    public profs: Array<Prof> = new Array<Prof>();
    @ViewChild('timezoneDropdown') public timezoneDropdownObj: DropDownListComponent;
    public dropDownValue = 'Africa/Casablanca';
    public fields: Record<string, any> = {text: 'label', value: 'tzCode'};
    public timezoneData: Record<string, any>[] = timezones;
    public profsDataSource: Record<string, any> = this.profs;
    public group: GroupModel = {enableCompactView: false, resources: ['profs']};

    constructor(private messageService: MessageService,
                private trancheHoraireProfService: TrancheHoraireProfService,
                private classRoomService: ClassRoomService,
                private animation: AnimationService,
                private service: ProfessorService,
                private scheduleService: ScheduleService,
                private parcourService: ParcoursService,
                private adminService: AdminService,
                private confirmationService: ConfirmationService) {
    }

    public parcoursList2: Array<Parcours> = new Array<Parcours>();
    daysOptions = [
        {name: 'Select day', value: null},
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


    public findAllParcours() {
        this.service.findAllParcours().subscribe(data => {
            this.parcoursList = data;
            this.parcoursList2 = data;
        });
    }

    ngOnInit(): void {
        this.trancheHoraireProfList = new Array<TrancheHoraireProf>();

        this.findAllParcours();
        this.service.findAllType().subscribe(
            data => {
                this.typeTeachers = data;
            }, error => {
                console.log(error);
            }
        );
        this.classRoomService.findAllCategorieProf().subscribe(data => this.categories = data);
        this.service.findAll().subscribe(data => this.items = data);
        this.findAll();
        this.selectedDate = new Date();
        this.scheduleService.getAllStudentsGroup().subscribe(data => this.groupeStudent = data);

        this.scheduleService.findEtat().subscribe(data => this.scheduleService.etatEtudiantSchedule = data);
        this.trancheHoraireProfService.findTrancheHoraireByProfId(this.selected).subscribe(data => {
                this.trancheHoraireProfs = data;
                this.trancheHoraireProfList = data;
                console.log(this.trancheHoraireProfs);
                console.log(this.trancheHoraireProfList);
            }, error => {
                console.log(error);
            }
        );
    }


    get parcoursList(): Array<Parcours> {
        return this.service.parcoursList;
    }

    set parcoursList(value: Array<Parcours>) {
        this.service.parcoursList = value;
    }


    get selected(): Prof {
        return this.service.selected;
    }

    set selected(value: Prof) {
        this.service.selected = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get submitted(): boolean {
        return this.service.submitted;
    }

    set submitted(value: boolean) {
        this.service.submitted = value;
    }

    get items(): Array<Prof> {
        return this.service.items;
    }

    set items(value: Array<Prof>) {
        this.service.items = value;
    }

    get typeTeachers(): Array<TypeTeacher> {
        return this.service.typeTeachers;
    }

    set typeTeachers(value: Array<TypeTeacher>) {
        this.service.typeTeachers = value;
    }

    get typeTeacher(): TypeTeacher {
        return this.service.typeTeacher;
    }

    set typeTeacher(value: TypeTeacher) {
        this.service.typeTeacher;
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
        this.trancheHoraireProfList.push({...this.trancheHoraireProf});
        this.trancheHoraireProf = new TrancheHoraireProf();
        this.dateFin = undefined;
        this.dateDebut = undefined;
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

    public edit() {

        this.selected.trancheHoraireProfList = this.trancheHoraireProfList;
        this.submitted = true;
        this.service.edit().subscribe(data => {
            this.selected = data;
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].id === data.id) {
                    this.items[i] = data;
                }
            }
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'prof Updated',
                life: 3000
            });
        });
        this.editDialog = false;
        this.selected = new Prof();
        this.trancheHoraireProfList = new Array<TrancheHoraireProf>();

    }

    public hideEditDialog() {
        this.editDialog = false;
    }

    public delete(trancheHoraireProf: TrancheHoraireProf) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this date ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const index = this.trancheHoraireProfList.indexOf(trancheHoraireProf);
                this.trancheHoraireProfList.splice(index, 1);
            }
        });
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
        this.trancheEdit = tranche;
    }

    deleteTranche(tranche: TrancheHoraireProf) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this date ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const index = this.trancheHoraireProfs.indexOf(tranche);
                this.trancheHoraireProfs.splice(index, 1);
                this.trancheHoraireProfService.deleteTrancheById(tranche.id);
            }
        });
    }

    showModalDialog() {
        this.displayModal = true;
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
        this.trancheEdit.prof = this.selected;
        if (this.trancheEdit.id === 0) {
            this.trancheEdit.day = this.selectedDay.value;
        }
        this.trancheHoraireProfService.edit(this.trancheEdit).subscribe(
            data => {
                console.log(data);
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
        this.displayModal = false;
    }


    addNewTranche() {
        this.trancheEdit = new TrancheHoraireProf();
        this.displayModal = true;
    }

    hideDialog() {
        this.displayModal = false;
        this.trancheEdit = new TrancheHoraireProf();
    }

    addNewLevel() {
        this.showAddCategoryDialog = true;
        this.selectedCategory = new CategorieProf();
    }

    editLevel(level: CategorieProf) {
        this.showAddCategoryDialog = true;
        this.selectedCategory = level;
    }

    deleteLevel(level: CategorieProf) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this level ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const index = this.categories.indexOf(level);
                this.categories.splice(index, 1);
                this.classRoomService.deleteCategory(level).subscribe(data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Level deleted',
                        life: 3000
                    });
                });
            }
        });
    }

    saveCategory() {
        this.showAddCategoryDialog = false;
        this.classRoomService.saveCategory(this.selectedCategory).subscribe(
            data => {
                if (this.selectedCategory.id === 0) {
                    this.categories.push({...data});
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Level added Successfully',
                        life: 3000
                    });
                } else {
                    for (let i = 0; i < this.categories.length; i++) {
                        if (this.categories[i].id === data.id) {
                            this.categories[i] = data;
                        }
                    }
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Successful',
                        detail: 'Level updated Successfully',
                        life: 3000
                    });
                }
            }
        );
    }

    /**
     *
     *========================================================
     * SCHEDULE METHODS
     *========================================================
     *
     */
    cols: any[];
    public timeScale: TimeScaleModel = {interval: 60, slotCount: 1};
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
    public currentView: View = 'Week';

    public islayoutChanged: boolean = false;
    scheduleOptions: ScheduleModel;

    get scheduleProfs(): Array<ScheduleProf> {
        return this.scheduleService.scheduleProfs;
    }


    set scheduleProfs(value: Array<ScheduleProf>) {
        this.scheduleService.scheduleProfs = value;
    }


    showScheduleDialog() {
        this.index = 1;
        this.profs = new Array<Prof>();
        this.scheduleProfs.splice(0, this.scheduleProfs.length);
        this.scheduleProf.prof = this.selected;
        this.scheduleService.findByProf(this.selected).subscribe(
            scheduleData => {
                for (const item1 of scheduleData) {
                    this.scheduleProfs.push({...item1});
                }
                this.eventSettings = {
                    dataSource: this.scheduleProfs,
                    fields: {
                        id: 'id',
                        subject: {name: 'subject', title: 'subject'},
                        startTime: {name: 'startTime', title: 'startTime'},
                        endTime: {name: 'endTime', title: 'endTime'}
                    }
                };
                this.profs.push({...this.selected});
                this.profsDataSource = this.profs;
            }, error => {
                console.log(error);
            }
        );
        this.scheduleObj.eventWindow.refresh();
    }


    onPopupOpen(args: PopupOpenEventArgs): void {
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
        this.scheduleProf.groupeEtudiant = args.data.groupeEtudiant;
        this.grpEtudiant = this.scheduleProf.groupeEtudiant;
        this.selectionTarget = null;
        this.selectionTarget = args.target;
    }

    onDataBound(): void {
        this.scheduleObj.resetWorkHours();
        if (this.islayoutChanged) {
            this.scheduleObj.eventSettings.dataSource = this.scheduleProfs;
            this.scheduleObj.workHours = null;
            this.eventSettings = {
                dataSource: this.scheduleProfs,
                fields: {
                    id: 'id',
                    subject: {name: 'subject', title: 'subject'},
                    startTime: {name: 'startTime', title: 'startTime'},
                    endTime: {name: 'endTime', title: 'endTime'}
                }
            };
            if (this.trancheHoraireProfs?.length > 0) {
                this.scheduleObj.resetWorkHours();
                const dates = this.scheduleObj.activeView.getRenderDates();
                for (const tranche of this.trancheHoraireProfs) {
                    for (const date of dates) {
                        if (tranche.day === date.getDay()) {
                            console.log(date);
                            this.scheduleObj.resetWorkHours(
                                [date],
                                tranche.startHour,
                                tranche.endHour,
                                0
                            );
                        }
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
            this.scheduleObj.resetWorkHours();
        }
        this.scheduleObj.eventSettings.dataSource = null;
        this.scheduleObj.eventSettings.dataSource = this.scheduleProfs;
    }

    onRenderCell(args: RenderCellEventArgs): void {

        if (args.element?.className === ('e-work-cells')) {
            (args.element as HTMLElement).style.background = '#edf2fb';
            (args.element as HTMLElement).style.borderColor = '#edf2fb';
            (args.element as HTMLElement).style.pointerEvents = 'none';
        } else if (args.element?.className === ('e-work-cells e-work-hours')) {
            (args.element as HTMLElement).style.background = 'white';
        }
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
        this.scheduleProf.prof = this.scheduleProf.groupeEtudiant.prof;
        const fixedRef = this.scheduleProf.ref;
        const startedDate = this.scheduleProf.startTime;
        const endedDate = this.scheduleProf.endTime;
        const scheduleObj = this.scheduleObj;
        scheduleObj.eventSettings.dataSource = null;
        this.scheduleProf.subject = this.scheduleProf.cours.libelle;
        this.scheduleProf.grpName = this.scheduleProf.groupeEtudiant.libelle;
        this.scheduleProf.profName = this.scheduleProf.prof.nom;
        if (this.optionSelected.option === 'Daily') {
            while (this.scheduleProf.startTime < this.endDate) {
                this.saveSchedule(scheduleObj);
                this.scheduleProf.startTime.setDate(startedDate.getDate() + this.repeatNumber);
                this.scheduleProf.endTime.setDate(endedDate.getDate() + this.repeatNumber);
            }
        } else if (this.optionSelected.option === 'Weekly') {
            let firstSubject = this.scheduleProf.subject;
            while (this.scheduleProf.startTime < this.endDate) {
                for (const day of this.selectedDays) {
                    if (this.scheduleProf.startTime.getDay() === day) {
                        this.scheduleProf.ref = fixedRef + String(this.scheduleProf.startTime.getDay());
                        for (let i = 0; i < this.courses.length; i++) {
                            if (this.scheduleProf.cours.libelle === this.courses[i].libelle) {
                                if (this.scheduleProf.subject === firstSubject) {
                                    firstSubject = null;
                                    break;
                                } else {
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
                        scheduleObj.eventSettings.dataSource = this.scheduleProfs;
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
            this.scheduleService.save().subscribe(
                data => {
                    for (let i = 0; i < this.scheduleProfs.length; i++) {
                        if (this.scheduleProfs[i].id === data.id) {
                            // this.scheduleProfs.splice(i, 1);
                            this.scheduleProfs[i] = data;
                        }
                    }
                }
            );
            scheduleObj.eventSettings.dataSource = this.scheduleProfs;
            this.scheduleObj.eventWindow.refresh();

        }
    }


    public onEditClick(): void {
        const scheduleProf = this.scheduleObj.getEventDetails(this.selectionTarget) as ScheduleProf;
        this.scheduleService.update(scheduleProf);
        this.scheduleProf = scheduleProf;
        this.scheduleObj.openEditor(scheduleProf, 'Add');
    }


    public onDeleteClick(): void {
        const scheduleObj = this.scheduleObj;
        this.scheduleObj.eventSettings.dataSource = null;
        const scheduleProf = this.scheduleObj.getEventDetails(this.selectionTarget) as ScheduleProf;
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
        const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
        this.scheduleObj.openEditor(data, 'Add');
    }

    public getProf() {
        this.scheduleService.getProf().subscribe(data => this.professors = data);
    }

    getCourses(groupeEtudiant: GroupeEtudiant) {
        this.parcourService.FindCoursByParcours(groupeEtudiant.parcours.id).subscribe(data => this.courses = data);
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
            }, error => {
                console.log(error);
            }
        );
    }

    allowUser(allow: boolean, text: string) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to ' + text + ' this teacher ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selected.enabled = allow;
                this.adminService.allowTeachers(this.selected).subscribe(
                    data => {
                        this.messageService.add({
                            severity: 'success',
                            detail: 'Teacher is ' + text,
                            life: 3000
                        });
                    }, error => {
                        console.log(error);
                        this.messageService.add({
                            severity: 'error',
                            detail: error?.error?.message || 'Something went wrong, please try again.',
                            life: 3000
                        });
                    }
                );
            }
        });
    }

    lockUser(lock: boolean, text: string) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to ' + text + ' this teacher ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.animation.showAnimation = true;
                this.selected.accountNonLocked = lock;
                this.adminService.lockTeacher(this.selected).subscribe(
                    data => {
                        this.selected = data;
                        this.animation.showAnimation = false;
                        this.messageService.add({
                            severity: 'success',
                            detail: 'Teacher is ' + text,
                            life: 3000
                        });
                    }, error => {
                        this.animation.showAnimation = false;
                        console.log(error);
                        this.messageService.add({
                            severity: 'error',
                            detail: error?.error?.message || 'Something went wrong, please try again.',
                            life: 3000
                        });
                    }
                );
            }
        });
    }
}
