import {Component, OnInit} from '@angular/core';
import {QuizService} from '../../../../controller/service/quiz.service';
import {ConfirmationService, MessageService, TreeNode} from 'primeng/api';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {Router} from '@angular/router';
import {Quiz} from '../../../../controller/model/quiz.model';
import {Question} from '../../../../controller/model/question.model';
import {TypeDeQuestion} from '../../../../controller/model/type-de-question.model';
import {Reponse} from '../../../../controller/model/reponse.model';
import {Section} from '../../../../controller/model/section.model';
import {HomeWork} from '../../../../controller/model/home-work.model';
import {HomeWorkQST} from '../../../../controller/model/home-work-qst.model';
import {HomeWorkReponse} from '../../../../controller/model/home-work-reponse.model';
import {LearnService} from '../../../../controller/service/learn.service';
import {Cours} from '../../../../controller/model/cours.model';
import {Parcours} from '../../../../controller/model/parcours.model';
import {TypeQuestionEnum} from '../../../../enum/type-question.enum';


@Component({
    selector: 'app-quiz-create',
    templateUrl: './quiz-create.component.html',
    styleUrls: ['./quiz-create.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class QuizCreateComponent implements OnInit {


    // tslint:disable-next-line:max-line-length
    constructor(private service: QuizService,
                private learnService: LearnService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private router: Router, private serviceParcours: ParcoursService) {
    }

    get courseCurrent(): Cours {
        return this.learnService.courseCurrent;
    }

    get sectionCurrent(): Section {
        return this.learnService.sectionCurrent;
    }

    get parcourCurrent(): Parcours {
        return this.learnService.parcourCurrent;
    }

    get homeworkReponse(): HomeWorkReponse {
        return this.service.homeworkReponse;
    }

    set homeworkReponse(homeWorkReponse) {
        this.service.homeworkReponse = homeWorkReponse;
    }

    get homeworkQST(): HomeWorkQST {
        return this.service.HomeWorkQST;
    }

    set homeworkQST(homeWorkQST) {
        this.service.HomeWorkQST = homeWorkQST;
    }

    get questionNumero(): number {
        return this.service.questionNumero;
    }

    set questionNumero(value: number) {
        this.service.questionNumero = value;
    }

    get reponseNumero(): number {
        return this.service.reponseNumero;
    }

    set reponseNumero(value: number) {
        this.service.reponseNumero = value;
    }

    get question(): Question {
        return this.service.question;
    }

    set question(value: Question) {
        this.service.question = value;
    }

    get questions(): Array<Question> {
        return this.service.questions;
    }

    get selected(): Quiz {
        return this.service.selected;
    }

    set selected(value: Quiz) {
        this.service.selected = value;
    }

    get reponse(): Reponse {

        return this.service.reponse;
    }

    set reponse(value: Reponse) {
        this.service.reponse = value;
    }


    get refQuiz(): string {
        return this.service.refQuiz;
    }

    set refQuiz(value: string) {
        this.service.refQuiz = value;
    }

    get reponses(): Array<Reponse> {
        if (this.service.question.reponses == null) {
            this.service.question.reponses = new Array<Reponse>();
        }
        return this.service.question.reponses;
    }

    set reponses(value: Array<Reponse>) {
        this.service.reponses = value;
    }

    get type(): TypeDeQuestion {
        if (this.service.type == null) {
            this.service.type = new TypeDeQuestion();
        }
        return this.service.question.typeDeQuestion;
    }

    get types(): Array<TypeDeQuestion> {
        if (this.service.types == null) {
            this.service.types = new Array<TypeDeQuestion>();
        }
        return this.service.types;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get items(): Array<Quiz> {
        if (this.service.items == null) {
            this.service.items = new Array<Quiz>();
        }
        return this.service.items;
    }

    set items(value: Array<Quiz>) {
        this.service.items = value;
    }

    get sections(): Array<Section> {
        return this.service.sections;
    }

    get viewDialogType(): boolean {
        return this.service.viewDialogType;
    }

    set viewDialogType(value: boolean) {
        this.service.viewDialogType = value;
    }

    get selectedsection(): Section {
        return this.service.sectionSelected;
    }

    get viewOnOffDialog(): boolean {
        return this.service.viewOnOffDialog;
    }

    set viewOnOffDialog(value: boolean) {
        this.service.viewOnOffDialog = value;
    }

    get homeWork(): HomeWork {
        return this.service.HomeWork;
    }

    set homeWork(homeWork1) {
        this.service.HomeWork = homeWork1;
    }
    part: number;

    cols: any[];
    isHomeWork = false;
    num = 0;
    numQuestion = -1;
    nodes: TreeNode[];
    question2: Question;
    numeroQuestion = '';
    deleteNumber: number;
    isUpdate = 'false';
    onOff_true = true;
    onOff_false = false;
    libelle = String(' ');
    booleanTypes: Array<boolean> = [true, false];

    home = {icon: 'pi pi-home', routerLink: '/admin/parcours'};
    navigateItems = [
        {label: this.parcourCurrent.libelle, routerLink: '/admin/parcours'},
        {label: this.courseCurrent.libelle, routerLink: '/admin/parcours'},
        {label: this.sectionCurrent?.categorieSection?.libelle, routerLink: '/admin/parcours'},
    ];

    mapTranslate: Map<string, Array<Reponse>> = new Map<string, Array<Reponse>>();
    private index = 1;
    fullText = ' ';
    disableAddQuestion = true;
    stateOptions = [{value: true}, {value: false}];

    public deleteCard(index: number) {
        return this.service.deleteCard(index);
    }

    ngOnInit(): void {
        console.log(this.service.sectionSelected.id);
        this.service.findType().subscribe(
            data => {
                this.service.types = data.filter(t => (t.ref !== 't10' &&
                    t.ref !== 't8' && t.ref !== 't9' && t.ref !== 't7' && t.ref !== 't2'));
            }, error1 => {
                console.log(error1);
            }
        );
        this.initCol();
        this.question = new Question();
        this.nodes = [];
        this.question.numero = this.questionNumero;
        this.reponse.numero = 1;
        this.reponse.etatReponse = 'true';
        this.question.pointReponseJuste = 1;
        this.question.pointReponsefausse = 0;
    }

    public hideViewDialog() {
        this.viewDialogType = false;
    }


    checked(event) {
        return this.service.checked(event);
    }

    public checkedFalse(event: any) {
        return this.service.checkedFalse(event);
    }

    public choixSelected(): void {
        this.service.choixSelected();
    }

    public quizSelected(): void {
        this.service.quizSelected();
    }

    public clone(question: Question) {
        const myClone = new Question();
        myClone.reponses = question.reponses;
        myClone.libelle = question.libelle;
        myClone.numero = question.numero;
        myClone.id = question.id;
        myClone.quiz = question.quiz;
        myClone.ref = question.ref;
        myClone.pointReponsefausse = question.pointReponsefausse;
        myClone.pointReponseJuste = question.pointReponseJuste;
        myClone.typeDeQuestion = question.typeDeQuestion;
        return myClone;
    }

    update(key: string) {
        this.numeroQuestion = key;
        this.question.libelle = this.selected.questions[key].libelle;
        this.question.numero = this.selected.questions[key].numero;
        this.question.typeDeQuestion = this.selected.questions[key].typeDeQuestion;
        this.question.pointReponseJuste = this.selected.questions[key].pointReponseJuste;
        this.question.pointReponsefausse = this.selected.questions[key].pointReponsefausse;
        this.reponses.length = 0;
        for (let i = 0; i < this.selected.questions[key].reponses.length; i++) {
            this.reponses.push(this.selected.questions[key].reponses[i]);
        }
        this.reponseNumero = this.selected.questions[key].reponses.length + 1;
        this.reponse.numero = this.reponseNumero;
        this.isUpdate = 'true';
    }

    deleteQuestion(key: string) {
        this.deleteNumber = Number(key);
        this.selected.questions.splice(this.deleteNumber, 1);
        for (let i = this.deleteNumber; i < this.selected.questions.length; i++) {
            this.selected.questions[i].numero = this.selected.questions[i].numero - 1;
        }
        this.nodes = [];
        for (let i = 0; i < this.selected.questions.length; i++) {
            const list = [];

            for (let j = 0; j < this.selected.questions[i].reponses.length; j++) {
                const item = {
                    label: this.selected.questions[i].reponses[j].lib + '\t (' + this.selected.questions[i].reponses[j].etatReponse + ' )',
                    type: 'url'
                };
                list.push(item);
            }

            this.nodes.push(
                {
                    key: i.toString(),
                    label: 'Question ' + this.selected.questions[i].numero + ' : ' + this.selected.questions[i].libelle + ' ( ' + this.selected.questions[i].typeDeQuestion.lib + ' ) ',
                    children: list
                },
            );
        }
        this.questionNumero = this.selected.questions.length + 1;
        this.reponseNumero = 1;
        this.question.numero = this.questionNumero;
        this.reponse.numero = this.reponseNumero;
        this.reponse.etatReponse = 'true';
    }

    public addFormule() {
        if (this.isUpdate === 'false') {
            this.selected.questions.push(this.clone(this.question));
            this.question2 = this.question;

            console.log(this.selected.questions);
            this.question = new Question();
            this.questionNumero = this.questionNumero + 1;
            this.reponseNumero = 1;
            this.question.numero = this.questionNumero;
            this.reponse.numero = this.reponseNumero;
            this.nodes = [];
            for (let i = 0; i < this.selected.questions.length; i++) {
                const list = [];

                for (let j = 0; j < this.selected.questions[i].reponses.length; j++) {
                    const item = {
                        label: this.selected.questions[i].reponses[j].lib + '\t (' + this.selected.questions[i].reponses[j].etatReponse + ' )',
                        type: 'url'
                    };
                    list.push(item);
                }

                this.nodes.push(
                    {
                        key: i.toString(),
                        label: 'Question ' + this.selected.questions[i].numero + ' : ' + this.selected.questions[i].libelle +
                            ' ( ' + this.selected.questions[i].typeDeQuestion.lib + ' ) ',
                        children: list
                    },
                );
            }
            this.reponse.etatReponse = 'true';
            this.question.pointReponseJuste = 1;
            this.question.pointReponsefausse = 0;
        } else {
            this.selected.questions[this.numeroQuestion].libelle = this.question.libelle;
            this.selected.questions[this.numeroQuestion].numero = this.question.numero;
            this.selected.questions[this.numeroQuestion].typeDeQuestion = this.question.typeDeQuestion;
            this.selected.questions[this.numeroQuestion].reponses = this.reponses;
            this.question = new Question();
            this.nodes = [];
            for (let i = 0; i < this.selected.questions.length; i++) {
                const list = [];

                for (let j = 0; j < this.selected.questions[i].reponses.length; j++) {
                    const item = {
                        label: this.selected.questions[i].reponses[j].lib + '\t (' + this.selected.questions[i].reponses[j].etatReponse + ' )',
                        type: 'url'
                    };
                    list.push(item);
                }

                this.nodes.push(
                    {
                        key: i.toString(),
                        label: 'Question ' + this.selected.questions[i].numero + ' : ' + this.selected.questions[i].libelle + ' ( ' + this.selected.questions[i].typeDeQuestion.lib + ' ) ',
                        children: list
                    },
                );
            }
            this.questionNumero = this.selected.questions.length + 1;
            this.reponseNumero = 1;
            this.question.numero = this.questionNumero;
            this.reponse.numero = this.reponseNumero;
            this.question.pointReponseJuste = 1;
            this.question.pointReponsefausse = 0;
            this.reponse.etatReponse = 'true';
            this.isUpdate = 'false';
        }
    }

    public save() {
        this.selected.ref = 'quiz-' + this.selectedsection.id;
        this.selected.section = this.selectedsection;
        this.service.refQuiz = this.service.selected.ref;
        if (this.selected.section.id === undefined) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Section is null please choose a section from "Manage section"',
                life: 3000
            });
        } else {
            this.service.save().subscribe(
                data => {
                    this.items.push({...data});
                    this.question = null;
                    this.selected = null;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Quiz Created',
                        life: 3000
                    });
                    this.router.navigate(['/admin/manage-section']);
                }, error => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Quiz not created, please try again.',
                        life: 3000
                    });
                });
        }
    }

    public edit() {
        if (this.question.id) {
            this.questions[this.service.findIndexById(this.question.id)] = this.question;
            this.service.edit().subscribe(data => {
                this.question = data;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Question Updated',
                    life: 3000
                });
            });
            this.question = new Question();
        }
    }


