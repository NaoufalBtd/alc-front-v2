import {Component, OnInit} from '@angular/core';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {LearnService} from '../../../../controller/service/learn.service';
import {ReponseEtudiantService} from '../../../../controller/service/reponse-etudiant.service';
import {LoginService} from '../../../../controller/service/login.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {DictionaryService} from '../../../../controller/service/dictionary.service';
import {DomSanitizer} from '@angular/platform-browser';
import {WebSocketService} from '../../../../controller/service/web-socket.service';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {Reponse} from '../../../../controller/model/reponse.model';
import {Question} from '../../../../controller/model/question.model';
import {Quiz} from '../../../../controller/model/quiz.model';
import {QuizReponse} from '../../../../controller/model/quiz-reponse';
import {ChatMessageDto} from '../../../../controller/model/chatMessageDto';
import {Prof} from '../../../../controller/model/prof.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {Cours} from '../../../../controller/model/cours.model';
import {HomeWork} from '../../../../controller/model/home-work.model';
import {HomeworkService} from '../../../../controller/service/homework.service';
import {HomeWorkEtudiantServiceService} from '../../../../controller/service/home-work-etudiant-service.service';
import {HomeWorkQST} from '../../../../controller/model/home-work-qst.model';
import {HomeWorkReponse} from '../../../../controller/model/home-work-reponse.model';
import {QuizEtudiant} from '../../../../controller/model/quiz-etudiant.model';
import {HomeWOrkEtudiant} from '../../../../controller/model/home-work-etudiant.model';
import {ReponseEtudiantHomeWork} from '../../../../controller/model/reponse-etudiant-home-work.model';
import {QuizService} from '../../../../controller/service/quiz.service';
import {TypeDeQuestion} from '../../../../controller/model/type-de-question.model';
import {Dictionary} from '../../../../controller/model/dictionary.model';

@Component({
    selector: 'app-home-work-etudiant',
    templateUrl: './home-work-etudiant.component.html',
    styleUrls: ['./home-work-etudiant.component.scss']
})
export class HomeWorkEtudiantComponent implements OnInit {
    partOfStory: string = String('Part 0');
    showWatchItHomeWork: boolean;
    listOftypeQuestions: Array<TypeDeQuestion> = new Array<TypeDeQuestion>();
    synonymes: string = String();
    textSeleted: string;
    dictionaryList: Array<Dictionary> = new Array<Dictionary>();
    rows = 10;
    first = 0;

    constructor(
        private learnService: LearnService,
        private reponseEtudiantService: ReponseEtudiantService,
        private quizEtudiantService: QuizEtudiantService, private dictionaryService: DictionaryService,
        private login: LoginService,
        private quizService: QuizService,
        private messageService: MessageService,
        private router: Router,
        private dictionnaryService: DictionaryService,
        private homeWorkService: HomeworkService,
        private homeWorkEtudiantService: HomeWorkEtudiantServiceService,
        private sanitizer: DomSanitizer,
        private confirmationService: ConfirmationService,
        private webSocketService: WebSocketService,
        private parcoursService: ParcoursService) {
    }

    get selectedHomeWork(): HomeWork {
        return this.learnService.selectedHomeWork;
    }

    set selectedHomeWork(value: HomeWork) {
        this.learnService.selectedHomeWork = value;
    }

    get selectedcours(): Cours {
        return this.parcoursService.selectedcours;
    }


    get showTakeQuiz(): boolean {
        return this.learnService.showTakeQuiz;
    }

    set showTakeQuiz(value: boolean) {
        this.learnService.showTakeQuiz = value;
    }

    get showQuizReview(): boolean {
        return this.learnService.showQuizReview;
    }

    set showQuizReview(value: boolean) {
        this.learnService.showQuizReview = value;
    }


    get inputAnswer(): string {
        return this.learnService.inputAnswer;
    }

    set inputAnswer(value: string) {
        this.learnService.inputAnswer = value;
    }

    get trueOrFalse(): boolean {
        return this.learnService.trueOrFalse;
    }

    set trueOrFalse(value: boolean) {
        this.learnService.trueOrFalse = value;
    }

    get disableToggleButton(): boolean {
        return this.learnService.disableToggleButton;
    }

    set disableToggleButton(value: boolean) {
        this.learnService.disableToggleButton = value;
    }


    get noteQuiz(): number {
        return this.learnService.noteQuiz;
    }

