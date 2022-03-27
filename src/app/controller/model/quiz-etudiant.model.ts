import {Quiz} from './quiz.model';
import {Etudiant} from './etudiant.model';
import {ReponseEtudiant} from './reponse-etudiant.model';

export class QuizEtudiant {
  public id = Number(0);
  public etudiant = new Etudiant();
  public quiz = new Quiz();
  public note: number;
  public resultat: string;
  public ref: string;
  public questionCurrent: number;
  public reponseEtudiant = new Array<ReponseEtudiant>();
}
