import {TypeDeQuestion} from './type-de-question.model';
import {HomeWork} from './home-work.model';
import {HomeWorkReponse} from './home-work-reponse.model';


export class HomeWorkQST {

    public id: number;
    public ref: string;
    public libelle: string;
    public numero = Number(1);
    public pointReponseJuste = Number(1);
    public pointReponsefausse = Number(0);
    public typeDeQuestion = new TypeDeQuestion();
    public reponses: Array<HomeWorkReponse> = new Array<HomeWorkReponse>();
    public homeWork: HomeWork;
}
