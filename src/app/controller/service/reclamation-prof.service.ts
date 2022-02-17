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
    private _reclamationProfList: Array<ReclamationProf>;
    private _displayReclamationProf: boolean = false;
    private _displayReclamationViewProf: boolean = false;

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

    public reponseReclamationProf(idreclamationProf: number, commentaireTraiteur: number) {
        this.http.get(this.adminReclamationProf + '/' + idreclamationProf + '/' + commentaireTraiteur).subscribe(
            data => {
            }
        );
    }

    public saveReclamationProf() {
        this.http.post(this.profReclamationProf + '/', this.reclamationProf).subscribe(
            data => {
                if (data > 0) {
                    this.reclamationProf = null;
                    this.findAll();
                    this.displayReclamationProf=false;
                }
            }
        );
    }

// constructor
    constructor(private http: HttpClient) {
    }
}
