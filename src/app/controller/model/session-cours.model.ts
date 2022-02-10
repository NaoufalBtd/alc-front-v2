import {Etudiant} from './etudiant.model';
import {Prof} from './prof.model';
import {Cours} from './cours.model';
import {GroupeEtudiant} from './groupe-etudiant.model';
import {Salary} from './salary.model';

export class SessionCours {
    public id: number;
    public reference: string;
    public groupeEtudiant = new GroupeEtudiant();
    public prof = new Prof();
    public cours = new Cours();
    public dateDebut: string;
    public dateFin: string;
    public duree: number;
    public payer: boolean;
    public totalheure: number;
    public mois: number;
    public annee: number;
    public salary = new Salary();
}
