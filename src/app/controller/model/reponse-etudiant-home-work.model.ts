import {HomeWOrkEtudiant} from './home-work-etudiant.model';
import {HomeWorkQST} from './home-work-qst.model';


export class ReponseEtudiantHomeWork {
    public  id: number;
    public answer: string;
    public homeWorkEtudiant = new HomeWOrkEtudiant();
    public question = new HomeWorkQST();
}
