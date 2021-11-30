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
@Injectable({
    providedIn: 'root'
})
export class EtudiantService {
    constructor(private http: HttpClient, public serviceUser: LoginService) {
    }
    private adminUrl = environment.adminUrl;

    private etudiantUrl = environment.etudiantUrl;
    private url = environment.baseUrl + 'etudiant/';
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




    private _groupeEtudeList: Array<GroupeEtude>;

    public findAllCentre(): Observable<Array<Centre>> {
        return this.http.get<Array<Centre>>(this.adminUrl + 'centre/');
    }


    public findAllParcours(): Observable<Array<Parcours>> {
        return this.http.get<Array<Parcours>>(this.adminUrl + 'parcours/');

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

    findByCriteria() {
        console.log(this.etudiantVo);
        this.http.post<Array<Etudiant>>(this.adminUrl + 'etudiant/search', this.etudiantVo).subscribe(
            data => {
                console.log(data);
                this.items = data;
            }, error => {
                console.log('la fonction ne fonctionne pas');
            }
        );
    }

    public findAll(): Observable<Array<Etudiant>> {
        return this.http.get<Array<Etudiant>>(this.adminUrl + 'etudiant/');
    }

    public deleteMultipleByNom(): Observable<number> {
        return this.http.post<number>(this.adminUrl + 'delete-multiple-by-id', this.selectes);
    }

    public deleteByNom(): Observable<number> {
        return this.http.delete<number>(this.adminUrl + 'etudiant/id/' + this.selected.id);
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


    get etudiantByProf(): Array<Etudiant> {
        if (this._etudiantByProf == null) {
            this._etudiantByProf = new Array<Etudiant>();
        }
        return this._etudiantByProf;
    }

    set etudiantByProf(value: Array<Etudiant>) {
        this._etudiantByProf = value;
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

    get etudiantVo(): EtudiantVo {
        if (this._etudiantVo == null) {
            this._etudiantVo = new EtudiantVo();
        }
        return this._etudiantVo;
    }

    set etudiantVo(value: EtudiantVo) {
        this._etudiantVo = value;
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

    private _selecteetudiant: Array<Etudiant>;

    get selecteetudiant(): Array<Etudiant> {
        if (this._selecteetudiant == null) {
            this._selecteetudiant = new Array<Etudiant>();
        }
        return this._selecteetudiant;
    }

    set selecteetudiant(value: Array<Etudiant>) {
        this._selecteetudiant = value;
    }

    get submittedetudiant(): Etudiant {
        return this._submittedetudiant;
    }

    set submittedetudiant(value: Etudiant) {
        this._submittedetudiant = value;
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

    public create(): Observable<Etudiant> {
        return this.http.post<Etudiant>(this.etudiantUrl + 'etudiant/save/', this.selected);
    }

    get groupeEtudeList(): Array<GroupeEtude> {
        if (this._groupeEtudeList == null)
        {
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
}
