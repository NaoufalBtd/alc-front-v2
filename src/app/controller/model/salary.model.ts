import {Prof} from './prof.model';

export class Salary {
    public id: number;
    public code: string;
    public montantMensuel: number;
    public nbrSessionMensuel: number;
    public mois: number;
    public annee: number;
    public totalPayment: number;
    public totalBonus: number;
    public totalBonusClassAverage: number;
    public totalBonusWorkload: number;
    public prof = new Prof();
    public payer: boolean;

    constructor() {
        this.totalPayment = 0;
        this.totalBonus = 0;
        this.totalBonusClassAverage = 0;
        this.totalBonusWorkload = 0;
        this.nbrSessionMensuel = 0;
    }
}
