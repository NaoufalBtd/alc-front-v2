import {Injectable} from '@angular/core';
import {ReclamationEtudiant} from '../model/reclamation-etudiant.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ReclamationProf} from '../model/reclamation-prof.model';

@Injectable({
    providedIn: 'root'
})
export class ReclamationProfService {
    public adminReclamationProf = environment.adminUrl + 'reclamationProfAdmin';
    public profReclamationProf = environment.profUrl + 'reclamationProfAdmin';
    private _reclamationProf: ReclamationProf;
    private _reclamationProfView: ReclamationProf;
    private _reclamationProfEdit: ReclamationProf;
    private _reclamationProfList: Array<ReclamationProf>;
    private _reclamationProfEditList: Array<ReclamationProf>;
    private _displayReclamationProf: boolean = false;
    private _displayReclamationViewProf: boolean = false;
    private _idReclamationProf: number;
    private _displayReclamationEditProf: boolean = false;
    private _idreclamationprofedite: number;
    private _commentaire: string;


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

    public reponseReclamationProf(idreclamationProf: number, commentaireTraiteur: string) {
        this.http.get(this.adminReclamationProf + '/' + idreclamationProf + '/' + commentaireTraiteur).subscribe(
            data => {
                if (data > 0) {
                    this.findAll();
                    this.displayReclamationEditProf = false;
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

    public saveReclamationProf() {
        this.http.post(this.profReclamationProf + '/', this.reclamationProf).subscribe(
            data => {
                if (data > 0) {
                    this.reclamationProf = null;
                    this.findAll();
                    this.displayReclamationProf = false;
                }
            }
        );
    }

// constructor
    constructor(private http: HttpClient) {
    }
}
