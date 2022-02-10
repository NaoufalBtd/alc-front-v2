import {HomeWOrkEtudiant} from './home-work-etudiant.model';
import {HomeWorkQST} from './home-work-qst.model';
import {HomeWorkReponse} from './home-work-reponse.model';


export class ReponseEtudiantHomeWork {
    public  id: number;
    public answer: string;
    public homeWorkEtudiant = new HomeWOrkEtudiant();
    public question = new HomeWorkQST();
    public reponse: HomeWorkReponse = new HomeWorkReponse();
    public note: number;
}
