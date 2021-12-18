import {Question} from './question.model';

export class Reponse {
    public id: number = Number(0);
    public ref: string;
    public lib: string;
    public numero: number;
    public question = new Question();
    public etatReponse: string;
}
