import {Section} from './section.model';

import {HomeWorkQST} from './home-work-qst.model';

export class HomeWork {

    public id: number;
    public libelle: string;
    public urlImage: string;
    public urlVideo: string;
    public section = new Section();
    public questions = new Array<HomeWorkQST>();
    public homeWorkEtudiant: string;
    public typeHomeWork: string;
}

