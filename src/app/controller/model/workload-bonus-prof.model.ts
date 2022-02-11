import {Prof} from './prof.model';
import {Salary} from './salary.model';
import {WorkloadBonus} from './workload-bonus.model';

export class WorkloadBonusProf {
    public prof = new Prof();
    public workloadBonus = new WorkloadBonus();
    public mois: number;
    public annee: number;
    public prix: number;
    public salary = new Salary();

}
