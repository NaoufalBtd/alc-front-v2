import {Parcours} from './parcours.model';
import {QuizEtudiant} from './quiz-etudiant.model';
import {Prof} from './prof.model';
import {EtatEtudiantSchedule} from './etat-etudiant-schedule.model';
import {ChatMessageDto} from './chatMessageDto';
import {GroupeEtudiantDetail} from './groupe-etudiant-detail.model';
import {User} from './user.model';
import {GroupeEtude} from './groupe-etude.model';
import {InteretEtudiant} from './interet-etudiant.model';
import {NiveauEtude} from './niveau-etude.model';
import {Fonction} from './fonction.model';
import {StatutSocial} from './statut-social.model';

export class Etudiant extends User {
    public ref: string;
    public  teacherLocality: string = String(' '); //  native || non-native
    public  groupOption: string;
    public parcours = new Parcours();
    public quizEtudiant = new Array<QuizEtudiant>();
    public groupeEtude = new GroupeEtude();
    public etatEtudiantSchedule = new EtatEtudiantSchedule();
    public prof = new Prof();
    public chatMessageDto = new Array<ChatMessageDto>();
    public groupeEtudiantDetails = new  Array< GroupeEtudiantDetail>();
    public interetEtudiant = new InteretEtudiant();
    public niveauEtude = new NiveauEtude();
    public fonction = new Fonction();
    public statutSocial =  new StatutSocial();



}
