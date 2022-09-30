import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HomeWorkReponse} from '../model/home-work-reponse.model';
import {TypeDeQuestion} from '../model/type-de-question.model';
import {Section} from '../model/section.model';
import {HttpClient} from '@angular/common/http';
import {LearnService} from './learn.service';
import {ParcoursService} from './parcours.service';
import {HomeWorkEtudiantServiceService} from './home-work-etudiant-service.service';
import {Cours} from '../model/cours.model';
import {HomeWOrkEtudiant} from '../model/home-work-etudiant.model';
import {Observable} from 'rxjs';
import {HomeWork} from '../model/home-work.model';
import {HomeWorkQST} from '../model/home-work-qst.model';
import {HomeworkService} from './homework.service';

@Injectable({
    providedIn: 'root'
})
export class HomeWorkSimulateService {

    private adminUrl = environment.adminUrl;
    private _homeWork: HomeWork;
    private _homeWorkSelected: HomeWork = new HomeWork();
    private _homeworkQST: HomeWorkQST;
    private _homeworkReponse: HomeWorkReponse;
    private _types: Array<TypeDeQuestion>;
    private _reponses: Array<HomeWorkReponse>;
    private _section: Section;
    private _correctAnswers: Array<HomeWorkReponse>;
    private _showT12AnswerDiv: boolean;
    private _partOfStory: string = String('Part 0');
    private _showWatchItHomeWork: boolean;
    private _listOftypeQuestions: Array<TypeDeQuestion> = new Array<TypeDeQuestion>();

    private _rows = 5;
    private _first = 0;
    private _dragAnswersList: Map<string, number> = new Map<string, number>();
    private _answersT12List: Map<number, string> = new Map<number, string>();
    private _dragList: Array<string> = new Array<string>();
    private _dragIndex: number;
    private _dragData: string;
    private _nextIndex = Number(1);
    private _homeWorkQuestionList: Array<HomeWorkQST> = new Array<HomeWorkQST>();
    private _homeWorkQuestion: HomeWorkQST = new HomeWorkQST();
    private _homeWorkAnswersList: Array<HomeWorkReponse> = new Array<HomeWorkReponse>();
    private _t12AnswersList: Array<HomeWorkReponse> = new Array<HomeWorkReponse>();
    private _correctAnswersList: Map<number, Array<HomeWorkReponse>> = new Map<number, Array<HomeWorkReponse>>();
    private _answersList: Map<HomeWorkQST, HomeWorkReponse> = new Map<HomeWorkQST, HomeWorkReponse>();
    private _answerSelected: HomeWorkReponse = new HomeWorkReponse();
    private _answersPointStudent: Map<HomeWorkQST, string> = new Map<HomeWorkQST, string>();
    private _myAnswer: HomeWorkReponse = new HomeWorkReponse();
    private _homeWorkReponse: HomeWorkReponse = new HomeWorkReponse();
    private _progressBarValue = 0;
    private _showTypeOfQstBar = false;
    private _showHomeWorkEtudiantResult = false;
    private _questionOptions = [{label: 'True', value: 'true'}, {label: 'False', value: 'false'}];
    private _wordDictionnary: string;
    private _son = '';
    private _showDragHomeWork: boolean;
    private _showPhrasebook: boolean;
    private _correctAnswerT12: string;


    constructor(private http: HttpClient,
                private learnService: LearnService,
                private service: ParcoursService,
                private homeWorkService: HomeworkService,
                private homeWorkEtudiantService: HomeWorkEtudiantServiceService,
    ) {
    }


    get showPhrasebook(): boolean {
        return this._showPhrasebook;
    }

    set showPhrasebook(value: boolean) {
        this._showPhrasebook = value;
    }

    get showT12AnswerDiv(): boolean {
        return this._showT12AnswerDiv;
    }

    set showT12AnswerDiv(value: boolean) {
        this._showT12AnswerDiv = value;
    }

    get homeWork(): HomeWork {
        return this._homeWork;
    }

    set homeWork(value: HomeWork) {
        this._homeWork = value;
    }

    get homeworkQST(): HomeWorkQST {
        return this._homeworkQST;
    }

    set homeworkQST(value: HomeWorkQST) {
        this._homeworkQST = value;
    }

