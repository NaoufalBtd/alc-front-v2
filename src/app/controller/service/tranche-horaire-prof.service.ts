import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {TrancheHoraireProf} from '../model/tranche-horaire-prof.model';
import {Observable} from 'rxjs';
import {Prof} from '../model/prof.model';
import {HttpClient} from '@angular/common/http';
import {error} from 'protractor';
import {dataBinding} from '@syncfusion/ej2-angular-schedule';

@Injectable({
    providedIn: 'root'
})
export class TrancheHoraireProfService {


    private adminUrl = environment.adminUrl;
    private _trancheHoraireProfList: Array<TrancheHoraireProf> = new Array<TrancheHoraireProf>();


    get trancheHoraireProfList(): Array<TrancheHoraireProf> {
        return this._trancheHoraireProfList;
    }

    set trancheHoraireProfList(value: Array<TrancheHoraireProf>) {
        this._trancheHoraireProfList = value;
    }

    constructor(private http: HttpClient) {
    }

    public findTrancheHoraireByProfId(prof: Prof): Observable<Array<TrancheHoraireProf>> {
        return this.http.get<Array<TrancheHoraireProf>>(this.adminUrl + 'trancheHoraireProfRest/id/' + prof.id);
    }

    edit(trancheEdit: TrancheHoraireProf): Observable<TrancheHoraireProf> {
        return this.http.post<TrancheHoraireProf>(this.adminUrl + 'trancheHoraireProfRest/', trancheEdit);
    }

    deleteTrancheById(id: number) {
        return this.http.delete(this.adminUrl + 'trancheHoraireProfRest/id/' + id).subscribe(
            data => {
            }, err => {
                console.log(err);
            }
        );
    }


}
