import {Injectable} from '@angular/core';
import {Prof} from '../model/prof.model';
import {Admin} from '../model/admin.model';
import {Etudiant} from '../model/etudiant.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {MenuItem} from 'primeng/api';
import {User} from '../model/user.model';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    private adminUrl = environment.adminUrl;
    private _prof: Prof;
    private _etudiant: Etudiant;
    private _model: MenuItem[];
    private _admin: Admin;
    public hasloged: boolean=false;

    constructor(private http: HttpClient) {
    }

    public getConnectedStudent(): Etudiant {
        return JSON.parse(localStorage.getItem('user'));
    }

    public getConnectedProf(): Prof {
        return JSON.parse(localStorage.getItem('user'));
    }

    public getConnectedAdmin(): Admin {
        return JSON.parse(localStorage.getItem('user'));
    }

    public getConnecteUser(): User {
        return JSON.parse(localStorage.getItem('user'));
    }


    public findProf(username: string, password: string): Observable<Prof> {
        return this.http.get<Prof>(this.adminUrl + 'prof/login/' + username + '/password/' + password);
    }

    public findEtudiant(username: string, password: string): Observable<Etudiant> {
        return this.http.get<Etudiant>(this.adminUrl + 'etudiant/login/' + username + '/password/' + password);
    }

    public findAdmin(username: string, password: string): Observable<Admin> {
        return this.http.get<Admin>(this.adminUrl + 'admin/login/' + username + '/password/' + password);
    }

    get prof(): Prof {
        return this.getConnectedProf();
    }


    get admin(): Admin {
        return this.getConnectedAdmin();
    }



    get etudiant(): Etudiant {
        return this.getConnectedStudent();
    }


    get model(): MenuItem[] {
        return this._model;
    }

    set model(value: MenuItem[]) {
        this._model = value;
    }
}
