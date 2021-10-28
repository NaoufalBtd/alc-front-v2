import {Prof} from './prof.model';
import {Etudiant} from './etudiant.model';

export class Paiement {
    public id: number;
    public totalHeure: number;
    public montant: number;
    public prof = new Prof();
    public etudiant = new Etudiant();
    public datePaiement: string ;
}
