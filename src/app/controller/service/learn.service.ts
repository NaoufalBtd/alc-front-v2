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
    private _trueOrFalse = true;
    private _disableToggleButton = false;
    private _answersList: Map<Question, Reponse> = new Map<Question, Reponse>();
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

    wordDictionnary: string;
    son = '';
    private _answersPointStudent: Map<Question, string> = new Map<Question, string>();


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
        // this.translate(question);
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
            console.log(this.trueOrFalse);
            console.log(this.correctAnswersList.get(question.id)[0].lib);
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
        }
        this.answersList.set(question, this.answerSelected);
        this.answersPointStudent.set(question, type);
        console.log(this.answersPointStudent);
        this.showNextButton = true;
        this.showCheckButton = false;
        this.saveDone = true;
        this.showDontKnowButton = false;
        return this.answerSelected;
    }

    //
    // public translate(qst: Question) {
    //     if (qst.typeDeQuestion.ref === 't1' || qst.typeDeQuestion.ref === 't6' || qst.typeDeQuestion.ref === 't4') {
    //         this.wordDictionnary = this.questionSideLeft + ' ' + this.correctAnswersList?.get(qst.id)[0].lib + ' ' + this.questionSideRight;
    //         console.log(this.son);
    //     } else if (qst.typeDeQuestion.ref === 't3') {
    //         this.wordDictionnary = this.correctAnswersList?.get(qst.id)[0].lib;
    //         console.log(this.son);
    //     } else if (qst.typeDeQuestion.ref === 't5') {
    //         this.wordDictionnary = qst.libelle;
    //     }
    //     this.service.translate(this.wordDictionnary).subscribe(
    //         data => {
    //             this.translateWord = data;
    //             console.log(data);
    //         }
    //     );
    // }


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
        console.log('=========================== NEXT QUESTION  FUNCTION =================================');
        console.log(this.question);
        console.log('=========================== NEXT QUESTION  FUNCTION =================================');
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
        this.trueOrFalse = true;
        this.answerSelected = new Reponse();
        this.myAnswer = new Reponse();
        for (let i = 0; i < (this.questionList.length); i++) {
            if (this.question.id === this.questionList[i].id) {
                this.question = this.questionList[i + 1];
                console.log('===========================  QUESTION  ACTUEL =================================');
                console.log(this.question);
                if (this.question.typeDeQuestion.ref === 't1') {
                    this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('...'));
                    this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('...') + 3);
                } else if (this.question.typeDeQuestion.ref === 't4' || this.question.typeDeQuestion.ref === 't6') {
                    this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('@'));
                    this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('@') + 1);
                    this.inputAnswer = this.question.libelle.substring(this.question.libelle.indexOf('@') + 1,
                        this.question.libelle.lastIndexOf('@'));
                } else if (this.question.typeDeQuestion.ref === 't3') {
                    console.log('====================== T3 =======================================');
                    console.log(this.correctAnswersList.get(this.question.id)[0]);
                    console.log('====================== T3 =======================================');
                    this.placeHolderAnswer = this.correctAnswersList.get(this.question.id)[0]?.lib;
                }
                break;
            }
        }
        console.log('==============================================================');
        console.log(this.question);
        console.log('==============================================================');
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
        this.trueOrFalse = true;
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
                }
                break;
            }
        }
        return this.question;
    }


    showAnswers(question: Question): Reponse {
        this.disableButtonSon = false;
        // this.translate(question);
        if (question.typeDeQuestion.ref === 't5') {
            document.getElementById('trueFalse').className = 'trueQst p-grid';
            this.trueOrFalse = this.correctAnswersList.get(question.id)[0].lib === 'true';

            console.log(this.inputAnswer);
            this.disableToggleButton = true;
        }
        this.answerSelected = this.correctAnswersList.get(question.id)[0];
        this.answersList.set(question, this.answerSelected);
        this.answersPointStudent.set(question, 'STUDENT_DONT_KNOW');

        console.log(this.answersList);
        this.myAnswer = new Reponse();
        this.showNextButton = true;
        this.showCheckButton = false;
        this.showDontKnowButton = false;
        this.saveDone = true;
        return this.answerSelected;
    }

    public onStartHomeWork(course: Cours) {
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
        this.trueOrFalse = true;
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
        console.log(this.showDontKnowButton);
        console.log(this.showCheckButton);
        this.noteQuiz = 0;
        this.homeWorkService.findhomeworkbyCoursId(course).subscribe(homeWorkData => {
            console.log(homeWorkData);
            this.homeWorkList = homeWorkData;

        }, error => {
            console.log(error);
        });
    }

    public onStart() {
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
        this.trueOrFalse = true;
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
        console.log(this.showDontKnowButton);
        console.log(this.showCheckButton);
        this.noteQuiz = 0;
        this.service.findAllQuestions(this.selectedQuiz.ref).subscribe(
            data => {
                this.questionList = data;
                this.numberOfQuestion = this.questionList.length;
                this.pourCentgage = 100 / this.numberOfQuestion;
                this.value = this.pourCentgage;
                console.log(this.questionList);
                for (let i = 0; i < this.questionList.length; i++) {
                    this.question = this.questionList[0];
                    this.service.findReponses(this.questionList[i].id).subscribe(
                        data1 => {
                            this.questionList[i].reponses = data1;
                            this.correctAnswersList.set(this.questionList[i].id, data1.filter(r => r.etatReponse === 'true'));
                            console.log(this.correctAnswersList);
                            if (this.question.typeDeQuestion.ref === 't3') {
                                console.log(this.correctAnswersList);
                                this.placeHolderAnswer = this.correctAnswersList.get(this.question.id)[0]?.lib;
                            }
                        }, error => {
                            console.log(error);
                        }
                    );
                    console.log(this.question);
                    console.log(this.questionSideLeft);
                    console.log(this.questionSideRight);
                    if (this.question.typeDeQuestion.ref === 't1') {
                        this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('...'));
                        this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('...') + 3);
                    } else if (this.question.typeDeQuestion.ref === 't4' || this.question.typeDeQuestion.ref === 't6') {
                        this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('@'));
                        this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('@') + 1);
                        this.inputAnswer = this.question.libelle.substring(this.question.libelle.indexOf('@') + 1,
                            this.question.libelle.lastIndexOf('@'));
                    }
                }
            }
        );
    }


    finishQuiz() {
        const quizStudent: QuizEtudiant = new QuizEtudiant();
        const threshold = this.answersList.size;
        this.noteQuiz = 0;
        console.log(this.answersPointStudent);
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
        console.log(quizStudent);
        this.service.save(quizStudent).subscribe(
            quitEtudiant => {
                console.log(quitEtudiant);
                for (const entry of this.answersList.entries()) {
                    this.answer.question = entry[0];
                    this.answer.quizEtudiant = quitEtudiant;
                    this.answer.reponse = this.correctAnswersList.get(entry[0].id)[0];
                    this.answer.answer = entry[1].lib;
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
                            console.log(reponse);
                        }, error => {
                            console.log(error);
                        }
                    );
                }
            }, error => {
                console.log(error);
            }
        );
        console.log(this.noteQuiz + ' / ' + threshold);
        this.showTakeQuiz = false;
        this.showQuizReview = true;
    }

    public sound(qst: any) {
        if (qst.typeDeQuestion.ref === 't1' || qst.typeDeQuestion.ref === 't6' || qst.typeDeQuestion.ref === 't4') {
            this.son = this.questionSideLeft + ' ' + this.correctAnswersList?.get(qst.id)[0].lib + ' ' + this.questionSideRight;
            console.log(this.son);
        } else if (qst.typeDeQuestion.ref === 't3') {
            this.son = this.correctAnswersList?.get(qst.id)[0].lib;
            console.log(this.son);
        } else if (qst.typeDeQuestion.ref === 't5') {
            this.son = qst.libelle;
        }
        const text = encodeURIComponent(this.son);
        const url = 'https://www.translatedict.com/speak.php?word=' + this.son + '&lang=en';
        const audio = new Audio(url);
        audio.play();
    }


}