    set noteQuiz(value: number) {
        this.learnService.noteQuiz = value;
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

    get numberOfQuestion(): number {
        return this.learnService.numberOfQuestion;
    }

    set numberOfQuestion(value: number) {
        this.learnService.numberOfQuestion = value;
    }


    get index(): number {
        return this.learnService.index;
    }

    set index(value: number) {
        this.learnService.index = value;
    }

    get showCheckButton(): boolean {
        return this.learnService.showCheckButton;
    }

    set showCheckButton(value: boolean) {
        this.learnService.showCheckButton = value;
    }

    get saveDone(): boolean {
        return this.learnService.saveDone;
    }

    set saveDone(value: boolean) {
        this.learnService.saveDone = value;
    }

    get showDontKnowButton(): boolean {
        return this.learnService.showDontKnowButton;
    }

    set showDontKnowButton(value: boolean) {
        this.learnService.showDontKnowButton = value;
    }

    get showNextButton(): boolean {
        return this.learnService.showNextButton;
    }

    set showNextButton(value: boolean) {
        this.learnService.showNextButton = value;
    }

    get disableButtonSon(): boolean {
        return this.learnService.disableButtonSon;
    }

    set disableButtonSon(value: boolean) {
        this.learnService.disableButtonSon = value;
    }

    get translateWord(): string {
        return this.learnService.translateWord;
    }

    set translateWord(value: string) {
        this.learnService.translateWord = value;
    }

    get selectedLanguage(): any {
        return this.learnService.selectedLanguage;
    }


    get pourCentgage(): number {
        return this.learnService.pourCentgage;
    }

    set pourCentgage(value: number) {
        this.learnService.pourCentgage = value;
    }


    get homeWorkList(): Array<HomeWork> {
        return this.learnService.homeWorkList;
    }


    get participants(): Map<number, Array<Etudiant>> {
        return this.learnService.participants;
    }

    set homeWorkEtudiantList(value: Array<HomeWOrkEtudiant>) {
        this.homeWorkEtudiantService.homeWorkEtudiantList = value;
    }

    public homeWorkQuestionList: Array<HomeWorkQST> = new Array<HomeWorkQST>();
    public homeWorkQuestion: HomeWorkQST = new HomeWorkQST();
    public homeWorkAnswersList: Array<HomeWorkReponse> = new Array<HomeWorkReponse>();
    public correctAnswersList: Map<number, Array<HomeWorkReponse>> = new Map<number, Array<HomeWorkReponse>>();
    public answersList: Map<HomeWorkQST, HomeWorkReponse> = new Map<HomeWorkQST, HomeWorkReponse>();
    public answerSelected: HomeWorkReponse = new HomeWorkReponse();
    public answersPointStudent: Map<HomeWorkQST, string> = new Map<HomeWorkQST, string>();
    public myAnswer: HomeWorkReponse = new HomeWorkReponse();
    public homeWorkReponse: HomeWorkReponse = new HomeWorkReponse();
    public progressBarValue: number;
    showTypeOfQstBar = false;
    showHomeWorkEtudiantResult = false;

    questionOptions = [{label: 'True', value: 'true'}, {label: 'False', value: 'false'}];


    wordDictionnary: string;

    son = '';
    displayDictionaryDialog: boolean;

    ngOnInit(): void {
        console.log(this.selectedcours);
        this.learnService.onStartHomeWork(this.selectedcours);
        this.quizService.findType().subscribe(data => {
            this.listOftypeQuestions = data;
        });
        this.getDictionaryList();
    }


    hidePlaceHolder(type: string) {
        if (type === 'HIDE') {
            this.inputAnswer = '';
            console.log(this.inputAnswer);
        } else {
            this.inputAnswer = this.homeWorkQuestion.libelle.substring(this.homeWorkQuestion.libelle.indexOf('@') + 1,
                this.homeWorkQuestion.libelle.lastIndexOf('@'));
            console.log(type + this.inputAnswer);
        }
    }

    sound(qst: HomeWorkQST) {
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
        const url = 'https://www.translatedict.com/speak.php?word=' + this.son + '&lang=ar';
        const audio = new Audio(url);
        audio.play();
    }


    answerIsCorrect(ans: HomeWorkReponse, qst: HomeWorkQST) {
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

    saveAnswers(question: HomeWorkQST) {
        const reponse = this.saveAnswers1(question, 'STUDENT_ANSWER');
        this.homeWorkReponse.lib = reponse.lib;
        this.homeWorkReponse.id = reponse.id;
        this.homeWorkReponse.homeWorkQuestion = reponse.homeWorkQuestion;
        this.homeWorkReponse.numero = reponse.numero;
        this.homeWorkReponse.etatReponse = reponse.etatReponse;
    }

    saveAnswers1(question: HomeWorkQST, type: string): HomeWorkReponse {
        // this.translate(question);
        this.disableButtonSon = false;
        if (question.typeDeQuestion.ref === 't1') {
            for (const item of question.reponses) {
                if (item.lib === this.homeWorkReponse.lib) {
                    this.answerSelected = item;
                }
            }
        } else if (question.typeDeQuestion.ref === 't3') {
            this.myAnswer.lib = this.homeWorkReponse.lib;
            if (this.answerIsCorrect(this.myAnswer, question) === true) {
                this.myAnswer = this.correctAnswersList.get(question.id)[0];
            } else {
                this.myAnswer.etatReponse = 'false';
                this.myAnswer.homeWorkQuestion = question;
                this.myAnswer.numero = 2;
            }

            this.answerSelected = this.myAnswer;
        } else if (question.typeDeQuestion.ref === 't4' || question.typeDeQuestion.ref === 't6') {
            this.answerSelected.lib = this.homeWorkReponse.lib;
            if (this.answerIsCorrect(this.answerSelected, question) === true) {
                this.answerSelected = this.correctAnswersList.get(question.id)[0];
            } else {
                this.answerSelected.etatReponse = 'false';
                this.answerSelected.homeWorkQuestion = question;
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
                this.answerSelected.homeWorkQuestion = question;
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

    showAnswers(question: HomeWorkQST) {
        this.disableButtonSon = false;
        if (question.typeDeQuestion.ref === 't5') {
            document.getElementById('trueFalse').className = 'trueQst p-grid';
            this.trueOrFalse = this.correctAnswersList.get(question.id)[0].lib === 'true';

            console.log(this.inputAnswer);
            this.disableToggleButton = true;
        }
        this.answerSelected = this.correctAnswersList.get(question.id)[0];
        this.answersList.set(this.homeWorkQuestion, this.answerSelected);
        this.answersPointStudent.set(question, 'STUDENT_DONT_KNOW');

        console.log(this.answersList);
        this.myAnswer = new HomeWorkReponse();
        this.showNextButton = true;
        this.showCheckButton = false;
        this.showDontKnowButton = false;
        this.saveDone = true;
        return this.answerSelected;
    }


    nextQuestionFct(): HomeWorkQST {
        console.log('=========================== NEXT QUESTION  FUNCTION =================================');
        console.log(this.homeWorkQuestion);
        console.log('=========================== NEXT QUESTION  FUNCTION =================================');
        this.homeWorkReponse = new HomeWorkReponse();
        this.translateWord = String();
        this.wordDictionnary = String();
        this.disableButtonSon = true;
        this.showCheckButton = false;
        this.saveDone = false;
        this.showDontKnowButton = true;
        this.showNextButton = false;
        this.progressBarValue += (100 / this.numberOfQuestion);
        this.disableToggleButton = false;
        this.index += 1;
        this.inputAnswer = String();
        this.trueOrFalse = true;
        this.answerSelected = new HomeWorkReponse();
        this.myAnswer = new HomeWorkReponse();
        for (let i = 0; i < (this.homeWorkQuestionList.length); i++) {
            if (this.homeWorkQuestion.id === this.homeWorkQuestionList[i].id) {
                this.homeWorkQuestion = this.homeWorkQuestionList[i + 1];
                console.log('===========================  QUESTION  ACTUEL =================================');
                console.log(this.homeWorkQuestion);
                if (this.homeWorkQuestion.typeDeQuestion.ref === 't1') {
                    this.questionSideLeft = this.homeWorkQuestion.libelle.substring(0, this.homeWorkQuestion.libelle.indexOf('...'));
                    this.questionSideRight = this.homeWorkQuestion.libelle.substring(this.homeWorkQuestion.libelle.lastIndexOf('...') + 3);
                } else if (this.homeWorkQuestion.typeDeQuestion.ref === 't4' || this.homeWorkQuestion.typeDeQuestion.ref === 't6') {
                    this.questionSideLeft = this.homeWorkQuestion.libelle.substring(0, this.homeWorkQuestion.libelle.indexOf('@'));
                    this.questionSideRight = this.homeWorkQuestion.libelle.substring(this.homeWorkQuestion.libelle.lastIndexOf('@') + 1);
                    this.inputAnswer = this.homeWorkQuestion.libelle.substring(this.homeWorkQuestion.libelle.indexOf('@') + 1,
                        this.homeWorkQuestion.libelle.lastIndexOf('@'));
                } else if (this.homeWorkQuestion.typeDeQuestion.ref === 't3') {
                    console.log('====================== T3 =======================================');
                    console.log(this.correctAnswersList.get(this.homeWorkQuestion.id)[0]);
                    console.log('====================== T3 =======================================');
                }
                break;
            }
        }
        console.log('==============================================================');
        console.log(this.homeWorkQuestion);
        console.log('==============================================================');
        return this.homeWorkQuestion;
    }


    finishHomeWork() {

        if (this.homeWorkQuestion.typeDeQuestion.ref === 't2') {
            const homeWorkEtudiant: HomeWOrkEtudiant = new HomeWOrkEtudiant();
            homeWorkEtudiant.etudiant = this.login.getConnectedStudent();
            homeWorkEtudiant.homeWork = this.selectedHomeWork;
            homeWorkEtudiant.note = 0;
            homeWorkEtudiant.resultat = '-';
            homeWorkEtudiant.date = new Date();
            this.homeWorkEtudiantService.save(homeWorkEtudiant).subscribe(
                homeWorkEtudiantData => {
                    console.log(homeWorkEtudiantData);
                    const answer: ReponseEtudiantHomeWork = new ReponseEtudiantHomeWork();
                    answer.homeWorkEtudiant = homeWorkEtudiantData;
                    answer.answer = this.homeWorkReponse.lib;
                    answer.note = 0;
                    answer.question = this.homeWorkQuestion;
                    answer.reponse = null;
                    console.log(answer);
                    this.homeWorkEtudiantService.saveHomeWorkEtudiantReponse(answer).subscribe(
                        reponse => {
                            console.log(reponse);
                        }, error => {
                            console.log(error);
                        }
                    );
                }, error => {
                    console.log(error);
                }
            );

        } else {


            const homeWorkEtudiant: HomeWOrkEtudiant = new HomeWOrkEtudiant();
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
            homeWorkEtudiant.homeWork = this.selectedHomeWork;
            homeWorkEtudiant.etudiant = this.login.getConnectedStudent();
            homeWorkEtudiant.note = this.noteQuiz;
            homeWorkEtudiant.resultat = String(this.noteQuiz + ' / ' + threshold);
            homeWorkEtudiant.date = new Date();
            console.log(homeWorkEtudiant);
            this.homeWorkEtudiantService.save(homeWorkEtudiant).subscribe(
                homeWorkEtudiantData => {
                    console.log(homeWorkEtudiantData);
                    for (const entry of this.answersList.entries()) {
                        const answer: ReponseEtudiantHomeWork = new ReponseEtudiantHomeWork();
                        answer.question = entry[0];
                        answer.homeWorkEtudiant = homeWorkEtudiantData;
                        answer.reponse = this.correctAnswersList.get(entry[0].id)[0];
                        answer.answer = entry[1].lib;
                        if (entry[1].etatReponse === 'true') {
                            if (this.answersPointStudent.get(entry[0]) === 'STUDENT_ANSWER') {
                                answer.note = entry[0].pointReponseJuste;
                            } else {
                                answer.note = 0;
                                answer.answer = null;
                            }
                        } else {
                            answer.note = entry[0].pointReponsefausse;
                        }
                        this.homeWorkEtudiantService.saveHomeWorkEtudiantReponse(answer).subscribe(
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
    }

    homeWorkSelectedFct(homeWork: HomeWork) {
        this.showTypeOfQstBar = true;
        if (homeWork.libelle === 'Watch it') {
            this.selectedHomeWork = homeWork;
            this.showWatchItHomeWork = true;
            this.homeWorkQuestion = new HomeWorkQST();
            this.homeWorkQuestion.typeDeQuestion = this.listOftypeQuestions.filter(t => t.ref === 't9')[0];
        } else {
            this.showWatchItHomeWork = false;
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
                console.log(this.homeWorkQuestionList);
                this.numberOfQuestion = this.homeWorkQuestionList.length;
                this.progressBarValue = 100 / this.numberOfQuestion;
                console.log(this.homeWorkQuestionList);
                for (let i = 0; i < this.homeWorkQuestionList.length; i++) {
                    this.homeWorkQuestion = this.homeWorkQuestionList[0];
                    this.homeWorkEtudiantService.findReponsesByQuestionId(this.homeWorkQuestionList[i].id).subscribe(
                        data1 => {
                            this.homeWorkQuestionList[i].reponses = data1;
                            this.correctAnswersList.set(this.homeWorkQuestionList[i].id, data1.filter(r => r.etatReponse === 'true'));
                            console.log(this.correctAnswersList);
                            if (this.homeWorkQuestion.typeDeQuestion.ref === 't3') {
                                console.log(this.correctAnswersList);
                            }
                        }, error => {
                            console.log(error);
                        }
                    );
                    console.log(this.homeWorkQuestion);
                    console.log(this.questionSideLeft);
                    console.log(this.questionSideRight);
                    if (this.homeWorkQuestion.typeDeQuestion.ref === 't1') {
                        this.questionSideLeft = this.homeWorkQuestion.libelle.substring(0, this.homeWorkQuestion.libelle.indexOf('...'));
                        this.questionSideRight = this.homeWorkQuestion.libelle.substring(this.homeWorkQuestion.libelle.lastIndexOf('...') + 3);
                    } else if (this.homeWorkQuestion.typeDeQuestion.ref === 't4' || this.homeWorkQuestion.typeDeQuestion.ref === 't6') {
                        this.questionSideLeft = this.homeWorkQuestion.libelle.substring(0, this.homeWorkQuestion.libelle.indexOf('@'));
                        this.questionSideRight = this.homeWorkQuestion.libelle.substring(this.homeWorkQuestion.libelle.lastIndexOf('@') + 1);
                        this.inputAnswer = this.homeWorkQuestion.libelle.substring(this.homeWorkQuestion.libelle.indexOf('@') + 1,
                            this.homeWorkQuestion.libelle.lastIndexOf('@'));
                    } else if (this.homeWorkQuestion.typeDeQuestion.ref === 't8') {
                        console.log(this.homeWorkQuestion.libelle);
                        if (this.homeWorkQuestion.ref !== '') {
                            const ref = this.homeWorkQuestion.ref.substring((this.homeWorkQuestion.ref.length - 10),
                                this.homeWorkQuestion.ref.length);
                            const index = this.homeWorkQuestion.libelle.lastIndexOf(ref);
                            console.log(index);
                            console.log(ref);
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
                    }
                }
            });
            console.log(homeWork);
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

    dict() {
        this.synonymes = String();
        const selection = window.getSelection();
        this.textSeleted = selection.toString();
        console.log(this.textSeleted.length);
        if (this.textSeleted.length > 3) {
            console.log(this.selectedLanguage.code);
            if (this.selectedLanguage.code === 'ar') {
                this.quizEtudiantService.translate(this.textSeleted).subscribe(data => {
                    console.log(data);
                    this.synonymes = data;
                });
            } else if (this.selectedLanguage.code === 'fr') {
                this.quizEtudiantService.translateEnFr(this.textSeleted).subscribe(data => {
                    this.synonymes = data;
                    console.log(data);
                });
            }
            this.displayDictionaryDialog = true;
            this.getDictionaryList();
        }
    }

    getDictionaryList() {
        this.dictionnaryService.FindAllWord().subscribe(data => {
            this.dictionaryList = data;
            console.log(this.dictionaryList);
        }, error => {
            console.log(error);
        });
    }

    addToDictionary() {
        let dict: Dictionary = new Dictionary();
        dict.word = this.textSeleted;
        dict.definition = this.synonymes;
        dict.etudiant = this.login.getConnectedStudent();

        this.dictionnaryService.addToDictionary(dict).subscribe(data => {
            this.dictionaryList.push({...data});
            this.textSeleted = String();
            this.synonymes = String();
            this.messageService.add({severity: 'success', life: 3000, detail: 'Word added successfully'});
        }, error => {
            console.log(error);
            this.messageService.add({severity: 'error', life: 3000, detail: 'Text is too long! try again with small text'});

        });
    }
}

