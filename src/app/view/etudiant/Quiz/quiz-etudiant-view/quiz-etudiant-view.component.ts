/* tslint:disable:prefer-for-of */
import {Component, OnInit} from '@angular/core';
import {QuizEtudiant} from '../../../../controller/model/quiz-etudiant.model';
import {EtudiantClassRoom} from '../../../../controller/model/etudiant-class-room.model';
import {QuizClassRoom} from '../../../../controller/model/quiz-class-room.model';
import {Quiz} from '../../../../controller/model/quiz.model';
import {ReponseEtudiant} from '../../../../controller/model/reponse-etudiant.model';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {LoginService} from '../../../../controller/service/login.service';
import {Question} from '../../../../controller/model/question.model';
import {Reponse} from '../../../../controller/model/reponse.model';
import {ConfirmationService, MenuItem, MessageService, TreeNode} from 'primeng/api';
import {Router} from '@angular/router';
import {DictionaryService} from '../../../../controller/service/dictionary.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {HttpClient} from '@angular/common/http';
import {VocabularyService} from '../../../../controller/service/vocabulary.service';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {Dictionary} from '../../../../controller/model/dictionary.model';
import {Section} from '../../../../controller/model/section.model';
import {ReponseEtudiantService} from '../../../../controller/service/reponse-etudiant.service';

@Component({
    selector: 'app-quiz-etudiant-view',
    templateUrl: './quiz-etudiant-view.component.html',
    styleUrls: ['./quiz-etudiant-view.component.scss']
})
export class QuizEtudiantViewComponent implements OnInit {
    quizStudent: QuizEtudiant = new QuizEtudiant();
    reponseList: Array<ReponseEtudiant> = new Array<ReponseEtudiant>();
    reponse: ReponseEtudiant = new ReponseEtudiant();
    student: Etudiant = new Etudiant();

    index = 1;
    valueOfProgressBar: number;
    questionSideLeft: string;
    questionSideRight: string;
    translateWord: string;
    wordDictionnary: string;
    showNextButton = true;
    showFinishButton = false;
    trueOrfalse = false;
    son = '';

    constructor(private quizEtudiantService: QuizEtudiantService,
                private loinService: LoginService,
                private reponseEtudiantService: ReponseEtudiantService) {
    }

    get selectedQuiz(): Quiz {
        return this.quizEtudiantService.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.quizEtudiantService.selectedQuiz = value;
    }


    ngOnInit(): void {
        this.student = this.loinService.getConnectedStudent();
        this.quizEtudiantService.findQuizEtudanitByEtudiantIdAndQuizId(this.student, this.selectedQuiz).subscribe(
            data => {
                this.quizStudent = data;
                console.log(this.quizStudent);
                this.reponseEtudiantService.findByQuizStudent(this.quizStudent).subscribe(
                    reponses => {
                        this.reponseList = reponses;
                        this.reponse = reponses[0];
                        this.translate(this.reponse);
                        if (this.reponse.question.typeDeQuestion.ref === 't1') {
                            this.questionSideLeft = this.reponse.question.libelle.substring(0,
                                this.reponse.question.libelle.indexOf('...'));
                            this.questionSideRight = this.reponse.question.libelle.substring(
                                this.reponse.question.libelle.lastIndexOf('...') + 3);
                        } else if (this.reponse.question.typeDeQuestion.ref === 't4' || this.reponse.question.typeDeQuestion.ref === 't6') {
                            this.questionSideLeft = this.reponse.question.libelle.substring(0, this.reponse.question.libelle.indexOf('@'));
                            this.questionSideRight = this.reponse.question.libelle.substring(
                                this.reponse.question.libelle.lastIndexOf('@') + 1);
                        }
                        console.log(this.reponseList);
                    }, err => {
                        console.log(err);
                    }
                );
            }, error => {
                console.log(error);
            }
        );
    }


    public sound(qst: Question) {
        if (qst.typeDeQuestion.ref === 't1' || qst.typeDeQuestion.ref === 't6' || qst.typeDeQuestion.ref === 't4') {
            this.son = this.questionSideLeft + ' ' + this.reponse.reponse.lib + ' ' + this.questionSideRight;
            console.log(this.son);
        } else if (qst.typeDeQuestion.ref === 't3') {
            this.son = this.reponse.reponse.lib;
            console.log(this.son);
        } else if (qst.typeDeQuestion.ref === 't5') {
            this.son = qst.libelle;
        }
        const text = encodeURIComponent(this.son);
        const url = 'https://www.translatedict.com/speak.php?word=' + this.son + '&lang=en';
        const audio = new Audio(url);
        audio.play();
    }


