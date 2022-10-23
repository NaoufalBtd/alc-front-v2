/* tslint:disable:variable-name */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Contact} from '../model/contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    adminUrl = environment.adminUrl;
    private _displayContactMessage: boolean;


    constructor(private http: HttpClient) {
    }


    get displayContactMessage(): boolean {
        return this._displayContactMessage;
    }

    set displayContactMessage(value: boolean) {
        this._displayContactMessage = value;
    }

    public findAll(): Observable<Array<Contact>> {
        return this.http.get<Array<Contact>>(this.adminUrl + 'contact/');
    }


    public findByEmail(email: string): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.adminUrl + 'contact/email/' + email);
    }

    public save(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(this.adminUrl + 'contact/', contact);
    }

    reply(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(this.adminUrl + 'contact/reply', contact);
    }
}
