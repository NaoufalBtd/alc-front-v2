/* tslint:disable:variable-name */
import {Injectable} from '@angular/core';

import {Admin} from '../model/admin.model';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private _items: Array<Admin>;
    private _submitted: boolean;
    private adminUrl = environment.adminUrl;

    private url = environment.baseUrl + 'admin/';
    private _selected: Admin;
    private _createDialog: boolean;
    constructor(private http: HttpClient) {
    }
    public save(): Observable<number> {
        return this.http.post<number>(this.adminUrl + 'admin/', this.selected);
    }

    get selected(): Admin {
        if (this._selected == null) {
            this._selected = new Admin();
        }
        return this._selected;
    }

    set selected(value: Admin) {
        this._selected = value;
    }
    get items(): Array<Admin> {
        return this._items;
    }
    set items(value: Array<Admin>) {
        this._items = value;
    }
    get createDialog(): boolean {
        return this._createDialog;
    }
    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

}
