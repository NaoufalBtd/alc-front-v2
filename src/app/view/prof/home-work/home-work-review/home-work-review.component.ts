import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeworkService} from '../../../../controller/service/homework.service';
import {HomeWorkEtudiantServiceService} from '../../../../controller/service/home-work-etudiant-service.service';
import {Cours} from '../../../../controller/model/cours.model';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {HomeWork} from '../../../../controller/model/home-work.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {LearnService} from '../../../../controller/service/learn.service';
import {LoginService} from '../../../../controller/service/login.service';
import {HomeWOrkEtudiant} from '../../../../controller/model/home-work-etudiant.model';
import {ReponseEtudiantHomeWork} from '../../../../controller/model/reponse-etudiant-home-work.model';
import {HomeWorkReponse} from '../../../../controller/model/home-work-reponse.model';
import {HomeWorkQST} from '../../../../controller/model/home-work-qst.model';
import {MessageService} from 'primeng/api';
import {TypeHomeWorkEnum} from '../../../../enum/type-question.enum';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {WebSocketService} from '../../../../controller/service/web-socket.service';
import {GroupeEtudiantService} from '../../../../controller/service/groupe-etudiant-service';
import {QuizService} from '../../../../controller/service/quiz.service';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {QuizEtudiant} from '../../../../controller/model/quiz-etudiant.model';
import {ReponseEtudiant} from '../../../../controller/model/reponse-etudiant.model';
import {QuizPreviewStudentTeacherComponent} from './quiz-preview-student-teacher/quiz-preview-student-teacher.component';

@Component({
    selector: 'app-home-work-review',
    templateUrl: './home-work-review.component.html',
    styleUrls: ['./home-work-review.component.scss']
})
export class HomeWorkReviewComponent implements OnInit {
    @ViewChild(QuizPreviewStudentTeacherComponent) private child: QuizPreviewStudentTeacherComponent;
    selectedStudent: Etudiant = new Etudiant();
    studentList: Array<Etudiant> = new Array<Etudiant>();
    question: HomeWorkQST = new HomeWorkQST();
    homeWorkEtudiantList: Array<HomeWOrkEtudiant> = new Array<HomeWOrkEtudiant>();
    homeWorkEtudiantSelected: HomeWOrkEtudiant = new HomeWOrkEtudiant();
    reponse: ReponseEtudiantHomeWork = new ReponseEtudiantHomeWork();
    noteProf: HomeWorkReponse = new HomeWorkReponse();
    showResult: boolean;
    quizEtudiantMap: Map<QuizEtudiant, Array<ReponseEtudiant>> = new Map<QuizEtudiant, Array<ReponseEtudiant>>();

    constructor(private homeWorkService: HomeworkService,
                private parcoursService: ParcoursService,
                private learnService: LearnService,
                private quizService: QuizService,
                private quizEtudiantService: QuizEtudiantService,
                private messageService: MessageService,
                private groupeEtudiantService: GroupeEtudiantService,
                public loginService: LoginService,
                private webSocketService: WebSocketService,
                private homeWorkEtudiantService: HomeWorkEtudiantServiceService) {
    }

    get groupStudent(): GroupeEtudiant {
        return this.homeWorkService.groupStudent;
    }


    get selectedcours(): Cours {
        return this.parcoursService.selectedcours;
    }

    get homeWorkSelected(): HomeWork {
        return this.homeWorkService.homeWorkSelected;
    }

    set homeWorkSelected(value: HomeWork) {
        this.homeWorkService.homeWorkSelected = value;
    }

    get participants(): Map<number, Array<Etudiant>> {
        return this.learnService.participants;
    }

    get groupeEtudiant(): GroupeEtudiant {
        return this.webSocketService.groupeEtudiant;
    }

    ngOnInit(): void {
        if (this.webSocketService.isInSession) {
            this.studentList = this.participants.get(this.loginService.prof.id);
            for (let i = 0; i < this.studentList.length; i++) {
                if (this.studentList[i].id === this.loginService.prof.id) {
                    this.studentList.splice(i, 1);
                }
            }
        } else {
            this.groupeEtudiantService.findAllGroupeEtudiantDetail(this.groupStudent.id).subscribe(
                data => {
                    for (let i = 0; i < data.length; i++) {
                        this.studentList.push({...data[i].etudiant});
                    }

                }
            );
        }
        let course: Cours = new Cours();
        this.parcoursService.findCousByParcoursIdOrderByNumeroOrder(this.selectedcours.parcours.id).subscribe(data => {

            for (let i = 0; i < data.length; i++) {
                if (this.selectedcours.id === data[i].id) {
                    course = data[i - 1];
                }
            }
            this.homeWorkService.findhomeworkbyCoursId(course).subscribe(homeWork => {
                console.log(homeWork);
                this.homeWorkSelected = homeWork.filter(h => h.libelle === TypeHomeWorkEnum.WRITE_IT_UP)[0];
                if (this.homeWorkSelected.id !== undefined && this.homeWorkSelected.id !== null && this.homeWorkSelected.id !== 0) {
                    this.homeWorkService.findHomeWorkEtudiantByHomeWorkId(this.homeWorkSelected).subscribe(homeWorkEtudiantData => {
                        console.log(homeWorkEtudiantData);
                        this.homeWorkEtudiantList = homeWorkEtudiantData;
                        if (this.groupeEtudiant.groupeEtude.nombreEtudiant === 1) {
                            this.selectedStudent = this.studentList[0];
                            console.log(this.studentList[0]);
                            this.getResult(this.selectedStudent, this.homeWorkEtudiantList);
                        }
                    });
                    this.homeWorkEtudiantService.findQuestions(this.homeWorkSelected).subscribe(data2 => {
                        this.question = data2[0];
                    });
                }
            });
        });

    }


    getResult(selectedStudent: Etudiant, homeWorkEtudiantList: Array<HomeWOrkEtudiant>) {
        console.log(homeWorkEtudiantList);
        console.log(selectedStudent);
        this.homeWorkEtudiantSelected = homeWorkEtudiantList.filter(h => h.etudiant.id === selectedStudent.id)[0];
        if (this.homeWorkEtudiantSelected.id !== undefined) {
            this.homeWorkEtudiantService.findHomeWorkEtudiantReponseByHomeWorkEtudiantId(this.homeWorkEtudiantSelected.id).subscribe(
                data => {
                    this.reponse = data[0];
                });
        }
        this.showResult = true;
        // find quiz etudiant
        this.quizEtudiantService.findAllQuizByEtudiantId(selectedStudent.id).subscribe(data => {
            for (const quizEtudiant of data) {
                if (quizEtudiant.note < quizEtudiant.questionCurrent) {
                    this.quizEtudiantService.findReponseEtudiantByQuizEtudiantId(quizEtudiant).subscribe(reponseList => {
                        this.quizEtudiantMap.set(quizEtudiant, reponseList);
                    });
                }
            }
            console.log(this.quizEtudiantMap);
        });

    }

    saveNotes() {
        console.log(this.reponse);
        this.homeWorkEtudiantSelected.reponseEtudiantHomeWork = new Array<ReponseEtudiantHomeWork>();
        this.homeWorkEtudiantSelected.reponseEtudiantHomeWork.push({...this.reponse});
        this.homeWorkEtudiantSelected.resultat = this.reponse.note + '/10';
        console.log(this.homeWorkEtudiantSelected);
        this.homeWorkEtudiantService.update(this.homeWorkEtudiantSelected).subscribe(data => {
            this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'Notes send successfully.',
                life: 6000
            });
        });
        console.log(this.reponse);
    }
}
