import {Etudiant} from './etudiant.model';
import {TypeReclamationEtudiant} from './type-reclamation-etudiant.model';

export class ReclamationEtudiant {
    id: number;
    reference: string;
    dateReclamation: Date;
    message: string;
    traite: string;
    dateTraitement: Date;
    commentaireTraiteur: string;
    etudiant = new Etudiant();
    typeReclamationEtudiant = new TypeReclamationEtudiant();
}
