/* tslint:disable:variable-name */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SessionCours} from '../model/session-cours.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Etudiant} from '../model/etudiant.model';
import {Prof} from '../model/prof.model';
import {EtudiantCours} from '../model/etudiant-cours.model';
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {EtudiantReviewService} from "./etudiant-review.service";

@Injectable({
    providedIn: 'root'
})
export class SessionCoursService {

    private adminUrl = environment.adminUrl;

    private url = environment.baseUrl + 'etudiantCours/';
    private _allprof: Array<Prof>;
    private _allstudent: Array<Etudiant>;
    private _profselected: Prof;
    private _allsessioncoursbyprofid: Array<SessionCours>;
    private _allsessioncours: Array<SessionCours>;
    private _searchbyprofname: Prof;
    private _searchbystudentname: Etudiant;
    private i: number;
    private nom: string;
    private id: number;

    get searchbyprofname(): Prof {
        if (this._searchbyprofname == null) {
            this._searchbyprofname = new Prof();
        }
        return this._searchbyprofname;
    }

    set searchbyprofname(value: Prof) {
        this._searchbyprofname = value;
    }

    get searchbystudentname(): Etudiant {
        if (this._searchbystudentname == null) {
            this._searchbystudentname = new Etudiant();
        }
        return this._searchbystudentname;
    }

    set searchbystudentname(value: Etudiant) {
        this._searchbystudentname = value;
    }

    get allstudent(): Array<Etudiant> {
        if (this._allstudent == null) {
            this._allstudent = new Array<Etudiant>();
        }
        return this._allstudent;
    }

    set allstudent(value: Array<Etudiant>) {
        this._allstudent = value;
    }

    get allsessioncours(): Array<SessionCours> {
        if (this._allsessioncours == null) {
            this._allsessioncours = new Array<SessionCours>();
        }

        return this._allsessioncours;
    }

    set allsessioncours(value: Array<SessionCours>) {
        this._allsessioncours = value;
    }

    get profselected(): Prof {
        if (this._profselected == null) {
            this._profselected = new Prof();
        }
        return this._profselected;
    }

    set profselected(value: Prof) {
        this._profselected = value;
    }

    get allprof(): Array<Prof> {
        if (this._allprof == null) {
            this._allprof = new Array<Prof>();
        }
        return this._allprof;
    }

    set allprof(value: Array<Prof>) {
        this._allprof = value;
    }

    get allsessioncoursbyprofid(): Array<SessionCours> {
        if (this._allsessioncoursbyprofid == null) {
            this._allsessioncoursbyprofid = new Array<SessionCours>();
        }
        return this._allsessioncoursbyprofid;
    }

    set allsessioncoursbyprofid(value: Array<SessionCours>) {
        this._allsessioncoursbyprofid = value;
    }

    constructor(private http: HttpClient, private messageService: MessageService, private router: Router, private review: EtudiantReviewService) {
    }

    private _items: Array<EtudiantCours>;

    get items(): Array<EtudiantCours> {
        if (this._items == null) {
            this._items = new Array<EtudiantCours>();
        }
        return this._items;
    }

    set items(value: Array<EtudiantCours>) {
        this._items = value;
    }

    private _selectedItems: Array<SessionCours>;

    get selectedItems(): Array<SessionCours> {
        if (this._selectedItems == null) {
            this._selectedItems = new Array<SessionCours>();
        }
        return this._selectedItems;
    }

    set selectedItems(value: Array<SessionCours>) {
        this._selectedItems = value;
    }

    private _itemsProf: Array<Prof>;

    get itemsProf(): Array<Prof> {
        if (this._itemsProf == null) {
            this._itemsProf = new Array<Prof>();
        }
        return this._itemsProf;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set itemsProf(value: Array<Prof>) {
        this._itemsProf = value;
    }


    // constructor(private messageService: MessageService,
    //             private confirmationService: ConfirmationService, private http: HttpClient) {

    private _itemsEtudiant: Array<Etudiant>;

    get itemsEtudiant(): Array<Etudiant> {
        if (this._itemsEtudiant == null) {
            this._itemsEtudiant = new Array<Etudiant>();
        }
        return this._itemsEtudiant;
    }

    set itemsEtudiant(value: Array<Etudiant>) {
        this._itemsEtudiant = value;
    }

    private _selected: EtudiantCours;

    get selected(): EtudiantCours {
        if (this._selected == null) {
            this._selected = new EtudiantCours();
        }
        return this._selected;
    }

    set selected(value: EtudiantCours) {
        this._selected = value;
    }

    private _selectes: Array<SessionCours>;

    get selectes(): Array<SessionCours> {
        if (this._selectes == null) {
            this._selectes = new Array<SessionCours>();
        }
        return this._selectes;
    }

    set selectes(value: Array<SessionCours>) {
        this._selectes = value;
    }

    private _createDialog: boolean;

    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    private _editDialog: boolean;

    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }

