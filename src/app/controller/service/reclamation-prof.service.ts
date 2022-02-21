import {Injectable} from '@angular/core';
import {ReclamationEtudiant} from '../model/reclamation-etudiant.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ReclamationProf} from '../model/reclamation-prof.model';
import {Prof} from '../model/prof.model';
import {Admin} from '../model/admin.model';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class ReclamationProfService {
    public adminReclamationProf = environment.adminUrl + 'reclamationProfAdmin';
    public profReclamationProf = environment.profUrl + 'reclamationProfProf';
    private _reclamationProf: ReclamationProf;
    private _reclamationProfView: ReclamationProf;
    private _reclamationProfEdit: ReclamationProf;
    private _reclamationProfSearch: ReclamationProf;
    private _reclamationProfList: Array<ReclamationProf>;
    private _reclamationProfEditList: Array<ReclamationProf>;
    private _displayReclamationProf: boolean = false;
    private _displayReclamationViewProf: boolean = false;
    private _idReclamationProf: number;
    private _displayReclamationEditProf: boolean = false;
    private _idreclamationprofedite: number;
    private _commentaire: string;
    private _dateTraitement: Date;

    get reclamationProfSearch(): ReclamationProf {
        if (this._reclamationProfSearch == null) {
            this._reclamationProfSearch = new ReclamationProf();
        }
        return this._reclamationProfSearch;
    }

    set reclamationProfSearch(value: ReclamationProf) {
        this._reclamationProfSearch = value;
    }

    get dateTraitement(): Date {
        return this._dateTraitement;
    }

    set dateTraitement(value: Date) {
        this._dateTraitement = value;
    }

    get idreclamationprofedite(): number {
        return this._idreclamationprofedite;
    }

    set idreclamationprofedite(value: number) {
        this._idreclamationprofedite = value;
    }

    get commentaire(): string {
        return this._commentaire;
    }

    set commentaire(value: string) {
        this._commentaire = value;
    }

    get reclamationProfEdit(): ReclamationProf {
        if (this._reclamationProfEdit == null) {
            this._reclamationProfEdit = new ReclamationProf();
        }
        return this._reclamationProfEdit;
    }

    set reclamationProfEdit(value: ReclamationProf) {
        this._reclamationProfEdit = value;
    }


    get reclamationProfEditList(): Array<ReclamationProf> {
        if (this._reclamationProfEditList == null) {
            this._reclamationProfEditList = new Array<ReclamationProf>();
        }
        return this._reclamationProfEditList;
    }

    set reclamationProfEditList(value: Array<ReclamationProf>) {
        this._reclamationProfEditList = value;
    }

    get displayReclamationEditProf(): boolean {
        return this._displayReclamationEditProf;
    }

    set displayReclamationEditProf(value: boolean) {
        this._displayReclamationEditProf = value;
    }

    get idReclamationProf(): number {
        return this._idReclamationProf;
    }

    set idReclamationProf(value: number) {
        this._idReclamationProf = value;
    }

    get reclamationProfView(): ReclamationProf {
        if (this._reclamationProfView == null) {
            this._reclamationProfView = new ReclamationProf();
        }
        return this._reclamationProfView;
    }

    set reclamationProfView(value: ReclamationProf) {
        this._reclamationProfView = value;
    }

    get displayReclamationViewProf(): boolean {
        return this._displayReclamationViewProf;
    }

    set displayReclamationViewProf(value: boolean) {
        this._displayReclamationViewProf = value;
    }

    get displayReclamationProf(): boolean {
        return this._displayReclamationProf;
    }

    set displayReclamationProf(value: boolean) {
        this._displayReclamationProf = value;
    }

    get reclamationProf(): ReclamationProf {
        if (this._reclamationProf == null) {
            this._reclamationProf = new ReclamationProf();
        }
        return this._reclamationProf;
    }

    set reclamationProf(value: ReclamationProf) {
        this._reclamationProf = value;
    }

    get reclamationProfList(): Array<ReclamationProf> {
        if (this._reclamationProfList == null) {
            this._reclamationProfList = new Array<ReclamationProf>();
        }
        return this._reclamationProfList;
    }

    set reclamationProfList(value: Array<ReclamationProf>) {
        this._reclamationProfList = value;
    }

// methode
    public findAll() {
        this.http.get<Array<ReclamationProf>>(this.adminReclamationProf + '/').subscribe(
            data => {
                if (data != null) {
                    this.reclamationProfList = data;
                }
            }
        );
    }
    public findAllByCriteria() {
        this.http.post<Array<ReclamationProf>>(this.adminReclamationProf + '/byCriteria', this.reclamationProfSearch).subscribe(
            data => {
                if (data != null) {
                    this.reclamationProfList = data;
                }

            }
        );
    }
    public findReclamationProfByProfId(idProf: number) {
        this.http.get<Array<ReclamationProf>>(this.adminReclamationProf + '/prof/' + idProf).subscribe(
            data => {
                if (data != null) {
                    this.reclamationProfList = data;
                }
            }
        );
    }

    public reponseReclamationProf(admin: Admin, dateTraitement: Date) {
        this.reclamationProfEdit.admin = admin;
        console.log('sakjbkdvdshjdbserjk');
        console.log(this.reclamationProfEdit.admin);
        this.http.put(this.adminReclamationProf + '/reponseProf/' + dateTraitement, this.reclamationProfEdit).subscribe(
            data => {
                if (data > 0) {
                    this.findAll();
                    this.displayReclamationEditProf = false;
                    this.messageService.add({severity: 'success', summary: 'Teacher Complaint', detail: 'Message sent with successfully'});

                }
            }
        );
    }

    public findReclamationEtudiantById(idreclamationProf: number) {
        this.http.get<ReclamationProf>(this.adminReclamationProf + '/' + idreclamationProf).subscribe(
            data => {
                if (data != null) {
                    this.reclamationProfView = data;
                }
            }
        );
    }

    public findReclamationEtudiantByIdEdit(idreclamationProf: number) {
        this.http.get<ReclamationProf>(this.adminReclamationProf + '/' + idreclamationProf).subscribe(
            data => {
                if (data != null) {
                    this.reclamationProfEdit = data;
                }
            }
        );
    }

    public findReclamationProfByIdAndProfId(idreclamationProf: number, idprof: number) {
        this.http.get<ReclamationProf>(this.profReclamationProf + '/' + idreclamationProf + '/' + idprof).subscribe(
            data => {
                if (data != null) {
                    this.reclamationProfView = data;
                }
            }
        );
    }

    public saveReclamationProf() {
        console.log('xqcq');
        this.http.post(this.profReclamationProf + '/', this.reclamationProf).subscribe(
            data => {
                if (data > 0) {
                    this.reclamationProf = null;
                    this.findAll();
                    this.displayReclamationProf = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Teacher Complaint',
                        detail: 'Complaint sent with successfully'
                    });
                }
            }
        );
    }

// constructor
    constructor(private http: HttpClient, private messageService: MessageService) {
    }
}
