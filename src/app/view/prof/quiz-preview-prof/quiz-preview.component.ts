import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuizEtudiantService} from '../../../controller/service/quiz-etudiant.service';
import {LoginService} from '../../../controller/service/login.service';
import {ConfirmationService, MenuItem, MessageService, TreeNode} from 'primeng/api';
import {Router} from '@angular/router';
import {DictionaryService} from '../../../controller/service/dictionary.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {HttpClient} from '@angular/common/http';
import {VocabularyService} from '../../../controller/service/vocabulary.service';
import {Reponse} from '../../../controller/model/reponse.model';
import {ReponseEtudiant} from '../../../controller/model/reponse-etudiant.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {Quiz} from '../../../controller/model/quiz.model';
import {Question} from '../../../controller/model/question.model';
import {QuizEtudiant} from '../../../controller/model/quiz-etudiant.model';
import {Dictionary} from '../../../controller/model/dictionary.model';
import {Section} from '../../../controller/model/section.model';
import {LearnService} from '../../../controller/service/learn.service';
import {ReponseEtudiantService} from '../../../controller/service/reponse-etudiant.service';
import {Cours} from '../../../controller/model/cours.model';
import {Parcours} from '../../../controller/model/parcours.model';
import {WebSocketService} from '../../../controller/service/web-socket.service';
import {QuizReponse} from '../../../controller/model/quiz-reponse';
import {ChatMessageDto} from '../../../controller/model/chatMessageDto';
import {findIndexInData} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'app-quiz-preview-prof',
    templateUrl: './quiz-preview.component.html',
    styleUrls: ['./quiz-preview.component.scss']
})
export class QuizPreviewProfComponent implements OnInit, OnDestroy {

    constructor(private service: QuizEtudiantService,
                private learnService: LearnService,
                private reponseEtudiantService: ReponseEtudiantService,
                public login: LoginService,
                private messageService: MessageService,
                private router: Router,
                private dictionnaryService: DictionaryService,
                private sanitizer: DomSanitizer,
                private quizEtudiantService: QuizEtudiantService,
                private confirmationService: ConfirmationService,
                private webSocketService: WebSocketService,
                private parcoursservice: ParcoursService) {
    }

    get showTakeQuiz(): boolean {
        return this.learnService.showTakeQuiz;
    }

