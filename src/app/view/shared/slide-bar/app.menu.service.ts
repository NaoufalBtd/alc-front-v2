import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class MenuService {

    private menuSource = new Subject<string>();
    menuSource$ = this.menuSource.asObservable();
    private resetSource = new Subject();
    resetSource$ = this.resetSource.asObservable();
    private _showTpBar = true;


    get showTpBar(): boolean {
        return this._showTpBar;
    }

    set showTpBar(value: boolean) {
        this._showTpBar = value;
    }

    onMenuStateChange(key: string) {
        this.menuSource.next(key);
    }

    reset() {
        this.resetSource.next();
    }
}
