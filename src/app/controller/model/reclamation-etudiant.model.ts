import {Etudiant} from './etudiant.model';
import {TypeReclamationEtudiant} from './type-reclamation-etudiant.model';
import {Admin} from './admin.model';

export class ReclamationEtudiant {
    id: number;
    reference: string;
    dateReclamation: Date;
    message: string;
    objetReclamationEtudiant: string;
    admin = new Admin();
    traite: boolean;
    dateTraitement: Date;
    commentaireTraiteur: string;
    etudiant = new Etudiant();
    typeReclamationEtudiant = new TypeReclamationEtudiant();
}