    private _viewDialog: boolean;

    get viewDialog(): boolean {
        return this._viewDialog;
    }

    set viewDialog(value: boolean) {
        this._viewDialog = value;
    }

    private _submitted: boolean;

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    findByCriteria(): Observable<Array<EtudiantCours>> {
        return this.http.post<Array<EtudiantCours>>(this.adminUrl + 'session/search', this.selected);
    }

    public findAll(): Observable<Array<EtudiantCours>> {
        return this.http.get<Array<EtudiantCours>>(this.adminUrl + 'etudiantCours/');
    }

    public findAllProf(): Observable<Array<Prof>> {
        return this.http.get<Array<Prof>>(this.adminUrl + 'prof/');
    }

    public findAllEtudiant(): Observable<Array<Etudiant>> {
        return this.http.get<Array<Etudiant>>(this.adminUrl + 'etudiant/');
    }

    public save(): Observable<SessionCours> {
        return this.http.post<SessionCours>(this.adminUrl + 'etudiantCours/', this.selected);
    }

    public edit(): Observable<EtudiantCours> {
        return this.http.put<EtudiantCours>(this.adminUrl + 'etudiantCours/', this.selected);
    }

    public update(session: SessionCours): Observable<SessionCours> {
        return this.http.put<SessionCours>(this.adminUrl + 'etudiantCours/', session);
    }

    public deleteByReference(): Observable<number> {
        return this.http.delete<number>(this.adminUrl + 'etudiantCours/id/' + this.selected.id);
    }

    public deleteMultipleByReference(): Observable<number> {
        return this.http.post<number>(this.adminUrl + 'etudiantCours/delete-multiple-by-id', this.selectes);
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

    public findallprof() {
        this.http.get<Array<Prof>>(this.adminUrl + 'prof/').subscribe(
            data => {
                if (data != null) {
                    this.allprof = data;
                }
            }
        );
    }

    public findallstudent() {
        this.http.get<Array<Etudiant>>(this.adminUrl + 'etudiant/').subscribe(
            data => {
                if (data != null) {
                    this.allstudent = data;
                }
            }
        );
    }

    public findallsessionscoursbyprofid(id: number) {
        this.http.get<Array<SessionCours>>(this.adminUrl + 'session/prof/id/' + id).subscribe(
            data => {
                if (data != null) {
                    this.allsessioncours = data;


                }
            }
        );
    }

    public findallsessionscoursbystudentid(id: number) {
        this.http.get<Array<SessionCours>>(this.adminUrl + 'session/etudiant/id/' + id).subscribe(
            data => {
                if (data != null) {
                    this.allsessioncours = data;
                }
            }
        );
    }

    public findallsession() {
        this.http.get<Array<SessionCours>>(this.adminUrl + 'session/').subscribe(
            data => {
                if (data != null) {
                    this.allsessioncours = data;
                }
            }
        );
    }

    // @ts-ignore
    /*
        public findprofbynom(nom: string): number {
            this.http.get<Prof>('http://localhost:8036/prof/prof/nom/' + nom).subscribe(
                data => {
                    if (data != null) {
                        console.log(data.id);
                        return data.id;
                    }
                }
            );
        }
    */

    getselectedvalueprof(event: any) {
        this.http.get<Prof>('http://localhost:8036/prof/prof/nom/' + event.target.value).subscribe(
            data => {
                if (data != null) {
                    this.findallsessionscoursbyprofid(data.id);
                }
            }
        );
    }


    public savesession(idprof: number, idetudiant: number, idcours: number) {
        // @ts-ignore
        this.http.post('http://localhost:8036/etudiant/session/' + idprof + '/' + idetudiant + '/' + idcours).subscribe(
            data => {
                // @ts-ignore
                if (data > 0) {

                }
            }
        );
    }



}
