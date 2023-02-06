import {Question} from './question.model';
import {Etudiant} from './etudiant.model';

export class QuizReponse {
    public id: number = Number(0);
    public type: string = String('QUIZ');
    public lib: string;
    public sender: string;
    public numero: number;
    public question = new Question();
    public student: Etudiant = null;
    public etatReponse: string;
}