    get partOfStory(): string {
        return this._partOfStory;
    }

    set partOfStory(value: string) {
        this._partOfStory = value;
    }

    get showWatchItHomeWork(): boolean {
        return this._showWatchItHomeWork;
    }

    set showWatchItHomeWork(value: boolean) {
        this._showWatchItHomeWork = value;
    }

    get listOftypeQuestions(): Array<TypeDeQuestion> {
        return this._listOftypeQuestions;
    }

    set listOftypeQuestions(value: Array<TypeDeQuestion>) {
        this._listOftypeQuestions = value;
    }

    get rows(): number {
        return this._rows;
    }

    set rows(value: number) {
        this._rows = value;
    }

    get first(): number {
        return this._first;
    }

    set first(value: number) {
        this._first = value;
    }

    get dragAnswersList(): Map<string, number> {
        return this._dragAnswersList;
    }

    set dragAnswersList(value: Map<string, number>) {
        this._dragAnswersList = value;
    }

    get answersT12List(): Map<number, string> {
        return this._answersT12List;
    }

    set answersT12List(value: Map<number, string>) {
        this._answersT12List = value;
    }

    get dragList(): Array<string> {
        return this._dragList;
    }

    set dragList(value: Array<string>) {
        this._dragList = value;
    }

    get dragIndex(): number {
        return this._dragIndex;
    }

    set dragIndex(value: number) {
        this._dragIndex = value;
    }

    get dragData(): string {
        return this._dragData;
    }

    set dragData(value: string) {
        this._dragData = value;
    }

    get nextIndex(): number {
        return this._nextIndex;
    }

    set nextIndex(value: number) {
        this._nextIndex = value;
    }

    get homeWorkQuestionList(): Array<HomeWorkQST> {
        return this._homeWorkQuestionList;
    }

    set homeWorkQuestionList(value: Array<HomeWorkQST>) {
        this._homeWorkQuestionList = value;
    }

    get homeWorkQuestion(): HomeWorkQST {
        return this._homeWorkQuestion;
    }

    set homeWorkQuestion(value: HomeWorkQST) {
        this._homeWorkQuestion = value;
    }

    get homeWorkAnswersList(): Array<HomeWorkReponse> {
        return this._homeWorkAnswersList;
    }

    set homeWorkAnswersList(value: Array<HomeWorkReponse>) {
        this._homeWorkAnswersList = value;
    }

    get t12AnswersList(): Array<HomeWorkReponse> {
        return this._t12AnswersList;
    }

    set t12AnswersList(value: Array<HomeWorkReponse>) {
        this._t12AnswersList = value;
    }

    get correctAnswersList(): Map<number, Array<HomeWorkReponse>> {
        return this._correctAnswersList;
    }

    set correctAnswersList(value: Map<number, Array<HomeWorkReponse>>) {
        this._correctAnswersList = value;
    }

    get answersList(): Map<HomeWorkQST, HomeWorkReponse> {
        return this._answersList;
    }

    set answersList(value: Map<HomeWorkQST, HomeWorkReponse>) {
        this._answersList = value;
    }

    get answerSelected(): HomeWorkReponse {
        return this._answerSelected;
    }

    set answerSelected(value: HomeWorkReponse) {
        this._answerSelected = value;
    }

    get answersPointStudent(): Map<HomeWorkQST, string> {
        return this._answersPointStudent;
    }

    set answersPointStudent(value: Map<HomeWorkQST, string>) {
        this._answersPointStudent = value;
    }

    get myAnswer(): HomeWorkReponse {
        return this._myAnswer;
    }

    set myAnswer(value: HomeWorkReponse) {
        this._myAnswer = value;
    }

    get homeWorkReponse(): HomeWorkReponse {
        return this._homeWorkReponse;
    }

    set homeWorkReponse(value: HomeWorkReponse) {
        this._homeWorkReponse = value;
    }

    get progressBarValue(): number {
        return this._progressBarValue;
    }

    set progressBarValue(value: number) {
        this._progressBarValue = value;
    }

    get showTypeOfQstBar(): boolean {
        return this._showTypeOfQstBar;
    }

    set showTypeOfQstBar(value: boolean) {
        this._showTypeOfQstBar = value;
    }

