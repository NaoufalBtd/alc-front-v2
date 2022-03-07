/* tslint:disable:variable-name */
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {SyntheseSessionCours} from '../model/synthese-session-cours.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Etudiant} from '../model/etudiant.model';
import {LoginService} from './login.service';
import {GroupeEtudiant} from '../model/groupe-etudiant.model';
import {GroupeEtudiantDetail} from '../model/groupe-etudiant-detail.model';

@Injectable({
    providedIn: 'root'
})
export class SyntheseSessionCoursService {

    constructor(private http: HttpClient, private serviceUser: LoginService) {
    }
    private urlBase = environment.baseApi  ;
    private urlStudent = environment.etudiantUrl;
    private urlAdmin = environment.adminUrl;
    private urlParcours = '/admin/parcours/';
    private urlGroupeEtude = '/admin/groupeEtude/';
    private urlGroupeEtudiant = '/admin/groupeEtudiant/';
    private urlGroupeEtudiantDetail = '/admin/groupeEtudiantDetail/' ;
    private adminUrl = environment.adminUrl;
    private url = environment.baseUrl + 'etat/';
    private _items: Array<SyntheseSessionCours>;
    private _itemsEtudiant: Array<Etudiant>;
    private _selectes: Array<SyntheseSessionCours>;
    private _createDialog: boolean;
    private _selected: SyntheseSessionCours;
    private _editDialog: boolean;
    private _viewDialog: boolean;
    private _submitted: boolean;
    private _profilDiaglog: boolean;
    private etudiantUrl = environment.etudiantUrl;
    public findAll(): Observable<Array<SyntheseSessionCours>> {
        return this.http.get<Array<SyntheseSessionCours>>(this.adminUrl + 'etat/');
    }
    public findAllStudent(): Observable<Array<Etudiant>> {
        return this.http.get<Array<Etudiant>>(this.adminUrl + 'etudiant/prof/id/' + this.serviceUser.prof.id);
    }
    public findAllStudent2(): Observable<Array<GroupeEtudiant>> {
        return this.http.get<Array<GroupeEtudiant>>('http://localhost:8036/admin/' + 'groupeEtudiant/groupeProf/' + this.serviceUser.prof.id);
    }
    public findAllGroupeEtudiantDetail(id: number): Observable<Array<GroupeEtudiantDetail>> {
        return this.http.get<Array<GroupeEtudiantDetail>>(this.urlBase + this.urlGroupeEtudiant + 'id/' + id);
    }
    public save(): Observable<SyntheseSessionCours> {
        return this.http.post<SyntheseSessionCours>(this.adminUrl + 'etat/', this.selected);
    }

    public edit(): Observable<SyntheseSessionCours> {
        return this.http.put<SyntheseSessionCours>(this.adminUrl + 'etat/', this.selected);
    }

    public deleteByReference(): Observable<number> {
        return this.http.delete<number>(this.adminUrl + 'etat/reference/' + this.selected.reference);
    }

    public deleteMultipleByReference(): Observable<number> {
        return this.http.post<number>(this.adminUrl + 'etat/delete-multiple-by-reference', this.selectes);
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
    public lent(): number {
        return this.items.length;
    }

    public deleteIndexById(id: number) {
        this.items.splice(this.findIndexById(id), 1);
    }

    public deleteMultipleIndexById() {
        for (const item of this.selectes) {
            this.deleteIndexById(item.id);
        }
    }
    get itemsEtudiant(): Array<Etudiant> {
        if (this._itemsEtudiant == null) {
            this._itemsEtudiant = new Array<Etudiant>();
        }
        return this._itemsEtudiant;
    }

    set itemsEtudiant(value: Array<Etudiant>) {
        this._itemsEtudiant = value;
    }

    get items(): Array<SyntheseSessionCours> {
        if (this._items == null) {
            this._items = new Array<SyntheseSessionCours>();
        }
        return this._items;
    }

    set items(value: Array<SyntheseSessionCours>) {
        this._items = value;
    }

    get selected(): SyntheseSessionCours {
        if (this._selected == null) {
            this._selected = new SyntheseSessionCours();
        }
        return this._selected;
    }

    set selected(value: SyntheseSessionCours) {
        this._selected = value;
    }


    // constructor(private messageService: MessageService,
    //             private confirmationService: ConfirmationService, private http: HttpClient) {


    get selectes(): Array<SyntheseSessionCours> {
        if (this._selectes == null) {
            this._selectes = new Array<SyntheseSessionCours>();
        }
        return this._selectes;
    }

    set selectes(value: Array<SyntheseSessionCours>) {
        this._selectes = value;
    }



    get createDialog(): boolean {

        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }
    get profilDiaglog(): boolean {
        return this._profilDiaglog;
    }

    set profilDiaglog(value: boolean) {
        this._profilDiaglog = value;
    }

    get viewDialog(): boolean {
        return this._viewDialog;
    }

    set viewDialog(value: boolean) {
        this._viewDialog = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }
}
