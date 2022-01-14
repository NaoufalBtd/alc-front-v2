/* tslint:disable:triple-equals prefer-for-of variable-name align */
import {Component, OnInit} from '@angular/core';
import {Question} from '../../../../controller/model/question.model';
import {Quiz} from '../../../../controller/model/quiz.model';
import {Reponse} from '../../../../controller/model/reponse.model';
import {QuizService} from '../../../../controller/service/quiz.service';
import {Router} from '@angular/router';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {LoginService} from '../../../../controller/service/login.service';
import {ReponseEtudiant} from '../../../../controller/model/reponse-etudiant.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {QuizEtudiant} from '../../../../controller/model/quiz-etudiant.model';
import {ConfirmationService, MenuItem, MessageService, TreeNode} from 'primeng/api';
import {DictionaryService} from '../../../../controller/service/dictionary.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {HttpClient} from '@angular/common/http';
import {VocabularyService} from '../../../../controller/service/vocabulary.service';
import {Dictionary} from '../../../../controller/model/dictionary.model';
import {Section} from '../../../../controller/model/section.model';
import {ReponseEtudiantService} from '../../../../controller/service/reponse-etudiant.service';
import {Cours} from '../../../../controller/model/cours.model';
import {LearnService} from '../../../../controller/service/learn.service';
import {Parcours} from '../../../../controller/model/parcours.model';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-quiz-preview',
    templateUrl: './quiz-preview.component.html',
    styleUrls: ['./quiz-preview.component.scss']
})
export class QuizPreviewComponent implements OnInit
{
    items = [
        {label: this.parcourCurrent.libelle, routerLink:  '/admin/parcours'},
        {label: this.courseCurrent.libelle, routerLink:  '/admin/parcours'},
        {label: this.sectionCurrent.libelle, routerLink:  '/admin/parcours'},
    ];
    home = {icon: 'pi pi-home', routerLink:  '/admin/parcours'};

    reponseEtudiantList: Array<ReponseEtudiant> = new Array<ReponseEtudiant>();
    showTakeQuiz = true;
    showQuizReview = false;
    myAnswer: Reponse = new Reponse();
    answerSelected: Reponse = new Reponse();
    questionOptions = [{label: 'True', value: 'true'}, {label: 'False', value: 'false'}];
    disabledButtonCheck = false;
    inputAnswer: string;
    trueOrFalse = true;
    disableToggleButton = false;
    answersList: Map<Question, Reponse> = new Map<Question, Reponse>();
    correctAnswersList: Map<number, Array<Reponse>> = new Map<number, Array<Reponse>>();
    question: Question = new Question();
    questionSideLeft: string;
    questionSideRight: string;
    numberOfQuestion = 0;
    pourCentgage = 0;
    value = 10;
    nextQuestion: Question = new Question();
    index = 1;

    showCheckButton = false;
    saveDone = false;
    showCorrectAnswerInput = false;
    showFalseAnswerInput = false;
    showDontKnowButton = true;
    showNextButton = false;

    constructor(private service: QuizEtudiantService,
                private learnService: LearnService,
                private reponseEtudiantService: ReponseEtudiantService,
                private login: LoginService,
                private messageService: MessageService,
                private router: Router,
                private dictionnaryService: DictionaryService,
                private sanitizer: DomSanitizer,
                private confirmationService: ConfirmationService,
                private parcoursservice: ParcoursService) {
    }

    private _noteQuiz: number;

    translateWord: string;
    wordDictionnary: string;

    son = '';
    disableButtonSon = true;



    get courseCurrent(): Cours {
        return this.learnService.courseCurrent;
    }
    get sectionCurrent(): Section {
        return this.learnService.sectionCurrent;
    }

    get parcourCurrent(): Parcours {
        return this.learnService.parcourCurrent;
    }


    get noteQuiz(): number {
        return this._noteQuiz;
    }

    set noteQuiz(value: number) {
        this._noteQuiz = value;
    }


    get etudiant(): Etudiant {
        return this.service.etudiant;
    }

    set etudiant(value: Etudiant) {
        this.service.etudiant = value;
    }


    // List of Question
    get questionList(): Array<Question> {
        return this.service.items;
    }

