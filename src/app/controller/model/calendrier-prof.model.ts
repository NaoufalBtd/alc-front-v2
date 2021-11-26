import {Etudiant} from './etudiant.model';
import {Prof} from './prof.model';

export class ScheduleProf {
    public id = Number(0);
    subject: string;
    public ref: string;
    public startTime: Date = new Date();
    public endTime: Date = new Date();
    public etudiant = new Etudiant();
    public prof = new Prof();
}
