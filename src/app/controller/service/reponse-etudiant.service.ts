import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from './login.service';
import {ReponseEtudiant} from '../model/reponse-etudiant.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ScheduleProf} from '../model/calendrier-prof.model';
import {Etudiant} from '../model/etudiant.model';
import {QuizEtudiant} from '../model/quiz-etudiant.model';

@Injectable({
    providedIn: 'root'
})
export class ReponseEtudiantService {


    constructor(private http: HttpClient,
                private user: LoginService) {
    }

    public save(): Observable<ReponseEtudiant> {
        return this.http.post<ReponseEtudiant>(this.urlStudent + 'reponseEtudiant/', this.answer);
    }

    public findByStudentId(student: Etudiant): Observable<Array<ReponseEtudiant>> {
        return this.http.get<Array<ReponseEtudiant>>(this.urlStudent + 'reponseEtudiant/quizEtudiant/etudiant/id/' + student.id);
    }

    findByQuizStudent(quizStudent: QuizEtudiant) {
        return this.http.get<Array<ReponseEtudiant>>(this.urlStudent + 'reponseEtudiant/quizEtudiant/id/' + quizStudent.id);
    }

    private _answer: ReponseEtudiant = new ReponseEtudiant();
    private _answers: Array<ReponseEtudiant> = new Array<ReponseEtudiant>();
    private urlAdmin = environment.adminUrl;
    private urlStudent = environment.etudiantUrl;
    private urlProf = environment.profUrl;

    get answer(): ReponseEtudiant {
        return this._answer;
    }

    set answer(value: ReponseEtudiant) {
        this._answer = value;
    }

    get answers(): Array<ReponseEtudiant> {
        return this._answers;
    }

    set answers(value: Array<ReponseEtudiant>) {
        this._answers = value;
    }


}
