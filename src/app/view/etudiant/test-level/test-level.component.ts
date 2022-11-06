import {Component, OnInit} from '@angular/core';
import {QuizEtudiantService} from '../../../controller/service/quiz-etudiant.service';
import {LearnService} from '../../../controller/service/learn.service';
import {LoginService} from '../../../controller/service/login.service';
import {MessageService} from 'primeng/api';
import {DictionaryService} from '../../../controller/service/dictionary.service';
import {DomSanitizer} from '@angular/platform-browser';
import {WebSocketService} from '../../../controller/service/web-socket.service';
import {Reponse} from '../../../controller/model/reponse.model';
import {GroupeEtudiant} from '../../../controller/model/groupe-etudiant.model';
import {Question} from '../../../controller/model/question.model';
import {Quiz} from '../../../controller/model/quiz.model';
import {QuizReponse} from '../../../controller/model/quiz-reponse';
import {Prof} from '../../../controller/model/prof.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {InscriptionService} from '../../../controller/service/inscription.service';
import {Inscription} from '../../../controller/model/inscription.model';
import {LevelTestConfigurationService} from '../../../controller/service/level-test-configuration.service';
import {LevelTestConfiguration} from '../../../controller/model/level-test-configuration.model';
import {QuizEtudiant} from '../../../controller/model/quiz-etudiant.model';
import {PackStudent} from '../../../controller/model/pack-student.model';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {Router} from '@angular/router';
import {EtudiantService} from '../../../controller/service/etudiant.service';

@Component({
    selector: 'app-test-level',
    templateUrl: './test-level.component.html',
    styleUrls: ['./test-level.component.scss']
})
export class TestLevelComponent implements OnInit {
    inscription: Inscription = new Inscription();
    private testLevels: LevelTestConfiguration[];
    private quizEtudiant: QuizEtudiant = new QuizEtudiant();

    constructor(private quizEtudiantService: QuizEtudiantService,
                private learnService: LearnService,
                private inscriptionService: InscriptionService,
                private login: LoginService,
                private messageService: MessageService,
                private levelTestConfigurationService: LevelTestConfigurationService,
                private dictionnaryService: DictionaryService,
                private sanitizer: DomSanitizer,
                public router: Router,
                public etudiantService: EtudiantService,
                private packStudentService: PackStudentService,
                public webSocketService: WebSocketService) {
    }

    get packs(): Array<PackStudent> {
        return this.packStudentService.packs;
    }

    set packs(value: Array<PackStudent>) {
        this.packStudentService.packs = value;
    }


    get dernierSelected(): Reponse {
        return this.learnService.dernierSelected;
    }

    set dernierSelected(value: Reponse) {
        this.learnService.dernierSelected = value;
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


    get answersT12List(): Map<number, string> {
        return this.learnService.answersT12List;
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
        return this.quizEtudiantService.items;
    }


    get reponses(): Array<Reponse> {
        return this.quizEtudiantService.reponses;
    }

    set reponses(value: Array<Reponse>) {
        this.quizEtudiantService.reponses = value;
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
        return this.quizEtudiantService.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.quizEtudiantService.selectedQuiz = value;
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


    set grpStudentAnswers(value: Map<Etudiant, QuizReponse>) {
        this.webSocketService.grpStudentAnswers = value;
    }


    ngOnInit(): void {
        this.quizEtudiantService.findQuizEtudanitByEtudiantIdAndQuizRef(this.login.getConnectedStudent(),
            'quiz-353').subscribe(
            data => {
                this.quizEtudiant = data;
            }, error => {
                console.log(error);
            }
        );
        this.quizEtudiantService.findQuizByReference('quiz-353').subscribe(
            data => {
                this.selectedQuiz = data;
                this.learnService.onStart(data);
            }, error => {
                console.log(error);
            }
        );

        this.levelTestConfigurationService.findAll().subscribe(
            data => {
                this.testLevels = data;
            }, error => {
                console.log(error);
            }
        );
        this.inscriptionService.findByEtudiantId(this.login.getConnectedStudent().id).subscribe(
            data => {
                this.inscription = data;
                if (this.inscription?.quizFinished === true) {
                    this.showTakeQuiz = false;
                    this.showQuizReview = true;
                    this.packStudentService.findByLevel(data.parcours.id);

                } else {
                    this.showQuizReview = false;
                    this.showTakeQuiz = true;
                }
            }, error => {
                console.log(error);
            }
        );
        this.trueOrFalse = null;
        this.grpStudentAnswers = new Map<Etudiant, QuizReponse>();

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
            document.getElementById('showCheckButtonForT12').style.visibility = 'hidden';
            reponse = this.learnService.checkT12Answer(question);
        } else {
            reponse = this.learnService.saveAnswers(question, 'STUDENT_ANSWER');
        }
    }

    showAnswers(question: Question) {
        let reponse: Reponse;
        if (question.typeDeQuestion.ref === 't12') {
            this.dernierSelected = new Reponse();
            reponse = this.t12AnswersList.filter(t => t.etatReponse === 'true')[0];
        } else {
            reponse = this.learnService.showAnswers(question);
        }
    }

    nextQuestionFct() {
        this.correctAnswerT12 = new Map<number, string>();
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
    }

    finishQuiz() {
        this.quizEtudiant = this.learnService.finishQuiz();
        console.log(this.quizEtudiant);
        for (const item of this.testLevels) {
            if (this.quizEtudiant.note <= item.noteMax && this.quizEtudiant.note > item.noteMin) {
                this.inscription.parcours = item.parcours;
                this.inscription.noteQuizNiveau = this.quizEtudiant.note;
                this.inscription.quizNiveau = this.selectedQuiz;
                this.inscription.quizFinished = true;
                this.inscriptionService.updateInsc(this.inscription).subscribe(
                    data => {
                        console.log(data);
                        this.messageService.add({
                            severity: 'success', summary: 'Successfully',
                            detail: 'Test finished with successful.'
                        });

                        this.showTakeQuiz = false;
                        this.showQuizReview = true;
                    }, error => {
                        this.messageService.add({severity: 'error', detail: 'something went wrong please try again.'});

                    }
                );
            }
        }
    }


    onClick(reponse: Reponse) {
        this.learnService.onClickT12(reponse);
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


    //  -------------------------------------- DRAG AND DROP-------------------------------------


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
        this.learnService.dropSynch(ev.target.id);
    }

    getCorrectAnswerForT13(key: number): string {
        return this.dragAndDropCorrectAnswersList.get(key);
    }

    showToolTipsT13(key: number) {
        document.getElementById('toolTipT13' + key.toString()).style.visibility = 'visible';
    }

    hideTooltipsT13(key: number) {
        document.getElementById('toolTipT13' + key.toString()).style.visibility = 'hidden';
    }

    isForGroupOrindev(forGroupe: boolean): string {
        if (forGroupe) {
            return 'Group';
        } else {
            return 'Individual';
        }
    }

    set selectedPack(value: PackStudent) {
        this.etudiantService.selectedPack = value;
    }

    selectedPackFct(pack: PackStudent) {
        this.selectedPack = pack;
        this.router.navigate(['/etudiant/pack']);
    }

}

