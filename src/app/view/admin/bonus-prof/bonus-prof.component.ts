import {Component, OnInit} from '@angular/core';
import {WorkloadBonus} from '../../../controller/model/workload-bonus.model';
import {BonusProfService} from '../../../controller/service/bonus-prof.service';
import {ClassAverageBonus} from '../../../controller/model/class-average-bonus.model';

@Component({
    selector: 'app-bonus-prof',
    templateUrl: './bonus-prof.component.html',
    styleUrls: ['./bonus-prof.component.scss']
})
export class BonusProfComponent implements OnInit {

    constructor(private bonusProfService: BonusProfService) {
    }

    ngOnInit(): void {
        this.bonusProfService.findAllWorkloadBonus();
        this.bonusProfService.findAllClassAverageBonus();
    }

    displayWorkloadBonus: boolean = false;
    newprix: number;


    showDialog() {
        this.displayWorkloadBonus = true;
        console.log(this.workloadBonusList);
    }

    showDialogClassAverageBonus() {
        this.displayClassAverageBonus = true;
    }

    displayWorkloadBonusupate: boolean = false;
    displayClassAverageBonusupdate: boolean = false;
    displayClassAverageBonus: boolean = false;
    idworkload: number;
    idClassAverageBonus: number;

    showDialogUpdate(id: number) {
        this.idworkload = id;
        this.displayWorkloadBonusupate = true;

    }

    showDialogClassAverageBonusUpdate(id: number) {
        this.idClassAverageBonus = id;
        this.displayClassAverageBonusupdate = true;

    }

    get workloadBonus(): WorkloadBonus {
        return this.bonusProfService.workloadBonus;
    }

    get workloadBonusList(): Array<WorkloadBonus> {
        return this.bonusProfService.workloadBonusList;

    }

    get workloadBonusupdate(): WorkloadBonus {
        return this.bonusProfService.workloadBonusupdate;

    }

    public saveWorkloadBonus() {
        this.bonusProfService.saveWorkloadBonus();

    }

    public updateworkloadBonus(newprix: number) {
        this.bonusProfService.updateWorkloadBonus(this.idworkload, newprix);
        this.newprix = null;

    }

    get classAverageBonus(): ClassAverageBonus {
        return this.bonusProfService.classAverageBonus;

    }

    get classAverageBonusList(): Array<ClassAverageBonus> {
        return this.bonusProfService.classAverageBonusList;

    }

    public saveclassAverageBonus() {
        this.bonusProfService.saveclassAverageBonus();
    }

    public updateclassAverageBonus(newprix: number) {
        this.bonusProfService.updateclassAverageBonus(this.idClassAverageBonus, newprix);
        newprix = null;

    }
}
