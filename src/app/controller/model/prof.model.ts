import {RecommendTeacher} from './recommend-teacher.model';
import {CategorieProf} from './categorie-prof.model';
import {ClassRoom} from './class-room.model';
import {Etudiant} from './etudiant.model';
import {ChatMessageDto} from './chatMessageDto';
import {User} from './user.model';

export class Prof extends User {
    public ref: string;
    public classRoomList = new Array<ClassRoom>();
    public categorieProf = new CategorieProf();
    public recommendList = new Array<RecommendTeacher>();
    public chatMessageDto = new Array<ChatMessageDto>();
    public students = new Array<Etudiant>();
}
