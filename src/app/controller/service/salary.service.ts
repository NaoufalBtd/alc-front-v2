import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SalaryVo} from '../model/salary-vo.model';
import {Salary} from '../model/salary.model';
import {SessionCours} from '../model/session-cours.model';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SalaryService {
    private _salary: Salary;
    private _salaryMonth: Salary;
    private _salarySearch: Salary;
    private _salarySearchList: Array<Salary>;
    private _salaryList: Array<Salary>;
    private profUrlSalary = environment.profUrl + 'salary';
    private adminUrlSalary = environment.adminUrl + 'salary';
    private profUrlPaiement = environment.profUrl + 'paiement';
    private profUrlclassAverageBonusProf = environment.profUrl + 'classAverageBonusProf';
    private profUrlworkloadBonusProf = environment.profUrl + 'workloadBonusProf';
    private _monatant: number;
    private _monatantGlobale: number;
    private _monatantClassAverageBonus: number;
    private _monatantworkloadBonusProf: number;
    private _monatantPaiementProf: number;
    private _currentMonthPay: number;


    get salarySearchList(): Array<Salary> {
        if (this._salarySearchList == null) {
            this._salarySearchList = new Array<Salary>();
        }
        return this._salarySearchList;
    }

    set salarySearchList(value: Array<Salary>) {
        this._salarySearchList = value;
    }

    get salarySearch(): Salary {
        if (this._salarySearch == null) {
            this._salarySearch = new Salary();
        }
        return this._salarySearch;
    }

    set salarySearch(value: Salary) {
        this._salarySearch = value;
    }

    get monatantPaiementProf(): number {
        return this._monatantPaiementProf;
    }

    set monatantPaiementProf(value: number) {
        this._monatantPaiementProf = value;
    }

    get monatantworkloadBonusProf(): number {
        return this._monatantworkloadBonusProf;
    }

    set monatantworkloadBonusProf(value: number) {
        this._monatantworkloadBonusProf = value;
    }

    get monatantClassAverageBonus(): number {
        return this._monatantClassAverageBonus;
    }

    set monatantClassAverageBonus(value: number) {
        this._monatantClassAverageBonus = value;
    }

    get salaryMonth(): Salary {
        if (this._salaryMonth == null) {
            this._salaryMonth = new Salary();
        }
        return this._salaryMonth;
    }

    set salaryMonth(value: Salary) {
        this._salaryMonth = value;
    }

    get currentMonthPay(): number {
        return this._currentMonthPay;
    }

    set currentMonthPay(value: number) {
        this._currentMonthPay = value;
    }

    get monatant(): number {
        return this._monatant;
    }

    set monatant(value: number) {
        this._monatant = value;
    }


    get monatantGlobale(): number {
        return this._monatantGlobale;
    }

    set monatantGlobale(value: number) {
        this._monatantGlobale = value;
    }

    get salaryList(): Array<Salary> {
        if (this._salaryList == null) {
            this._salaryList = new Array<Salary>();
        }
        return this._salaryList;
    }

    set salaryList(value: Array<Salary>) {
        this._salaryList = value;
    }

    get salary(): Salary {
        if (this._salary == null) {
            this._salary = new Salary();
        }
        return this._salary;
    }

    set salary(value: Salary) {
        this._salary = value;
    }

    public findAllSalary() {
        return this.http.get<Array<Salary>>(this.profUrlSalary + '/').subscribe(
            data => {
                if (data != null) {
                    this.salaryList = data;
                    this.salarySearchList = data;
                }
            }
        );
    }

    public findSalaryByMoisAndAnneeAndProfId(mois: number, annee: number, profid: number) {
        return this.http.get<Salary>(this.profUrlSalary + '/' + mois + '/' + annee + '/' + profid).subscribe(
            data => {
                if (data != null) {
                    this.salaryMonth = data;
                } else {
                    this.salaryMonth.montantMensuel = 0;
                }
            }
        );
    }

    public findCurrentSalaryByMoisAndAnneeAndProfId(profid: number) {
        this.http.get<Salary>(this.profUrlSalary + '/current/' + profid).subscribe(
            data => {
                if (data != null) {
                    this.currentMonthPay = data.montantMensuel;
                } else {
                    this.currentMonthPay = 0;
                }
            }
        );
    }

    // @ts-ignore
    public findMontantByAnneeProfId(annee: number, profid: number) {
        this.http.get<number>(this.profUrlSalary + '/id/' + annee + '/' + profid).subscribe(
            data => {
                console.log('ha data');
                console.log(data);
                this.monatant = data;
                console.log(this.monatant = data);
            }
        );
    }

    public findMontantProfId(profid: number) {
        this.http.get<number>(this.profUrlSalary + '/idprof/' + profid).subscribe(
            data => {
                console.log('ha data');
                console.log(data);
                this.monatantGlobale = data;
                console.log(this.monatantGlobale = data);
            }
        );
    }

    public findAllWorkloadBonusProfByMoisAndAnneeAndProfId(mois: number, annee: number, profid: number) {
        this.http.get<number>(this.profUrlworkloadBonusProf + '/AllWorkloadBonusprof/mois/' + mois + '/annee/' + annee + '/idprof/' + profid).subscribe(
            data => {
                if (data != null) {
                    this.monatantworkloadBonusProf = data;
                } else {
                    this.monatantworkloadBonusProf = 0;
                }

            }
        );
    }

    public findAllPaiementByMoisAndAnneeAndProfId(mois: number, annee: number, profid: number) {
        this.http.get<number>(this.profUrlPaiement + '/' + mois + '/' + annee + '/' + profid).subscribe(
            data => {
                console.log('ha data');
                console.log(data);
                this.monatantPaiementProf = data;
            }
        );
    }

    public findAllByCriteria(profNom: string, moisSearch: string, anneeSearch: string) {
        this.salarySearch.prof.nom = profNom;
        this.salarySearch.mois = Number(moisSearch);
        this.salarySearch.annee = Number(anneeSearch);
        this.http.post<Array<Salary>>(this.adminUrlSalary + '/byCriteria', this.salarySearch).subscribe(
            data => {
                if (data === null) {
                    this.findAllSalary();
                } else {
                    this.salarySearchList = data;
                }

            }
        );
    }

    constructor(private http: HttpClient) {
    }
}
