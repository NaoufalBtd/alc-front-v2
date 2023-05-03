import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Email} from '../model/email';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Etudiant} from '../model/etudiant.model';
import {GroupeEtudiant} from '../model/groupe-etudiant.model';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    adminUrl = environment.adminUrl + 'emails/';
    private _emails: Email[];
    private _selectedEmail: Email;
    private _showCompose = false;
    private _showDetail = false;
    private _students: Array<Etudiant> = new Array<Etudiant>();
    private _groups: Array<GroupeEtudiant> = new Array<GroupeEtudiant>();

    constructor(private http: HttpClient) {
    }


    get showDetail(): boolean {
        return this._showDetail;
    }

    set showDetail(value: boolean) {
        this._showDetail = value;
    }

    get selectedEmail(): Email {
        return this._selectedEmail;
    }

    set selectedEmail(value: Email) {
        this._selectedEmail = value;
    }

    get groups(): Array<GroupeEtudiant> {
        return this._groups;
    }

    set groups(value: Array<GroupeEtudiant>) {
        this._groups = value;
    }


    get students(): Array<Etudiant> {
        return this._students;
    }

    set students(value: Array<Etudiant>) {
        this._students = value;
    }

    get showCompose(): boolean {
        return this._showCompose;
    }

    set showCompose(value: boolean) {
        this._showCompose = value;
    }

    get emails(): Email[] {
        return this._emails;
    }

    set emails(value: Email[]) {
        this._emails = value;
    }

    public save(email: Email): Observable<Email> {
        return this.http.post<Email>(this.adminUrl, email);
    }

    public findAll() {
        this.http.get<Email[]>(this.adminUrl).subscribe(data => this._emails = data, error => console.log(error));
    }
}
