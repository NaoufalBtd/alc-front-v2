import {EtatInscription} from './etat-inscription.model';
import {Parcours} from './parcours.model';
import {QuizEtudiant} from './quiz-etudiant.model';
import {Etudiant} from './etudiant.model';
import {GroupeEtude} from './groupe-etude.model';
import {PackStudent} from './pack-student.model';
import {InteretEtudiant} from './interet-etudiant.model';
import {NiveauEtude} from './niveau-etude.model';
import {Fonction} from './fonction.model';
import {StatutSocial} from './statut-social.model';
import {Skill} from './skill.model';
import {Quiz} from './quiz.model';

export class Inscription {
    public id: number;
    public etudiant: Etudiant = new Etudiant();
    public parcours = new Parcours();
    public quizEtudiant = new Array<QuizEtudiant>();
    public numeroInscription: string;
    public datedebutinscription: Date;
    public datefininscription: Date;
    public etatInscription = new EtatInscription();
    public groupeEtude: GroupeEtude = new GroupeEtude();
    public packStudent: PackStudent;
    public interetEtudiant = new InteretEtudiant();
    public niveauEtude = new NiveauEtude();
    public fonction = new Fonction();
    public statutSocial = new StatutSocial();
    public skill = new Skill();
    public dateRegistration: string;
    public quizNiveau: Quiz;
    public noteQuizNiveau: number;
    public quizFinished: boolean;
}
