import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {NiveauEtude} from '../model/niveau-etude.model';
import {StatutSocial} from '../model/statut-social.model';
import {Fonction} from '../model/fonction.model';
import {InteretEtudiant} from '../model/interet-etudiant.model';
import {Parcours} from '../model/parcours.model';
import {Etudiant} from '../model/etudiant.model';
import {Skill} from '../model/skill.model';

@Injectable({providedIn: 'root'})
export class UserService {
    private _skill: Skill;
    private _skills: Array<Skill>;

    private _niveauEtudes: Array<NiveauEtude>;
    private _niveauEtude: NiveauEtude;
    private _statutSocial: StatutSocial;
    private _statutSocials: Array<StatutSocial>;
    private _fonctions: Array<Fonction>;
    private _fonction: Fonction;
    private _interetEtudiant: InteretEtudiant;
    private _interetEtudiants: Array<InteretEtudiant>;
    private _selected: Etudiant;
    private  adminUrl= environment.adminUrl;
    private  etudiantUrl= environment.etudiantUrl;
    private host = environment.baseApi;
    get selected(): Etudiant {
        if (this._selected == null) {
            this._selected = new Etudiant();
        }
        return this._selected;
    }

    public findAllSkill(): Observable<Array<Parcours>> {
        return this.http.get<Array<Parcours>>(this.etudiantUrl + 'skill/');

    }
    get skills(): Array<Skill> {
        if (this._skills == null)
        {
            this._skills = new Array<Skill>();
        }
        return this._skills;
    }
    set skill(value: Skill) {
        this._skill = value;
    }

    set skills(value: Array<Skill>) {
        this._skills = value;
    }

    get skill(): Skill {
        if (this._skills == null)
        {
            this._skill = new Skill();
        }
        return this._skill;
    }


    set selected(value: Etudiant) {
        this._selected = value;
    }
    constructor(private http: HttpClient) {
    }
    public edit(etudiant: Etudiant): Observable<Etudiant> {
        return this.http.put<Etudiant>(this.adminUrl + 'etudiant/', etudiant);
    }
    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.host}/user/`);
    }

    public addUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.host}/user/add`, user);
    }

    public updateUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.host}/user/update`, user);
    }


    public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
        return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData,
            {
                reportProgress: true,
                observe: 'events'
            });
    }

    public findAllNiveauEtude(): Observable<Array<NiveauEtude>> {
        return this.http.get<Array<NiveauEtude>>(this.etudiantUrl + 'niveauEtude/');
    }
    public findAllFonction(): Observable<Array<Fonction>> {
        return this.http.get<Array<Fonction>>(this.etudiantUrl + 'fonction/');
    }
    public findAllInteretEtudiant(): Observable<Array<StatutSocial>> {
        return this.http.get<Array<StatutSocial>>(this.etudiantUrl + 'interetEtudiant/');
    }
    public findAllStatutSocial(): Observable<Array<Parcours>> {
        return this.http.get<Array<Parcours>>(this.etudiantUrl + 'statutSocial/');

    }
    public resetPassword(username: string): Observable<number>
    {
        return this.http.get<number>(this.host + '/user/resetpassword/username/' + username);
    }



    public addUsersToLocalCache(users: User[]): void {
        localStorage.setItem('users', JSON.stringify(users));
    }

    public getUsersFromLocalCache(): User[] {
        if (localStorage.getItem('users')) {
            // @ts-ignore
            return JSON.parse(localStorage.getItem('users'));
        }
        // @ts-ignore
        return null;
    }

    deleteUser(user: User) {
        console.log(user.id);
        this.http.delete(`${this.host}/user/delete/id/` + user.id).subscribe(
            data => {
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
    }
    get interetEtudiant(): InteretEtudiant {
        if (this._interetEtudiant == null ){
            this._interetEtudiant = new InteretEtudiant();
        }
        return this._interetEtudiant;
    }

    set interetEtudiant(value: InteretEtudiant) {
        this._interetEtudiant = value;
    }

    get interetEtudiants(): Array<InteretEtudiant> {
        if (this._interetEtudiants == null ){
            this._interetEtudiants = new Array<InteretEtudiant>();
        }
        return this._interetEtudiants;
    }

    set interetEtudiants(value: Array<InteretEtudiant>) {
        this._interetEtudiants = value;
    }

    get fonctions(): Array<Fonction> {
        if (this._fonctions == null){
            this._fonctions = new Array<Fonction>();
        }
        return this._fonctions;
    }

    set fonctions(value: Array<Fonction>) {
        this._fonctions = value;
    }

    get fonction(): Fonction {
        if (this._fonction == null){
            this._fonction = new Fonction();
        }
        return this._fonction;
    }

    set fonction(value: Fonction) {
        this._fonction = value;
    }

    get statutSocial(): StatutSocial {
        if(this._statutSocial == null ){
            this._statutSocial = new StatutSocial();
        }
        return this._statutSocial;
    }

    set statutSocial(value: StatutSocial) {
        this._statutSocial = value;
    }

    get statutSocials(): Array<StatutSocial> {
        if(this._statutSocials == null ){
            this._statutSocials = new Array<StatutSocial>();
        }
        return this._statutSocials;
    }

    set statutSocials(value: Array<StatutSocial>) {
        this._statutSocials = value;
    }

    get niveauEtudes(): Array<NiveauEtude> {
        if(this._niveauEtudes == null)
        {
            this._niveauEtudes = new Array<NiveauEtude>();
        }
        return this._niveauEtudes;
    }

    set niveauEtudes(value: Array<NiveauEtude>) {
        this._niveauEtudes = value;
    }

    get niveauEtude(): NiveauEtude {
        if (this._niveauEtude == null)
        {
            this._niveauEtude = new NiveauEtude();
        }
        return this._niveauEtude;
    }

    set niveauEtude(value: NiveauEtude) {
        this._niveauEtude = value;
    }
}
