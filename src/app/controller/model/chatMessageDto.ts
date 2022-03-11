import {Etudiant} from './etudiant.model';
import {Prof} from './prof.model';
import {QuizReponse} from './quiz-reponse';
import {GroupeEtudiant} from './groupe-etudiant.model';

export class ChatMessageDto {
    type: string;
    user: string;
    message: string;
    isStudent: boolean;
    prof: Prof = new Prof();
    student: Array<Etudiant>  = new Array<Etudiant>();
    quizReponse: QuizReponse = new QuizReponse();
    grpStudent: GroupeEtudiant = new GroupeEtudiant();

    constructor(user: string, message: string, isStudent: boolean) {
        this.user = user;
        this.message = message;
        this.isStudent = isStudent;
    }



}
