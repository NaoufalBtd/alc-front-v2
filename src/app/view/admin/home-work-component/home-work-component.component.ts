import {Component, OnInit} from '@angular/core';
import {HomeWorkReponse} from '../../../controller/model/home-work-reponse.model';
import {HomeWorkQST} from '../../../controller/model/home-work-qst.model';
import {HomeworkService} from '../../../controller/service/homework.service';
import {HomeWork} from '../../../controller/model/home-work.model';
import {MessageService, TreeNode} from 'primeng/api';
import {TypeDeQuestion} from '../../../controller/model/type-de-question.model';
import {LearnService} from '../../../controller/service/learn.service';
import {Cours} from '../../../controller/model/cours.model';
import {Parcours} from '../../../controller/model/parcours.model';
import {HomeWorkEtudiantServiceService} from '../../../controller/service/home-work-etudiant-service.service';
import {TypeHomeWorkService} from '../../../controller/service/type-home-work.service';
import {TypeHomeWork} from '../../../controller/model/type-home-work.model';


@Component({
    selector: 'app-home-work-component',
    templateUrl: './home-work-component.component.html',
    styleUrls: ['./home-work-component.component.scss']
})
export class HomeWorkComponentComponent implements OnInit {

    nodes: TreeNode[];
    viewOnOffDialog = false;
    onOff_true = true;
    onOff_false = false;
    home = {icon: 'pi pi-home', routerLink: '/admin/parcours'};
    navigateItems = [
        {label: this.parcourCurrent.libelle, routerLink: '/admin/parcours'},
        {label: this.courseSelected.libelle, routerLink: '/admin/parcours'},
    ];
    part: number;
    numero = 1;
    input = '<input type="text" pInputText placeholder="Username">';
    showPutInOrder: boolean;

    constructor(private service: HomeworkService,
                private homeWorkEtudiantService: HomeWorkEtudiantServiceService,
                private learnService: LearnService,
                private typeHomeWorkService: TypeHomeWorkService,
                private messageService: MessageService) {
    }

    get typeHomeWorkList(): Array<TypeHomeWork> {
        return this.typeHomeWorkService.typeHomeWorkList;
    }


    get typeHomeWork(): TypeHomeWork {
        return this.typeHomeWorkService.typeHomeWork;
    }

    set typeHomeWork(value: TypeHomeWork) {
        this.typeHomeWorkService.typeHomeWork = value;
    }

    get courseSelected(): Cours {
        return this.learnService.courseSelected;
    }

    get parcourCurrent(): Parcours {
        return this.learnService.parcourCurrent;
    }

    ngOnInit(): void {
        this.typeHomeWorkService.findAll();
        this.homeWork.cours = this.courseSelected;
        this.questionTypes();
        if (this.homeWork.id !== undefined) {
            this.homeWorkEtudiantService.findQuestions(this.homeWork).subscribe(data => {
                this.homeWork.questions = data;
                for (let i = 0; i < this.homeWork.questions.length; i++) {
                    this.homeWorkEtudiantService.findReponsesByQuestionId(this.homeWork.questions[i].id).subscribe(
                        rpsData => {
                            console.log(rpsData);
                            this.homeWork.questions[i].reponses = rpsData;
                            this.nodes = [];
                            for (let i = 0; i < this.homeWork.questions.length; i++) {
                                const list = [];
                                for (let j = 0; j < this.homeWork.questions[i].reponses.length; j++) {
                                    const item = {
                                        label: this.homeWork.questions[i].reponses[j].lib + '\t (' + this.homeWork.questions[i].reponses[j].etatReponse + ' )',
                                        type: 'url'
                                    };
                                    list.push(item);
                                }

                                this.nodes.push(
                                    {
                                        key: i.toString(),
                                        label: 'Question ' + this.homeWork.questions[i].numero + ' : ' + this.homeWork.questions[i].libelle + ' ( ' + this.homeWork.questions[i].typeDeQuestion.lib + ' ) ',
                                        children: list
                                    },
                                );
                                this.reponses = new Array<HomeWorkReponse>();
                            }
                        }, error => {
                            console.log(error);
                        });
                }
            });

        } else {
            this.homeworkQST.reponses = new Array<HomeWorkReponse>();
            this.homeworkQST.numero = 1;
            this.homeWork.questions = new Array<HomeWorkQST>();
            this.homeworkReponse.numero = 1;
        }
        console.log(this.homeWork);
    }

    get reponses(): Array<HomeWorkReponse> {
        return this.service.reponses;
    }

    set reponses(homeWorkReponses) {
        this.service.reponses = homeWorkReponses;
    }

    get typeOfQuestions(): Array<TypeDeQuestion> {
        return this.service.types;
    }

