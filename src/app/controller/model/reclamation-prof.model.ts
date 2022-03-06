import {Etudiant} from './etudiant.model';
import {TypeReclamationEtudiant} from './type-reclamation-etudiant.model';
import {TypeReclamationProf} from './type-reclamation-prof.model';
import {Prof} from './prof.model';
import {Admin} from './admin.model';

export class ReclamationProf {
    id: number;
    admin = new Admin();
    reference: string;
    dateReclamation: string;
    message: string;
    objetReclamationProf: string;
    traite: string;
    postView: string;
    dateReponse: string;
    dateTraitement: string;
    commentaireTraiteur: string;
    prof = new Prof();
    typeReclamationProf = new TypeReclamationProf();
}
