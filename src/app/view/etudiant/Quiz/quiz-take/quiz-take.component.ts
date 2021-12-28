import {Component, OnInit} from '@angular/core';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {LoginService} from '../../../../controller/service/login.service';
import {Reponse} from '../../../../controller/model/reponse.model';
import {ReponseEtudiant} from '../../../../controller/model/reponse-etudiant.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {Quiz} from '../../../../controller/model/quiz.model';
import {Question} from '../../../../controller/model/question.model';
import {QuizEtudiant} from '../../../../controller/model/quiz-etudiant.model';
import {VocabularyService} from '../../../../controller/service/vocabulary.service';
import {ConfirmationService, MenuItem, MessageService, TreeNode} from 'primeng/api';
import {Router} from '@angular/router';
import {DictionaryService} from '../../../../controller/service/dictionary.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {HttpClient} from '@angular/common/http';
import {Dictionary} from '../../../../controller/model/dictionary.model';
import {EtudiantCours} from '../../../../controller/model/etudiant-cours.model';
import {Section} from '../../../../controller/model/section.model';

@Component({
    selector: 'app-quiz-take',
    templateUrl: './quiz-take.component.html',
    styleUrls: ['./quiz-take.component.scss']
})
export class QuizTakeComponent implements OnInit {
    showTakeQuiz = true;
    showQuizReview = false;
    answer: Reponse = new Reponse();
    answerSelected: Reponse = new Reponse();
    questionOptions = [{label: 'True', value: 'true'}, {label: 'False', value: 'false'}];
    multiChoiceAnswer: Array<Reponse> = new Array<Reponse>();
    disabledButtonCheck = false;
    inputAnswer: string;
    trueOrFalse = true;
    disableToggleButton = false;
    answersList: Map<Question, Array<Reponse>> = new Map<Question, Array<Reponse>>();
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
                private login: LoginService,
                private messageService: MessageService,
                private router: Router,
                private dictionnaryService: DictionaryService,
                private sanitizer: DomSanitizer,
                private confirmationService: ConfirmationService,
                private parcoursservice: ParcoursService,) {
    }

    private _noteQuiz: number;

    translateWord: string;
    wordDictionnary: string;

    son = '';
    disableButtonSon = true;


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
        this.etudiant = this.login.etudiant;
        this.service.findAllQuestions(this.selectedQuiz.ref).subscribe(
            data => {
                this.questionList = data;
                this.numberOfQuestion = this.questionList.length;
                this.pourCentgage = 100 / this.numberOfQuestion;
                this.value = this.pourCentgage;
                console.log(this.questionList);
                for (let i = 0; i < this.questionList.length; i++) {
                    this.question = this.questionList[0];
                    console.log(this.question);
                    console.log(this.questionSideLeft);
                    console.log(this.questionSideRight);
                    this.questionSideLeft = this.question.libelle.substring(0, this.question.libelle.indexOf('...'));
                    this.questionSideRight = this.question.libelle.substring(this.question.libelle.lastIndexOf('...') + 3);
                    this.nextQuestion = this.questionList[1];
                    this.service.findReponses(this.questionList[i].id).subscribe(
                        data => {
                            this.questionList[i].reponses = data;
                            this.correctAnswersList.set(this.questionList[i].id, data.filter(r => r.etatReponse === 'true'));
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
            this.answerSelected = this.answer;
            this.multiChoiceAnswer.push({...this.answerSelected});
        } else if (question.typeDeQuestion.ref === 't3') {
            if (this.answerIsCorrect(this.answer, question) === true) {
                console.log(this.correctAnswersList.get(question.id)[0]);
                this.answer = this.correctAnswersList.get(question.id)[0];
            } else {
                this.answer.etatReponse = 'false';
                this.answer.question = question;
                this.answer.numero = 2;
            }

            this.answerSelected = this.answer;
            this.multiChoiceAnswer.push({...this.answerSelected});
        } else if (question.typeDeQuestion.ref === 't4' || question.typeDeQuestion.ref === 't6') {
            this.answerSelected.lib = this.inputAnswer;
            if (this.answerIsCorrect(this.answerSelected, question) === true) {
                this.answerSelected = this.correctAnswersList.get(question.id)[0];
            } else {
                this.answerSelected.etatReponse = 'false';
                this.answerSelected.question = question;
                this.answerSelected.numero = 2;
            }
            this.multiChoiceAnswer.push({...this.answerSelected});
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
            this.multiChoiceAnswer.push({...this.answerSelected});
        }
        console.log(this.multiChoiceAnswer);
        this.answersList.set(question, this.multiChoiceAnswer);
        console.log(this.answersList);
        this.multiChoiceAnswer = new Array<Reponse>();
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
        this.answer = new Reponse();
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
            if (this.correctAnswersList.get(question.id)[0].lib === 'true') {
                this.trueOrFalse = true;
            } else {
                this.trueOrFalse = false;
            }

            console.log(this.inputAnswer);
            this.disableToggleButton = true;
        }
        this.answerSelected = this.correctAnswersList.get(question.id)[0];
        this.multiChoiceAnswer.push({...this.answerSelected});
        console.log(this.multiChoiceAnswer);
        this.answersList.set(question, this.multiChoiceAnswer);
        console.log(this.answersList);
        this.multiChoiceAnswer = new Array<Reponse>();
        this.answer = new Reponse();
        this.showNextButton = true;
        this.showCheckButton = false;
        this.showDontKnowButton = false;
        this.saveDone = true;
    }

    finishQuiz() {
        const threshold = this.answersList.size;
        this.noteQuiz = 0;
        for (const value of this.answersList.entries()) {
            if ( value[1][0].etatReponse === 'true'){
                this.noteQuiz += value[0].pointReponseJuste;
            } else {
                this.noteQuiz -= value[0].pointReponsefausse;
            }
        }
        console.log(this.noteQuiz + ' / ' + threshold);
        this.showTakeQuiz = false;
        this.showQuizReview = true;
    }
}
