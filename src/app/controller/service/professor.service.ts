/* tslint:disable:variable-name */
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Prof} from '../model/prof.model';
import {Paiement} from '../model/paiement.model';
import {SessionCours} from '../model/session-cours.model';
import {LoginService} from './login.service';
import {EtudiantCours} from '../model/etudiant-cours.model';


@Injectable({
    providedIn: 'root'
})
export class ProfessorService {
    private _submitted: boolean;
    private _editDialog: boolean;
    private _createDialog: boolean;
    private _selectes: Array<Prof>;
    private _paiement: Paiement;
    private _viewDialogProf: boolean;
    private _itemsPaiement: Array<Paiement>;
    private _viewDialog: boolean;
    private _selectedPaiement: Paiement;
    private _itemsSession: Array<EtudiantCours>;
    private _items: Array<Prof>;
    private _selected: Prof;
    private adminUrl = environment.adminUrl;
    public afficheSession(id: number): Observable<Array<EtudiantCours>> {
        return this.http.get<Array<EtudiantCours>>(this.adminUrl + 'etudiantCours/prof/id/' + id);
    }
    public afficheSessionStd(id: number): Observable<Array<EtudiantCours>> {
        return this.http.get<Array<EtudiantCours>>(this.adminUrl + 'etudiantCours/prof/id/' + this.user.prof.id + '/etudiant/id/' + id );
    }
    /*paiement*/
    public paiementProf(): Observable<Array<Paiement>> {
        return this.http.get<Array<Paiement>>(this.adminUrl + '/prof/paiement');
    }

    findByCriteria(prof: Prof): Observable<Array<Prof>> {
        return this.http.post<Array<Prof>>(this.adminUrl + 'prof/search', prof);
    }

    public findAll(): Observable<Array<Prof>> {
        return this.http.get<Array<Prof>>(this.adminUrl + 'prof/');
    }

    public Search(): Observable<Array<Prof>> {
        return this.http.get<Array<Prof>>(this.adminUrl + 'prof/nom/' + this.selected.nom);
    }

    public save(): Observable<Prof> {
        return this.http.post<Prof>(this.adminUrl + 'prof/', this.selected);
    }

    public edit(): Observable<Prof> {
        return this.http.put<Prof>(this.adminUrl + 'prof/', this.selected);
    }

    public deleteByReference(): Observable<number> {
        return this.http.delete<number>(this.adminUrl + 'prof/id/' + this.selected.id);
    }

    public deleteMultipleByReference(): Observable<number> {
        return this.http.post<number>(this.adminUrl + 'prof/delete-multiple-by-id', this.selectes);
    }

    public payer(paiement: Paiement): Observable<Paiement> {
        return this.http.post<Paiement>(this.adminUrl + 'paiement/', paiement);
    }

    public findSessionNonPayer(id: number): Observable<Array<EtudiantCours>> {
        return this.http.get<Array<EtudiantCours>>(this.adminUrl + 'prof/sessionNonPayer/prof/id/' + id);
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

    public deleteIndexById(id: number) {
        this.items.splice(this.findIndexById(id), 1);
    }

    public deleteMultipleIndexById() {
        for (const item of this.selectes) {
            this.deleteIndexById(item.id);
        }
    }
    constructor(private http: HttpClient, private user: LoginService) {
    }


    get items(): Array<Prof> {
        if (this._items == null) {
            this._items = new Array<Prof>();
        }
        return this._items;
    }

    set items(value: Array<Prof>) {
        this._items = value;
    }



    get itemsSession(): Array<EtudiantCours> {
        if (this._itemsSession == null){
            this._itemsSession = new Array<EtudiantCours>();
        }
        return this._itemsSession;
    }

    set itemsSession(value: Array<EtudiantCours>) {
        this._itemsSession = value;
    }

    get selected(): Prof {
        if (this._selected == null) {
            this._selected = new Prof();
        }
        return this._selected;
    }

    set selected(value: Prof) {
        this._selected = value;
    }


    get selectes(): Array<Prof> {
        if (this._selectes == null) {
            this._selectes = new Array<Prof>();
        }
        return this._selectes;
    }

    set selectes(value: Array<Prof>) {
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


    get viewDialog(): boolean {
        return this._viewDialog;
    }

    set viewDialog(value: boolean) {
        this._viewDialog = value;
    }


    get submitted(): boolean {
        return this._submitted;
    }


    // constructor(private messageService: MessageService,
    //             private confirmationService: ConfirmationService, private http: HttpClient) {

    set submitted(value: boolean) {
        this._submitted = value;
    }



    get itemsPaiement(): Array<Paiement> {
        if (this._itemsPaiement == null) {
            this._itemsPaiement = new Array<Paiement>();
        }
        return this._itemsPaiement;
    }

    set itemsPaiement(value: Array<Paiement>) {
        this._itemsPaiement = value;
    }

    get selectedPaiement(): Paiement {
        if (this._selectedPaiement == null) {
            this._selectedPaiement = new Paiement();
        }
        return this._selectedPaiement;
    }

    set selectedPaiement(value: Paiement) {
        this._selectedPaiement = value;
    }



    get viewDialogProf(): boolean {
        return this._viewDialogProf;
    }

    set viewDialogProf(value: boolean) {
        this._viewDialogProf = value;
    }


    get paiement(): Paiement {
        if (this._paiement == null) {
            this._paiement = new Paiement();
        }
        return this._paiement;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set paiement(value: Paiement) {
        this._paiement = value;
    }


}
