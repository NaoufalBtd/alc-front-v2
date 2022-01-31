import {Prof} from './prof.model';
import {Etudiant} from './etudiant.model';
import {GroupeEtudiant} from './groupe-etudiant.model';

export class Paiement {
    public id: number;
    public totalHeure: number;
    public montant: number;
    public prof = new Prof();
    public etudiant = new Etudiant();
    public groupeEtudiant = new GroupeEtudiant();
    public datePaiement: string ;
}
