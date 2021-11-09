import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';

@Injectable({providedIn: 'root'})
export class UserService {
    private host = environment.baseApi;

    constructor(private http: HttpClient) {
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
}
