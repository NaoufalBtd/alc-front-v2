import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupeEtudiant} from '../model/groupe-etudiant.model';
import {Observable} from 'rxjs';
import {GroupeEtude} from '../model/groupe-etude.model';

import {Etudiant} from '../model/etudiant.model';
import {GroupeEtudiantDetail} from '../model/groupe-etudiant-detail.model';
import {Parcours} from '../model/parcours.model';
import {environment} from '../../../environments/environment';
import {Prof} from '../model/prof.model';

@Injectable({
    providedIn: 'root'
})
export class GroupeEtudiantService {

    constructor(private http: HttpClient) {
    }

    private urlBase = environment.baseApi;
    private urlStudent = environment.etudiantUrl;
    private urlAdmin = environment.adminUrl;
    private urlParcours = '/admin/parcours/';
    private urlGroupeEtude = '/admin/groupeEtude/';
    private urlGroupeEtudiant = '/admin/groupeEtudiant/';
    private urlGroupeEtudiantDetail = '/admin/groupeEtudiantDetail/';
    private _groupeEtudiant: GroupeEtudiant;
    private _groupeEtudiants: Array<GroupeEtudiant>;
    private _selectes: Array<GroupeEtudiant>;
    private _createDialog: boolean = false;
    private _createDialog2: boolean;
    private _editDialog: boolean;
    // tslint:disable-next-line:variable-name
    private _viewDialog: boolean;
    // tslint:disable-next-line:variable-name

    // tslint:disable-next-line:variable-name
    private _groupeEtudeList: Array<GroupeEtude>;
    // tslint:disable-next-line:variable-name
    private _groupeEtudiantDetail: GroupeEtudiantDetail;
    // tslint:disable-next-line:variable-name
    private _groupeEtudiantDetails: Array<GroupeEtudiantDetail>;
    private _etudiantList: Array<Etudiant>;
    private _etudiantList2: Array<Etudiant>;
    private _parcoursList: Array<Parcours>;
    private _prof: Prof;
    private _profs: Array<Prof>;
    private _parcours: Parcours;
    // tslint:disable-next-line:variable-name
    private _etudiant: Etudiant;
    private _etudiant2: Etudiant;
    private adminUrl = environment.adminUrl;
    private profUrl = environment.profUrl;

    public save(): Observable<GroupeEtudiant> {
        return this.http.post<GroupeEtudiant>(this.urlBase + this.urlGroupeEtudiant, this.groupeEtudiant);
    }

    public findAllProf(): Observable<Array<Prof>> {
        return this.http.get<Array<Prof>>(this.adminUrl + 'prof/');
    }

    public findAll(): Observable<Array<GroupeEtudiant>> {
        return this.http.get<Array<GroupeEtudiant>>(this.urlBase + this.urlGroupeEtudiant);
    }

    public findAllByProfId(id: number): Observable<Array<GroupeEtudiant>> {
        return this.http.get<Array<GroupeEtudiant>>(this.profUrl + 'groupeEtudiant/prof/id/' + id);
    }


    public findAllGroupeEtude(): Observable<Array<GroupeEtude>> {
        return this.http.get<Array<GroupeEtude>>(this.urlBase + this.urlGroupeEtude);
    }

    public deleteByLibelle(): Observable<number> {
        return this.http.delete<number>(this.urlBase + this.urlGroupeEtudiant + 'id/' + this.groupeEtudiant.id);
    }

    public deleteGroupeEtudiantDetailById(id: number): Observable<number> {
        return this.http.delete<number>(this.urlBase + this.urlGroupeEtudiantDetail + 'id/' + id);
    }

    public findAllGroupeEtudiantDetail(id: number): Observable<Array<GroupeEtudiantDetail>> {
        return this.http.get<Array<GroupeEtudiantDetail>>(this.urlBase + this.urlGroupeEtudiant + 'id/' + id);
    }

    // tslint:disable-next-line:ban-types
    public findEtudiantListByParcoursLibelle(libelle: string): Observable<Array<Etudiant>> {
        return this.http.get<Array<Etudiant>>(this.urlBase + '/admin/etudiant/libelle/' + libelle);
    }

    public findAllEtudiant(): Observable<Array<Etudiant>> {
        return this.http.get<Array<Etudiant>>(this.urlBase + '/admin/' + 'etudiant/');
    }

    public findAllParcours(): Observable<Array<Parcours>> {
        return this.http.get<Array<Parcours>>(this.urlBase + this.urlParcours);
    }

    public addEtudiant() {
        this.groupeEtudiant.groupeEtudiantDetails.push({...this._groupeEtudiantDetail});
        this.groupeEtudiantDetail = null;
    }

    public edit(): Observable<GroupeEtudiant> {
        return this.http.put<GroupeEtudiant>(this.urlBase + this.urlGroupeEtudiant, this.groupeEtudiant);
    }

    public deleteMultipleByLibelle(): Observable<number> {
        return this.http.post<number>(this.urlBase + this.urlGroupeEtudiant + 'delete-multiple-by-id', this.groupeEtudiants);
    }

    public deleteMultipleIndexById() {
        for (const item of this.selectes) {
            this.deleteIndexById(item.id);
        }
    }

    public deleteIndexById(id: number) {
        this.groupeEtudiants.splice(this.findIndexById(id), 1);
    }