//

    public addReponse() {
        return this.service.addReponse();
    }

    delete(reponse: Reponse) {
        this.service.delete(reponse);
    }

    public openConfig() {
        this.createDialog = true;
    }




    openPreview() {
        this.router.navigate(['admin/quiz-preview-prof']);
    }

    private initCol() {
        this.cols = [
            {field: 'lib', header: 'Libelle Reponse'},
            {field: 'etatReponse', header: 'Correct'},
        ];
    }

    chooseType() {
        if (this.question.typeDeQuestion.ref === 't5') {
            this.viewOnOffDialog = true;
        }
    }

    hideOnOffDialog() {
        this.question = new Question();
        this.question.numero = this.questionNumero;
        this.question.pointReponsefausse = 0;
        this.question.pointReponseJuste = 1;
        this.viewOnOffDialog = false;
    }

    submitOnOff() {
        this.reponses.length = 0;
        this.reponse.lib = 'true';
        if (this.onOff_true === true) {
            this.reponse.etatReponse = 'true';
        } else {
            this.reponse.etatReponse = 'false';
        }
        this.reponse.numero = 1;
        this.addReponse();
        this.reponse.lib = 'false';
        if (this.onOff_false === true) {
            this.reponse.etatReponse = 'true';
        } else {
            this.reponse.etatReponse = 'false';
        }
        this.reponse.numero = 2;
        this.addReponse();
        this.viewOnOffDialog = false;
    }

    onOffTrue() {
        if (this.onOff_true === true) {
            this.onOff_false = false;
        } else {
            this.onOff_false = true;
        }
    }

    onOffFalse() {
        if (this.onOff_false === true) {
            this.onOff_true = false;
        } else {
            this.onOff_true = true;
        }
    }

    getPlaceHolder(): string {
        if (this.question.typeDeQuestion.ref === TypeQuestionEnum.CHOOSE_THE_CORRECT_ALTERNATIVE) {
            return 'Example: We must ... the train at the next stop. ' +
                ' (Use at last 3 points)';
        } else if (this.question.typeDeQuestion.ref === TypeQuestionEnum.CORRECT_THE_MISTAKE) {
            return 'Example: We must @get on@  the train at the next stop. ' +
                ' (Put the mistake between two "@")';
        } else if (this.question.typeDeQuestion.ref === TypeQuestionEnum.WRITE_THE_CORRECT_FORM) {
            return 'Example: He @to want@ all of them. ' +
                ' (Put the verb between two "@")';
        } else {
            return ' ';
        }
    }

    addAnswers() {
        const num = this.reponse.numero;
        this.reponses.push({...this.reponse});
        console.log(this.question);
        this.reponse = new Reponse();
        this.reponse.numero = num;
    }

    nextWord() {
        this.mapTranslate.set(this.libelle, this.reponses.filter(t => t.numero === this.index));
        this.fullText = this.fullText + ' ' + this.libelle + ' ';
        this.libelle = '_' + String(this.index) + ' ' + this.libelle;
        if (this.question.libelle !== undefined) {
            this.question.libelle += this.libelle;
        } else {
            this.question.libelle = this.libelle;
        }
        this.index += 1;
        this.reponse.numero = this.index;
        console.log(this.reponse.lib);
        this.libelle = String(' ');
        this.disableAddQuestion = false;
    }

}
