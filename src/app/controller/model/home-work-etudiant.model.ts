import {Etudiant} from './etudiant.model';
import {HomeWork} from './home-work.model';
import {ReponseEtudiantHomeWork} from './reponse-etudiant-home-work.model';


export class HomeWOrkEtudiant {
    public id: number;
    public etudiant =  new Etudiant();
    public homeWork = new  HomeWork();
    public reponseEtudiantHomeWork = new Array<ReponseEtudiantHomeWork>() ;
    public note: number;
    public resultat: string;
}
