import {GroupeEtudeDetail} from './groupe-etude-detail.model';

export class GroupeEtudiant {
    public id: number;
    public libelle: string;
    public dateDebut: Date;
    public dateFin: Date;
    public niveau: string;
    public nombrePlaceVide: number;
    public nombrePlaceNonVide: number ;
    public groupeEtudeDetails = new Array<GroupeEtudeDetail>();

}
