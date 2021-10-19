import {GroupeEtudiant} from './groupe-etudiant.model';
import {GroupeEtude} from './groupe-etude.model';

export class GroupeEtudeDetail {
    public id: number;
    public groupeEtudiant = new GroupeEtudiant();
    public groupeEtude = new GroupeEtude();

}
