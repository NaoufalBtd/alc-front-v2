import {Injectable} from '@angular/core';
import {Parcours} from '../model/parcours.model';
import {Section} from '../model/section.model';
import {Cours} from '../model/cours.model';
import {QuizEtudiantService} from './quiz-etudiant.service';
import {ReponseEtudiantService} from './reponse-etudiant.service';
import {LoginService} from './login.service';
import {Question} from '../model/question.model';
import {ReponseEtudiant} from '../model/reponse-etudiant.model';
import {Reponse} from '../model/reponse.model';
import {QuizReponse} from '../model/quiz-reponse';
import {Quiz} from '../model/quiz.model';
import {QuizEtudiant} from '../model/quiz-etudiant.model';
import {Etudiant} from '../model/etudiant.model';
import {HomeworkService} from './homework.service';
import {HomeWorkEtudiantServiceService} from './home-work-etudiant-service.service';
import {HomeWork} from '../model/home-work.model';
import {Dictionary} from '../model/dictionary.model';

@Injectable({
    providedIn: 'root'
})
export class LearnService {
    constructor(private service: QuizEtudiantService,
                private homeWorkService: HomeworkService,
                private homeWorkEtudiantService: HomeWorkEtudiantServiceService,
                private reponseEtudiantService: ReponseEtudiantService,
                private login: LoginService) {
    }

    private _participants: Map<number, Array<Etudiant>> = new Map<number, Array<Etudiant>>();
    private _parcourCurrent: Parcours = new Parcours();
    private _sectionCurrent: Section = new Section();
    private _courseCurrent: Cours = new Cours();
    private _courseSelected: Cours = new Cours();
    private _noteQuiz: number;
    private _showTakeQuiz = true;
    private _showQuizReview = false;
    private _myAnswer: Reponse = new Reponse();
    private _answerSelected: Reponse = new Reponse();
    private _inputAnswer: string;
    private _trueOrFalse = null;
    private _disableToggleButton = false;
    private _answersList: Map<Question, Reponse> = new Map<Question, Reponse>(); // Reponse of student
    private _correctAnswersList: Map<number, Array<Reponse>> = new Map<number, Array<Reponse>>();
    private _question: Question = new Question();
    private _questionSideLeft: string;
    private _questionSideRight: string;
    private _numberOfQuestion = 0;
    private _value = 10;
    private _index = 1;
    private _showCheckButton = false;
    private _saveDone = false;
    private _showDontKnowButton = true;
    private _showNextButton = false;
    private _disableButtonSon = true;
    private _translateWord: string;
    private _pourCentgage = 0;
    private _placeHolderAnswer: string;
    private _reponseQuiz: QuizReponse = new QuizReponse();
    private _showAppMenu = true;
    private _homeWorkList: Array<HomeWork> = new Array<HomeWork>();
    private _selectedLanguage: any = {code: 'ar', name: 'Arabic', nativeName: 'العربية'};
    private _selectedHomeWork: HomeWork = new HomeWork();
    private _displayDictionaryDialog: boolean;
    private _synonymes: string = String();
    private _textSeleted: string;
    private _dictionaryList: Array<Dictionary> = new Array<Dictionary>();


    private _dragAnswersList: Map<string, number> = new Map<string, number>();
    private _answersT12List: Map<number, string> = new Map<number, string>();
    private _dragList: Array<string> = new Array<string>();
    private _dragIndex: number;
    private _dragData: string;
    private _nextIndex = Number(1);

    private _studenta_answersT12: Map<number, string> = new Map<number, string>();
    private _showT12AnswerDiv: boolean;
    private _t12AnswersList: Array<Reponse> = new Array<Reponse>();
    private _quizT12AnswersList: Array<Reponse> = new Array<Reponse>();
    // --------------- Next_added
    private _questionOptions = [{label: 'True', value: 'true'}, {label: 'False', value: 'false'}];
    private _selectedT12Reponse: Reponse = new Reponse();

    private _dernierSelected: Reponse = new Reponse();
    private _badgeNrMsg = 0;

    // DRAG AND DROP
    private _listOfWords: Array<string> = new Array<string>();
    private _listOfText: Map<number, string> = new Map<number, string>();
    private _dragAndDropData: string;
    private _dragAndDropCorrectAnswersList: Map<number, string> = new Map<number, string>();
    private _dragAndDropStudentAnswersList: Map<number, string> = new Map<number, string>();
    private _showToolTipForT13: boolean;


