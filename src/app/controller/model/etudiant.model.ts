import {Parcours} from './parcours.model';
import {QuizEtudiant} from './quiz-etudiant.model';
import {Prof} from './prof.model';
import {EtatEtudiantSchedule} from './etat-etudiant-schedule.model';
import {ChatMessageDto} from './chatMessageDto';
import {GroupeEtudiantDetail} from './groupe-etudiant-detail.model';
import {User} from './user.model';

export class Etudiant extends User {
    public ref: string;
    public parcours = new Parcours();
    public quizEtudiant = new Array<QuizEtudiant>();
    public etatEtudiantSchedule = new EtatEtudiantSchedule();
    public prof = new Prof();
    public chatMessageDto = new Array<ChatMessageDto>();
    public groupeEtudiantDetails = new  Array< GroupeEtudiantDetail>();
}
