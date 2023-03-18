/* tslint:disable:variable-name */
import {Injectable} from '@angular/core';
import {Etudiant} from '../model/etudiant.model';

import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {EtudiantVo} from '../model/etudiant-vo.model';
import {Prof} from '../model/prof.model';
import {Centre} from '../model/centre.model';
import {Parcours} from '../model/parcours.model';
import {LoginService} from './login.service';
import {GroupeEtude} from '../model/groupe-etude.model';
import {User} from '../model/user.model';
import {MessageService} from 'primeng/api';
import {InteretEtudiant} from '../model/interet-etudiant.model';
import {Fonction} from '../model/fonction.model';
import {StatutSocial} from '../model/statut-social.model';
import {NiveauEtude} from '../model/niveau-etude.model';
import {Inscription} from '../model/inscription.model';
import {Skill} from '../model/skill.model';
import {PackStudent} from '../model/pack-student.model';

@Injectable({
    providedIn: 'root'
})
export class EtudiantService {
    constructor(private http: HttpClient, public serviceUser: LoginService, private messageService: MessageService) {
    }

    private adminUrl = environment.adminUrl;
    private _selectedPack: PackStudent = new PackStudent();

    private etudiantUrl = environment.etudiantUrl;
    private url = environment.baseUrl + 'etudiant/';
    private publicUrl = environment.publicUrl + 'etudiant/';
    private urlBase = environment.baseApi;
    private urlParcours = '/admin/parcours/';
    private urlGroupeEtude = '/admin/groupeEtude/';
    private _selected: Etudiant;
    private _submitted: boolean;
    private _items: Array<Etudiant>;
    private _submittedetudiant: Etudiant;
    private _etudiantByProf: Array<Etudiant>;
    private _viewDialog: boolean;
    private _editDialog: boolean;
    private _createDialog: boolean;
    private _centreList: Array<Centre>;
    private _selectedProf: Prof;
    private _etudiantVo: EtudiantVo;
    private _parcoursList: Array<Parcours>;
    private _connectedStudent: Map<number, User> = new Map<number, User>();
    private _selecteetudiant: Array<Etudiant>;
    public packCode = null;
    private _groupeEtude: GroupeEtude;
    private etudiant: Etudiant;
    private _niveauEtudes: Array<NiveauEtude>;
    private _niveauEtude: NiveauEtude;
    private _statutSocial: StatutSocial;
    private _statutSocials: Array<StatutSocial>;
    private _fonctions: Array<Fonction>;
    private _fonction: Fonction;
    private _interetEtudiant: InteretEtudiant;
    private _interetEtudiants: Array<InteretEtudiant>;
    private _skill: Skill;
    private _skills: Array<Skill>;
    private _studentList: Array<Etudiant>;
    private _numberOfTime = 0;


    get numberOfTime(): number {
        return this._numberOfTime;
    }

    set numberOfTime(value: number) {
        this._numberOfTime = value;
    }

    get selectedPack(): PackStudent {
        return this._selectedPack;
    }

    set selectedPack(value: PackStudent) {
        this._selectedPack = value;
    }

    get studentList(): Array<Etudiant> {
        if (this._studentList == null) {
            this._studentList = new Array<Etudiant>();
        }
        return this._studentList;
    }

    set studentList(value: Array<Etudiant>) {
        this._studentList = value;
    }

    public findAllNiveauEtude(): Observable<Array<NiveauEtude>> {
        return this.http.get<Array<NiveauEtude>>(this.etudiantUrl + 'niveauEtude/');
    }

    public findAllFonction(): Observable<Array<Fonction>> {
        return this.http.get<Array<Fonction>>(this.etudiantUrl + 'fonction/');
    }

    public findAllInteretEtudiant(): Observable<Array<StatutSocial>> {
        return this.http.get<Array<StatutSocial>>(this.etudiantUrl + 'interetEtudiant/');
    }

    public findAllStatutSocial(): Observable<Array<Parcours>> {
        return this.http.get<Array<Parcours>>(this.etudiantUrl + 'statutSocial/');

    }

    public findAllSkill(): Observable<Array<Parcours>> {
        return this.http.get<Array<Parcours>>(this.etudiantUrl + 'skill/');

    }

    public getNumberOfStudents(): Observable<number> {
        return this.http.get<number>(this.publicUrl + 'number-of-student');
    }

    private _groupeEtudeList: Array<GroupeEtude>;

    public findAllCentre(): Observable<Array<Centre>> {
        return this.http.get<Array<Centre>>(this.adminUrl + 'centre/');
    }


    public findAllParcours(): Observable<Array<Parcours>> {
        return this.http.get<Array<Parcours>>(this.adminUrl + 'parcours/');

    }

