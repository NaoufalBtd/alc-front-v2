import {GroupeEtudeDetail} from './groupe-etude-detail.model';

export class GroupeEtude {
    public id: number;
    public libelle: string;
    public nombreEtudiant: number;
    public discription: string;

    public groupeEtudeDetails = new Array<GroupeEtudeDetail>();

}
