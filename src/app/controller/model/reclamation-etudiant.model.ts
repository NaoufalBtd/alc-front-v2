import {Etudiant} from './etudiant.model';
import {TypeReclamationEtudiant} from './type-reclamation-etudiant.model';
import {Admin} from './admin.model';

export class ReclamationEtudiant {
    id: number;
    reference: string;
    dateReclamation: string;
    message: string;
    objetReclamationEtudiant: string;
    admin = new Admin();
    traite: boolean;
    postView: string;
    setFrom: string;
    dateTraitement: string;
    dateReponse: string;
    commentaireTraiteur: string;
    etudiant = new Etudiant();
    typeReclamationEtudiant = new TypeReclamationEtudiant();
}