    get showToolTipForT13(): boolean {
        return this._showToolTipForT13;
    }

    set showToolTipForT13(value: boolean) {
        this._showToolTipForT13 = value;
    }

    get dragAndDropStudentAnswersList(): Map<number, string> {
        return this._dragAndDropStudentAnswersList;
    }

    set dragAndDropStudentAnswersList(value: Map<number, string>) {
        this._dragAndDropStudentAnswersList = value;
    }

    get dragAndDropCorrectAnswersList(): Map<number, string> {
        return this._dragAndDropCorrectAnswersList;
    }

    set dragAndDropCorrectAnswersList(value: Map<number, string>) {
        this._dragAndDropCorrectAnswersList = value;
    }

    get dragAndDropData(): string {
        return this._dragAndDropData;
    }

    set dragAndDropData(value: string) {
        this._dragAndDropData = value;
    }

    get listOfWords(): Array<string> {
        return this._listOfWords;
    }

    set listOfWords(value: Array<string>) {
        this._listOfWords = value;
    }

    get listOfText(): Map<number, string> {
        return this._listOfText;
    }

    set listOfText(value: Map<number, string>) {
        this._listOfText = value;
    }


    get badgeNrMsg(): number {
        return this._badgeNrMsg;
    }

    set badgeNrMsg(value: number) {
        this._badgeNrMsg = value;
    }

    get questionOptions(): ({ label: string; value: string } | { label: string; value: string })[] {
        return this._questionOptions;
    }

    set questionOptions(value: ({ label: string; value: string } | { label: string; value: string })[]) {
        this._questionOptions = value;
    }

    get selectedT12Reponse(): Reponse {
        return this._selectedT12Reponse;
    }

    set selectedT12Reponse(value: Reponse) {
        this._selectedT12Reponse = value;
    }

    get dernierSelected(): Reponse {
        return this._dernierSelected;
    }

    set dernierSelected(value: Reponse) {
        this._dernierSelected = value;
    }

    get quizT12AnswersList(): Array<Reponse> {
        return this._quizT12AnswersList;
    }

    set quizT12AnswersList(value: Array<Reponse>) {
        this._quizT12AnswersList = value;
    }

    get t12AnswersList(): Array<Reponse> {
        return this._t12AnswersList;
    }

    set t12AnswersList(value: Array<Reponse>) {
        this._t12AnswersList = value;
    }

    get studenta_answersT12(): Map<number, string> {
        return this._studenta_answersT12;
    }

    set studenta_answersT12(value: Map<number, string>) {
        this._studenta_answersT12 = value;
    }

    get showT12AnswerDiv(): boolean {
        return this._showT12AnswerDiv;
    }