    set questionList(value: Array<Question>) {
        this.service.items = value;
    }

    get reponses(): Array<Reponse> {
        return this.service.reponses;
    }

    set reponses(value: Array<Reponse>) {
        this.service.reponses = value;
    }


    get numQuestion(): number {
        return this.service.numQuestion;
    }

    set numQuestion(value: number) {
        this.service.numQuestion = value;
    }


    get selectedQuiz(): Quiz {
        return this.service.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.service.selectedQuiz = value;
    }

    get selectedDict(): Dictionary {
        return this.dictionnaryService.selectedDict;
    }

    set selectedDict(value: Dictionary) {
        this.dictionnaryService.selectedDict = value;
    }

    get itemsDict(): Array<Dictionary> {
        return this.dictionnaryService.itemsDict;
    }

    set itemsDict(value: Array<Dictionary>) {
        this.dictionnaryService.itemsDict = value;
    }

    get submittedDict(): boolean {
        return this.dictionnaryService.submittedDict;
    }

    set submittedDict(value: boolean) {
        this.dictionnaryService.submittedDict = value;
    }

    get createDialogDict(): boolean {
        return this.dictionnaryService.createDialogDict;
    }

    set createDialogDict(value: boolean) {
        this.dictionnaryService.createDialogDict = value;
    }

    set itemssection2(value: Array<Section>) {
        this.parcoursservice.itemssection2 = value;
    }

    get itemssection2(): Array<Section> {
        return this.parcoursservice.itemssection2;
    }

    get selectedsection(): Section {
        return this.parcoursservice.selectedsection;
    }


    // tslint:disable-next-line:adjacent-overload-signatures
    set selectedsection(value: Section) {
        this.parcoursservice.selectedsection = value;
    }


    get passerQuiz(): string {
        return this.service.passerQuiz;
    }

    set passerQuiz(value: string) {
        this.service.passerQuiz = value;
    }

    get quizView(): boolean {
        return this.service.quizView;
    }

    set quizView(value: boolean) {
        this.service.quizView = value;
    }


    get editDialogDict(): boolean {
        return this.dictionnaryService.editDialogDict;
    }

    set editDialogDict(value: boolean) {
        this.dictionnaryService.editDialogDict = value;
    }


