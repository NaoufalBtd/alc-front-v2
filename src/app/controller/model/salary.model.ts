import {Prof} from './prof.model';

export class Salary {
    public id: number;
    public code: string;
    public montantMensuel: number;
    public nbrSessionMensuel: number;
    public mois: number;
    public annee: number;
    public prof = new Prof();
}
