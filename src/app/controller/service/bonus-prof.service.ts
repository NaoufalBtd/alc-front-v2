import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WorkloadBonus} from '../model/workload-bonus.model';
import {environment} from '../../../environments/environment';
import {ClassAverageBonus} from '../model/class-average-bonus.model';

@Injectable({
    providedIn: 'root'
})
export class BonusProfService {

    constructor(private http: HttpClient) {
    }

    private adminUrlWorkloadBonus = environment.adminUrl + 'workloadBonus';
    private adminUrlclassAverageBonus = environment.adminUrl + 'classAverageBonus';

    private _workloadBonus: WorkloadBonus;
    private _classAverageBonus: ClassAverageBonus;
    private _classAverageBonusupdate: ClassAverageBonus;
    private _classAverageBonusList: Array<ClassAverageBonus>;
    private _workloadBonusupdate: WorkloadBonus;
    private _workloadBonusList: Array<WorkloadBonus>;

    get classAverageBonusupdate(): ClassAverageBonus {
        if (this._classAverageBonusupdate == null) {
            this._classAverageBonusupdate = new ClassAverageBonus();
        }
        return this._classAverageBonusupdate;
    }

    set classAverageBonusupdate(value: ClassAverageBonus) {
        this._classAverageBonusupdate = value;
    }

    get classAverageBonus(): ClassAverageBonus {
        if (this._classAverageBonus == null) {
            this._classAverageBonus = new ClassAverageBonus();
        }
        return this._classAverageBonus;
    }

    set classAverageBonus(value: ClassAverageBonus) {
        this._classAverageBonus = value;
    }

    get classAverageBonusList(): Array<ClassAverageBonus> {
        if (this._classAverageBonusList == null) {
            this._classAverageBonusList = new Array<ClassAverageBonus>();
        }
        return this._classAverageBonusList;
    }

    set classAverageBonusList(value: Array<ClassAverageBonus>) {
        this._classAverageBonusList = value;
    }

    get workloadBonusupdate(): WorkloadBonus {
        if (this._workloadBonusupdate == null) {
            this._workloadBonusupdate = new WorkloadBonus();
        }
        return this._workloadBonusupdate;
    }

    set workloadBonusupdate(value: WorkloadBonus) {
        this._workloadBonusupdate = value;
    }

    get workloadBonus(): WorkloadBonus {
        if (this._workloadBonus == null) {
            this._workloadBonus = new WorkloadBonus();
        }
        return this._workloadBonus;
    }

    set workloadBonus(value: WorkloadBonus) {
        this._workloadBonus = value;
    }

    get workloadBonusList(): Array<WorkloadBonus> {
        if (this._workloadBonusList == null) {
            this._workloadBonusList = new Array<WorkloadBonus>();
        }
        return this._workloadBonusList;
    }

    set workloadBonusList(value: Array<WorkloadBonus>) {
        this._workloadBonusList = value;
    }

    public saveWorkloadBonus() {
        this.http.post(this.adminUrlWorkloadBonus + '/', this.workloadBonus).subscribe(
            data => {
                if (data > 0) {
                    this.findAllWorkloadBonus();
                    this.workloadBonus = null;
                }
            }
        );
    }
    public saveclassAverageBonus() {
        this.http.post(this.adminUrlclassAverageBonus + '/', this.classAverageBonus).subscribe(
            data => {
                if (data > 0) {
                    this.findAllClassAverageBonus();
                    this.classAverageBonus = null;
                }
            }
        );
    }

    public updateclassAverageBonus(idclassAverageBonus: number, newprix: number) {
        this.classAverageBonusupdate.id = idclassAverageBonus;
        this.http.put(this.adminUrlclassAverageBonus + '/' + newprix, this.classAverageBonusupdate).subscribe(
            data => {
                if (data > 0) {
                    this.findAllClassAverageBonus();
                    this.classAverageBonus = null;
                }
            }
        );
    }
    public updateWorkloadBonus(idworkloadBonus: number, newprix: number) {
        this.workloadBonusupdate.id = idworkloadBonus;
        this.http.put(this.adminUrlWorkloadBonus + '/' + newprix, this.workloadBonusupdate).subscribe(
            data => {
                if (data > 0) {
                    this.findAllWorkloadBonus();
                    this.workloadBonus = null;
                }
            }
        );
    }

    public findAllWorkloadBonus() {
        this.http.get<Array<WorkloadBonus>>(this.adminUrlWorkloadBonus + '/').subscribe(
            data => {
                if (data != null) {
                    this.workloadBonusList = data;
                }
            }
        );
    } public findAllClassAverageBonus() {
        this.http.get<Array<ClassAverageBonus>>(this.adminUrlclassAverageBonus + '/').subscribe(
            data => {
                if (data != null) {
                    this.classAverageBonusList = data;
                }
            }
        );
    }
}
