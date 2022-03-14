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
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';

@Component({
    selector: 'app-quiz-take',
    templateUrl: './quiz-take.component.html',
    styleUrls: ['./quiz-take.component.scss']
})
export class QuizTakeComponent implements OnInit, OnDestroy {

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


    get groupeEtudiant(): GroupeEtudiant {
        return this.webSocketService.groupeEtudiant;
    }


    get t12AnswersList(): Array<Reponse> {
        return this.learnService.t12AnswersList;
    }

    set t12AnswersList(value: Array<Reponse>) {
        this.learnService.t12AnswersList = value;
    }

    get correctAnswerT12(): string {
        return this.learnService.correctAnswerT12;
    }

    set correctAnswerT12(value: string) {
        this.learnService.correctAnswerT12 = value;
    }

    get showT12AnswerDiv(): boolean {
        return this.learnService.showT12AnswerDiv;
    }

    set showT12AnswerDiv(value: boolean) {
        this.learnService.showT12AnswerDiv = value;
    }

    get dragAnswersList(): Map<string, number> {
        return this.learnService.dragAnswersList;
    }

    get quizT12AnswersList(): Array<Reponse> {
        return this.learnService.quizT12AnswersList;
    }

    set quizT12AnswersList(value: Array<Reponse>) {
        this.learnService.quizT12AnswersList = value;
    }

    set dragAnswersList(value: Map<string, number>) {
        this.learnService.dragAnswersList = value;
    }

    get answersT12List(): Map<number, string> {
        return this.learnService.answersT12List;
    }

    set answersT12List(value: Map<number, string>) {
        this.learnService.answersT12List = value;
    }

    get dragList(): Array<string> {
        return this.learnService.dragList;
    }

    set dragList(value: Array<string>) {
        this.learnService.dragList = value;
    }

    get dragIndex(): number {
        return this.learnService.dragIndex;
    }

    set dragIndex(value: number) {
        this.learnService.dragIndex = value;
    }

    get dragData(): string {
        return this.learnService.dragData;
    }

    set dragData(value: string) {
        this.learnService.dragData = value;
    }

    get nextIndex(): number {
        return this.learnService.nextIndex;
    }

    set nextIndex(value: number) {
        this.learnService.nextIndex = value;
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

    get prof(): Prof {
        return this.webSocketService.prof;
    }


    get participants(): Map<number, Array<Etudiant>> {
        return this.learnService.participants;
    }

    questionOptions = [{label: 'True', value: 'true'}, {label: 'False', value: 'false'}];
    selectedT12Reponse: Reponse = new Reponse();

    dernierSelected: Reponse = new Reponse();

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
        let reponse: Reponse;
        if (question.typeDeQuestion.ref === 't12') {
            this.dernierSelected = new Reponse();
            reponse = this.checkAnswers(this.selectedT12Reponse);
        } else {
            reponse = this.learnService.saveAnswers(question, 'STUDENT_ANSWER');
        }
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
        this.correctAnswerT12 = String(' ');
        this.showT12AnswerDiv = false;
        const question = this.learnService.nextQuestionFct();
        if (this.groupeEtudiant?.groupeEtude?.nombreEtudiant === 1) {
            this.followMeFct(question);
        }
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

    checkAnswers(value: Reponse): Reponse {
        return this.learnService.checkAnswers(value);
    }

    onClick(value: Reponse) {
        this.showCheckButton = true;
        this.showDontKnowButton = false;
        this.selectedT12Reponse = value;
        if (this.dernierSelected.id !== 0) {
            document.getElementById(this.dernierSelected.lib).style.backgroundColor = '#dcdcdc';
        }
        document.getElementById(value.lib).style.backgroundColor = 'orange';
        this.dernierSelected = value;
    }

    getCorrectAnswerForT12(): string {
        for (const item of this.t12AnswersList) {
            if (item.etatReponse === 'true') {
                return item.lib;
            }
        }


    }

    valueOf(numero: number): number {
        return ((numero / this.questionList.length) * 100);
    }
}
