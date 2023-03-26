import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Etudiant} from '../model/etudiant.model';
import {EtatEtudiantSchedule} from '../model/etat-etudiant-schedule.model';
import {CalendrierProf} from '../model/schedule-prof.model';
import {CalendrierVo} from '../model/calendrier-vo.model';
import {Prof} from '../model/prof.model';
import {LoginService} from './login.service';
import {environment} from '../../../environments/environment';
import {ScheduleProf} from '../model/calendrier-prof.model';
import {GroupeEtudiant} from '../model/groupe-etudiant.model';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

    private adminUrl = environment.adminUrl;
    private studentUrl = environment.etudiantUrl;
    private profUrl = environment.profUrl;
    private _scheduleProf: ScheduleProf = new ScheduleProf();
    private _scheduleProfs: Array<ScheduleProf> = new Array<ScheduleProf>();
    private index: any;


    constructor(private http: HttpClient, private user: LoginService) {
    }


    get scheduleProf(): ScheduleProf {
        if (!this._scheduleProf) {
            this._scheduleProf = new ScheduleProf();
        }
        return this._scheduleProf;
    }

    set scheduleProf(value: ScheduleProf) {
        this._scheduleProf = value;
    }

    get scheduleProfs(): Array<ScheduleProf> {
        if (!this._scheduleProfs) {
            this._scheduleProfs = new Array<ScheduleProf>();
        }
        return this._scheduleProfs;
    }

    set scheduleProfs(value: Array<ScheduleProf>) {
        this._scheduleProfs = value;
    }

    private _selected: CalendrierProf = new CalendrierProf();

    get selected(): CalendrierProf {
        if (this._selected == null) {
            this._selected = new CalendrierProf();
        }
        return this._selected;
    }

    set selected(value: CalendrierProf) {
        this._selected = value;
    }

    private _items: Array<CalendrierProf>;

    get items(): Array<CalendrierProf> {
        if (this._items == null) {
            this._items = new Array<CalendrierProf>();
        }
        return this._items;
    }

    set items(value: Array<CalendrierProf>) {
        this._items = value;
    }

    private _selectedVo: CalendrierVo;

    get selectedVo(): CalendrierVo {
        return this._selectedVo;
    }

    set selectedVo(value: CalendrierVo) {
        this._selectedVo = value;
    }

    private _itemsVo: Array<CalendrierVo>;

    get itemsVo(): Array<CalendrierVo> {
        if (this._itemsVo == null) {
            this._itemsVo = new Array<CalendrierVo>();
        }
        return this._itemsVo;
    }

    set itemsVo(value: Array<CalendrierVo>) {
        this._itemsVo = value;
    }

    private _etatEtudiantSchedule: Array<EtatEtudiantSchedule>;

    get etatEtudiantSchedule(): Array<EtatEtudiantSchedule> {
        if (this._etatEtudiantSchedule == null) {
            this._etatEtudiantSchedule = new Array<EtatEtudiantSchedule>();
        }
        return this._etatEtudiantSchedule;
    }

    set etatEtudiantSchedule(value: Array<EtatEtudiantSchedule>) {
        this._etatEtudiantSchedule = value;
    }

    private _etudiant: Etudiant;

    get etudiant(): Etudiant {
        if (this._etudiant == null) {
            this._etudiant = new Etudiant();
        }
        return this._etudiant;
    }

    set etudiant(value: Etudiant) {
        this._etudiant = value;
    }

    private _displayBasic: boolean;

    get displayBasic(): boolean {
        return this._displayBasic;
    }

    set displayBasic(value: boolean) {
        this._displayBasic = value;
    }

    private _events: any[];

    get events(): any[] {
        return this._events;
    }

    set events(value: any[]) {
        this._events = value;
    }

    private _options: any;

    get options(): any {
        return this._options;
    }

    set options(value: any) {
        this._options = value;
    }

    private _header: any;

    get header(): any {
        return this._header;
    }

    set header(value: any) {
        this._header = value;
    }

    private _eventDialog: boolean;

    get eventDialog(): boolean {
        return this._eventDialog;
    }

    set eventDialog(value: boolean) {
        this._eventDialog = value;
    }

    private _changedEvent: any;

    get changedEvent(): any {
        return this._changedEvent;
    }

    set changedEvent(value: any) {
        this._changedEvent = value;
    }

    private _clickedEvent = null;

    get clickedEvent(): any {
        return this._clickedEvent;
    }

    set clickedEvent(value: any) {
        this._clickedEvent = value;
    }

    private _createDialog: boolean;

    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    private _submitted: boolean;

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    private _students: Array<Etudiant>;

    get students(): Array<Etudiant> {
        if (this._students == null) {
            this._students = new Array<Etudiant>();
        }
        return this._students;
    }

    set students(value: Array<Etudiant>) {
        this._students = value;
    }

    private _student: Etudiant;

    get student(): Etudiant {
        return this._student;
    }

    set student(value: Etudiant) {
        this._student = value;
    }

    private _professors: Array<Prof>;

    get professors(): Array<Prof> {
        if (this._professors == null) {
            this._professors = new Array<Prof>();
        }
        return this._professors;
    }

    set professors(value: Array<Prof>) {
        this._professors = value;
    }

    public findSchedule() {
        return this.http.get<Array<CalendrierVo>>(this.adminUrl + 'calendrierProf/vo/').subscribe(data => {
                this.itemsVo = data;
                console.log(this.itemsVo);
            }, error => {
                console.log(error);
            }
        );
    }

    public findAll(): Observable<Array<ScheduleProf>> {
        return this.http.get<Array<ScheduleProf>>(this.adminUrl + 'scheduleProf/');
    }


    public findAllByCriteria(schedule: ScheduleProf): Observable<Array<ScheduleProf>> {
        return this.http.post<Array<ScheduleProf>>(this.adminUrl + 'scheduleProf/all/', schedule);
    }

    public findByCriteriaStudent(schedule: ScheduleProf): Observable<Array<ScheduleProf>> {
        return this.http.post<Array<ScheduleProf>>(this.profUrl + 'scheduleProf/all/', schedule);
    }

    public findByGroupStudentId(groupeEtudiant: GroupeEtudiant): Observable<Array<ScheduleProf>> {
        return this.http.get<Array<ScheduleProf>>(this.studentUrl + 'scheduleProf/groupe/etudiant/id/' + groupeEtudiant.id);
    }

    public findByProf(prof: Prof): Observable<Array<ScheduleProf>> {
        return this.http.get<Array<ScheduleProf>>(this.profUrl + 'scheduleProf/prof/id/' + prof.id);
    }

    public remove() {

        this.clickedEvent.remove();
    }

    public update(scheduleProf: ScheduleProf) {
        this.scheduleProf = scheduleProf;
    }

    public delete(): Observable<number> {
        return this.http.delete<number>(this.adminUrl + 'calendrierProf/id' + this.selected.id);
    }

    save(): Observable<ScheduleProf> {
        return this.http.post<ScheduleProf>(this.adminUrl + 'scheduleProf/', this.scheduleProf);
    }

    saveByProf(): Observable<ScheduleProf> {
        return this.http.post<ScheduleProf>(this.profUrl + 'scheduleProf/', this.scheduleProf);
    }


    findById(id: number): Observable<ScheduleProf> {
        return this.http.get<ScheduleProf>(this.profUrl + 'scheduleProf/id/' + id);
    }

    public deleteByRef(ref: string) {
        this.http.delete<ScheduleProf>(this.adminUrl + 'scheduleProf/ref/' + ref).subscribe(
            data => {
            }, error => {
                console.log(error);
            }
        );
    }


    public edit(): Observable<CalendrierProf> {
        return this.http.put<CalendrierProf>(this.adminUrl + 'calendrierProf/', this.selected);
    }


    reset() {
        this.changedEvent.title = this.clickedEvent.title;
        this.changedEvent.start = this.clickedEvent.start;
        this.changedEvent.end = this.clickedEvent.end;
        this.changedEvent.titleProf = this.clickedEvent.titleProf;
    }

    public addStudent(): Observable<CalendrierProf> {
        return this.http.post<CalendrierProf>(this.adminUrl + 'calendrierProf/', this.selected);
    }


    public getAllStudentsGroup(): Observable<Array<GroupeEtudiant>> {
        return this.http.get<Array<GroupeEtudiant>>(this.adminUrl + 'groupeEtudiant/');
    }

    public getProf(): Observable<Array<Prof>> {
        return this.http.get<Array<Prof>>(this.adminUrl + 'prof/');
    }

    public findEtat(): Observable<Array<EtatEtudiantSchedule>> {
        return this.http.get<Array<EtatEtudiantSchedule>>(this.adminUrl + 'etatEtudiantSchedule/');
    }


    public findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.itemsVo.length; i++) {
            if (this.itemsVo[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    public clone(scheduleProf: ScheduleProf): ScheduleProf {
        const myClone: ScheduleProf = new ScheduleProf();
        myClone.id = scheduleProf.id;
        myClone.startTime = scheduleProf.startTime;
        myClone.ref = scheduleProf.ref;
        myClone.subject = scheduleProf.subject;
        myClone.endTime = scheduleProf.endTime;
        myClone.groupeEtudiant = scheduleProf.groupeEtudiant;
        myClone.prof = scheduleProf.prof;
        myClone.cours = scheduleProf.cours;
        return myClone;
    }

    public deleteScheduleProfById(scheduleProf: ScheduleProf): Observable<number> {
        console.log(scheduleProf.id);
        return this.http.delete<number>(this.adminUrl + 'scheduleProf/id/' + scheduleProf.id);

    }


}
