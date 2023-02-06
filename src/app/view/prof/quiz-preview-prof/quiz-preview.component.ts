import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuizEtudiantService} from '../../../controller/service/quiz-etudiant.service';
import {LoginService} from '../../../controller/service/login.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {DictionaryService} from '../../../controller/service/dictionary.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {Reponse} from '../../../controller/model/reponse.model';
import {ReponseEtudiant} from '../../../controller/model/reponse-etudiant.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {Quiz} from '../../../controller/model/quiz.model';
import {Question} from '../../../controller/model/question.model';
import {QuizEtudiant} from '../../../controller/model/quiz-etudiant.model';
import {LearnService} from '../../../controller/service/learn.service';
import {ReponseEtudiantService} from '../../../controller/service/reponse-etudiant.service';
import {WebSocketService} from '../../../controller/service/web-socket.service';
import {QuizReponse} from '../../../controller/model/quiz-reponse';
import {ChatMessageDto} from '../../../controller/model/chatMessageDto';
import {GroupeEtudiant} from '../../../controller/model/groupe-etudiant.model';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {AnimationService} from '../../../controller/service/animation.service';

@Component({
    selector: 'app-quiz-preview-prof',
    templateUrl: './quiz-preview.component.html',
    styleUrls: ['./quiz-preview.component.scss']
})
export class QuizPreviewProfComponent implements OnInit, OnDestroy {