    public findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.groupeEtudiants.length; i++) {
            if (this.groupeEtudiants[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    get etudiantList(): Array<Etudiant> {
        if (this._etudiantList == null) {
            this._etudiantList = new Array<Etudiant>();
        }
        return this._etudiantList;
    }

    set etudiantList(value: Array<Etudiant>) {
        this._etudiantList = value;
    }

    get etudiantList2(): Array<Etudiant> {
        if (this._etudiantList2 == null) {
            this._etudiantList2 = new Array<Etudiant>();
        }
        return this._etudiantList2;
    }

    set etudiantList2(value: Array<Etudiant>) {
        this._etudiantList2 = value;
    }

    get groupeEtudeList(): Array<GroupeEtude> {
        if (this._groupeEtudeList == null) {
            this._groupeEtudeList = new Array<GroupeEtude>();
        }
        return this._groupeEtudeList;
    }


    get prof(): Prof {
        if (this._prof == null) {
            this._prof = new Prof();
        }
        return this._prof;
    }

    set prof(value: Prof) {
        this._prof = value;
    }

    get parcoursList(): Array<Parcours> {
        if (this._parcoursList == null) {
            this.parcoursList = new Array<Parcours>();
        }
        return this._parcoursList;
    }

    set parcoursList(value: Array<Parcours>) {
        this._parcoursList = value;
    }


    get profs(): Array<Prof> {
        if (this._profs == null) {
            this._profs = new Array<Prof>();
        }
        return this._profs;
    }

    set profs(value: Array<Prof>) {
        this._profs = value;
    }

    get parcours(): Parcours {
        if (this._parcours == null) {
            this._parcours = new Parcours();
        }
        return this._parcours;
    }

    set parcours(value: Parcours) {
        this._parcours = value;
    }

    set groupeEtudeList(value: Array<GroupeEtude>) {
        this._groupeEtudeList = value;
    }

    get etudiant(): Etudiant {
        if (this._etudiant == null) {
            this._etudiant = new Etudiant();
        }
        return this._etudiant;
    }

    set etudiant2(value: Etudiant) {
        this._etudiant2 = value;
    }

    get etudiant2(): Etudiant {
        if (this._etudiant2 == null) {
            this._etudiant2 = new Etudiant();
        }
        return this._etudiant2;
    }

    set etudiant(value: Etudiant) {
        this._etudiant = value;
    }

    get groupeEtudiantDetail(): GroupeEtudiantDetail {
        if (this._groupeEtudiantDetail == null) {
            this._groupeEtudiantDetail = new GroupeEtudiantDetail();
        }
        return this._groupeEtudiantDetail;
    }

    set groupeEtudiantDetail(value: GroupeEtudiantDetail) {
        this._groupeEtudiantDetail = value;
    }

    get groupeEtudiantDetails(): Array<GroupeEtudiantDetail> {
        if (this._groupeEtudiantDetails == null) {
            this._groupeEtudiantDetails = new Array<GroupeEtudiantDetail>();
        }
        return this._groupeEtudiantDetails;
    }

    set groupeEtudiantDetails(value: Array<GroupeEtudiantDetail>) {
        this._groupeEtudiantDetails = value;
    }

    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    get createDialog2(): boolean {
        return this._createDialog2;
    }

    set createDialog2(value: boolean) {
        this._createDialog2 = value;
    }

    get viewDialog(): boolean {
        return this._viewDialog;
    }

    set viewDialog(value: boolean) {
        this._viewDialog = value;
    }

    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }

    get groupeEtudiant(): GroupeEtudiant {
        if (this._groupeEtudiant == null) {
            this._groupeEtudiant = new GroupeEtudiant();
        }
        return this._groupeEtudiant;
    }

    set groupeEtudiant(value: GroupeEtudiant) {
        this._groupeEtudiant = value;
    }


    get groupeEtudiants(): Array<GroupeEtudiant> {
        if (this._groupeEtudiants == null) {
            this._groupeEtudiants = new Array<GroupeEtudiant>();
        }
        return this._groupeEtudiants;
    }

    set groupeEtudiants(value: Array<GroupeEtudiant>) {
        this._groupeEtudiants = value;
    }

    get selectes(): Array<GroupeEtudiant> {
        if (this._selectes == null) {
            this._selectes = new Array<GroupeEtudiant>();
        }
        return this._selectes;
    }

    set selectes(value: Array<GroupeEtudiant>) {
        this._selectes = value;
    }


    public findGroupeEtudiantDetailByEtudiantId(id: number): Observable<Array<GroupeEtudiantDetail>> {
        return this.http.get<Array<GroupeEtudiantDetail>>(this.urlStudent + 'groupeEtudiantDetail/etudiant/id/' + id);
    }

    public searchGroupStudent(groupStudent: GroupeEtudiant): Observable<Array<GroupeEtudiant>> {
        return this.http.post<Array<GroupeEtudiant>>(this.urlAdmin + 'groupeEtudiant/search/', groupStudent);
    }

    public searchGroupStudentDetail(groupStudentDetail: GroupeEtudiantDetail): Observable<Array<GroupeEtudiantDetail>> {
        return this.http.post<Array<GroupeEtudiantDetail>>(this.urlAdmin + 'groupeEtudiantDetail/search/', groupStudentDetail);
    }

}
