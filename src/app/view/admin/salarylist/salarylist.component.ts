import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {SalaryService} from '../../../controller/service/salary.service';
import {Salary} from '../../../controller/model/salary.model';
import {Paiement} from '../../../controller/model/paiement.model';
import {ClassAverageBonusProf} from '../../../controller/model/class-average-bonus-prof.model';
import {WorkloadBonusProf} from '../../../controller/model/workload-bonus-prof.model';

@Component({
    selector: 'app-salarylist',
    templateUrl: './salarylist.component.html',
    styleUrls: ['./salarylist.component.scss']
})
export class SalarylistComponent implements OnInit {
    items: MenuItem[];
    itemsannee: MenuItem[];
    itemsMOIS: MenuItem[];
    moisSearch: string;
    anneeSearch: string;
    profNom: string;
    displayDetails: boolean = false;
    profNomAdmin: string;
    codeAdmin: string;
    moisAdmin: number;
    anneeAdmin: number;

    constructor(private salaryService: SalaryService) {
        this.itemsannee = [];
        for (let i = 2022; i < 2050; i++) {
            // @ts-ignore
            this.itemsannee.push({label: +i, value: +i});
        }
        this.itemsMOIS = [];
        for (let i = 1; i < 10; i++) {
            // @ts-ignore
            this.itemsMOIS.push({label: +i, value: +i});
        }
        // @ts-ignore
        this.itemsMOIS.push({label: 10, value: 10});
        // @ts-ignore
        this.itemsMOIS.push({label: 11, value: 11});
        // @ts-ignore
        this.itemsMOIS.push({label: 12, value: 12});
    }

    get salaryListAdmin(): Array<Salary> {
        return this.salaryService.salaryListAdmin;
    }

    ngOnInit(): void {
        this.salaryService.findAllSalary();
    }

    get salaryList(): Array<Salary> {
        return this.salaryService.salaryList;
    }

    get salarySearchList(): Array<Salary> {
        return this.salaryService.salarySearchList;
    }

    get salarySearch(): Salary {
        return this.salaryService.salarySearch;
    }

    get monatantAllPaimentSelected(): number {
        return this.salaryService.monatantAllPaimentSelected;
    }


    get paiementListAdmin(): Array<Paiement> {
        return this.salaryService.paiementListAdmin;
    }

    get monatantAllclassAverageBonusProf(): number {
        return this.salaryService.monatantAllclassAverageBonusProf;
    }

    get monatantAllworkloadBonusProf(): number {
        return this.salaryService.monatantAllworkloadBonusProf;
    }

    public findAllByCriteria(profNom: string) {
        this.salaryService.findAllByCriteria(profNom);
    }

    get salarySearchAdmin(): Salary {
        return this.salaryService.salarySearchAdmin;
    }

    public findAllByCriteriaAdmin() {
        this.salaryService.findAllByCriteriaAdmin();
    }

    get salaryclassAverageBonusProfByAdmin(): Array<ClassAverageBonusProf> {
        return this.salaryService.salaryclassAverageBonusProfByAdmin;

    }

    get salaryworkloadBonusProfByAdmin(): Array<WorkloadBonusProf> {
        return this.salaryService.salaryworkloadBonusProfByAdmin;

    }

    findPaiementByMoisAndAnneeAndProfIDAdmin(mois: number, annee: number, profid: number) {
        this.salaryService.findPaiementByMoisAndAnneeAndProfIDAdmin(mois, annee, profid);
    }

    findAllPaiementByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.salaryService.findAllPaiementByMoisAndAnneeAndProfID(mois, annee, profid);
    }

    findAllMontantWorkloadBonusAdminByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.salaryService.findAllMontantWorkloadBonusAdminByMoisAndAnneeAndProfID(mois, annee, profid);
    }

    findAllMontantClassAverageBonusAdminByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.salaryService.findAllMontantClassAverageBonusAdminByMoisAndAnneeAndProfID(mois, annee, profid);
    }

    findAllClassAverageBonusAdminByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.salaryService.findAllClassAverageBonusAdminByMoisAndAnneeAndProfID(mois, annee, profid);

    }

    findAllWorkloadBonusAdminByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.salaryService.findAllWorkloadBonusAdminByMoisAndAnneeAndProfID(mois, annee, profid);

    }


    showDetails(mois: number, annee: number, profid: number) {
        this.displayDetails = true;
        this.findPaiementByMoisAndAnneeAndProfIDAdmin(mois, annee, profid);
        this.findAllPaiementByMoisAndAnneeAndProfID(mois, annee, profid);
        this.findAllMontantClassAverageBonusAdminByMoisAndAnneeAndProfID(mois, annee, profid);
        this.findAllMontantWorkloadBonusAdminByMoisAndAnneeAndProfID(mois, annee, profid);
        this.findAllClassAverageBonusAdminByMoisAndAnneeAndProfID(mois, annee, profid);
        this.findAllWorkloadBonusAdminByMoisAndAnneeAndProfID(mois, annee, profid);

    }

}
