import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {QuizEtudiant} from '../model/quiz-etudiant.model';
import {Reponse} from '../model/reponse.model';
import {HttpClient} from '@angular/common/http';
import {ReponseEtudiant} from '../model/reponse-etudiant.model';
import {Question} from '../model/question.model';
import {Quiz} from '../model/quiz.model';
import {Etudiant} from '../model/etudiant.model';
import {EtudiantClassRoom} from '../model/etudiant-class-room.model';
import {QuizClassRoom} from '../model/quiz-class-room.model';
import {Section} from '../model/section.model';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class QuizEtudiantService {


    get result(): any {
        return this._result;
    }

    set result(value: any) {
        this._result = value;
    }

    get quizItems(): Array<Quiz> {
        if (this._quizItems == null) {
            this._quizItems = new Array<Quiz>();
        }
        return this._quizItems;
    }

    set quizItems(value: Array<Quiz>) {
        this._quizItems = value;
    }

    get section(): Section {
        if (this._section == null) {
            this._section = new Section();
        }
        return this._section;
    }

    set section(value: Section) {
        this._section = value;
    }

    get quizSelct(): Quiz {
        if (this._quizSelct == null) {
            this._quizSelct = new Quiz();
        }
        return this._quizSelct;
    }

    set quizSelct(value: Quiz) {
        this._quizSelct = value;
    }

    get quizView(): boolean {
        return this._quizView;
    }

    set quizView(value: boolean) {
        this._quizView = value;
    }

    get passerQuiz(): string {
        return this._passerQuiz;
    }

    set passerQuiz(value: string) {
        this._passerQuiz = value;
    }

    get correctAnswerView(): Array<Reponse> {
        if (this._correctAnswerView == null) {
            this._correctAnswerView = new Array<Reponse>();
        }
        return this._correctAnswerView;
    }

    set correctAnswerView(value: Array<Reponse>) {
        this._correctAnswerView = value;
    }

    get questionView(): Question {
        if (this._questionView == null) {
            this._questionView = new Question();
        }
        return this._questionView;
    }

    set questionView(value: Question) {
        this._questionView = value;
    }

    get reponsesView(): Array<Reponse> {
        if (this._reponsesView == null) {
            this._reponsesView = new Array<Reponse>();
        }
        return this._reponsesView;
    }

    set reponsesView(value: Array<Reponse>) {
        this._reponsesView = value;
    }

    get reponsesEtudiantView(): Array<ReponseEtudiant> {
        if (this._reponsesEtudiantView == null) {
            this._reponsesEtudiantView = new Array<ReponseEtudiant>();
        }
        return this._reponsesEtudiantView;
    }

    set reponsesEtudiantView(value: Array<ReponseEtudiant>) {
        this._reponsesEtudiantView = value;
    }

    get reponsesEtudiantList(): Array<ReponseEtudiant> {
        if (this._reponsesEtudiantList == null) {
            this._reponsesEtudiantList = new Array<ReponseEtudiant>();
        }
        return this._reponsesEtudiantList;
    }

    set reponsesEtudiantList(value: Array<ReponseEtudiant>) {
        this._reponsesEtudiantList = value;
    }

    get selectedQuizClassroom(): QuizClassRoom {
        if (this._selectedQuizClassroom == null) {
            this._selectedQuizClassroom = new QuizClassRoom();
        }
        return this._selectedQuizClassroom;
    }

    set selectedQuizClassroom(value: QuizClassRoom) {
        this._selectedQuizClassroom = value;
    }


    get etudiantsClassroom(): Array<EtudiantClassRoom> {
        if (this._etudiantsClassroom == null) {
            this._etudiantsClassroom = new Array<EtudiantClassRoom>();
        }
        return this._etudiantsClassroom;
    }

    set etudiantsClassroom(value: Array<EtudiantClassRoom>) {
        this._etudiantsClassroom = value;
    }

    get quizEtudiantList(): QuizEtudiant {
        if (this._quizEtudiantList == null) {
            this._quizEtudiantList = new QuizEtudiant();
        }
        return this._quizEtudiantList;
    }

    set quizEtudiantList(value: QuizEtudiant) {
        this._quizEtudiantList = value;
    }

    get selectedQuiz(): Quiz {
        if (this._selectedQuiz == null) {
            this._selectedQuiz = new Quiz();
        }
        return this._selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this._selectedQuiz = value;
    }

    get reponsesEtudiant(): Array<ReponseEtudiant> {
        if (this._reponsesEtudiant == null) {
            this._reponsesEtudiant = new Array<ReponseEtudiant>();
        }
        return this._reponsesEtudiant;
    }

    set reponsesEtudiant(value: Array<ReponseEtudiant>) {
        this._reponsesEtudiant = value;
    }

    get myAnswer(): Reponse {
        if (this._myAnswer == null) {
            this._myAnswer = new Reponse();
        }
        return this._myAnswer;
    }

    set myAnswer(value: Reponse) {
        this._myAnswer = value;
    }


    get quizsEtudiant(): Array<QuizEtudiant> {
        if (this._quizsEtudiant == null) {
            this._quizsEtudiant = new Array<QuizEtudiant>();
        }
        return this._quizsEtudiant;
    }

    set quizsEtudiant(value: Array<QuizEtudiant>) {
        this._quizsEtudiant = value;
    }

    get quizEtudiant(): QuizEtudiant {
        if (this._quizEtudiant == null) {
            this._quizEtudiant = new QuizEtudiant();
        }
        return this._quizEtudiant;
    }

    set quizEtudiant(value: QuizEtudiant) {
        this._quizEtudiant = value;
    }

    get numQuestion(): number {
        return this._numQuestion;
    }

    set numQuestion(value: number) {
        this._numQuestion = value;
    }


    get reponses(): Array<Reponse> {
        if (this._reponses == null) {
            this._reponses = new Array<Reponse>();
        }
        return this._reponses;
    }

    set reponses(value: Array<Reponse>) {
        this._reponses = value;
    }

    get items(): Array<Question> {
        if (this._items == null) {
            this._items = new Array<Question>();
        }
        return this._items;
    }

    set items(value: Array<Question>) {
        this._items = value;
    }

    get selected(): Question {
        if (this._selected == null) {
            this._selected = new Question();
        }
        return this._selected;
    }

    set selected(value: Question) {
        this._selected = value;
    }

    get etudiant(): Etudiant {
        if (this._etudiant == null) {
            this._etudiant = new Etudiant();
        }
        return this._etudiant;
    }

    set etudiant(value: Etudiant) {
        this._etudiant = value;
    }


    get quiz(): Quiz {
        if (this._quiz == null) {
            this._quiz = new Quiz();
        }
        return this._quiz;
    }

    set quiz(value: Quiz) {
        this._quiz = value;
    }

    constructor(private http: HttpClient) {
    }

    private adminUrl = environment.adminUrl;
    private profUrl = environment.profUrl;
    private stdUrl = environment.etudiantUrl;


    private _etudiant: Etudiant;
    private _quiz: Quiz;
    private _section: Section;
    private _quizSelct: Quiz;
    private _quizItems: Array<Quiz>;
    private _items: Array<Question> = new Array<Question>();
    private _selected: Question;
    private _reponses: Array<Reponse>;
    private _quizsEtudiant: Array<QuizEtudiant>;
    private _quizEtudiant: QuizEtudiant;
    private _reponsesEtudiant: Array<ReponseEtudiant>;
    private _quizEtudiantList: QuizEtudiant;
    private _etudiantsClassroom: Array<EtudiantClassRoom>;
    private _selectedQuizClassroom: QuizClassRoom;
    private _reponsesEtudiantList: Array<ReponseEtudiant>;
    private _questionView: Question;
    private _reponsesView: Array<Reponse>;
    private _reponsesEtudiantView: Array<ReponseEtudiant>;
    private _correctAnswerView: Array<Reponse>;
    private _selectedQuiz: Quiz = new Quiz();
    private _myAnswer: Reponse;
    private _numQuestion: number;
    private _passerQuiz: string;
    private _quizView: boolean;
    private _result: any;

    public urlStudent = environment.etudiantUrl;


    public findQuizByReference(ref: string): Observable<Quiz> {
        return this.http.get<Quiz>(this.adminUrl + 'quiz/ref/' + ref);
    }

    public findAllQuestions(quiz: string): Observable<Array<Question>> {
        return this.http.get<Array<Question>>(this.adminUrl + 'question/quiz/ref/' + quiz);
    }

    public findReponses(question: number): Observable<Array<Reponse>> {
        return this.http.get<Array<Reponse>>(this.adminUrl + 'reponse/question/id/' + question);
    }

    public findCorrectAnswers(questionId: number): Observable<Array<Reponse>> {
        return this.http.get<Array<Reponse>>(this.adminUrl + 'reponse/criteria/id/' + questionId);
    }

    public findQuizBySection(id: number): Observable<Quiz> {
        return this.http.get<Quiz>(this.adminUrl + 'quiz/section/id/' + id);
    }

    public findQuizEtudiantByQuiz(ref: string): Observable<Array<QuizEtudiant>> {
        return this.http.get<Array<QuizEtudiant>>(this.adminUrl + 'quizEtudiant/quiz/ref/' + ref);
    }

    public findQuizEtudiantByQuizId(id: number): Observable<Array<QuizEtudiant>> {
        return this.http.get<Array<QuizEtudiant>>(this.adminUrl + 'quizEtudiant/quiz/id/' + id);
    }

    public deleteQuizEtudiant(quizEtudiant: QuizEtudiant): Observable<QuizEtudiant> {
        return this.http.delete<QuizEtudiant>(this.adminUrl + 'quizEtudiant/id/' + quizEtudiant.id);
    }


    public findAllQuizEtudiant(): Observable<Array<QuizEtudiant>> {
        return this.http.get<Array<QuizEtudiant>>(this.adminUrl + 'quizEtudiant/');
    }

    public findFirstQuizEtudiant(): Observable<QuizEtudiant> {
        return this.http.get<QuizEtudiant>(this.adminUrl + 'quizEtudiant/ref/qe1');
    }

    public findQuizSection(section: Section): Observable<Quiz> {
        return this.http.get<Quiz>(this.adminUrl + 'quiz/section/id/' + section.id);
    }

    public insertReponseEtudiant(reponseEtudiant: ReponseEtudiant): Observable<ReponseEtudiant> {
        return this.http.post<ReponseEtudiant>(this.adminUrl + 'reponseEtudiant/', reponseEtudiant);
    }

    public findAllReponseEtudiant(): Observable<Array<ReponseEtudiant>> {
        return this.http.get<Array<ReponseEtudiant>>(this.adminUrl + 'reponseEtudiant/');
    }


    public findMyAnswer(id: number): Observable<Reponse> {
        return this.http.get<Reponse>(this.adminUrl + 'reponse/id/' + id);
    }


    public findQuizEtudanitByEtudiantIdAndQuizId(etudiant: Etudiant, quiz: Quiz): Observable<QuizEtudiant> {
        return this.http.get<QuizEtudiant>(this.adminUrl + 'quizEtudiant/etudiant/idEtudiant/' + etudiant.id + '/quiz/idQuiz/' + quiz.id);
    }

    public findQuizEtudanitByEtudiantIdAndQuizRef(etudiant: Etudiant, quizRef: string): Observable<QuizEtudiant> {
        return this.http.get<QuizEtudiant>(this.adminUrl + 'quizEtudiant/etudiant/idEtudiant/' + etudiant.id + '/quiz/ref/' + quizRef);
    }

    public findReponseEtudiant(quizEtudiant: QuizEtudiant): Observable<Array<ReponseEtudiant>> {
        return this.http.get<Array<ReponseEtudiant>>(this.adminUrl + 'reponseEtudiant/quizEtudiant/ref/' + quizEtudiant.ref);
    }

    public findMyReponseEtudiant(quizEtudiant: QuizEtudiant, reponse: Reponse): Observable<ReponseEtudiant> {
        // tslint:disable-next-line:max-line-length
        return this.http.get<ReponseEtudiant>(this.adminUrl + 'reponseEtudiant/critere/quizEtudiant/{refQuizEtudiant}/reponse/{refReponse}?refQuizEtudiant=' + quizEtudiant.ref + '&refReponse=' + reponse.ref);
    }


    public findCorrectAnswersByNumero(numero: number): Observable<Array<Reponse>> {
        return this.http.get<Array<Reponse>>(this.adminUrl + 'reponse/criteria/numero/' + numero);
    }

    public findQuizBySectionId(section: Section): Observable<Quiz> {
        return this.http.get<Quiz>(this.adminUrl + 'quiz/section/id/' + section.id);
    }

    public findAllQuiz(): Observable<Array<Quiz>> {
        return this.http.get<Array<Quiz>>(this.adminUrl + 'quiz/');
    }

    public translate(word: string): Observable<any> {
        // @ts-ignore
        return this.http.get<string>(this.adminUrl + 'TranslateEnAr/text/' + word, {responseType: 'text'});
    }
    public translate_from_en_to_russian(word: string): Observable<any> {
        // @ts-ignore
        return this.http.get<string>(this.urlStudent + 'TranslateEnAr/en/russian/' + word, {responseType: 'text'});
    }

    public translateArToFrForProf(word: string): Observable<any> {
        // @ts-ignore
        return this.http.get<string>(this.profUrl + 'TranslateEnAr/ar/fr/' + word, {responseType: 'text'});
    }

    public translateArToFrForAdmin(word: string): Observable<any> {
        // @ts-ignore
        return this.http.get<string>(this.adminUrl + 'TranslateEnAr/ar/fr/' + word, {responseType: 'text'});
    }

    public translateArToFrForStudent(word: string): Observable<any> {
        // @ts-ignore
        return this.http.get<string>(this.adminUrl + 'TranslateEnAr/ar/fr/' + word, {responseType: 'text'});
    }
    public translateArToRussianForStudent(word: string): Observable<any> {
        // @ts-ignore
        return this.http.get<string>(this.adminUrl + 'TranslateEnAr/ar/russian/' + word, {responseType: 'text'});
    }

    public translateEnFr(word: string): Observable<any> {
        // @ts-ignore
        return this.http.get<string>(this.adminUrl + 'TranslateEnAr/text/en-fr/' + word, {responseType: 'text'});
    }

    save(quizStudent: QuizEtudiant): Observable<QuizEtudiant> {
        return this.http.post<QuizEtudiant>(this.urlStudent + 'quizEtudiant/', quizStudent);
    }

    public findAllQuizByEtudiantId(id: number): Observable<Array<QuizEtudiant>> {
        return this.http.get<Array<QuizEtudiant>>(this.profUrl + 'quizEtudiant/etudiant/id/' + id);
    }
}
