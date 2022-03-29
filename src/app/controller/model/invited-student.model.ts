import {Etudiant} from './etudiant.model';

export class InvitedStudent {
    id: number;
    isAccepted: string;
    code: string;
    emailInvited: string;
    dateSentInvitation: string;
    dateAcceptInvitation: string;
    etudiant = new Etudiant();
}