    set showT12AnswerDiv(value: boolean) {
        this._showT12AnswerDiv = value;
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

    get synonymes(): string {
        return this._synonymes;
    }

    set synonymes(value: string) {
        this._synonymes = value;
    }

    get textSeleted(): string {
        return this._textSeleted;
    }

    set textSeleted(value: string) {
        this._textSeleted = value;
    }

    get dictionaryList(): Array<Dictionary> {
        return this._dictionaryList;
    }

    set dictionaryList(value: Array<Dictionary>) {
        this._dictionaryList = value;
    }

    get displayDictionaryDialog(): boolean {
        return this._displayDictionaryDialog;
    }

    set displayDictionaryDialog(value: boolean) {
        this._displayDictionaryDialog = value;
    }

    get selectedHomeWork(): HomeWork {
        return this._selectedHomeWork;
    }

    set selectedHomeWork(value: HomeWork) {
        this._selectedHomeWork = value;
    }

    wordDictionnary: string;
    son = '';
    private _answersPointStudent: Map<Question, string> = new Map<Question, string>();


    get selectedLanguage(): any {
        return this._selectedLanguage;
    }

    set selectedLanguage(value: any) {
        this._selectedLanguage = value;
    }

    get homeWorkList(): Array<HomeWork> {
        return this._homeWorkList;
    }

    set homeWorkList(value: Array<HomeWork>) {
        this._homeWorkList = value;
    }

    get courseSelected(): Cours {
        return this._courseSelected;
    }

    set courseSelected(value: Cours) {
        this._courseSelected = value;
    }

    get showAppMenu(): boolean {
        return this._showAppMenu;
    }

    set showAppMenu(value: boolean) {
        this._showAppMenu = value;
    }

    get answersPointStudent(): Map<Question, string> {
        return this._answersPointStudent;
    }

    set answersPointStudent(value: Map<Question, string>) {
        this._answersPointStudent = value;
    }

    get placeHolderAnswer(): string {
        return this._placeHolderAnswer;
    }

    set placeHolderAnswer(value: string) {
        this._placeHolderAnswer = value;
    }


    get participants(): Map<number, Array<Etudiant>> {
        return this._participants;
    }

    set participants(value: Map<number, Array<Etudiant>>) {
        this._participants = value;
    }


    get pourCentgage(): number {
        return this._pourCentgage;
    }

    set pourCentgage(value: number) {
        this._pourCentgage = value;
    }

    get translateWord(): string {
        return this._translateWord;
    }

    set translateWord(value: string) {
        this._translateWord = value;
    }

    get disableButtonSon(): boolean {
        return this._disableButtonSon;
    }

    set disableButtonSon(value: boolean) {
        this._disableButtonSon = value;
    }

    get showTakeQuiz(): boolean {
        return this._showTakeQuiz;
    }

    set showTakeQuiz(value: boolean) {
        this._showTakeQuiz = value;
    }

    get showQuizReview(): boolean {
        return this._showQuizReview;
    }

    set showQuizReview(value: boolean) {
        this._showQuizReview = value;
    }

    get myAnswer(): Reponse {
        return this._myAnswer;
    }

    set myAnswer(value: Reponse) {
        this._myAnswer = value;
    }

    get answerSelected(): Reponse {
        return this._answerSelected;
    }

    set answerSelected(value: Reponse) {
        this._answerSelected = value;
    }

    get inputAnswer(): string {
        return this._inputAnswer;
    }

    set inputAnswer(value: string) {
        this._inputAnswer = value;
    }

    get trueOrFalse(): boolean {
        return this._trueOrFalse;
    }

    set trueOrFalse(value: boolean) {
        this._trueOrFalse = value;
    }

    get disableToggleButton(): boolean {
        return this._disableToggleButton;
    }

    set disableToggleButton(value: boolean) {
        this._disableToggleButton = value;
    }


    get answersList(): Map<Question, Reponse> {
        return this._answersList;
    }

    set answersList(value: Map<Question, Reponse>) {
        this._answersList = value;
    }

    get correctAnswersList(): Map<number, Array<Reponse>> {
        return this._correctAnswersList;
    }

    set correctAnswersList(value: Map<number, Array<Reponse>>) {
        this._correctAnswersList = value;
    }

    get question(): Question {
        return this._question;
    }

    set question(value: Question) {
        this._question = value;
    }

    get questionSideLeft(): string {
        return this._questionSideLeft;
    }

    set questionSideLeft(value: string) {
        this._questionSideLeft = value;
    }

    get questionSideRight(): string {
        return this._questionSideRight;
    }

    set questionSideRight(value: string) {
        this._questionSideRight = value;
    }

    get numberOfQuestion(): number {
        return this._numberOfQuestion;
    }

    set numberOfQuestion(value: number) {
        this._numberOfQuestion = value;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    get index(): number {
        return this._index;
    }

    set index(value: number) {
        this._index = value;
    }

    get showCheckButton(): boolean {
        return this._showCheckButton;
    }

    set showCheckButton(value: boolean) {
        this._showCheckButton = value;
    }

    get saveDone(): boolean {
        return this._saveDone;
    }

    set saveDone(value: boolean) {
        this._saveDone = value;
    }

    get showDontKnowButton(): boolean {
        return this._showDontKnowButton;
    }

    set showDontKnowButton(value: boolean) {
        this._showDontKnowButton = value;
    }

    get showNextButton(): boolean {
        return this._showNextButton;
    }

    set showNextButton(value: boolean) {
        this._showNextButton = value;
    }

    get parcourCurrent(): Parcours {
        return this._parcourCurrent;
    }

    set parcourCurrent(value: Parcours) {
        this._parcourCurrent = value;
    }


    get sectionCurrent(): Section {
        return this._sectionCurrent;
    }

    set sectionCurrent(value: Section) {
        this._sectionCurrent = value;
    }


    get courseCurrent(): Cours {
        return this._courseCurrent;
    }

    set courseCurrent(value: Cours) {
        this._courseCurrent = value;
    }


    get reponseQuiz(): QuizReponse {
        return this._reponseQuiz;
    }

    set reponseQuiz(value: QuizReponse) {
        this._reponseQuiz = value;
    }


    get noteQuiz(): number {
        return this._noteQuiz;
    }

    set noteQuiz(value: number) {
        this._noteQuiz = value;
    }

    // List of Question
    get questionList(): Array<Question> {
        return this.service.items;
    }

    set questionList(value: Array<Question>) {
        this.service.items = value;
    }


    get selectedQuiz(): Quiz {
        return this.service.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.service.selectedQuiz = value;
    }


    get answer(): ReponseEtudiant {
        return this.reponseEtudiantService.answer;
    }


    saveAnswers(question: Question, type: string): Reponse {
        if (question?.typeDeQuestion?.ref !== 't12') {
            this.translate(question);
        }
        this.disableButtonSon = false;
        if (question.typeDeQuestion.ref === 't1') {
            for (const item of question.reponses) {
                if (item.lib === this.reponseQuiz.lib) {
                    this.answerSelected = item;
                }
            }
        } else if (question.typeDeQuestion.ref === 't3') {
            this.myAnswer.lib = this.reponseQuiz.lib;
            if (this.answerIsCorrect(this.myAnswer, question) === true) {
                this.myAnswer = this.correctAnswersList.get(question.id)[0];
            } else {
                this.myAnswer.etatReponse = 'false';
                this.myAnswer.question = question;
                this.myAnswer.numero = 2;
            }

            this.answerSelected = this.myAnswer;
        } else if (question.typeDeQuestion.ref === 't4' || question.typeDeQuestion.ref === 't6') {
            this.answerSelected.lib = this.reponseQuiz.lib;
            if (this.answerIsCorrect(this.answerSelected, question) === true) {
                this.answerSelected = this.correctAnswersList.get(question.id)[0];
            } else {
                this.answerSelected.etatReponse = 'false';
                this.answerSelected.question = question;
                this.answerSelected.numero = 2;
            }
        } else if (question.typeDeQuestion.ref === 't5') {
            this.disableToggleButton = true;
            this.answerSelected.lib = String(this.trueOrFalse);
            if (String(this.correctAnswersList.get(question.id)[0].lib) === String(this.answerSelected.lib)) {
                this.answerSelected = this.correctAnswersList.get(question.id)[0];
                document.getElementById('trueFalse').className = 'trueQst p-grid';
            } else {
                this.answerSelected.etatReponse = 'false';
                this.answerSelected.question = question;
                this.answerSelected.numero = 2;
                document.getElementById('trueFalse').className = 'falseQst p-grid';
            }
        } else if (question.typeDeQuestion.ref === 't12') {
            this.answerSelected.lib = this.reponseQuiz.lib;
            this.answerSelected.id = this.reponseQuiz.id;
            this.answerSelected.question = this.reponseQuiz.question;
            this.answerSelected.numero = this.reponseQuiz.numero;
            this.answerSelected.etatReponse = this.reponseQuiz.etatReponse;
        } else if (question.typeDeQuestion.ref === 't13') {
            for (const key of this.dragAndDropCorrectAnswersList.keys()) {
                if (this.dragAndDropCorrectAnswersList.get(key) === this.dragAndDropStudentAnswersList.get(Number(key))) {
                    document.getElementById(key.toString()).style.border = '2px solid green';
                } else {
                    document.getElementById(key.toString()).style.border = '2px solid red';
                    document.getElementById('toolTipT13' + key?.toString()).style.visibility = 'visible';
                    this.answerSelected.etatReponse = 'false';
                }
                if (this.answerSelected.lib === undefined) {
                    this.answerSelected.lib = key + this.dragAndDropStudentAnswersList.get(key) + ' ';
                } else {
                    this.answerSelected.lib += key + this.dragAndDropStudentAnswersList.get(key) + ' ';
                }
                this.answerSelected.question = question;
            }
        }
        this.answersList.set(question, this.answerSelected);
        this.answersPointStudent.set(question, type);
        this.showNextButton = true;
        this.showCheckButton = false;
        this.saveDone = true;
        this.showDontKnowButton = false;
        return this.answerSelected;
    }


    public translate(qst: Question) {
        if (qst.typeDeQuestion.ref === 't1' || qst.typeDeQuestion.ref === 't6' || qst.typeDeQuestion.ref === 't4') {
            this.wordDictionnary = this.questionSideLeft + ' ' + this.correctAnswersList?.get(qst.id)[0].lib + ' ' + this.questionSideRight;
        } else if (qst.typeDeQuestion.ref === 't3') {
            this.wordDictionnary = this.correctAnswersList?.get(qst.id)[0].lib;
        } else if (qst.typeDeQuestion.ref === 't5') {
            this.wordDictionnary = qst.libelle;
        }


        if (this.selectedLanguage.code === 'ar') {
            this.service.translate(this.wordDictionnary).subscribe(
                data => {
                    this.translateWord = data;
                }
            );
        } else if (this.selectedLanguage.code === 'fr') {
            this.service.translateEnFr(this.wordDictionnary).subscribe(
                data => {
                    this.translateWord = data;
                }
            );
        }
    }


    answerIsCorrect(ans: Reponse, qst: Question) {
        let answerLib: string;
        if (qst.typeDeQuestion.ref !== 't5') {
            answerLib = ans.lib.replace(/\s/g, '');
        } else {
            answerLib = ans.lib;
        }

        for (const item of this.correctAnswersList.get(qst.id)) {
            const answerCorrectLib = item?.lib.replace(/\s/g, '');
            if (answerLib === answerCorrectLib) {
                return true;
            }
        }
        return false;
    }


    nextQuestionFct(): Question {
        this.reponseQuiz = new QuizReponse();
        this.translateWord = String();
        this.wordDictionnary = String();
        this.disableButtonSon = true;
        this.showCheckButton = false;
        this.saveDone = false;
        this.showDontKnowButton = true;
        this.showNextButton = false;
        this.value += this.pourCentgage;
        this.disableToggleButton = false;
        this.index += 1;
        this.inputAnswer = String();
        this.trueOrFalse = null;
        this.answerSelected = new Reponse();
        this.myAnswer = new Reponse();
        for (let i = 0; i < (this.questionList.length); i++) {
            if (this.question.id === this.questionList[i].id) {
                this.question = this.questionList[i + 1];
                if (this.question.typeDeQuestion.ref === 't1') {
                    this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('...'));
                    this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('...') + 3);
                } else if (this.question.typeDeQuestion.ref === 't4' || this.question.typeDeQuestion.ref === 't6') {
                    this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('@'));
                    this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('@') + 1);
                    this.inputAnswer = this.question.libelle.substring(this.question.libelle.indexOf('@') + 1,
                        this.question.libelle.lastIndexOf('@'));
                } else if (this.question.typeDeQuestion.ref === 't3') {
                    this.placeHolderAnswer = this.correctAnswersList.get(this.question.id)[0]?.lib;
                } else if (this.question.typeDeQuestion.ref === 't12') {
                    this.extractedData(this.question.libelle, 't12');
                    this.showT12Answers();
                } else if (this.question.typeDeQuestion.ref === 't13') {
                    this.extractDataForDragAndDrop(this.question.libelle);
                }
                break;
            }
        }

        return this.question;
    }

    previousQuestionFct(): Question {
        this.reponseQuiz = new QuizReponse();
        this.translateWord = String();
        this.wordDictionnary = String();
        this.disableButtonSon = true;
        this.showCheckButton = false;
        this.saveDone = false;
        this.showDontKnowButton = true;
        this.showNextButton = false;
        this.value -= this.pourCentgage;
        this.disableToggleButton = false;
        this.index -= 1;
        this.inputAnswer = String();
        this.trueOrFalse = null;
        this.answerSelected = new Reponse();
        this.myAnswer = new Reponse();
        for (let i = 0; i < (this.questionList.length); i++) {
            if (this.question.id === this.questionList[i].id) {
                this.question = this.questionList[i - 1];

                if (this.question.typeDeQuestion.ref === 't1') {
                    this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('...'));
                    this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('...') + 3);
                } else if (this.question.typeDeQuestion.ref === 't4' || this.question.typeDeQuestion.ref === 't6') {
                    this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('@'));
                    this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('@') + 1);
                    this.inputAnswer = this.question.libelle.substring(this.question.libelle.indexOf('@') + 1,
                        this.question.libelle.lastIndexOf('@'));
                } else if (this.question.typeDeQuestion.ref === 't3') {
                    this.placeHolderAnswer = this.correctAnswersList.get(this.question.id)[0]?.lib;
                } else if (this.question.typeDeQuestion.ref === 't12') {
                    this.extractedData(this.question.libelle, 't12');
                    this.showT12Answers();
                } else if (this.question.typeDeQuestion.ref === 't13') {
                    this.extractDataForDragAndDrop(this.question.libelle);
                }
                break;
            }
        }
        return this.question;
    }


    showAnswers(question: Question): Reponse {
        this.disableButtonSon = false;
        this.translate(question);
        if (question.typeDeQuestion.ref === 't5') {
            document.getElementById('trueFalse').className = 'trueQst p-grid';
            this.trueOrFalse = this.correctAnswersList.get(question.id)[0].lib === 'true';

            this.disableToggleButton = true;
        }
        this.answerSelected = this.correctAnswersList.get(question.id)[0];
        this.answersList.set(question, this.answerSelected);
        this.answersPointStudent.set(question, 'STUDENT_DONT_KNOW');

        this.myAnswer = new Reponse();
        this.showNextButton = true;
        this.showCheckButton = false;
        this.showDontKnowButton = false;
        this.saveDone = true;
        return this.answerSelected;
    }

    public onStartHomeWork(course: Cours) {
        this.translateWord = String();
        this.parcourCurrent = new Parcours();
        this.sectionCurrent = new Section();
        this.courseCurrent = new Cours();
        this.noteQuiz = 0;
        this.showTakeQuiz = true;
        this.showQuizReview = false;
        this.inputAnswer = String();
        this.trueOrFalse = null;
        this.disableToggleButton = false;
        this.numberOfQuestion = 0;
        this.value = 10;
        this.index = 1;
        this.showCheckButton = false;
        this.saveDone = false;
        this.showDontKnowButton = true;
        this.showNextButton = false;
        this.disableButtonSon = true;
        this.pourCentgage = 0;
        this.noteQuiz = 0;
    }

    public onStart(selectedQuiz: Quiz) {
        this.nextIndex = Number(1);
        this.t12AnswersList = new Array<Reponse>();
        this.studenta_answersT12 = new Map<number, string>();
        this.reponseQuiz = new QuizReponse();
        this.translateWord = String();
        this.parcourCurrent = new Parcours();
        this.sectionCurrent = new Section();
        this.courseCurrent = new Cours();
        this.noteQuiz = 0;
        this.showTakeQuiz = true;
        this.showQuizReview = false;
        this.myAnswer = new Reponse();
        this.answerSelected = new Reponse();
        this.inputAnswer = String();
        this.trueOrFalse = null;
        this.disableToggleButton = false;
        this.answersList = new Map<Question, Reponse>();
        this.correctAnswersList = new Map<number, Array<Reponse>>();
        this.answersPointStudent = new Map<Question, string>();
        this.question = new Question();
        this.numberOfQuestion = 0;
        this.value = 10;
        this.index = 1;
        this.showCheckButton = false;
        this.saveDone = false;
        this.showDontKnowButton = true;
        this.showNextButton = false;
        this.disableButtonSon = true;
        this.pourCentgage = 0;
        this.noteQuiz = 0;
        this.service.findAllQuestions(selectedQuiz.ref).subscribe(
            data => {
                this.questionList = data;
                this.numberOfQuestion = this.questionList.length;
                this.pourCentgage = 100 / this.numberOfQuestion;
                this.value = this.pourCentgage;
                for (let i = 0; i < this.questionList.length; i++) {
                    this.question = this.questionList[0];
                    this.service.findReponses(this.questionList[i].id).subscribe(
                        data1 => {
                            this.questionList[i].reponses = data1;
                            this.correctAnswersList.set(this.questionList[i].id, data1.filter(r => r.etatReponse === 'true'));
                            if (this.question.typeDeQuestion.ref === 't3') {
                                this.placeHolderAnswer = this.correctAnswersList.get(this.question.id)[0]?.lib;
                            }
                        }, error => {
                            console.log(error);
                        }
                    );
                    if (this.question.typeDeQuestion.ref === 't1') {
                        this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('...'));
                        this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('...') + 3);
                    } else if (this.question.typeDeQuestion.ref === 't4' || this.question.typeDeQuestion.ref === 't6') {
                        this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('@'));
                        this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('@') + 1);
                        this.inputAnswer = this.question.libelle.substring(this.question.libelle.indexOf('@') + 1,
                            this.question.libelle.lastIndexOf('@'));
                    } else if (this.question.typeDeQuestion.ref === 't12') {
                        this.extractedData(this.question.libelle, 't12');
                        this.showT12Answers();
                    } else if (this.question.typeDeQuestion.ref === 't13') {
                        this.extractDataForDragAndDrop(this.question.libelle);
                    }
                }
            }
        );
    }

    private showT12Answers() {
        this.quizT12AnswersList = new Array<Reponse>();
        this.service.findReponses(this.question.id).subscribe(
            data1 => {
                this.quizT12AnswersList = data1;
                this.filterDatat12(this.quizT12AnswersList, 1);
            }, error => {
                console.log(error);
            }
        );
    }


    private filterDatat12(reponses: Array<Reponse>, index: number) {
        this.showDontKnowButton = true;
        this.showCheckButton = false;
        this.t12AnswersList = reponses.filter(t => t.numero === index);
        document.getElementById(String(index)).style.borderBottom = '2px solid #2196f3';
        document.getElementById(String(index)).style.color = '#2196f3';
    }

    private extractedData(libelle: string, code: string) {
        this.dragAnswersList = new Map<string, number>();
        this.dragList = new Array<string>();
        const text = libelle;
        let counter = 2;                  // _1 It's been a while /_2 we have been in touch.
        while (counter !== -1) {
            const myNumIndex = libelle.indexOf(String(counter - 1));
            const myNumber = libelle[myNumIndex];
            let sentence: string;
            const index = libelle.indexOf('_' + String(counter));
            if (index !== -1) {
                sentence = libelle.substring(myNumIndex + 1, index);
                counter++;
            } else {
                sentence = libelle.substring(myNumIndex + 1, libelle.length);
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

    finishQuiz(): QuizEtudiant {
        const quizStudent: QuizEtudiant = new QuizEtudiant();
        const threshold = this.answersList.size;
        this.noteQuiz = 0;
        for (const value of this.answersList.entries()) {
            if (value[1].etatReponse === 'true') {
                if (this.answersPointStudent.get(value[0]) === 'STUDENT_ANSWER') {
                    this.noteQuiz += value[0].pointReponseJuste;
                } else if (this.answersPointStudent.get(value[0]) === 'TEACHER_ANSWER') {
                    this.noteQuiz += value[0].pointReponseJuste / 2;
                } else {
                    this.noteQuiz += 0;
                }
            } else {
                this.noteQuiz -= value[0].pointReponsefausse;
            }
        }
        quizStudent.quiz = this.selectedQuiz;
        quizStudent.etudiant = this.login.getConnectedStudent();
        quizStudent.note = this.noteQuiz;
        quizStudent.questionCurrent = threshold;
        quizStudent.resultat = String(this.noteQuiz + ' / ' + threshold);
        this.service.save(quizStudent).subscribe(
            quitEtudiant => {
                for (const entry of this.answersList.entries()) {
                    this.answer.question = entry[0];
                    this.answer.quizEtudiant = quitEtudiant;
                    if (entry[0].typeDeQuestion.ref === 't13') {
                        this.answer.reponse = entry[1];
                        this.answer.answer = entry[1].lib;
                    } else {
                        this.answer.reponse = this.correctAnswersList.get(entry[0].id)[0];
                        this.answer.answer = entry[1].lib;
                    }

                    if (entry[1].etatReponse === 'true') {
                        if (this.answersPointStudent.get(entry[0]) === 'STUDENT_ANSWER') {
                            this.answer.note = entry[0].pointReponseJuste;
                        } else if (this.answersPointStudent.get(entry[0]) === 'TEACHER_ANSWER') {
                            this.answer.note = entry[0].pointReponseJuste / 2;
                        } else {
                            this.answer.note = 0;
                            this.answer.answer = null;
                        }
                    } else {
                        this.answer.note = entry[0].pointReponsefausse;
                    }
                    this.reponseEtudiantService.save().subscribe(
                        reponse => {
                        }, error => {
                            console.log(error);
                        }
                    );
                }
            }, error => {
                console.log(error);
            }
        );
        this.showTakeQuiz = false;
        this.showQuizReview = true;
        return quizStudent;
    }

    public sound(qst: Question) {
        if (qst.typeDeQuestion.ref === 't1' || qst.typeDeQuestion.ref === 't6' || qst.typeDeQuestion.ref === 't4') {
            this.son = this.questionSideLeft + ' ' + this.correctAnswersList?.get(qst.id)[0].lib + ' ' + this.questionSideRight;
        } else if (qst.typeDeQuestion.ref === 't3') {
            this.son = this.correctAnswersList?.get(qst.id)[0].lib;
        } else if (qst.typeDeQuestion.ref === 't5') {
            this.son = qst.libelle;
        }
        const text = encodeURIComponent(this.son);
        const url = 'https://www.translatedict.com/speak.php?word=' + this.son + '&lang=en';
        const audio = new Audio(url);
        audio.play();
    }


    onClickT12(answer: Reponse): boolean {
        this.studenta_answersT12.set(answer.numero, answer.lib);
        this.showT12AnswerDiv = true;
        this.nextIndex += 1;
        if (this.nextIndex <= this.answersT12List.size) {
            this.showCheckButton = false;
            this.showDontKnowButton = true;
            this.filterDatat12(this.quizT12AnswersList, this.nextIndex);
            document.getElementById('showCheckButtonForT12').style.visibility = 'hidden';
            return false;
        } else {
            this.disableButtonSon = false;
            this.showCheckButton = true;
            this.showDontKnowButton = false;
            this.t12AnswersList = new Array<Reponse>();
            document.getElementById('showCheckButtonForT12').style.visibility = 'visible';
            return true;
        }
    }

    checkT12Answer(qst: Question): Reponse {
        let reponseStudent: Reponse = new Reponse();
        for (const item of this.studenta_answersT12.values()) {
            for (const reponse of this.quizT12AnswersList) {
                if (item === reponse.lib) {
                    if (reponse.etatReponse === 'true') {
                        document.getElementById(item).className = 'correctAnswerT12';
                        if (reponseStudent.lib !== undefined) {
                            reponseStudent.lib = reponseStudent.lib + ' / ' + item + '(true)';
                        } else {
                            reponseStudent.lib = item + '(true)';
                        }

                    } else {
                        if (reponseStudent.lib !== undefined) {
                            reponseStudent.lib = reponseStudent.lib + ' / ' + item + '(false)';
                        } else {
                            reponseStudent.lib = item + '(false)';
                        }
                        reponseStudent.etatReponse = 'false';
                        document.getElementById(item).className = 'incorrectAnswerT12';
                        document.getElementById(item).style.paddingTop = '5px';
                        document.getElementById(reponse.numero.toString() + 'toooooltips').style.visibility = 'visible';
                        document.getElementById(reponse.numero.toString() + 'toooooltips').innerText = this.quizT12AnswersList.filter(t =>
                            t.numero === reponse.numero && t.etatReponse === 'true')[0]?.lib;
                    }
                }
            }
        }
        reponseStudent.question = qst;
        return reponseStudent;
    }


    drop(ev): string {
        const id: number = Number(ev.target.id);
        this.dragAndDropStudentAnswersList.set(id, this.dragAndDropData);
        ev.target.value = this.dragAndDropData;
        this.listOfWords.splice(this.listOfWords.indexOf(this.dragAndDropData), 1);
        if (this.listOfWords.length === 0) {
            this.showCheckButton = true;
        }
        return this.dragAndDropData;
    }

    dropSynch(id: number): string {
        this.dragAndDropStudentAnswersList.set(id, this.dragAndDropData);
        // @ts-ignore
        document.getElementById(String(id)).value = this.dragAndDropData;
        this.listOfWords.splice(this.listOfWords.indexOf(this.dragAndDropData), 1);
        if (this.listOfWords.length === 0) {
            this.showCheckButton = true;
        }
        return this.dragAndDropData;
    }

    drag(ev) {
        this.dragAndDropData = String();
        this.dragAndDropData = ev.target.value;
    }

    private extractDataForDragAndDrop(qstLibelle: string) {
        console.log(qstLibelle);
        let libelle = qstLibelle;
        let index = 1;
        let test = '@';
        while (test === '@') {
            const firstIndex = qstLibelle.indexOf('@');
            if (firstIndex !== -1) {
                this.listOfText.set(index, qstLibelle.slice(0, qstLibelle.indexOf('@')));
                qstLibelle = qstLibelle.slice(firstIndex + 1, qstLibelle.length);
                const word = qstLibelle.substring(0, qstLibelle.indexOf('@'));
                this.dragAndDropCorrectAnswersList.set(index, word);
                qstLibelle = qstLibelle.slice(word.length + 1, qstLibelle.length);
                libelle = libelle.replace(word, ' ');
                index++;
                test = '@';
            } else {
                this.listOfText.set(index, qstLibelle.slice(0, qstLibelle.length));
                test = 'finish';
            }
        }
        for (const value of this.dragAndDropCorrectAnswersList.values()) {
            if (this.listOfWords.indexOf(value) === -1) {
                this.listOfWords.push(value);
            }
        }
        this.listOfWords = this.listOfWords.sort((a, b) => b.localeCompare(a));
    }
}
