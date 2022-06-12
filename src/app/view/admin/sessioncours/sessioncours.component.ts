import {Component, OnInit} from '@angular/core';
import {SessionCoursService} from '../../../controller/service/session-cours.service';
import {SessionCours} from '../../../controller/model/session-cours.model';
import {PaiementService} from '../../../controller/service/paiement.service';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {GroupeEtudiantDetail} from '../../../controller/model/groupe-etudiant-detail.model';
import {WorkloadBonusProf} from '../../../controller/model/workload-bonus-prof.model';
import {ClassAverageBonusProf} from '../../../controller/model/class-average-bonus-prof.model';
import {Salary} from '../../../controller/model/salary.model';
import {SalaryService} from '../../../controller/service/salary.service';
import {Prof} from '../../../controller/model/prof.model';
import {ProfService} from '../../../controller/service/prof.service';

@Component({
    selector: 'app-sessioncours',
    templateUrl: './sessioncours.component.html',
    styleUrls: ['./sessioncours.component.scss']
})
export class SessioncoursComponent implements OnInit {
    etatPay: MenuItem[];
    displayDetails: boolean = false;
    payer: boolean;
    itemsannee: MenuItem[];
    itemsMOIS: MenuItem[];
    displayDetailsBonus: boolean = false;

    constructor(private sessionCoursService: SessionCoursService,
                private paiementService: PaiementService,
                private messageService: MessageService,
                private salaryService: SalaryService,
                private confirmationService: ConfirmationService,
                private profService: ProfService) {
        this.etatPay = [];
        // @ts-ignore
        this.etatPay.push({label: 'True', value: 1});
        // @ts-ignore
        this.etatPay.push({label: 'False', value: 0});
        this.itemsannee = [];
        for (let i = 2022; i < 2050; i++) {
            // @ts-ignore
            this.itemsannee.push({label: +i, value: +i});
        }
        this.itemsMOIS = [];
        for (let i = 1; i < 13; i++) {
            // @ts-ignore
            this.itemsMOIS.push({label: +i, value: +i});
        }
    }

    ngOnInit(): void {
        this.salaryService.findAllSalary();
        this.sessionCoursService.findAllSessionCours();
        this.profService.findAll().subscribe(
            data => {
                this.profs = data;
            }
        );
    }

    // getter setter

    get salaryAdminSearch(): Salary {
        return this.salaryService.salaryAdminSearch;
    }

    set salaryAdminSearch(value: Salary) {
        this.salaryService.salaryAdminSearch = value;
    }

    get salaryListAdmin(): Array<Salary> {

        return this.salaryService.salaryListAdmin;
    }

    set salaryListAdmin(value: Array<Salary>) {
        this.salaryService.salaryListAdmin = value;
    }

    get profs(): Array<Prof> {
        return this.salaryService.profs;
    }

    set profs(value: Array<Prof>) {
        this.salaryService.profs = value;
    }

    get sessioncourssearch(): SessionCours {
        return this.sessionCoursService.sessioncourssearch;
    }

    set sessioncourssearch(value: SessionCours) {
        this.sessionCoursService.sessioncourssearch = value;
    }

    get sessioncours(): SessionCours {
        return this.sessionCoursService.sessioncours;
    }

    set sessioncours(value: SessionCours) {
        this.sessionCoursService.sessioncours = value;

    }

    get sessioncourslist(): Array<SessionCours> {
        return this.sessionCoursService.sessioncourslist;

    }

    set sessioncourslist(value: Array<SessionCours>) {
        this.sessionCoursService.sessioncourslist = value;

    }

    get groupeEtudiantDetailList(): Array<GroupeEtudiantDetail> {
        return this.sessionCoursService.groupeEtudiantDetailList;
    }

    get selectionsessioncourslist(): Array<SessionCours> {
        return this.sessionCoursService.selectionsessioncourslist;
    }

    set selectionsessioncourslist(value: Array<SessionCours>) {
        this.sessionCoursService.selectionsessioncourslist = value;
    }

    get sessioncoursList(): Array<SessionCours> {
        return this.salaryService.sessioncoursList;
    }

    set sessioncoursList(value: Array<SessionCours>) {
        this.salaryService.sessioncoursList = value;
    }

    get allClassAverageBonusProf(): Array<ClassAverageBonusProf> {
        return this.salaryService.allClassAverageBonusProf;
    }

    set allClassAverageBonusProf(value: Array<ClassAverageBonusProf>) {
        this.salaryService.allClassAverageBonusProf = value;
    }

    get allWorkloadBonusProf(): Array<WorkloadBonusProf> {
        return this.salaryService.allWorkloadBonusProf;

    }

    set allWorkloadBonusProf(value: Array<WorkloadBonusProf>) {
        this.salaryService.allWorkloadBonusProf = value;
    }

    get classAverageBonusProf(): ClassAverageBonusProf {
        return this.salaryService.classAverageBonusProf;
    }

    set classAverageBonusProf(value: ClassAverageBonusProf) {
        this.salaryService.classAverageBonusProf = value;
    }

    get workloadBonusProf(): WorkloadBonusProf {

        return this.salaryService.workloadBonusProf;
    }

    set workloadBonusProf(value: WorkloadBonusProf) {
        this.salaryService.workloadBonusProf = value;
    }


    // methode
    public findAllSalaryByCriteria() {
        this.salaryService.findAllSalaryByCriteria();
    }

    public savePaiement(idSalary: number) {

        this.confirmationService.confirm({
            message: 'Are you sure you want to pay this month ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.salaryService.savePaiement(idSalary);
            }
        });
    }

    public showDetails(idSalary: number) {
        this.displayDetails = true;
        this.findAllSessionCoursBySalaryId(idSalary);
        this.findBonusClassAverageBySalaryId(idSalary);
        this.findBonusWorkloadBonusProfBySalaryId(idSalary);
    }

    public findAllClassAverageBonusProfBySalaryId(idSalary: number) {
        this.salaryService.findAllClassAverageBonusProfBySalaryId(idSalary);
    }

    public findAllWorkloadBonusProfProfBySalaryId(idSalary: number) {
        this.salaryService.findAllWorkloadBonusProfProfBySalaryId(idSalary);
    }

    findAllGroupeEtudiantDetailByGroupeEtudiantId(id: number) {
        this.sessionCoursService.findAllGroupeEtudiantDetailByGroupeEtudiantId(id);
    }

    showDetailsBonus(id: number) {
        this.displayDetailsBonus = true;

    }

    public findWorkloadBonusProfBySessionCoursId(id: number) {
        this.sessionCoursService.findWorkloadBonusProfBySessionCoursId(id);
    }

    public findAllSessionCoursBySalaryId(idSAlary: number) {
        this.salaryService.findAllSessionCoursBySalaryId(idSAlary);
    }

    public savepaiement(idsessioncours: number) {
        this.sessionCoursService.savepaiement(idsessioncours);
    }

    public updatesessioncours(sessioncoursid: number) {
        this.sessionCoursService.updatesessioncours(sessioncoursid);
    }

    public findAllByCriteria() {
        this.sessionCoursService.findAllByCriteria();
    }

    public saveListpaiement() {
        this.sessionCoursService.saveListpaiement();
    }

    public findBonusClassAverageBySalaryId(salaryid: number) {
        this.salaryService.findBonusClassAverageBySalaryId(salaryid);
    }

    public findBonusWorkloadBonusProfBySalaryId(salaryid: number) {
        this.salaryService.findBonusWorkloadBonusProfBySalaryId(salaryid);

    }


}
