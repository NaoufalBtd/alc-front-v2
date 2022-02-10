import {Prof} from './prof.model';
import {Salary} from './salary.model';
import {ClassAverageBonus} from './class-average-bonus.model';

export class ClassAverageBonusProf {
    public prof = new Prof();
    public classAverageBonus = new ClassAverageBonus();
    public mois: number;
    public annee: number;
    public prix: number;
    public salary = new Salary();
}
