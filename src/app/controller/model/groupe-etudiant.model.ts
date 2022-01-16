import {Parcours} from './parcours.model';
import {GroupeEtude} from './groupe-etude.model';
import {GroupeEtudiantDetail} from './groupe-etudiant-detail.model';
import {Prof} from './prof.model';


export class GroupeEtudiant {

    public id: number;
    public  libelle: string;
    public dateDebut: Date;
   public dateFin: Date;
    public nombrePlacevide: number;
    public nombrePlaceNonVide: number ;
    public parcours = new Parcours();
    public groupeEtude = new GroupeEtude();
    public prof = new Prof();
    public groupeEtudiantDetails = new  Array< GroupeEtudiantDetail>();
}
