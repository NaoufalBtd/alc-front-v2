import {GroupeEtudiant} from './groupe-etudiant.model';
import {GroupeEtude} from './groupe-etude.model';
import {Etudiant} from './etudiant.model';

export class GroupeEtudiantDetail {
    public id: number;
    public groupeEtudiant = new GroupeEtudiant();
    public etudiant: Etudiant = new Etudiant();

}
