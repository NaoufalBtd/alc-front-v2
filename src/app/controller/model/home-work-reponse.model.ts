import {HomeWorkQST} from './home-work-qst.model';


export class HomeWorkReponse {
    public id: number;
    public ref: string;
    public lib: string;
    public etatReponse: string;
    public numero = Number(1);
    public homeWorkQuestion: HomeWorkQST;

}
