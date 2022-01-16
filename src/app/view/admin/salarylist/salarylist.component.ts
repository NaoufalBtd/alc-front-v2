import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {SalaryService} from '../../../controller/service/salary.service';
import {Salary} from '../../../controller/model/salary.model';

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

    constructor(private salaryService: SalaryService) {
        this.itemsannee = [];
        for (let i = 2022; i < 2050; i++) {
            // @ts-ignore
            this.itemsannee.push({label: +i, value: +i});
        }
        this.itemsMOIS = [];
        for (let i = 1; i < 10; i++) {
            // @ts-ignore
            this.itemsMOIS.push({label: '0' + i, value: '0' + i});
        }
        // @ts-ignore
        this.itemsMOIS.push({label: 10, value: 10});
        // @ts-ignore
        this.itemsMOIS.push({label: 11, value: 11});
        // @ts-ignore
        this.itemsMOIS.push({label: 12, value: 12});
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

    public findAllByCriteria(profNom: string, moisSearch: string, anneeSearch: string) {
        this.salaryService.findAllByCriteria(profNom, moisSearch, anneeSearch);
    }
}
