/* tslint:disable:variable-name */
import {Injectable} from '@angular/core';

import {Admin} from '../model/admin.model';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../model/user.model';
import {ParcoursService} from './parcours.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private adminUrl = environment.adminUrl;

    private url = this.adminUrl + 'admin/';
    private _selected: Admin;

    constructor(private http: HttpClient, private parcoursService: ParcoursService) {
    }


    get selected(): User {
        if (this._selected == null) {
            this._selected = new Admin();
        }
        return this._selected;
    }

    set selected(value: Admin) {
        this._selected = value;
    }

    private _items: Array<Admin>;

    get items(): Array<Admin> {
        return this._items;
    }

    set items(value: Array<Admin>) {
        this._items = value;
    }

    private _createDialog: boolean;

    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    private _submitted: boolean;

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    public save(): Observable<number> {
        console.log(this.selected);
        return this.http.post<number>(this.adminUrl + 'admin/', this.selected);
    }

    public findAll(): Observable<Array<Admin>> {
        return this.http.get<Array<Admin>>(this.adminUrl + 'admin/');
    }

    public saveData() {
         this.http.get(this.url + 'app').subscribe(
            data => {
                this.parcoursService.findAll();
            }
        );
    }

}
