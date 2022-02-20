import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ReclamationEtudiant} from '../model/reclamation-etudiant.model';

@Injectable({
    providedIn: 'root'
})
export class ReclamationEtudiantService {
    public adminReclamationEtudiant = environment.adminUrl + 'reclamationEtudiantAdmin';
    private _reclamationEtudiant: ReclamationEtudiant;
    private _reclamationEtudiantEtudiant: ReclamationEtudiant;
    private _reclamationEtudiantEtudiantList: Array<ReclamationEtudiant>;
    private _reclamationEtudiantList: Array<ReclamationEtudiant>;
    private _displayReclamationViewEtudiant: boolean = false;
    private _displayReclamationEtudiant: boolean = false;

// get set

    get displayReclamationEtudiant(): boolean {
        return this._displayReclamationEtudiant;
    }

    set displayReclamationEtudiant(value: boolean) {
        this._displayReclamationEtudiant = value;
    }

    get reclamationEtudiantEtudiantList(): Array<ReclamationEtudiant> {
        if (this._reclamationEtudiantEtudiantList == null) {
            this._reclamationEtudiantEtudiantList = new Array<ReclamationEtudiant>();
        }
        return this._reclamationEtudiantEtudiantList;
    }

    set reclamationEtudiantEtudiantList(value: Array<ReclamationEtudiant>) {
        this._reclamationEtudiantEtudiantList = value;
    }

    get reclamationEtudiantEtudiant(): ReclamationEtudiant {
        if (this._reclamationEtudiantEtudiant == null) {
            this._reclamationEtudiantEtudiant = new ReclamationEtudiant();
        }
        return this._reclamationEtudiantEtudiant;
    }

    set reclamationEtudiantEtudiant(value: ReclamationEtudiant) {
        this._reclamationEtudiantEtudiant = value;
    }

    get displayReclamationViewEtudiant(): boolean {
        return this._displayReclamationViewEtudiant;
    }

    set displayReclamationViewEtudiant(value: boolean) {
        this._displayReclamationViewEtudiant = value;
    }

    get reclamationEtudiant(): ReclamationEtudiant {
        if (this._reclamationEtudiant == null) {
            this._reclamationEtudiant = new ReclamationEtudiant();
        }
        return this._reclamationEtudiant;
    }

    set reclamationEtudiant(value: ReclamationEtudiant) {
        this._reclamationEtudiant = value;
    }

    get reclamationEtudiantList(): Array<ReclamationEtudiant> {
        if (this._reclamationEtudiantList == null) {
            this._reclamationEtudiantList = new Array<ReclamationEtudiant>();
        }
        return this._reclamationEtudiantList;
    }

    set reclamationEtudiantList(value: Array<ReclamationEtudiant>) {
        this._reclamationEtudiantList = value;
    }

    // methode
    public findAll() {
        this.http.get<Array<ReclamationEtudiant>>(this.adminReclamationEtudiant + '/').subscribe(
            data => {
                if (data != null) {
                    this.reclamationEtudiantList = data;
                }
            }
        );
    }

    public reponseReclamationEtudiant(idreclamationEtudiant: number, commentaireTraiteur: number) {
        this.http.get(this.adminReclamationEtudiant + '/' + idreclamationEtudiant + '/' + commentaireTraiteur).subscribe(
            data => {
            }
        );
    }

// constructor
    constructor(private http: HttpClient) {
    }
}