    get showHomeWorkEtudiantResult(): boolean {
        return this._showHomeWorkEtudiantResult;
    }

    set showHomeWorkEtudiantResult(value: boolean) {
        this._showHomeWorkEtudiantResult = value;
    }

    get questionOptions(): ({ label: string; value: string } | { label: string; value: string })[] {
        return this._questionOptions;
    }

    set questionOptions(value: ({ label: string; value: string } | { label: string; value: string })[]) {
        this._questionOptions = value;
    }

    get wordDictionnary(): string {
        return this._wordDictionnary;
    }

    set wordDictionnary(value: string) {
        this._wordDictionnary = value;
    }

    get son(): string {
        return this._son;
    }

    set son(value: string) {
        this._son = value;
    }

    get showDragHomeWork(): boolean {
        return this._showDragHomeWork;
    }

    set showDragHomeWork(value: boolean) {
        this._showDragHomeWork = value;
    }

    get correctAnswerT12(): string {
        return this._correctAnswerT12;
    }

    set correctAnswerT12(value: string) {
        this._correctAnswerT12 = value;
    }

//----------------------------------------------------

    get homeWorkSelected(): HomeWork {
        return this._homeWorkSelected;
    }

    set homeWorkSelected(value: HomeWork) {
        this._homeWorkSelected = value;
    }

    get correctAnswers(): Array<HomeWorkReponse> {
        if (this._correctAnswers == null) {
            this._correctAnswers = new Array<HomeWorkReponse>();
        }
        return this._correctAnswers;
    }

    set correctAnswers(value: Array<HomeWorkReponse>) {
        this._correctAnswers = value;
    }


    get section(): Section {
        if (this._section == null) {
            this._section = new Section();
        }
        return this._section;
    }

    set section(section1) {
        this._section = section1;
    }

    get reponses(): Array<HomeWorkReponse> {
        if (this._reponses == null) {
            this._reponses = new Array<HomeWorkReponse>();
        }
        return this._reponses;
    }

    set reponses(homeWorkReponses) {
        this._reponses = homeWorkReponses;
    }

    get types(): Array<TypeDeQuestion> {
        if (this._types == null) {
            this._types = new Array<TypeDeQuestion>();
        }
        return this._types;
    }

    set types(typeDeQuestions) {
        this._types = typeDeQuestions;
    }

    get homeworkReponse(): HomeWorkReponse {
        if (this._homeworkReponse == null) {
            this._homeworkReponse = new HomeWorkReponse();
        }
        return this._homeworkReponse;
    }

    set homeworkReponse(homeWorkReponse) {
        this._homeworkReponse = homeWorkReponse;
    }

    get HomeWorkQST(): HomeWorkQST {
        if (this._homeworkQST == null) {
            this._homeworkQST = new HomeWorkQST();
        }
        return this._homeworkQST;
    }

    set HomeWorkQST(homeWorkQST) {
        this._homeworkQST = homeWorkQST;
    }

    get HomeWork(): HomeWork {
        if (this._homeWork == null) {
            this._homeWork = new HomeWork();
        }
        return this._homeWork;
    }

    set HomeWork(homeWork) {
        this._homeWork = homeWork;
    }

    get selectedHomeWork(): HomeWork {
        return this.learnService.selectedHomeWork;
    }

    set selectedHomeWork(value: HomeWork) {
        this.learnService.selectedHomeWork = value;
    }

    get selectedcours(): Cours {
        return this.service.selectedcours;
    }

    set selectedcours(value: Cours) {
        this.service.selectedcours = value;
    }

    get numberOfQuestion(): number {
        return this.learnService.numberOfQuestion;
    }

    set numberOfQuestion(value: number) {
        this.learnService.numberOfQuestion = value;
    }

    get questionSideLeft(): string {
        return this.learnService.questionSideLeft;
    }

    set questionSideLeft(value: string) {
        this.learnService.questionSideLeft = value;
    }

    get questionSideRight(): string {
        return this.learnService.questionSideRight;
    }

    set questionSideRight(value: string) {
        this.learnService.questionSideRight = value;
    }


    set inputAnswer(value: string) {
        this.learnService.inputAnswer = value;
    }