    constructor(private quizEtudiantService1: QuizEtudiantService,
                private learnService: LearnService,
                private reponseEtudiantService: ReponseEtudiantService,
                public login: LoginService,
                private messageService: MessageService,
                private router: Router,
                private dictionnaryService: DictionaryService,
                private sanitizer: DomSanitizer,
                private quizEtudiantService: QuizEtudiantService,
                private animation: AnimationService,
                public webSocketService: WebSocketService,
                private parcoursservice: ParcoursService) {
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

    get correctAnswerT12(): Map<number, string> {
        return this.learnService.studenta_answersT12;
    }

    set correctAnswerT12(value: Map<number, string>) {
        this.learnService.studenta_answersT12 = value;
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
        return this.quizEtudiantService1.items;
    }


    get reponses(): Array<Reponse> {
        return this.quizEtudiantService1.reponses;
    }

    set reponses(value: Array<Reponse>) {
        this.quizEtudiantService1.reponses = value;
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

    set disableButtonSon(value: boolean) {
        this.learnService.disableButtonSon = value;
    }

    get translateWord(): string {
        return this.learnService.translateWord;
    }

    get selectedQuiz(): Quiz {
        return this.quizEtudiantService1.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.quizEtudiantService1.selectedQuiz = value;
    }


    get reponseQuiz(): QuizReponse {
        return this.webSocketService.reponseQuiz;
    }

    get participants(): Map<number, Array<Etudiant>> {
        return this.learnService.participants;
    }

    get reponseQuizList(): Array<QuizEtudiant> {
        return this.learnService.reponseQuizList;
    }

    set reponseQuizList(value: Array<QuizEtudiant>) {
        this.learnService.reponseQuizList = value;
    }

    get listAnswers(): Array<ReponseEtudiant> {
        return this.learnService.listAnswers;
    }

    set listAnswers(value: Array<ReponseEtudiant>) {
        this.learnService.listAnswers = value;
    }

    questionOptions = [{label: 'True', value: 'true'}, {label: 'False', value: 'false'}];
    showFollowButton = true;

    test: string;

    display: boolean = false;

    ngOnInit(): void {
        this.reponseQuizList = new Array<QuizEtudiant>();
        if (this.webSocketService.isInSession) {
            this.quizEtudiantService.findQuizEtudiantByQuizId(this.selectedQuiz.id).subscribe(
                data => {
                    for (const student of this.participants.get(this.login.getConnectedProf().id)) {
                        for (const quizStd of data) {
                            if (quizStd.etudiant.id === student.id) {
                                this.reponseQuizList.push({...quizStd});
                            }
                        }
                    }
                    console.log(this.reponseQuizList);
                    if (this.reponseQuizList.length === 0) {
                        this.learnService.onStart(this.selectedQuiz);
                    } else {
                        this.showTakeQuiz = false;
                        this.showQuizReview = true;
                    }
                }
            );
        } else {
            this.quizEtudiantService.findQuizEtudiantByQuizId(this.selectedQuiz.id).subscribe(
                data => {
                    this.reponseQuizList = data;
                    if (this.reponseQuizList.length === 0) {
                        this.learnService.onStart(this.selectedQuiz);
                    } else {
                        this.showTakeQuiz = false;
                        this.showQuizReview = true;
                    }
                }
            );
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


    nextQuestionFct() {
        this.correctAnswerT12 = new Map<number, string>();
        this.showT12AnswerDiv = false;
        this.grpStudentAnswers.clear();
        const question = this.learnService.nextQuestionFct();
        this.followMeFct(question);
    }

    previousQuestionFct() {
        this.correctAnswerT12 = new Map<number, string>();
        this.showT12AnswerDiv = false;
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
        const reponseQuiz: QuizReponse = new QuizReponse();
        for (let i = 0; i < (this.questionList.length); i++) {
            if (this.questionList[i].id === question.id) {
                reponseQuiz.question = this.questionList[i - 1];
                console.log(reponseQuiz.question);
            }
        }
        reponseQuiz.type = 'FOLLOW-QUIZ';
        const chatMessageDto: ChatMessageDto = new ChatMessageDto(this.login.getConnectedProf().toString(), ' ', false);
        chatMessageDto.quizReponse = reponseQuiz;
        chatMessageDto.type = 'FOLLOW-QUIZ';
        this.webSocketService.sendMessage(chatMessageDto, 'PROF');
    }

    finishQuiz() {
        this.animation.showAnimation = true;
        const messageDto: ChatMessageDto = new ChatMessageDto('FINISH_QUIZ', 'FINISH_QUIZ', false);
        messageDto.type = 'FINISH_QUIZ';
        messageDto.prof = this.login.getConnectedProf();
        this.webSocketService.sendMessage(messageDto, 'PROF');
        this.showTakeQuiz = false;
        this.showQuizReview = true;
        const timer = setInterval(() => {
            clearInterval(timer);
            this.learnService.getAnswersForProf();
            this.animation.showAnimation = false;
        }, 3000);
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
        this.reponseQuiz.etatReponse = reponse.etatReponse;
        const chatMessageDto: ChatMessageDto = new ChatMessageDto(this.login.getConnectedProf().toString(), ' ', false);
        chatMessageDto.quizReponse = this.reponseQuiz;
        chatMessageDto.type = 'QUIZ';
        if (this.webSocketService.isInSession) {
            this.webSocketService.sendMessage(chatMessageDto, 'PROF');
        } else {
            if (question?.typeDeQuestion?.ref === 't12') {
                this.learnService.checkT12Answer(question);
            }
        }
    }


    checkAnswers(reponse: Reponse) {
        this.reponseQuiz.lib = reponse.lib;
        this.reponseQuiz.type = 'QUIZ';
        this.reponseQuiz.id = reponse.id;
        this.reponseQuiz.question = reponse.question;
        this.reponseQuiz.question.reponses = reponse.question?.reponses;
        this.reponseQuiz.numero = reponse.numero;
        this.reponseQuiz.sender = 'PROF';
        this.reponseQuiz.etatReponse = reponse.etatReponse;
        const chatMessageDto: ChatMessageDto = new ChatMessageDto(this.login.getConnectedProf().id.toString(), ' ', false);
        chatMessageDto.quizReponse = this.reponseQuiz;
        chatMessageDto.type = 'QUIZ';
        this.webSocketService.sendMessage(chatMessageDto, 'PROF');
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

    onClick(reponse: Reponse) {
        if (this.webSocketService.isInSession) {
            this.reponseQuiz.lib = reponse.lib;
            this.reponseQuiz.id = reponse.id;
            this.reponseQuiz.question = reponse.question;
            this.reponseQuiz.numero = reponse.numero;
            this.reponseQuiz.type = 'QUIZ';
            if (this.groupeEtudiant.groupeEtude.nombreEtudiant === 1) {
                this.reponseQuiz.sender = 'STUDENT_CHOICE_T12';
            } else {
                this.reponseQuiz.sender = 'STUDENT_CHOICE_T12_FOR_GRP';
            }
            this.reponseQuiz.etatReponse = reponse.etatReponse;
            const chatMessageDto: ChatMessageDto = new ChatMessageDto(this.login.getConnectedStudent().id.toString(),
                'STUDENT_CHOICE_T12', false);
            chatMessageDto.quizReponse = this.reponseQuiz;
            chatMessageDto.type = 'QUIZ';
            this.webSocketService.sendMessage(chatMessageDto, 'PROF');
        } else {
            this.learnService.onClickT12(reponse);
        }
    }


    //  -------------------------------------- DRAG AND DROP-------------------------------------
    get showToolTipForT13(): boolean {
        return this.learnService.showToolTipForT13;
    }

    set showToolTipForT13(value: boolean) {
        this.learnService.showToolTipForT13 = value;
    }

    get dragAndDropStudentAnswersList(): Map<number, string> {
        return this.learnService.dragAndDropStudentAnswersList;
    }


    get listOfWords(): Array<string> {
        return this.learnService.listOfWords;
    }

    set listOfWords(value: Array<string>) {
        this.learnService.listOfWords = value;
    }

    get listOfText(): Map<number, string> {
        return this.learnService.listOfText;
    }

    set listOfText(value: Map<number, string>) {
        this.learnService.listOfText = value;
    }

    get dragAndDropData(): string {
        return this.learnService.dragAndDropData;
    }

    set dragAndDropData(value: string) {
        this.learnService.dragAndDropData = value;
    }

    get dragAndDropCorrectAnswersList(): Map<number, string> {
        return this.learnService.dragAndDropCorrectAnswersList;
    }

    set dragAndDropCorrectAnswersList(value: Map<number, string>) {
        this.learnService.dragAndDropCorrectAnswersList = value;
    }

    drag(ev) {
        this.learnService.drag(ev);

    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drop(ev) {
        console.log(ev.target);
        const data = this.dragAndDropData;
        const chatMessage: ChatMessageDto = new ChatMessageDto('T13', 'QUESTION_T13', false);
        chatMessage.prof = this.login.getConnectedProf();
        chatMessage.type = 'QUIZ';
        chatMessage.ev = ev.target.id;
        chatMessage.quizReponse = new QuizReponse();
        chatMessage.quizReponse.question = this.question;
        chatMessage.quizReponse.question.quiz = null;
        chatMessage.quizReponse.question.reponses = null;
        chatMessage.quizReponse.type = 'T13';
        chatMessage.quizReponse.lib = data;
        chatMessage.quizReponse.sender = 'PROF';
        if (this.webSocketService.isInSession) {
            this.webSocketService.sendMessage(chatMessage, 'PROF');
        } else {
            this.learnService.dropSynch(ev.target.id);
        }
    }

    getCorrectAnswerForT13(key: number): string {
        return this.dragAndDropCorrectAnswersList.get(key);
    }

    showToolTipsT13(key: number) {
        console.log(key);
        document.getElementById('toolTipT13' + key.toString()).style.visibility = 'visible';
    }

    hideTooltipsT13(key: number) {
        document.getElementById('toolTipT13' + key.toString()).style.visibility = 'hidden';
    }

    drag_put_in_order(item: string, index: number) {
        // const chatMessage: ChatMessageDto = new ChatMessageDto('PUT_IN_ORDER_DRAG', item, false);
        // chatMessage.prof = this.login.getConnectedProf();
        // chatMessage.type = 'QUIZ';
        // chatMessage.ev = index;
        // chatMessage.student = null;
        // chatMessage.quizReponse = null;
        // if (this.webSocketService.isInSession) {
        //     this.webSocketService.sendMessage(chatMessage, 'PROF');
        // } else {
        //     this.learnService.drag_put_in_order(item, index);
        // }
        this.learnService.drag_put_in_order(item, index);

    }

    drop_put_in_order(event: CdkDragDrop<string[]>) {
        // const chatMessage: ChatMessageDto = new ChatMessageDto('PUT_IN_ORDER_DROP', '', false);
        // chatMessage.prof = this.login.getConnectedProf();
        // chatMessage.type = 'QUIZ';
        // chatMessage.ev = event;
        // chatMessage.student = null;
        // chatMessage.quizReponse = null;
        // if (this.webSocketService.isInSession) {
        //     this.webSocketService.sendMessage(chatMessage, 'PROF');
        // } else {
        //     this.learnService.drop_put_in_order(event);
        // }
        this.learnService.drop_put_in_order(event);

    }
}
