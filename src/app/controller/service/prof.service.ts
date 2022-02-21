/* tslint:disable:variable-name */
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Prof} from '../model/prof.model';
import {CategorieProf} from '../model/categorie-prof.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Etudiant} from '../model/etudiant.model';
import {User} from '../model/user.model';
import {LoginService} from './login.service';
import {Parcours} from '../model/parcours.model';
import {GroupeEtudiantDetail} from '../model/groupe-etudiant-detail.model';
import {SessionCours} from '../model/session-cours.model';

@Injectable({
    providedIn: 'root'
})
export class ProfService {

    private adminUrl = environment.adminUrl;
    private profUrl = environment.profUrl;
    private urlBase = environment.baseApi;
    private urlParcours = '/admin/parcours/';
    private _profListReclamation: Array<Prof>;
    prof: Prof = this.loginService.getConnectedProf();
    private _itemsCategorieProf: Array<CategorieProf>;
    private _listStudent: Array<Etudiant> = new Array<Etudiant>();

    private _submitted: boolean;
    private _selectedProf: Prof;
    private _listprof: Array<Prof>;


    constructor(private http: HttpClient,
                private loginService: LoginService) {
    }


    get profListReclamation(): Array<Prof> {
        if (this._profListReclamation == null) {
            this.profListReclamation = new Array<Prof>();
        }
        return this._profListReclamation;
    }

    set profListReclamation(value: Array<Prof>) {
        this._profListReclamation = value;
    }

    get listprof(): Array<Prof> {
        if (this._listprof == null) {
            this._listprof = new Array<Prof>();
        }
        return this._listprof;
    }

    set listprof(value: Array<Prof>) {
        this._listprof = value;
    }

    public findAllParcours(): Observable<Array<Parcours>> {
        return this.http.get<Array<Parcours>>(this.urlBase + this.urlParcours);
    }

    public save(): Observable<number> {
        return this.http.post<number>(this.adminUrl + 'prof/', this.selectedProf);
    }

    public savechatmsgs(prof: Prof): Observable<number> {
        return this.http.post<number>(this.adminUrl + 'prof/', prof);
    }

    public findbyid(num: number): Observable<Prof> {
        return this.http.get<Prof>(this.adminUrl + 'prof/id/' + num);
    }


    public findAllCategorieProf(): Observable<Array<CategorieProf>> {
        return this.http.get<Array<CategorieProf>>(this.adminUrl + 'categorieprof/');
    }

    public findAll(): Observable<Array<Prof>> {
        return this.http.get<Array<Prof>>(this.adminUrl + 'prof/');
    }


    get listStudent(): Array<Etudiant> {
        return this._listStudent;
    }

    set listStudent(value: Array<Etudiant>) {
        this._listStudent = value;
    }

    get selectedProf(): Prof {
        if (this._selectedProf == null) {
            this._selectedProf = new Prof();
        }
        return this._selectedProf;
    }

    set selectedProf(value: Prof) {
        this._selectedProf = value;
    }


    get itemsCategorieProf(): Array<CategorieProf> {
        if (this._itemsCategorieProf == null) {
            this._itemsCategorieProf = new Array<CategorieProf>();
        }
        return this._itemsCategorieProf;
    }

    set itemsCategorieProf(value: Array<CategorieProf>) {
        this._itemsCategorieProf = value;
    }


    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    public getConnectedStudent() {
        this.prof = this.loginService.getConnectedProf();
        this.http.get<Map<number, Etudiant>>(this.profUrl + 'prof/connected-student').subscribe(
            data => {
                this.listStudent.splice(0, this.listStudent.length);
                for (const item of Object.entries(data)) {
                    if (this.prof.id === Number(item[1].prof.id)) {
                        this.listStudent.push({...item[1]});
                    }
                }
                console.log(data);
                console.log(this.listStudent);
            }, error => {
                console.log(error);
            }
        );
    }


    removeConnectedStudent(id: number) {
        console.log(id);
        this.http.get<Map<number, Etudiant>>(this.profUrl + 'prof/remove-student/' + id).subscribe(
            data => {
                this.listStudent.splice(0, this.listStudent.length);
                for (const item of Object.values(data)) {
                    if (this.prof.id === item.id) {
                        this.listStudent.push({...item[1]});
                    }
                }
            }, error => {
                console.log(error);
            }
        );
    }
}


