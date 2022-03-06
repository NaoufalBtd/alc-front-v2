import {Etudiant} from './etudiant.model';

export class InvitedStudent {
    id: number;
    isAccepted: string;
    code: string;
    isPaidPack: string;
    emailInvited: string;
    dateSentInvitation: string;
    etudiant = new Etudiant();
}
