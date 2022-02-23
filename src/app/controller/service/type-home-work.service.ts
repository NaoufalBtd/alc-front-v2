import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TypeHomeWork} from '../model/type-home-work.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {TrancheHoraireProf} from '../model/tranche-horaire-prof.model';
import {ScheduleProf} from '../model/calendrier-prof.model';

@Injectable({
    providedIn: 'root'
})
export class TypeHomeWorkService {
    private _typeHomeWorkList: Array<TypeHomeWork> = new Array<TypeHomeWork>();
    private _typeHomeWork: TypeHomeWork = new TypeHomeWork();
    private urlAdmin = environment.adminUrl;
    private urlProf = environment.profUrl;
    private urlStudent = environment.etudiantUrl;
    private urlTypeHomeWrk = 'typeHomeWork/';

    get typeHomeWorkList(): Array<TypeHomeWork> {
        return this._typeHomeWorkList;
    }

    set typeHomeWorkList(value: Array<TypeHomeWork>) {
        this._typeHomeWorkList = value;
    }

    get typeHomeWork(): TypeHomeWork {
        return this._typeHomeWork;
    }

    set typeHomeWork(value: TypeHomeWork) {
        this._typeHomeWork = value;
    }

    constructor(private http: HttpClient) {
    }

    public save(): Observable<TypeHomeWork> {
        return this.http.post<TypeHomeWork>(this.urlAdmin + this.urlTypeHomeWrk, this.typeHomeWork);
    }

    public findAll() {
        this.http.get<Array<TypeHomeWork>>(this.urlAdmin + this.urlTypeHomeWrk).subscribe(
            data => {
                this.typeHomeWorkList = data;
            }, error => {
                console.log(error);
            }
        );
    }

}
