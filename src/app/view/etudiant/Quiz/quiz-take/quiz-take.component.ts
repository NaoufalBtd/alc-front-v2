import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {ReponseEtudiantService} from '../../../../controller/service/reponse-etudiant.service';
import {WebSocketService} from '../../../../controller/service/web-socket.service';
import {QuizReponse} from '../../../../controller/model/quiz-reponse';
import {LearnService} from '../../../../controller/service/learn.service';
import {Role} from '../../../../enum/role.enum';
import {ChatMessageDto} from '../../../../controller/model/chatMessageDto';
import {Prof} from '../../../../controller/model/prof.model';
import {AppComponent} from '../../../../app.component';

@Component({
    selector: 'app-quiz-take',
    templateUrl: './quiz-take.component.html',
    styleUrls: ['./quiz-take.component.scss']
})
export class QuizTakeComponent implements OnInit, OnDestroy {

    questionOptions = [{label: 'True', value: 'true'}, {label: 'False', value: 'false'}];

    constructor(private service: QuizEtudiantService,
                private learnService: LearnService,
                private reponseEtudiantService: ReponseEtudiantService,
                private login: LoginService,
                private messageService: MessageService,
                private router: Router,
                private dictionnaryService: DictionaryService,
                private sanitizer: DomSanitizer,
                private confirmationService: ConfirmationService,
                private webSocketService: WebSocketService) {
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

    get answersPointStudent(): Map<Question, string> {
        return this.learnService.answersPointStudent;
    }

    set answersPointStudent(value: Map<Question, string>) {
        this.learnService.answersPointStudent = value;
    }


    get reponseQuiz(): QuizReponse {
        return this.webSocketService.reponseQuiz;
    }

    ngOnInit(): void {
        this.learnService.onStart();
    }


    hidePlaceHolder(type: string) {
        if (type === 'HIDE') {
            this.inputAnswer = '';
            console.log(this.inputAnswer);
        } else {
            this.inputAnswer = this.question.libelle.substring(this.question.libelle.indexOf('@') + 1,
                this.question.libelle.lastIndexOf('@'));
            console.log(type + this.inputAnswer);
        }
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
        const reponse = this.learnService.saveAnswers(question, 'STUDENT_ANSWER');
        this.reponseQuiz.lib = reponse.lib;
        this.reponseQuiz.id = reponse.id;
        this.reponseQuiz.question = reponse.question;
        this.reponseQuiz.numero = reponse.numero;
        this.reponseQuiz.type = 'QUIZ';
        this.reponseQuiz.sender = 'STUDENT';
        this.reponseQuiz.student = this.login.getConnectedStudent();
        this.reponseQuiz.etatReponse = reponse.etatReponse;
        const chatMessageDto: ChatMessageDto = new ChatMessageDto(this.login.getConnectedStudent().toString(), '', true);
        chatMessageDto.quizReponse = this.reponseQuiz;
        chatMessageDto.type = 'QUIZ';
        this.webSocketService.sendMessage(chatMessageDto, 'STUDENT');
    }

    showAnswers(question: Question) {
        const reponse = this.learnService.showAnswers(question);
        this.reponseQuiz.lib = reponse.lib;
        this.reponseQuiz.id = reponse.id;
        this.reponseQuiz.question = reponse.question;
        this.reponseQuiz.numero = reponse.numero;
        this.reponseQuiz.type = 'QUIZ';
        this.reponseQuiz.sender = 'STUDENT_DONT_KNOW';
        this.reponseQuiz.student = this.login.getConnectedStudent();
        this.reponseQuiz.etatReponse = reponse.etatReponse;
        const chatMessageDto: ChatMessageDto = new ChatMessageDto(this.login.getConnectedStudent().toString(), '', true);
        chatMessageDto.quizReponse = this.reponseQuiz;
        chatMessageDto.type = 'QUIZ';
        this.webSocketService.sendMessage(chatMessageDto, 'STUDENT');
    }

    nextQuestionFct() {
        const question = this.learnService.nextQuestionFct();
        if (this.participants.get(this.prof.id).length === 1) {
            this.followMeFct(question);
        }
    }

    get prof(): Prof {
        return this.webSocketService.prof;
    }


    get participants(): Map<number, Array<Etudiant>> {
        return this.learnService.participants;
    }


    followMeFct(question: Question) {
        const reponseQuiz: QuizReponse = new QuizReponse();
        for (let i = 0; i < this.questionList.length; i++) {
            if (this.questionList[i].id === question.id) {
                reponseQuiz.question = this.questionList[i - 1];
            }
        }
        reponseQuiz.type = 'FOLLOW-QUIZ';
        reponseQuiz.student = this.login.getConnectedStudent();
        const chatMessageDto: ChatMessageDto = new ChatMessageDto(this.login.getConnectedStudent().toString(), ' ', false);
        chatMessageDto.quizReponse = reponseQuiz;
        chatMessageDto.type = 'FOLLOW-QUIZ';
        this.webSocketService.sendMessage(chatMessageDto, 'PROF');
    }

    finishQuiz() {
        this.learnService.finishQuiz();
    }
}
