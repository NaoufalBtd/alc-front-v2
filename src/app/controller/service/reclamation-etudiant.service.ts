import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ReclamationEtudiant} from '../model/reclamation-etudiant.model';
import {MessageService} from 'primeng/api';
import {Admin} from '../model/admin.model';

@Injectable({
    providedIn: 'root'
})
export class ReclamationEtudiantService {
    public adminReclamationEtudiant = environment.adminUrl + 'reclamationEtudiantAdmin';
    public etudiantReclamationEtudianturl = environment.etudiantUrl + 'reclamationEtudiantEtudiant';
    private _reclamationEtudiant: ReclamationEtudiant;
    private _reclamationEtudiantView: ReclamationEtudiant;
    private _reclamationEtudiantEdit: ReclamationEtudiant;
    private _reclamationEtudiantSerch: ReclamationEtudiant;
    private _reclamationEtudiantEtudiant: ReclamationEtudiant;
    private _reclamationEtudiantEtudiantList: Array<ReclamationEtudiant>;
    private _reclamationEtudiantList: Array<ReclamationEtudiant>;
    private _displayReclamationViewEtudiant: boolean = false;
    private _displayReclamationEtudiant: boolean = false;
    private _displayReclamationEditEtudiant: boolean = false;
    private _dateTraitementforEtudiant: Date;

// get set

    get dateTraitementforEtudiant(): Date {
        return this._dateTraitementforEtudiant;
    }

    set dateTraitementforEtudiant(value: Date) {
        this._dateTraitementforEtudiant = value;
    }

    get reclamationEtudiantSerch(): ReclamationEtudiant {
        if (this._reclamationEtudiantSerch == null) {
            this._reclamationEtudiantSerch = new ReclamationEtudiant();
        }
        return this._reclamationEtudiantSerch;
    }

    set reclamationEtudiantSerch(value: ReclamationEtudiant) {
        this._reclamationEtudiantSerch = value;
    }

    get reclamationEtudiantEdit(): ReclamationEtudiant {
        if (this._reclamationEtudiantEdit == null) {
            this._reclamationEtudiantEdit = new ReclamationEtudiant();
        }
        return this._reclamationEtudiantEdit;
    }

    set reclamationEtudiantEdit(value: ReclamationEtudiant) {
        this._reclamationEtudiantEdit = value;
    }

    get displayReclamationEditEtudiant(): boolean {
        return this._displayReclamationEditEtudiant;
    }

    set displayReclamationEditEtudiant(value: boolean) {
        this._displayReclamationEditEtudiant = value;
    }

    get reclamationEtudiantView(): ReclamationEtudiant {
        if (this._reclamationEtudiantView == null) {
            this._reclamationEtudiantView = new ReclamationEtudiant();
        }
        return this._reclamationEtudiantView;
    }

    set reclamationEtudiantView(value: ReclamationEtudiant) {
        this._reclamationEtudiantView = value;
    }

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

    public findReclamationEtudiantById(id: number, idprof: number) {
        this.http.get<ReclamationEtudiant>(this.etudiantReclamationEtudianturl + '/' + id + '/' + idprof).subscribe(
            data => {
                if (data != null) {
                    this.reclamationEtudiantView = data;
                }
            }
        );
    }

    public findReclamationEtudiantByIdAndStudentId(id: number, idStudent: number) {
        this.http.get<ReclamationEtudiant>(this.adminReclamationEtudiant + '/' + id + '/' + idStudent).subscribe(
            data => {
                if (data != null) {
                    this.reclamationEtudiantView = data;
                    this.reclamationEtudiantEdit = data;
                    console.log('wa l3fo yarbi');
                    console.log(this.reclamationEtudiantEdit);
                }
            }
        );
    }

    public findAllReclamationByEtudiantId(id: number) {
        console.log('id');
        console.log(id);
        this.http.get<Array<ReclamationEtudiant>>(this.etudiantReclamationEtudianturl + '/' + id).subscribe(
            data => {
                if (data != null) {
                    console.log('samaaaa');
                    this.reclamationEtudiantEtudiantList = data;
                } else {
                    console.log('samaaadzzadaza');
                }
            }
        );
    }

    public findAllByCriteria() {

        this.http.post<Array<ReclamationEtudiant>>(this.adminReclamationEtudiant + '/byCriteria', this.reclamationEtudiantSerch).subscribe(
            data => {
                if (data != null) {
                    console.log('samaaaa');
                    console.log(this.reclamationEtudiantSerch.traite);
                    this.reclamationEtudiantList = data;

                }

            }
        );
    }

    public saveReclamationEtudiant() {
        this.http.post(this.etudiantReclamationEtudianturl + '/', this.reclamationEtudiant).subscribe(
            data => {
                if (data > 0) {
                    this.findAllReclamationByEtudiantId(this.reclamationEtudiant.etudiant.id);
                    console.log('salam');
                    console.log(this.reclamationEtudiant.id);
                    this.reclamationEtudiant = null;
                    this.displayReclamationEtudiant = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Complaint Sent',
                        detail: 'Complaint Sent successfully'
                    });
                }
            }
        );
    }

    public reponseReclamationEtudiant(admin: Admin, dateTraitementforEtudiant: Date) {
        this.reclamationEtudiantEdit.admin = admin;
        this.http.put(this.adminReclamationEtudiant + '/update/' + dateTraitementforEtudiant, this.reclamationEtudiantEdit).subscribe(
            data => {
                if (data > 0) {
                    this.findAll();
                    this.displayReclamationEditEtudiant = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Teacher Complaint',
                        detail: 'Complaint sent with successfully'
                    });
                }
            }
        );
    }

    public viewReclamationEtudiant(idReclamationEtudiant1: number) {
        this.http.get(this.adminReclamationEtudiant + '/idReclamationEtudiant1/' + idReclamationEtudiant1).subscribe(
            data => {
                if (data > 0) {
                    this.findAll();
                }
            }
        );
    }

// constructor
    constructor(private http: HttpClient, private messageService: MessageService) {
    }
}