    public findAllEtudiant(): Observable<Etudiant> {
        return this.http.get<Etudiant>(this.etudiantUrl + 'etudiant/id/' + this.serviceUser.getConnectedStudent().id + '/');
    }

    public findAllProf(): Observable<Array<Prof>> {
        return this.http.get<Array<Prof>>(this.adminUrl + 'prof/');

    }

    public findAllParcoursList(): Observable<Array<Parcours>> {
        return this.http.get<Array<Parcours>>(this.urlBase + this.urlParcours);
    }

    public findAllGroupeEtude(): Observable<Array<GroupeEtude>> {
        return this.http.get<Array<GroupeEtude>>(this.urlBase + this.urlGroupeEtude);
    }

    public findetudiantProf(): Observable<Array<Etudiant>> {
        return this.http.get<Array<Etudiant>>(this.adminUrl + 'etudiant/prof/id/' + this.selectedProf.id);
    }

    public findetudiantProf1(id: number): Observable<Array<Etudiant>> {
        return this.http.get<Array<Etudiant>>(this.adminUrl + 'etudiant/prof/id/' + id);
    }

    findByCriteria(std: Etudiant): Observable<Array<Etudiant>> {
        console.log(std);
        return this.http.post<Array<Etudiant>>(this.adminUrl + 'etudiant/search-all/', std);
    }

    public findAll(): Observable<Array<Etudiant>> {
        return this.http.get<Array<Etudiant>>(this.adminUrl + 'etudiant/');
    }

    public updateInscriptionByStudent(code: string, etudiant: Etudiant): Observable<number> {
        etudiant.id = this.serviceUser.getConnectedStudent().id;
        console.log(this.selected.id);
        return this.http.post<number>(this.etudiantUrl + 'inscription/update/pack/' + code, etudiant);
    }

    public updatePassword(newPassword: string, username: string): Observable<number> {
        return this.http.get<number>(this.etudiantUrl + 'etudiant/username/' +
            username + '/newpass/' + newPassword);
    }

    public deleteById(id: number): Observable<number> {
        console.log(id);
        return this.http.delete<number>(this.adminUrl + 'etudiant/id/' + id);
    }

    public deleteMultipleIndexById() {
        for (const item of this.selectes) {
            this.deleteIndexById(item.id);
        }
    }

    public deleteIndexById(id: number) {
        this.items.splice(this.findIndexById(id), 1);
    }

    public edit(): Observable<Etudiant> {
        return this.http.put<Etudiant>(this.adminUrl + 'etudiant/', this.selected);
    }

    public save(): Observable<Etudiant> {
        return this.http.post<Etudiant>(this.adminUrl + 'etudiant/', this.selected);
    }

    public findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    get groupeEtude(): GroupeEtude {
        if (this._groupeEtude == null) {
            this._groupeEtude = new GroupeEtude();
        }
        return this._groupeEtude;
    }

    set groupeEtude(value: GroupeEtude) {
        this._groupeEtude = value;
    }

    get selected(): Etudiant {
        if (this._selected == null) {
            this._selected = new Etudiant();
        }
        return this._selected;
    }

    set selected(value: Etudiant) {
        this._selected = value;
    }

    get selectedProf(): Prof {
        if (this._selectedProf == null) {
            this._selectedProf = new Prof();
        }
        return this._selectedProf;
    }

    set selectedProf(value: Prof) {
        this._selectedProf = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    get items(): Array<Etudiant> {
        if (this._items == null) {
            this._items = new Array<Etudiant>();
        }
        return this._items;
    }

    set items(value: Array<Etudiant>) {
        this._items = value;
    }

    private _itemsprof: Array<Prof>;

    get itemsprof(): Array<Prof> {
        if (this._itemsprof == null) {
            this._itemsprof = new Array<Prof>();
        }
        return this._itemsprof;
    }

    set itemsprof(value: Array<Prof>) {
        this._itemsprof = value;
    }

    private _selectes: Array<Etudiant>;

    get selectes(): Array<Etudiant> {
        if (this._selectes == null) {
            this._selectes = new Array<Etudiant>();
        }
        return this._selectes;
    }

    set selectes(value: Array<Etudiant>) {
        this._selectes = value;
    }

    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }

    get viewDialog(): boolean {
        return this._viewDialog;
    }

    set viewDialog(value: boolean) {
        this._viewDialog = value;
    }

    private _prof: Array<Prof>;

    get prof(): Array<Prof> {
        if (this._prof == null) {
            this._prof = new Array<Prof>();
        }
        return this._prof;
    }

    set prof(value: Array<Prof>) {
        this._prof = value;
    }

    get centreList(): Array<Centre> {
        if (this._centreList == null) {
            this._centreList = new Array<Centre>();
        }
        return this._centreList;
    }

    set centreList(value: Array<Centre>) {
        this._centreList = value;
    }