    set typeOfQuestions(typeDeQuestions) {
        this.service.types = typeDeQuestions;
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

    get homeWork(): HomeWork {
        return this.service.HomeWork;
    }

    set homeWork(homeWork1) {
        this.service.HomeWork = homeWork1;
    }

    public clonequestion(question: HomeWorkQST): HomeWorkQST {
        const myclone = new HomeWorkQST();
        myclone.id = question.id;
        myclone.pointReponsefausse = question.pointReponsefausse;
        myclone.pointReponseJuste = question.pointReponseJuste;
        myclone.libelle = question.libelle;
        myclone.typeDeQuestion = question.typeDeQuestion;
        myclone.numero = question.numero;
        myclone.reponses = question.reponses;
        myclone.ref = question.ref;
        myclone.homeWork = question.homeWork;
        return myclone;
    }

    public cloneReponse(reponse: HomeWorkReponse): HomeWorkReponse {
        const myclone = new HomeWorkReponse();
        myclone.id = reponse.id;
        myclone.etatReponse = reponse.etatReponse;
        myclone.lib = reponse.lib;
        myclone.numero = reponse.numero;
        myclone.ref = reponse.ref;
        myclone.homeWorkQuestion = reponse.homeWorkQuestion;
        return myclone;
    }

    public addQuestion() {
        this.homeworkQST.reponses = this.reponses;
        this.homeWork.questions.push({...this.homeworkQST});
        this.addToNode();
        this.homeworkQST = new HomeWorkQST();
        this.homeworkQST.numero = this.homeWork.questions.length + 1;
        this.homeworkQST.reponses = new Array<HomeWorkReponse>();
        this.homeworkReponse.numero = 1;
    }

    private addToNode() {
        console.log('-----------------------------------------------------------------');
        console.log(this.homeWork);
        this.nodes = [];
        for (let i = 0; i < this.homeWork.questions.length; i++) {
            const list = [];
            for (let j = 0; j < this.homeWork.questions[i].reponses.length; j++) {
                const item = {
                    label: this.homeWork.questions[i].reponses[j].lib + '\t (' + this.homeWork.questions[i].reponses[j].etatReponse + ' )',
                    type: 'url'
                };
                list.push(item);
            }

            this.nodes.push(
                {
                    key: i.toString(),
                    label: 'Question ' + this.homeWork.questions[i].numero + ' : ' + this.homeWork.questions[i].libelle + ' ( ' + this.homeWork.questions[i].typeDeQuestion.lib + ' ) ',
                    children: list
                },
            );
            this.reponses = new Array<HomeWorkReponse>();
        }
    }

    public addAnswer() {
        this.reponses.push({...this.homeworkReponse});
        this.homeworkReponse = new HomeWorkReponse();
        this.homeworkReponse.numero = this.reponses.length + 1;
    }

    public save() {
        this.homeWork.cours = this.courseSelected;
        this.homeWork.typeHomeWork = this.typeHomeWork;
        this.homeWork.libelle = this.typeHomeWork.lib;
        this.homeWork.cours = this.courseSelected;
        if (this.homeworkQST?.libelle === undefined || this.homeworkQST?.libelle === null || this.homeworkQST?.libelle.length < 5 ||
            this.courseSelected.id === null || this.courseSelected.id === undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning!',
                detail: 'Please complete the required object !',
                life: 6000
            });
            return;
        } else {
            let typeqst: TypeDeQuestion = new TypeDeQuestion();
            console.log(this.homeWork);
            if (this.homeWork.typeHomeWork.lib === 'READING' || this.homeWork.typeHomeWork.lib === 'WRITE IT UP') {
                if (this.homeWork.typeHomeWork.lib === 'READING') {
                    typeqst = this.typeOfQuestions.filter(t => t.lib === 'Read and add new words')[0];

                } else {
                    typeqst = this.typeOfQuestions.filter(t => t.lib === 'Write it up')[0];
                }
            } else if (this.homeWork.typeHomeWork.lib === 'Drag and Drop') {
                typeqst = this.typeOfQuestions.filter(t => t.lib === 'Put words to gap')[0];
            }
            console.log(typeqst);
            this.homeworkQST.typeDeQuestion = typeqst;
            this.homeWork.questions.push({...this.homeworkQST});
            console.log(this.homeWork);
            this.saveHomeWork();
        }
    }

    saveHomeWork() {
        if (this.courseSelected.id !== null && this.courseSelected.id !== undefined) {
            this.homeWork.cours = this.courseSelected;
            this.homeWork.typeHomeWork = this.typeHomeWork;
            this.homeWork.libelle = this.typeHomeWork.lib;
            this.homeWork.cours = this.courseSelected;
            this.service.saveHomeWork().subscribe(
                data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'HomeWork Created',
                        life: 3000
                    });
                    this.homeWork = new HomeWork();
                    this.homeworkQST = new HomeWorkQST();
                    this.homeworkReponse = new HomeWorkReponse();
                }, error => {
                    console.log(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error!',
                        detail: 'Error to create Home Work please try again !',
                        life: 3000
                    });
                }
            );
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Course should not be null !',
                life: 3000
            });
        }
    }

    questionTypes() {
        this.service.findType().subscribe(
            data => {
                this.typeOfQuestions = data;
            }
        );
    }

    deleteReponse(reponse: any) {
        this.homeworkReponse = reponse;
        this.reponses.splice(this.reponses.indexOf(reponse), 1);
    }

    deleteQuestion(key: string) {
        const deleteNumber = Number(key);
        this.homeWork.questions.splice(deleteNumber, 1);
        this.nodes = [];
        for (let i = 0; i < this.homeWork.questions.length; i++) {
            const list = [];

            for (let j = 0; j < this.homeWork.questions[i].reponses.length; j++) {
                const item = {
                    label: this.homeWork.questions[i].reponses[j].lib + '\t (' + this.homeWork.questions[i].reponses[j].etatReponse + ' )',
                    type: 'url'
                };
                list.push(item);
            }

            this.nodes.push(
                {
                    key: i.toString(),
                    label: 'Question ' + this.homeWork.questions[i].numero + ' : ' + this.homeWork.questions[i].libelle + ' ( ' + this.homeWork.questions[i].typeDeQuestion.lib + ' ) ',
                    children: list
                },
            );
        }
    }

    updateQuestion(key: string) {
        const updateNumber = Number(key);
        this.homeworkQST = this.homeWork.questions[updateNumber];
        this.reponses = this.homeworkQST.reponses;
        console.log(this.reponses);
        this.deleteQuestion(key);
    }

    chooseType() {
        this.showPutInOrder = false;
        if (this.homeworkQST.typeDeQuestion.ref === 't5') {
            this.viewOnOffDialog = true;
        } else if (this.homeworkQST.typeDeQuestion.ref === 't11') {
            this.showPutInOrder = true;
        }
    }

    hideOnOffDialog() {
        this.homeworkQST = new HomeWorkQST();
        this.homeworkQST.numero = this.homeWork.questions.length + 1;
        this.homeworkQST.pointReponsefausse = 0;
        this.homeworkQST.pointReponseJuste = 1;
        this.viewOnOffDialog = false;
    }

    submitOnOff() {
        this.reponses.length = 0;
        this.homeworkReponse.lib = 'true';
        if (this.onOff_true == true) {
            this.homeworkReponse.etatReponse = 'true';
        } else {
            this.homeworkReponse.etatReponse = 'false';
        }
        this.homeworkReponse.numero = 1;
        this.addAnswer();
        this.homeworkReponse.lib = 'false';
        if (this.onOff_false === true) {
            this.homeworkReponse.etatReponse = 'true';
        } else {
            this.homeworkReponse.etatReponse = 'false';
        }
        this.addAnswer();
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

    filterTypeOfQsts() {
        if (this.typeHomeWork.lib === 'Let\'s Practice') {
            this.typeOfQuestions = this.typeOfQuestions.filter(t => (t.ref !== 't10' &&
                t.ref !== 't8' && t.ref !== 't9' && t.ref !== 't7' && t.ref !== 't2'));
        }
        this.homeWork = new HomeWork();
        this.homeworkQST = new HomeWorkQST();
        this.homeworkReponse = new HomeWorkReponse();
    }

    isButtonDisabled(): boolean {
        if (this.homeworkQST.libelle === undefined || this.homeworkQST.libelle?.length < 4) {
            return true;
        } else {
            return false;
        }
    }

    savePhraseBook() {
        console.log(this.homeworkReponse);
        console.log(this.homeworkQST);
        this.homeworkReponse.etatReponse = 'true';
        this.homeworkQST.reponses.push({...this.homeworkReponse});
        this.homeworkQST.numero = this.numero;
        this.homeworkQST.typeDeQuestion = this.typeOfQuestions.filter(t => t.lib === 'Translate the phrase')[0];
        this.homeWork.questions.push({...this.homeworkQST});
        this.homeWork.libelle = this.typeHomeWork.lib;
        this.homeWork.typeHomeWork = this.typeHomeWork;

        console.log(this.homeWork);
        this.numero += 1;
        this.homeworkQST.libelle = String();
        this.homeworkReponse.lib = String();
    }

    saveDrapAndDropHomeWork() {
        this.homeworkQST.numero = this.numero;
        this.homeWork.questions.push({...this.homeworkQST});
        this.homeWork.libelle = this.typeHomeWork.lib;
        this.homeWork.typeHomeWork = this.typeHomeWork;

        console.log(this.homeWork);
        this.numero += 1;
        this.homeworkQST = new HomeWorkQST();
        console.log(this.homeWork);
    }

    removeAnswer(rps: HomeWorkQST) {
        for (let i = 0; i < this.homeWork.questions.length; i++) {
            if (this.homeWork.questions[i].numero === rps.numero) {
                this.homeWork.questions.splice(i, 1);
            }
        }
    }
}
