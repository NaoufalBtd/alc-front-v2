import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AnimationService {
    private _showAnimation: boolean = false;

    constructor(private http: HttpClient) {
    }


    get showAnimation(): boolean {
        return this._showAnimation;
    }

    set showAnimation(value: boolean) {
        this._showAnimation = value;
    }
}