    ngOnInit(): void {
        this.numQuestion = 0;
        this.noteQuiz = 0;
        this.etudiant = this.login.getConnectedStudent();
        this.service.findAllQuestions(this.selectedQuiz.ref).subscribe(
            data => {
                this.questionList = data;
                this.numberOfQuestion = this.questionList.length;
                this.pourCentgage = 100 / this.numberOfQuestion;
                this.value = this.pourCentgage;
                console.log(this.questionList);
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < this.questionList.length; i++) {
                    this.question = this.questionList[0];
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
                    this.nextQuestion = this.questionList[1];
                    this.service.findReponses(this.questionList[i].id).subscribe(
                        data1 => {
                            this.questionList[i].reponses = data1;
                            this.correctAnswersList.set(this.questionList[i].id, data1.filter(r => r.etatReponse === 'true'));
                        }, error => {
                            console.log(error);
                        }
                    );
                }
            }
        );

    }


    public sound(qst: Question) {
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


    public translate(qst: Question) {
        if (qst.typeDeQuestion.ref === 't1' || qst.typeDeQuestion.ref === 't6' || qst.typeDeQuestion.ref === 't4') {
            this.wordDictionnary = this.questionSideLeft + ' ' + this.correctAnswersList?.get(qst.id)[0].lib + ' ' + this.questionSideRight;
            console.log(this.son);
        } else if (qst.typeDeQuestion.ref === 't3') {
            this.wordDictionnary = this.correctAnswersList?.get(qst.id)[0].lib;
            console.log(this.son);
        } else if (qst.typeDeQuestion.ref === 't5') {
            this.wordDictionnary = qst.libelle;
        }
        this.service.translate(this.wordDictionnary).subscribe(
            data => {
                this.translateWord = data;
                console.log(data);
            }
        );
    }


    saveAnswers(question: Question) {
        this.translate(question);
        this.disableButtonSon = false;
        if (question.typeDeQuestion.ref === 't1') {
            this.answerSelected = this.myAnswer;
        } else if (question.typeDeQuestion.ref === 't3') {
            if (this.answerIsCorrect(this.myAnswer, question) === true) {
                console.log(this.correctAnswersList.get(question.id)[0]);
                this.myAnswer = this.correctAnswersList.get(question.id)[0];
            } else {
                this.myAnswer.etatReponse = 'false';
                this.myAnswer.question = question;
                this.myAnswer.numero = 2;
            }

            this.answerSelected = this.myAnswer;
        } else if (question.typeDeQuestion.ref === 't4' || question.typeDeQuestion.ref === 't6') {
            this.answerSelected.lib = this.inputAnswer;
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
        console.log(this.answerSelected);
        console.log(this.answersList);
        this.showNextButton = true;
        this.showCheckButton = false;
        this.saveDone = true;
        this.showDontKnowButton = false;
    }


    nextQuestionFct() {
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

                if (this.question.typeDeQuestion.ref === 't1') {
                    this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('...'));
                    this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('...') + 3);
                }
                else if (this.question.typeDeQuestion.ref === 't4' || this.question.typeDeQuestion.ref === 't6') {
                    this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('@'));
                    this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('@') + 1);
                    this.inputAnswer = this.question.libelle.substring(this.question.libelle.indexOf('@') + 1,
                        this.question.libelle.lastIndexOf('@'));
                } else if ( this.question.typeDeQuestion.ref === 't3'){
                    this.myAnswer.lib = this.correctAnswersList.get(this.question.id)[0].lib;
                }
                break;
            }
        }


    }
    previousQuestionFct() {
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
                }
                else if (this.question.typeDeQuestion.ref === 't4' || this.question.typeDeQuestion.ref === 't6') {
                    this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('@'));
                    this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('@') + 1);
                    this.inputAnswer = this.question.libelle.substring(this.question.libelle.indexOf('@') + 1,
                        this.question.libelle.lastIndexOf('@'));
                } else if ( this.question.typeDeQuestion.ref === 't3'){
                    this.myAnswer.lib = this.correctAnswersList.get(this.question.id)[0].lib;
                }
                break;
            }
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

    showAnswers(question: Question) {
        this.disableButtonSon = false;
        this.translate(question);
        if (question.typeDeQuestion.ref === 't5') {
            document.getElementById('trueFalse').className = 'trueQst p-grid';
            this.trueOrFalse = this.correctAnswersList.get(question.id)[0].lib === 'true';

            console.log(this.inputAnswer);
            this.disableToggleButton = true;
        }
        this.answerSelected = this.correctAnswersList.get(question.id)[0];
        this.answersList.set(question, this.answerSelected);
        console.log(this.answersList);
        this.myAnswer = new Reponse();
        this.showNextButton = true;
        this.showCheckButton = false;
        this.showDontKnowButton = false;
        this.saveDone = true;
    }

    finishQuiz() {
        const quizStudent: QuizEtudiant = new QuizEtudiant();
        const threshold = this.answersList.size;
        this.noteQuiz = 0;
        for (const value of this.answersList.entries()) {
            if (value[1].etatReponse === 'true') {
                this.noteQuiz += value[0].pointReponseJuste;
            } else {
                this.noteQuiz -= value[0].pointReponsefausse;
            }
        }
        quizStudent.quiz = this.selectedQuiz;
        quizStudent.etudiant = this.etudiant;
        quizStudent.note = this.noteQuiz;
        quizStudent.questionCurrent = threshold;
        quizStudent.resultat = String(this.noteQuiz + ' / ' + threshold);
        console.log(quizStudent);
        console.log(this.noteQuiz + ' / ' + threshold);
        this.showTakeQuiz = false;
        this.showQuizReview = true;
    }


    get answer(): ReponseEtudiant {
        return this.reponseEtudiantService.answer;
    }

    set answer(value: ReponseEtudiant) {
        this.reponseEtudiantService.answer = value;
    }

    get answers(): Array<ReponseEtudiant> {
        return this.reponseEtudiantService.answers;
    }

    openUpdate() {
        this.router.navigate(['/admin/quiz-update']);
    }

}
