import {Prof} from './prof.model';
import {Etudiant} from './etudiant.model';
import {Cours} from './cours.model';

export class CommentReview {
    public etudiant = new Etudiant();
    public prof = new Prof();
    public cours = new Cours();
    public review: number;
    public comment: string;
    public dateReview: Date;
}