    public translate(rep: ReponseEtudiant) {
        console.log(rep);

        if (rep.question.typeDeQuestion.ref === 't1' || rep.question.typeDeQuestion.ref === 't6' ||
            rep.question.typeDeQuestion.ref === 't4') {
            if (rep.question.typeDeQuestion.ref === 't1') {
                this.questionSideLeft = rep.question.libelle.substring(0, rep.question.libelle.indexOf('...'));
                this.questionSideRight = rep.question.libelle.substring(rep.question.libelle.lastIndexOf('...') + 3);
            } else if (rep.question.typeDeQuestion.ref === 't4' || rep.question.typeDeQuestion.ref === 't6') {
                this.questionSideLeft = rep.question.libelle.substring(0, rep.question.libelle.indexOf('@'));
                this.questionSideRight = rep.question.libelle.substring(rep.question.libelle.lastIndexOf('@') + 1);
            }
            this.wordDictionnary = this.questionSideLeft + ' ' + rep.answer + ' ' + this.questionSideRight;
            console.log(this.questionSideLeft);
            console.log(this.questionSideRight);
            console.log(rep.answer);
        } else if (rep.question.typeDeQuestion.ref === 't3') {
            this.wordDictionnary = rep.reponse.lib;
            console.log(this.son);
        } else if (rep.question.typeDeQuestion.ref === 't5') {
            this.wordDictionnary = rep.question.libelle;
        }
        console.log(this.wordDictionnary);
        this.quizEtudiantService.translate(this.wordDictionnary).subscribe(
            data => {
                this.translateWord = data;
                console.log(data);
            }
        );
    }


    nextQuestionFct() {
        this.translateWord = String();
        this.index += 1;
        for (let i = 0; i < (this.reponseList.length); i++) {
            if (this.reponse.id === this.reponseList[i].id) {
                this.reponse = this.reponseList[i + 1];
                if (this.reponse.question.typeDeQuestion.ref === 't1') {
                    this.questionSideLeft = this.reponse.question.libelle.substring(0, this.reponse.question.libelle.indexOf('...'));
                    this.questionSideRight = this.reponse.question.libelle.substring(this.reponse.question.libelle.lastIndexOf('...') + 3);
                } else if (this.reponse.question.typeDeQuestion.ref === 't4' || this.reponse.question.typeDeQuestion.ref === 't6') {
                    this.questionSideLeft = this.reponse.question.libelle.substring(0, this.reponse.question.libelle.indexOf('@'));
                    this.questionSideRight = this.reponse.question.libelle.substring(this.reponse.question.libelle.lastIndexOf('@') + 1);
                } else if (this.reponse.question.typeDeQuestion.ref === 't5') {
                    this.trueOrfalse = this.reponse.answer === 'true';

                }
                break;
            }
        }
        console.log(this.questionSideLeft);
        console.log(this.questionSideRight);
        this.translate(this.reponse);
        if (this.reponse.id === this.reponseList[this.reponseList.length - 1].id) {
            this.showFinishButton = true;
            this.showNextButton = false;
        }
    }

    previousQuestionFct() {
        this.showNextButton = true;
        this.showFinishButton = false;
        this.translateWord = String();
        this.index += 1;
        for (let i = 0; i < (this.reponseList.length); i++) {
            if (this.reponse.id === this.reponseList[i].id) {
                this.reponse = this.reponseList[i - 1];
                if (this.reponse.question.typeDeQuestion.ref === 't1') {
                    this.questionSideLeft = this.reponse.question.libelle.substring(0, this.reponse.question.libelle.indexOf('...'));
                    this.questionSideRight = this.reponse.question.libelle.substring(this.reponse.question.libelle.lastIndexOf('...') + 3);
                } else if (this.reponse.question.typeDeQuestion.ref === 't4' || this.reponse.question.typeDeQuestion.ref === 't6') {
                    this.questionSideLeft = this.reponse.question.libelle.substring(0, this.reponse.question.libelle.indexOf('@'));
                    this.questionSideRight = this.reponse.question.libelle.substring(this.reponse.question.libelle.lastIndexOf('@') + 1);
                }
                break;
            }
        }
        console.log(this.questionSideLeft);
        console.log(this.questionSideRight);
        this.translate(this.reponse);
        if (this.reponse.id === this.reponseList[this.reponseList.length - 1].id) {
            this.showFinishButton = true;
            this.showNextButton = false;
        }
    }
}
