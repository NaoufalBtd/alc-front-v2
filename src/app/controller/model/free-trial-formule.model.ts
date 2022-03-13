import {Inscription} from './inscription.model';


export class FreeTrialFormule {

    id: number;
    code: string;
    inscription: Inscription;
    dayspeerweek: string;
    timeperday: string;
    teacherGenderoption: string;
    teacherAgeRange: string;
    teacherPersonnality: string;
    status: boolean;
    dateConfirmation: Date;

}
