import {Etudiant} from './etudiant.model';
import {Prof} from './prof.model';
import {GroupeEtudiant} from './groupe-etudiant.model';
import {Cours} from './cours.model';

export class ScheduleProf {
    public id = Number(0);
    public subject: string;
    public ref: string;
    public startTime: Date = new Date();
    public endTime: Date = new Date();
    public groupeEtudiant = new GroupeEtudiant();
    public grpName: string;
    public profName: string;
    public prof = new Prof();
    public cours: Cours = new Cours();
    public ProfsId: number;
}