    set homeWorkEtudiantList(value: Array<HomeWOrkEtudiant>) {
        this.homeWorkEtudiantService.homeWorkEtudiantList = value;
    }


    public findhomeworkbyCoursId(cours: Cours): Observable<Array<HomeWork>> {

        return this.http.get<Array<HomeWork>>(this.adminUrl + 'homeWork/cours/id/' + cours.id);
    }


    homeWorkSelectedFct(homeWork: HomeWork) {
        this.answersT12List = new Map<number, string>();
        this.correctAnswerT12 = String();
        this.showT12AnswerDiv = false;
        this.showTypeOfQstBar = true;
        this.showWatchItHomeWork = false;
        this.showDragHomeWork = false;
        this.showPhrasebook = false;
        if (homeWork.libelle === 'Watch it' || homeWork.libelle === 'Life Story') {
            this.selectedHomeWork = homeWork;
            this.homeWorkQuestion = new HomeWorkQST();
            if (homeWork.libelle === 'Watch it') {
                this.homeWorkQuestion.typeDeQuestion = this.listOftypeQuestions.filter(t => t.ref === 't9')[0];
                this.showDragHomeWork = false;
                this.showWatchItHomeWork = true;
                this.showPhrasebook = false;
            } else {
                this.homeWorkQuestion.typeDeQuestion = this.listOftypeQuestions.filter(t => t.ref === 't10')[0];
                this.showWatchItHomeWork = false;
                this.showDragHomeWork = true;
                this.showPhrasebook = false;
            }
        } else if (homeWork?.libelle?.toLowerCase() === 'phrasebook') {
            this.showPhrasebook = true;
            this.showWatchItHomeWork = false;
            this.showDragHomeWork = false;
            this.selectedHomeWork = homeWork;
            this.homeWorkQuestion = new HomeWorkQST();
        } else {
            this.showWatchItHomeWork = false;
            this.showDragHomeWork = false;
            this.showPhrasebook = false;
            this.homeWorkReponse = new HomeWorkReponse();
            this.answersList = new Map<HomeWorkQST, HomeWorkReponse>();
            this.answersPointStudent = new Map<HomeWorkQST, string>();
            this.correctAnswersList = new Map<number, Array<HomeWorkReponse>>();
            this.answerSelected = new HomeWorkReponse();
            this.myAnswer = new HomeWorkReponse();
            this.learnService.onStartHomeWork(this.selectedcours);
            this.selectedHomeWork = homeWork;
            this.homeWorkEtudiantService.findQuestions(homeWork).subscribe(qstData => {
                this.homeWorkQuestionList = qstData;
                this.numberOfQuestion = this.homeWorkQuestionList.length;
                this.progressBarValue = 100 / this.numberOfQuestion;
                for (let i = 0; i < this.homeWorkQuestionList.length; i++) {
                    this.homeWorkQuestion = this.homeWorkQuestionList[0];
                    this.homeWorkEtudiantService.findReponsesByQuestionId(this.homeWorkQuestionList[i].id).subscribe(
                        data1 => {
                            this.homeWorkQuestionList[i].reponses = data1;
                            this.correctAnswersList.set(this.homeWorkQuestionList[i].id, data1.filter(r => r.etatReponse === 'true'));
                            if (this.homeWorkQuestion.typeDeQuestion.ref === 't3') {
                            }
                        }, error => {
                        }
                    );
                    if (this.homeWorkQuestion.typeDeQuestion.ref === 't1') {
                        this.questionSideLeft = this.homeWorkQuestion.libelle.substring(0, this.homeWorkQuestion.libelle.indexOf('...'));
                        this.questionSideRight = this.homeWorkQuestion.libelle.substring(this.homeWorkQuestion.libelle.lastIndexOf('...') + 3);
                    } else if (this.homeWorkQuestion.typeDeQuestion.ref === 't4' || this.homeWorkQuestion.typeDeQuestion.ref === 't6') {
                        this.questionSideLeft = this.homeWorkQuestion.libelle.substring(0, this.homeWorkQuestion.libelle.indexOf('@'));
                        this.questionSideRight = this.homeWorkQuestion.libelle.substring(this.homeWorkQuestion.libelle.lastIndexOf('@') + 1);
                        this.inputAnswer = this.homeWorkQuestion.libelle.substring(this.homeWorkQuestion.libelle.indexOf('@') + 1,
                            this.homeWorkQuestion.libelle.lastIndexOf('@'));
                    } else if (this.homeWorkQuestion.typeDeQuestion.ref === 't8') {
                        if (this.homeWorkQuestion.ref !== '') {
                            const ref = this.homeWorkQuestion.ref.substring((this.homeWorkQuestion.ref.length - 10),
                                this.homeWorkQuestion.ref.length);
                            const index = this.homeWorkQuestion.libelle.lastIndexOf(ref);
                            if (index !== 0 && index !== -1) {
                                this.homeWorkQuestion.libelle = this.homeWorkQuestion.libelle.substring(index + ref.length,
                                    this.homeWorkQuestion.libelle.length);
                            }
                            let part = this.homeWorkQuestion.libelle.substring(0, 5);
                            part = part.replace(/\s/g, '');
                            if (part.toUpperCase() === 'PART') {
                                this.partOfStory = this.homeWorkQuestion.libelle.substring(0, 8);
                                this.homeWorkQuestion.libelle = this.homeWorkQuestion.libelle.substring(this.partOfStory.length,
                                    this.homeWorkQuestion.libelle.length);
                            }
                        }
                    } else if (this.homeWorkQuestion.typeDeQuestion.ref === 't11') {
                        this.extractedData(this.homeWorkQuestion.libelle, 't11');
                    } else if (this.homeWorkQuestion.typeDeQuestion.ref === 't12') {
                        this.extractedData(this.homeWorkQuestion.libelle, 't12');
                        this.showT12Answers();
                    }
                }
            });
            this.homeWorkEtudiantService.findbyetudiantIdAndHomeWorkID(homeWork).subscribe(homeWorkEtudianData => {
                if (homeWorkEtudianData.length !== 0) {
                    this.showHomeWorkEtudiantResult = true;
                    this.homeWorkEtudiantList = homeWorkEtudianData;
                } else {
                    this.showHomeWorkEtudiantResult = false;

                }
            }, error => {
                this.showHomeWorkEtudiantResult = false;
            });
        }

    }


