import {RecommendTeacher} from './recommend-teacher.model';
import {CategorieProf} from './categorie-prof.model';
import {ClassRoom} from './class-room.model';
import {Etudiant} from './etudiant.model';
import {ChatMessageDto} from './chatMessageDto';
import {User} from './user.model';
import {Parcours} from './parcours.model';
import {TrancheHoraireProf} from './tranche-horaire-prof.model';
import {TypeTeacher} from './type-teacher.model';

export class Prof extends User {
    public ref: string;
    public about: string;
    public token: string;
    public classRoomList = new Array<ClassRoom>();
    public categorieProf = new CategorieProf();
    public recommendList = new Array<RecommendTeacher>();
    public chatMessageDto = new Array<ChatMessageDto>();
    public levelMin: Parcours = new Parcours();
    public levelMax: Parcours = new Parcours();
    public trancheHoraireProfList = new Array<TrancheHoraireProf>();
    public typeTeacher = new TypeTeacher();
}