    get parcoursList(): Array<Parcours> {
        if (this._parcoursList == null) {
            this._parcoursList = new Array<Parcours>();
        }
        return this._parcoursList;
    }

    set parcoursList(value: Array<Parcours>) {
        this._parcoursList = value;
    }

    public create(): Observable<User> {
        return this.http.post<User>(this.etudiantUrl + 'etudiant/save/', this.selected);
    }

    public addStudentWithPack(selected: Etudiant, packId: number): Observable<any> {
        return this.http.post<User>(this.etudiantUrl + 'etudiant/save/pack/' + packId, selected);
    }

    get groupeEtudeList(): Array<GroupeEtude> {
        if (this._groupeEtudeList == null) {
            this._groupeEtudeList = new Array<GroupeEtude>();
        }
        return this._groupeEtudeList;
    }


    set groupeEtudeList(value: Array<GroupeEtude>) {
        this._groupeEtudeList = value;
    }

    get connectedStudent(): Map<number, User> {
        return this._connectedStudent;
    }

    set connectedStudent(value: Map<number, User>) {
        this._connectedStudent = value;
    }

    findGroupeById(id: number) {
        this.http.get<GroupeEtude>(this.adminUrl + 'groupeEtude/id/' + id).subscribe(
            data => {
                this.groupeEtude = data;
            }
        );
    }

    get interetEtudiant(): InteretEtudiant {
        if (this._interetEtudiant == null) {
            this._interetEtudiant = new InteretEtudiant();
        }
        return this._interetEtudiant;
    }

    set interetEtudiant(value: InteretEtudiant) {
        this._interetEtudiant = value;
    }

    get interetEtudiants(): Array<InteretEtudiant> {
        if (this._interetEtudiants == null) {
            this._interetEtudiants = new Array<InteretEtudiant>();
        }
        return this._interetEtudiants;
    }

    set interetEtudiants(value: Array<InteretEtudiant>) {
        this._interetEtudiants = value;
    }

    get fonctions(): Array<Fonction> {
        if (this._fonctions == null) {
            this._fonctions = new Array<Fonction>();
        }
        return this._fonctions;
    }

    set fonctions(value: Array<Fonction>) {
        this._fonctions = value;
    }

    get fonction(): Fonction {
        if (this._fonction == null) {
            this._fonction = new Fonction();
        }
        return this._fonction;
    }

    set fonction(value: Fonction) {
        this._fonction = value;
    }

    get statutSocial(): StatutSocial {
        if (this._statutSocial == null) {
            this._statutSocial = new StatutSocial();
        }
        return this._statutSocial;
    }

    set statutSocial(value: StatutSocial) {
        this._statutSocial = value;
    }

    get statutSocials(): Array<StatutSocial> {
        if (this._statutSocials == null) {
            this._statutSocials = new Array<StatutSocial>();
        }
        return this._statutSocials;
    }

    set statutSocials(value: Array<StatutSocial>) {
        this._statutSocials = value;
    }

    get niveauEtudes(): Array<NiveauEtude> {
        if (this._niveauEtudes == null) {
            this._niveauEtudes = new Array<NiveauEtude>();
        }
        return this._niveauEtudes;
    }

    set niveauEtudes(value: Array<NiveauEtude>) {
        this._niveauEtudes = value;
    }

    get niveauEtude(): NiveauEtude {
        if (this._niveauEtude == null) {
            this._niveauEtude = new NiveauEtude();
        }
        return this._niveauEtude;
    }

    set niveauEtude(value: NiveauEtude) {
        this._niveauEtude = value;
    }

    public findByEtudiantId(id: number): Observable<Inscription> {
        return this.http.get<Inscription>(this.etudiantUrl + 'inscription/id/' + id);
    }

    get skills(): Array<Skill> {
        if (this._skills == null) {
            this._skills = new Array<Skill>();
        }
        return this._skills;
    }

    set skill(value: Skill) {
        this._skill = value;
    }

    set skills(value: Array<Skill>) {
        this._skills = value;
    }

    get skill(): Skill {
        if (this._skills == null) {
            this._skill = new Skill();
        }
        return this._skill;
    }

    validateStudent(token: string): Observable<Etudiant> {
        return this.http.get<Etudiant>(this.etudiantUrl + 'etudiant/validate/' + token);
    }

    findById(idCurrentUser: string): Observable<Etudiant> {
        return this.http.get<Etudiant>(this.etudiantUrl + 'etudiant/id/' + idCurrentUser);
    }

    public startLevelTestForStudent(student: Etudiant): Observable<Etudiant> {
        return this.http.post<Etudiant>(this.publicUrl + 'start/test', student);
    }

    public verifyEmail(student: Etudiant, code: string): Observable<number> {
        return this.http.post<number>(this.publicUrl + 'verify/email/' + code, student);
    }

}