    get grpStudentAnswers(): Map<Etudiant, QuizReponse> {
        return this.webSocketService.grpStudentAnswers;
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

    get myAnswer(): Reponse {
        return this.learnService.myAnswer;
    }

    set myAnswer(value: Reponse) {
        this.learnService.myAnswer = value;
    }

    get answerSelected(): Reponse {
        return this.learnService.answerSelected;
    }

    set answerSelected(value: Reponse) {
        this.learnService.answerSelected = value;
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

    get placeHolderAnswer(): string {
        return this.learnService.placeHolderAnswer;
    }

    set placeHolderAnswer(value: string) {
        this.learnService.placeHolderAnswer = value;
    }


    // List of Question
    get questionList(): Array<Question> {
        return this.service.items;
    }


    get reponses(): Array<Reponse> {
        return this.service.reponses;
    }

    set reponses(value: Array<Reponse>) {
        this.service.reponses = value;
    }


    get answersList(): Map<Question, Reponse> {
        return this.learnService.answersList;
    }


    get correctAnswersList(): Map<number, Array<Reponse>> {
        return this.learnService.correctAnswersList;
    }

    set correctAnswersList(value: Map<number, Array<Reponse>>) {
        this.learnService.correctAnswersList = value;
    }

    get question(): Question {
        return this.learnService.question;
    }

    set question(value: Question) {
        this.learnService.question = value;
    }

    get questionSideLeft(): string {
        return this.learnService.questionSideLeft;
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


    get value(): number {
        return this.learnService.value;
    }

    set value(value: number) {
        this.learnService.value = value;
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

    get translateWord(): string {
        return this.learnService.translateWord;
    }

    get selectedQuiz(): Quiz {
        return this.service.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.service.selectedQuiz = value;
    }


    get reponseQuiz(): QuizReponse {
        return this.webSocketService.reponseQuiz;
    }

    get participants(): Map<number, Array<Etudiant>> {
        return this.learnService.participants;
    }

    reponseQuizList: Array<QuizEtudiant> = new Array<QuizEtudiant>();
    listAnswers: Array<ReponseEtudiant> = new Array<ReponseEtudiant>();

    questionOptions = [{label: 'True', value: 'true'}, {label: 'False', value: 'false'}];
    showFollowButton = true;

    test: string;

    display: boolean = false;

    ngOnInit(): void {
        this.quizEtudiantService.findQuizEtudiantByQuizId(this.selectedQuiz.id).subscribe(
            data => {
                for (const student of this.participants.get(this.login.getConnectedProf().id)) {
                    for (const reponse of data) {
                        if (reponse.etudiant.id === student.id) {
                            this.reponseQuizList.push({...reponse});
                        }
                    }
                }
                console.log(this.reponseQuizList);
                if (this.reponseQuizList.length === 0) {
                    this.learnService.onStart();
                } else {
                    this.showTakeQuiz = false;
                    this.showQuizReview = true;
                }
            }
        );
    }


    ngOnDestroy(): void {
    }

    sound(question: Question) {
        this.learnService.sound(question);
    }

    answerIsCorrect(answerSelected: Reponse, question: Question) {
        return this.learnService.answerIsCorrect(answerSelected, question);
    }

    saveAnswers(question: Question) {
        const reponse = this.learnService.saveAnswers(question, 'TEACHER_ANSWER');
        console.log(reponse);
        this.reponseQuiz.lib = reponse.lib;
        this.reponseQuiz.type = 'QUIZ';
        this.reponseQuiz.id = reponse.id;
        this.reponseQuiz.question = reponse.question;
        this.reponseQuiz.question.reponses = reponse.question?.reponses;
        this.reponseQuiz.numero = reponse.numero;
        this.reponseQuiz.sender = 'PROF';
        this.reponseQuiz.prof = this.login.getConnectedProf();
        this.reponseQuiz.etatReponse = reponse.etatReponse;
        const chatMessageDto: ChatMessageDto = new ChatMessageDto(this.login.getConnectedProf().toString(), ' ', false);
        chatMessageDto.quizReponse = this.reponseQuiz;
        chatMessageDto.type = 'QUIZ';
        this.webSocketService.sendMessage(chatMessageDto, 'PROF');
    }

    nextQuestionFct() {
        this.grpStudentAnswers.clear();
        const question = this.learnService.nextQuestionFct();
        this.followMeFct(question);
    }

    previousQuestionFct() {
        this.grpStudentAnswers.clear();
        this.showFollowButton = true;
        const qst = this.learnService.previousQuestionFct();
        if (qst.id !== this.questionList[0].id) {
            this.followMeFct(qst);
        }
    }


    hidePlaceHolder(type: string) {
        if (type === 'HIDE') {
            this.placeHolderAnswer = '';
            this.inputAnswer = '';
            console.log(this.inputAnswer);
        } else {
            this.placeHolderAnswer = this.correctAnswersList.get(this.question.id)[0].lib;
            this.inputAnswer = this.question.libelle.substring(this.question.libelle.indexOf('@') + 1,
                this.question.libelle.lastIndexOf('@'));
        }
    }


    followMeFct(question: Question) {
        console.log(question);
        // this.showFollowButton = false;
        const reponseQuiz: QuizReponse = new QuizReponse();
        for (let i = 0; i < (this.questionList.length); i++) {
            if (this.questionList[i].id === question.id) {
                reponseQuiz.question = this.questionList[i - 1];
                console.log(reponseQuiz.question);
            }
        }
        reponseQuiz.type = 'FOLLOW-QUIZ';
        reponseQuiz.prof = this.login.getConnectedProf();
        const chatMessageDto: ChatMessageDto = new ChatMessageDto(this.login.getConnectedProf().toString(), ' ', false);
        chatMessageDto.quizReponse = reponseQuiz;
        chatMessageDto.type = 'FOLLOW-QUIZ';
        this.webSocketService.sendMessage(chatMessageDto, 'PROF');
    }

    finishQuiz() {
        this.showTakeQuiz = false;
        this.showQuizReview = true;
        this.quizEtudiantService.findQuizEtudiantByQuizId(this.selectedQuiz.id).subscribe(
            data => {
                for (const student of this.participants.get(this.login.getConnectedProf().id)) {
                    for (const reponse of data) {
                        if (reponse.etudiant.id === student.id) {
                            this.reponseQuizList.push({...reponse});
                        }
                    }
                }
                console.log(this.reponseQuizList);
            }
        );
    }

    showDetails(quizEtudiant: QuizEtudiant) {
        if (this.listAnswers.length !== 0) {
            this.listAnswers.splice(0, this.listAnswers.length);
        }
        this.reponseEtudiantService.findByQuizStudent(quizEtudiant).subscribe(
            data => {
                this.listAnswers = data;
                console.log(this.listAnswers);
            }
        );
        this.showDialog();
    }

    showDialog() {
        this.display = true;
    }
}
