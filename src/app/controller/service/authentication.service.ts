import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../model/user.model';
import {Etudiant} from '../model/etudiant.model';
import {Prof} from '../model/prof.model';
import {Admin} from '../model/admin.model';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
    public host = environment.baseApi;
    // @ts-ignore
    private token: string;
    // @ts-ignore
    private loggedInUsername: string;
    private jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient) {
    }

    public login(user: User): Observable<HttpResponse<User>> {
        return this.http.post<User>(`${this.host}/user/login`, user, {observe: 'response'});
    }

    public register(user: User): Observable<User> {
        return this.http.post<User>(`${this.host}/user/register`, user);
    }

    public logOut(): void {
        // @ts-ignore
        this.token = null;
        // @ts-ignore
        this.loggedInUsername = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('users');
    }

    public saveToken(token: string): void {
        this.token = token;
        localStorage.setItem('token', token);
    }

    public addUserToLocalCache(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public getUserFromLocalCache(): User {
        return JSON.parse(localStorage.getItem('user'));
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

    public loadToken(): void {
        this.token = localStorage.getItem('token');
    }

    public getToken(): string {
        return this.token;
    }

    public isUserLoggedIn(): boolean {
        this.loadToken();
        if (this.token != null && this.token !== '') {
            if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
                if (!this.jwtHelper.isTokenExpired(this.token)) {
                    this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
                    return true;
                }
            }
        } else {
            this.logOut();
            return false;
        }
    }

    initHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        const token = localStorage.getItem('token');
        if (token !== null) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            });
        }
        return headers;
    }

}
