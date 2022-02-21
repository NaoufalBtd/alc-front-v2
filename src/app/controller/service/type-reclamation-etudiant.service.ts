import {Injectable} from '@angular/core';
import {TypeReclamationEtudiant} from '../model/type-reclamation-etudiant.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TypeReclamationEtudiantService {
    private adminTypeReclamationEtudiant = environment.adminUrl + 'typeReclamationEtudiantAdmin';
    private _typeReclamationEtudiant: TypeReclamationEtudiant;
    private _typeReclamationEtudiantList: Array<TypeReclamationEtudiant>;
    private _displayTypeReclamationEtudiant: boolean = false;

    get displayTypeReclamationEtudiant(): boolean {
        return this._displayTypeReclamationEtudiant;
    }

    set displayTypeReclamationEtudiant(value: boolean) {
        this._displayTypeReclamationEtudiant = value;
    }

    get typeReclamationEtudiant(): TypeReclamationEtudiant {
        if (this._typeReclamationEtudiant == null) {
            this._typeReclamationEtudiant = new TypeReclamationEtudiant();
        }
        return this._typeReclamationEtudiant;
    }

    set typeReclamationEtudiant(value: TypeReclamationEtudiant) {
        this._typeReclamationEtudiant = value;
    }

    get typeReclamationEtudiantList(): Array<TypeReclamationEtudiant> {
        if (this._typeReclamationEtudiantList == null) {
            this._typeReclamationEtudiantList = new Array<TypeReclamationEtudiant>();
        }
        return this._typeReclamationEtudiantList;
    }

    set typeReclamationEtudiantList(value: Array<TypeReclamationEtudiant>) {
        this._typeReclamationEtudiantList = value;
    }

// methode
    public findAll() {
        this.http.get<Array<TypeReclamationEtudiant>>(this.adminTypeReclamationEtudiant + '/').subscribe(
            data => {
                if (data != null) {
                    this.typeReclamationEtudiantList = data;
                }
            }
        );
    }

    public saveTypeReclamationEtudiant() {
        this.http.post(this.adminTypeReclamationEtudiant + '/', this.typeReclamationEtudiant).subscribe(
            data => {
                if (data > 0) {
                    this.typeReclamationEtudiant = null;
                    this.findAll();
                    this.displayTypeReclamationEtudiant=false;
                }
            }
        );
    }

// constructor
    constructor(private http: HttpClient) {
    }
}
