import {Etudiant} from './etudiant.model';
import {TypeReclamationEtudiant} from './type-reclamation-etudiant.model';
import {Admin} from './admin.model';
import {User} from './user.model';

export class ReclamationEtudiant {
    id: number;
    reference: string;
    dateReclamation: string;
    message: string;
    img: null |string;
    file: File;
    objetReclamationEtudiant: string;
    admin = new Admin();
    traite: boolean;
    postView: string;
    setFrom: string;
    dateTraitement: string;
    dateReponse: string;
    commentaireTraiteur: string;
    etudiant: User = new Etudiant();
    typeReclamationEtudiant = new TypeReclamationEtudiant();
}
