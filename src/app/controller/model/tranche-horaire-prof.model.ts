import DateTimeFormat = Intl.DateTimeFormat;
import {Prof} from './prof.model';

export class TrancheHoraireProf {
    public id = Number(0);
    public prof: Prof = new Prof();
    public  startHour: string ;
    public  endHour: string;
    public  day: number;
    public  groupIndex: number;
    public  profsId: number;
}
