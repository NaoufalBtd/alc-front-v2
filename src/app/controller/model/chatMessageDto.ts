import {Prof} from './prof.model';
import {QuizReponse} from './quiz-reponse';
import {User} from './user.model';

export class ChatMessageDto {
    type: string;
    ev: any;
    user: string;
    message: string;
    dateSent: Date;
    isStudent: boolean;
    prof: Prof = new Prof();
    student: User  = null;
    quizReponse: QuizReponse = null;

    constructor(user: string, message: string, isStudent: boolean) {
        this.user = user;
        this.message = message;
        this.isStudent = isStudent;
    }



}
