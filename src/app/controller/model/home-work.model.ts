import {Section} from './section.model';

import {HomeWorkQST} from './home-work-qst.model';
import {Cours} from './cours.model';

export class HomeWork {

    public id: number;
    public libelle: string;
    public urlImage: string;
    public urlVideo: string;
    public cours: Cours = new Cours();
    public questions = new Array<HomeWorkQST>();
    public homeWorkEtudiant: string;
}

