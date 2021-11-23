import {Etudiant} from './etudiant.model';
import {Prof} from './prof.model';

export class ChatMessageDto {
    type: string;
    user: string;
    message: string;
    isStudent: boolean;
    prof: Prof = new Prof();
    student: Array<Etudiant>  = new Array<Etudiant>();

    constructor(user: string, message: string, student: boolean) {
        this.user = user;
        this.message = message;
        this.isStudent = student;
    }


}