    private showT12Answers() {
        this.homeWorkAnswersList = new Array<HomeWorkReponse>();
        this.homeWorkEtudiantService.findReponsesByQuestionId(this.homeWorkQuestion.id).subscribe(
            data1 => {
                this.homeWorkAnswersList = data1;
                this.filterDatat12(this.homeWorkAnswersList, 1);
            }, error => {
            }
        );
    }

    private filterDatat12(homeWorkAnswersList: Array<HomeWorkReponse>, index: number) {
        this.t12AnswersList = homeWorkAnswersList.filter(t => t.numero === index);
        document.getElementById(String(index)).style.borderBottom = '3px dashed #2196f3';
        document.getElementById(String(index)).style.color = '#2196f3';
    }


    private extractedData(libelle: string, code: string) {
        this.dragAnswersList = new Map<string, number>();
        this.dragList = new Array<string>();
        const text = libelle;
        let counter = 2;
        while (counter !== -1) {
            const myNumber = libelle[0];
            let sentence: string;
            const index = libelle.indexOf(String(counter));
            if (index !== -1) {
                sentence = libelle.substring(1, index);
                counter++;
            } else {
                sentence = libelle.substring(1, libelle.length);
                counter = -1;
            }
            libelle = libelle.substring(sentence.length + 1, libelle.length);
            if (code === 't11') {
                this.dragAnswersList.set(sentence, Number(myNumber));
            } else {
                this.answersT12List.set(Number(myNumber), sentence);
            }

            this.dragList.push(sentence);
        }
        this.dragList = this.dragList.sort((a, b) => b.localeCompare(a));
    }

    public onStartHomeWork(course: Cours) {
        this.homeWorkService.findhomeworkbyCoursId(course).subscribe(homeWorkData => {
            this.homeWorkList = homeWorkData;
            this.homeWorkSelectedFct(this.homeWorkList[0]);
        }, error => {
        });
    }

    get homeWorkList(): Array<HomeWork> {
        return this.learnService.homeWorkList;
    }

    set homeWorkList(value: Array<HomeWork>) {
        this.learnService.homeWorkList = value;
    }
}
