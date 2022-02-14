import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SalaryVo} from '../model/salary-vo.model';
import {Salary} from '../model/salary.model';
import {SessionCours} from '../model/session-cours.model';
import {environment} from '../../../environments/environment';
import {Paiement} from '../model/paiement.model';
import {ClassAverageBonusProf} from '../model/class-average-bonus-prof.model';
import {WorkloadBonusProf} from '../model/workload-bonus-prof.model';
import {Prof} from '../model/prof.model';
import {ProfService} from './prof.service';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class SalaryService {
    constructor(private http: HttpClient, private profService: ProfService, private messageService: MessageService) {
    }

    // declaration
    private _salary: Salary;
    private _profs: Array<Prof>;
    private _paiementListAdmin: Array<Paiement>;
    private _salarySearchAdmin: Salary;
    private _salaryAdminSearch: Salary;
    private _salarypayment: Paiement;
    private _salarypaymentList: Array<Paiement>;
    private _salaryclassAverageBonusProf: Array<ClassAverageBonusProf>;
    private _salaryworkloadBonusProf: Array<WorkloadBonusProf>;
    private _salaryMonth: Salary;
    private _salarySearch: Salary;
    private _salarySearchList: Array<Salary>;
    private _salaryList: Array<Salary>;
    private _salaryListAdmin: Array<Salary>;
    private profUrlSalary = environment.profUrl + 'salary';
    private adminUrlSalary = environment.adminUrl + 'salary';
    private adminUrlSession = environment.adminUrl + 'session';
    private profUrlSession = environment.profUrl + 'session';
    private profUrlPaiement = environment.profUrl + 'paiement';
    private adminUrlPaiement = environment.adminUrl + 'paiement/';
    private profUrlclassAverageBonusProf = environment.profUrl + 'classAverageBonusProf';
    private adminUrlclassAverageBonusProf = environment.adminUrl + 'classAverageBonusProf';
    private profUrlworkloadBonusProf = environment.profUrl + 'workloadBonusProf';
    private adminUrlworkloadBonusProf = environment.adminUrl + 'workloadBonusProf';
    private _monatant: number;
    private _monatantGlobale: number;
    private _monatantClassAverageBonus: number;
    private _monatantworkloadBonusProf: number;
    private _monatantPaiementProf: number;
    private _currentMonthPay: number;
    private _monatantAllPaimentSelected: number;
    private _monatantAllclassAverageBonusProf: number;
    private _monatantAllworkloadBonusProf: number;
    private _salaryclassAverageBonusProfByAdmin: Array<ClassAverageBonusProf>;
    private _salaryworkloadBonusProfByAdmin: Array<WorkloadBonusProf>;
    private _sessioncoursList: Array<SessionCours>;
    private _allClassAverageBonusProf: Array<ClassAverageBonusProf>;
    private _allWorkloadBonusProf: Array<WorkloadBonusProf>;
    private _profClassAverageBonusProf: ClassAverageBonusProf;
    private _classAverageBonusProf: ClassAverageBonusProf;
    private _profWorkloadBonusProf: WorkloadBonusProf;
    private _workloadBonusProf: WorkloadBonusProf;
    private _sessions: Array<SessionCours>;

    // get set


    get sessions(): Array<SessionCours> {
        if (this._sessions == null) {
            this._sessions = new Array<SessionCours>();
        }
        return this._sessions;
    }

    set sessions(value: Array<SessionCours>) {
        this._sessions = value;
    }

    get profClassAverageBonusProf(): ClassAverageBonusProf {
        if (this._profClassAverageBonusProf == null) {
            this._profClassAverageBonusProf = new ClassAverageBonusProf();
        }
        return this._profClassAverageBonusProf;
    }

    set profClassAverageBonusProf(value: ClassAverageBonusProf) {
        this._profClassAverageBonusProf = value;
    }

    get profWorkloadBonusProf(): WorkloadBonusProf {
        if (this._profWorkloadBonusProf == null) {
            this._profWorkloadBonusProf = new WorkloadBonusProf();
        }
        return this._profWorkloadBonusProf;
    }

    set profWorkloadBonusProf(value: WorkloadBonusProf) {
        this._profWorkloadBonusProf = value;
    }

    get classAverageBonusProf(): ClassAverageBonusProf {
        if (this._classAverageBonusProf == null) {
            this._classAverageBonusProf = new ClassAverageBonusProf();
        }
        return this._classAverageBonusProf;
    }

    set classAverageBonusProf(value: ClassAverageBonusProf) {
        this._classAverageBonusProf = value;
    }

    get workloadBonusProf(): WorkloadBonusProf {
        if (this._workloadBonusProf == null) {
            this._workloadBonusProf = new WorkloadBonusProf();
        }
        return this._workloadBonusProf;
    }

    set workloadBonusProf(value: WorkloadBonusProf) {
        this._workloadBonusProf = value;
    }

    get salaryAdminSearch(): Salary {
        if (this._salaryAdminSearch == null) {
            this._salaryAdminSearch = new Salary();
        }
        return this._salaryAdminSearch;
    }

    set salaryAdminSearch(value: Salary) {
        this._salaryAdminSearch = value;
    }

    get allClassAverageBonusProf(): Array<ClassAverageBonusProf> {
        if (this._allClassAverageBonusProf == null) {
            this._allClassAverageBonusProf = new Array<ClassAverageBonusProf>();
        }
        return this._allClassAverageBonusProf;
    }

    set allClassAverageBonusProf(value: Array<ClassAverageBonusProf>) {
        this._allClassAverageBonusProf = value;
    }

    get allWorkloadBonusProf(): Array<WorkloadBonusProf> {
        if (this._allWorkloadBonusProf == null) {
            this._allWorkloadBonusProf = new Array<WorkloadBonusProf>();
        }
        return this._allWorkloadBonusProf;
    }

    set allWorkloadBonusProf(value: Array<WorkloadBonusProf>) {
        this._allWorkloadBonusProf = value;
    }

    get sessioncoursList(): Array<SessionCours> {
        if (this._sessioncoursList == null) {
            this._sessioncoursList = new Array<SessionCours>();
        }
        return this._sessioncoursList;
    }

    set sessioncoursList(value: Array<SessionCours>) {
        this._sessioncoursList = value;
    }

    get profs(): Array<Prof> {
        if (this._profs == null) {
            this._profs = new Array<Prof>();
        }
        return this._profs;
    }

    set profs(value: Array<Prof>) {
        this._profs = value;
    }

    get salaryclassAverageBonusProfByAdmin(): Array<ClassAverageBonusProf> {
        if (this._salaryclassAverageBonusProfByAdmin == null) {
            this._salaryclassAverageBonusProfByAdmin = new Array<ClassAverageBonusProf>();
        }
        return this._salaryclassAverageBonusProfByAdmin;
    }

    set salaryclassAverageBonusProfByAdmin(value: Array<ClassAverageBonusProf>) {
        this._salaryclassAverageBonusProfByAdmin = value;
    }

    get salaryworkloadBonusProfByAdmin(): Array<WorkloadBonusProf> {
        if (this._salaryworkloadBonusProfByAdmin == null) {
            this._salaryworkloadBonusProfByAdmin = new Array<WorkloadBonusProf>();
        }
        return this._salaryworkloadBonusProfByAdmin;
    }

    set salaryworkloadBonusProfByAdmin(value: Array<WorkloadBonusProf>) {
        this._salaryworkloadBonusProfByAdmin = value;
    }

    get monatantAllclassAverageBonusProf(): number {
        return this._monatantAllclassAverageBonusProf;
    }

    set monatantAllclassAverageBonusProf(value: number) {
        this._monatantAllclassAverageBonusProf = value;
    }

    get monatantAllworkloadBonusProf(): number {
        return this._monatantAllworkloadBonusProf;
    }

    set monatantAllworkloadBonusProf(value: number) {
        this._monatantAllworkloadBonusProf = value;
    }

    get monatantAllPaimentSelected(): number {
        return this._monatantAllPaimentSelected;
    }

    set monatantAllPaimentSelected(value: number) {
        this._monatantAllPaimentSelected = value;
    }

    get paiementListAdmin(): Array<Paiement> {
        if (this._paiementListAdmin == null) {
            this._paiementListAdmin = new Array<Paiement>();
        }
        return this._paiementListAdmin;
    }

    set paiementListAdmin(value: Array<Paiement>) {
        this._paiementListAdmin = value;
    }

    get salarySearchAdmin(): Salary {
        if (this._salarySearchAdmin == null) {
            this._salarySearchAdmin = new Salary();
        }
        return this._salarySearchAdmin;
    }

    set salarySearchAdmin(value: Salary) {
        this._salarySearchAdmin = value;
    }

    get salaryListAdmin(): Array<Salary> {
        if (this._salaryListAdmin == null) {
            this._salaryListAdmin = new Array<Salary>();
        }
        return this._salaryListAdmin;
    }

    set salaryListAdmin(value: Array<Salary>) {
        this._salaryListAdmin = value;
    }

    get salaryworkloadBonusProf(): Array<WorkloadBonusProf> {
        if (this._salaryworkloadBonusProf == null) {
            this._salaryworkloadBonusProf = new Array<WorkloadBonusProf>();
        }
        return this._salaryworkloadBonusProf;
    }

    set salaryworkloadBonusProf(value: Array<WorkloadBonusProf>) {
        this._salaryworkloadBonusProf = value;
    }

    get salaryclassAverageBonusProf(): Array<ClassAverageBonusProf> {
        if (this._salaryclassAverageBonusProf == null) {
            this._salaryclassAverageBonusProf = new Array<ClassAverageBonusProf>();
        }
        return this._salaryclassAverageBonusProf;
    }

    set salaryclassAverageBonusProf(value: Array<ClassAverageBonusProf>) {
        this._salaryclassAverageBonusProf = value;
    }

    get salarypayment(): Paiement {
        if (this._salarypayment == null) {
            this._salarypayment = new Paiement();
        }
        return this._salarypayment;
    }

    set salarypayment(value: Paiement) {
        this._salarypayment = value;
    }

    get salarypaymentList(): Array<Paiement> {
        if (this._salarypaymentList == null) {
            this._salarypaymentList = new Array<Paiement>();
        }
        return this._salarypaymentList;
    }

    set salarypaymentList(value: Array<Paiement>) {
        this._salarypaymentList = value;
    }

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

    // methode
    public findAllSalary() {
        return this.http.get<Array<Salary>>(this.profUrlSalary + '/').subscribe(
            data => {
                if (data != null) {
                    this.salaryListAdmin = data;
                }
            }
        );
    }

    public findAllSalaryProfID(idprof: number) {
        return this.http.get<Array<Salary>>(this.profUrlSalary + '/prof/idprof/' + idprof).subscribe(
            data => {
                if (data != null) {
                    this.salaryList = data;
                }
            }
        );
    }

    public findAllByCriteriaAdmin() {

        return this.http.post<Array<Salary>>(this.adminUrlSalary + '/byCriteria', this.salarySearchAdmin).subscribe(
            data => {
                if (data != null) {
                    this.salaryListAdmin = data;
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

    public findMontantByAnneeProfId(annee: number, profid: number) {
        this.http.get<number>(this.profUrlSalary + '/id/' + annee + '/' + profid).subscribe(
            data => {

                this.monatant = data;
            }
        );
    }

    public findMontantProfId(profid: number) {
        this.http.get<number>(this.profUrlSalary + '/allSalaryProf/idprof/' + profid).subscribe(
            data => {
                if (data != null) {
                    this.monatantGlobale = data;
                } else {
                    this.monatantGlobale = 0;
                }

            }
        );
    }

    public findAllWorkloadBonusProfByMoisAndAnneeAndProfId(mois: number, annee: number, profid: number) {
        // tslint:disable-next-line:max-line-length
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

    public findAllMonatantPaiementByMoisAndAnneeAndProfId(mois: number, annee: number, profid: number) {
        this.http.get<number>(this.profUrlPaiement + '/' + mois + '/' + annee + '/' + profid).subscribe(
            data => {
                if (data != null) {
                    this.monatantPaiementProf = data;
                } else {
                    this.monatantPaiementProf = 0;
                }
            }
        );
    }

    public findPaiementByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.http.get<Array<Paiement>>(this.profUrlPaiement + '/paiement/' + mois + '/' + annee + '/' + profid).subscribe(
            data => {
                this.salarypaymentList = data;
                console.log('3isawi lah idawi');
                console.log(data);
            }
        );
    }

    public findClassAverageBonusProfByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.http.get<Array<ClassAverageBonusProf>>(this.profUrlclassAverageBonusProf + '/prof/mois/' + mois + '/annee/' + annee + '/idprof/' + profid).subscribe(
            data => {
                this.salaryclassAverageBonusProf = data;
            }
        );
    }

    public findWorkloadBonusProfByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        // tslint:disable-next-line:max-line-length
        this.http.get<Array<WorkloadBonusProf>>(this.profUrlworkloadBonusProf + '/prof/mois/' + mois + '/annee/' + annee + '/idprof/' + profid).subscribe(
            data => {
                this.salaryworkloadBonusProf = data;
            }
        );
    }

    public findMontantClassAverageBonusProfByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        // tslint:disable-next-line:max-line-length
        this.http.get<number>(this.profUrlclassAverageBonusProf + '/all/prof/mois/' + mois + '/annee/' + annee + '/idprof/' + profid).subscribe(
            data => {
                if (data != null) {
                    this.monatantClassAverageBonus = data;
                } else {
                    this.monatantClassAverageBonus = 0;
                }
            }
        );
    }

    public findAllByCriteria(profNom: string) {
        this.salarySearch.prof.nom = profNom;
        this.http.post<Array<Salary>>(this.adminUrlSalary + '/byCriteria', this.salarySearch).subscribe(
            data => {
                this.salaryList = data;
            }
        );
    }

    public findPaiementByMoisAndAnneeAndProfIDAdmin(mois: number, annee: number, profid: number) {
        this.http.get<Array<Paiement>>(this.adminUrlPaiement + 'detailspaiementByidProf/' + mois + '/' + annee + '/' + profid).subscribe(
            data => {
                this.paiementListAdmin = data;
            }
        );
    }

    public findAllPaiementByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.http.get<number>(this.adminUrlPaiement + 'allMontant/' + mois + '/' + annee + '/' + profid).subscribe(
            data => {
                if (data != null) {
                    this.monatantAllPaimentSelected = data;
                } else {
                    this.monatantAllPaimentSelected = 0;
                }
            }
        );
    }

    public findAllMontantWorkloadBonusAdminByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.http.get<number>(this.adminUrlworkloadBonusProf + '/montant/' + mois + '/' + annee + '/' + profid).subscribe(
            data => {
                if (data != null) {
                    this.monatantAllworkloadBonusProf = data;
                } else {
                    this.monatantAllworkloadBonusProf = 0;
                }
            }
        );
    }

    public findAllMontantClassAverageBonusAdminByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.http.get<number>(this.adminUrlclassAverageBonusProf + '/montant/' + mois + '/' + annee + '/' + profid).subscribe(
            data => {
                if (data != null) {
                    this.monatantAllclassAverageBonusProf = data;
                } else {
                    this.monatantAllclassAverageBonusProf = 0;
                }
            }
        );
    }

    public findAllClassAverageBonusAdminByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.http.get<Array<ClassAverageBonusProf>>(this.adminUrlclassAverageBonusProf + '/' + mois + '/' + annee + '/' + profid).subscribe(
            data => {
                this.salaryclassAverageBonusProfByAdmin = data;
            }
        );
    }

    public findAllWorkloadBonusAdminByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.http.get<Array<WorkloadBonusProf>>(this.adminUrlworkloadBonusProf + '/' + mois + '/' + annee + '/' + profid).subscribe(
            data => {
                this.salaryworkloadBonusProfByAdmin = data;

            }
        );
    }

    public savePaiement(idSalary: number) {
        this.http.get(this.adminUrlPaiement + idSalary).subscribe(
            data => {
                if (data > 0) {
                    this.findAllSalary();
                }
            }
        );
    }

    public findAllSessionCoursBySalaryId(idSalary: number) {
        this.http.get<Array<SessionCours>>(this.adminUrlSession + '/allSessionCours/id/' + idSalary).subscribe(
            data => {
                if (data != null) {
                    this.sessioncoursList = data;
                }
            }
        );
    }

    public findAllClassAverageBonusProfBySalaryId(idSalary: number) {
        this.http.get<Array<ClassAverageBonusProf>>(this.adminUrlclassAverageBonusProf + '/id/' + idSalary).subscribe(
            data => {
                if (data != null) {
                    this.allClassAverageBonusProf = data;
                }
            }
        );
    }

    public findAllWorkloadBonusProfProfBySalaryId(idSalary: number) {
        this.http.get<Array<WorkloadBonusProf>>(this.adminUrlworkloadBonusProf + '/id/' + idSalary).subscribe(
            data => {
                if (data != null) {
                    this.allWorkloadBonusProf = data;
                }
            }
        );
    }

    public findAllSalaryByCriteria() {
        this.http.post<Array<Salary>>(this.adminUrlSalary + '/byCriteria', this.salaryAdminSearch).subscribe(
            data => {
                this.salaryListAdmin = data;
            }
        );
    }

    public findBonusClassAverageBySalaryId(salaryid: number) {
        this.http.get<ClassAverageBonusProf>(this.adminUrlclassAverageBonusProf + '/salaryid/' + salaryid).subscribe(
            data => {
                if (data != null) {
                    this.classAverageBonusProf = data;
                }
            }
        );
    }

    public findBonusWorkloadBonusProfBySalaryId(salaryid: number) {
        this.http.get<WorkloadBonusProf>(this.adminUrlworkloadBonusProf + '/salaryid/' + salaryid).subscribe(
            data => {
                if (data != null) {
                    this.workloadBonusProf = data;
                }
            }
        );
    }

    public findSalaryByPayer() {
        this.http.get<Array<Salary>>(this.adminUrlSalary + '/etatPayer/' + true).subscribe(
            data => {
                if (data != null) {
                    this.salaryListAdmin = data;
                }
            }
        );
    }

    public findWorkloadBonusProfByProfIdAndSalaryId(idprof: number, idsalary: number) {
        this.http.get<ClassAverageBonusProf>(this.profUrlclassAverageBonusProf + '/prof/' + idprof + '/' + idsalary).subscribe(
            data => {
                if (data != null) {
                    this.profClassAverageBonusProf = data;
                }
            }
        );
    }

    public findClassAverageBonusProfByProfIdAndSalaryId(idprof: number, idsalary: number) {
        this.http.get<WorkloadBonusProf>(this.profUrlworkloadBonusProf + '/prof/' + idprof + '/' + idsalary).subscribe(
            data => {
                if (data != null) {
                    this.profWorkloadBonusProf = data;
                }
            }
        );
    }

    public findSessionCoursByProfIdAndSalaryId(idprof: number, idsalary: number) {
        this.http.get<Array<SessionCours>>(this.profUrlSession + '/salryprof/' + idprof + '/' + idsalary).subscribe(
            data => {
                if (data != null) {
                    this.sessions = data;
                }
            }
        );
    }
}
