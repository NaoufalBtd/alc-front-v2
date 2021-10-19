import {Etudiant} from './etudiant.model';
import {Prof} from './prof.model';
import {Cours} from './cours.model';

export class SessionCours {
    public id: number;
    public reference: string;
    public etudiant = new Etudiant();
    public prof = new Prof();
    public cours = new Cours();
    public dateDebut: string;
    public dateFin: Date;
    public duree: number;
    public payer: boolean;
    public totalheure : number;
}
