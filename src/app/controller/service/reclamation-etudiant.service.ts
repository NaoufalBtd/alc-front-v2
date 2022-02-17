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
    private _reclamationEtudiantList: Array<ReclamationEtudiant>;
    private _displayReclamationViewEtudiant: boolean = false;


// get set

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
