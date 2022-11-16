import {Component, OnInit} from '@angular/core';
import {Parcours} from '../../../controller/model/parcours.model';
import {Cours} from '../../../controller/model/cours.model';
import {CategorieSection} from '../../../controller/model/categorie-section.model';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {HomeworkService} from '../../../controller/service/homework.service';
import {HomeWorkEtudiantServiceService} from '../../../controller/service/home-work-etudiant-service.service';
import {HomeWork} from '../../../controller/model/home-work.model';
import {HomeWorkQST} from '../../../controller/model/home-work-qst.model';
import {HomeWorkReponse} from '../../../controller/model/home-work-reponse.model';
import {Router} from '@angular/router';
import {LearnService} from '../../../controller/service/learn.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {TypeHomeWorkEnum, TypeQuestionEnum} from '../../../enum/type-question.enum';
import {TypeDeQuestion} from '../../../controller/model/type-de-question.model';

@Component({
    selector: 'app-home-work-preview',
    templateUrl: './home-work-preview.component.html',
    styleUrls: ['./home-work-preview.component.scss']
})
export class HomeWorkPreviewComponent implements OnInit {

    public parcours: Array<Parcours> = new Array<Parcours>();
    public cours: Array<Cours> = new Array<Cours>();
    public homeWorks: Array<HomeWork> = new Array<HomeWork>();
    public qstList: Array<HomeWorkQST> = new Array<HomeWorkQST>();
    public qstWriteItUp: HomeWorkQST = new HomeWorkQST();
    public selectedHomeWork: HomeWork = new HomeWork();
    public homeWork: HomeWork = new HomeWork();
    visibleSidebar: boolean;
    rows = 10;
    first = 0;
    public answersList: Map<HomeWorkQST, Array<HomeWorkReponse>> = new Map<HomeWorkQST, Array<HomeWorkReponse>>();

    urlMedia: string;
    showEditDialog: boolean;
    showAnswersDialog: boolean;
    categorieSections: Array<CategorieSection> = new Array<CategorieSection>();
    answers: Array<HomeWorkReponse> = new Array<HomeWorkReponse>();
    showEditWriteItUpDialog: boolean;
    showSrcImg: boolean;

    constructor(private parcoursService: ParcoursService,
                private homeWorkService: HomeworkService,
                private router: Router,
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private learnService: LearnService,
                private homeWorkEtudiantService: HomeWorkEtudiantServiceService) {
    }

    get selectedparcours(): Parcours {
        return this.parcoursService.selectedparcours;
    }

    set selectedparcours(value: Parcours) {
        this.parcoursService.selectedparcours = value;
    }

    get selectedcours(): Cours {
        return this.parcoursService.selectedcours;
    }

    set selectedcours(value: Cours) {
        this.parcoursService.selectedcours = value;
    }

    ngOnInit(): void {
        this.selectedparcours = new Parcours();
        this.selectedcours = new Cours();
        this.parcoursService.FindAllParcours().subscribe(
            data => {
                this.parcours = data;
            }
        );
        this.questionTypes();
    }


    questionTypes() {
        this.homeWorkService.findType().subscribe(
            data => {
                this.typeOfQuestions = data;
            }
        );
    }

    getCours() {
        console.log(this.selectedparcours.id);
        if (this.selectedparcours.id !== undefined) {
            this.parcoursService.afficheCours().subscribe(
                data => {
                    this.cours = data;
                });
        }
    }

    getHomeWorks() {
        console.log(this.selectedcours.id);
        if (this.selectedcours.id !== undefined) {
            if (this.selectedparcours.id !== undefined) {
                this.homeWorkService.findhomeworkbyCoursId(this.selectedcours).subscribe(data => {
                    this.homeWorks = data;
                    if (this.homeWorks.length === 0) {
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'No home work found in  this section !',
                            life: 4000
                        });
                    }
                    console.log(this.homeWorks);
                }, error => {
                    console.log(error);
                });
            }
        }
    }

    findHomeWork() {

    }


    view(homework: HomeWork) {

        this.homeWorkEtudiantService.findQuestions(homework).subscribe(data => {
            this.qstList = data;
            for (let i = 0; i < this.qstList.length; i++) {
                this.homeWorkEtudiantService.findReponsesByQuestionId(this.qstList[i].id).subscribe(
                    rpsData => {
                        console.log(rpsData);
                        this.answersList.set(this.qstList[i], rpsData);
                        console.log(this.answersList);

                    }, error => {
                        console.log(error);
                    });
            }
        });
        this.showEditDialog = true;
    }

    edit(homework: HomeWork) {
        this.courseSelected = this.selectedcours;
        this.parcourCurrent = this.selectedparcours;
        this.homeWorkSelected = homework;
        console.log(this.homeWorkSelected);
        if (homework.typeHomeWork.lib === TypeHomeWorkEnum.WRITE_IT_UP || homework.typeHomeWork.lib === TypeHomeWorkEnum.READING ||
            homework.typeHomeWork.lib === TypeHomeWorkEnum.WATCH_IT) {
            this.editWriteItUp(homework);
        } else {
            this.router.navigate(['/admin/homeWork']);
        }
    }


    set courseSelected(value: Cours) {
        this.learnService.courseSelected = value;
    }

    set parcourCurrent(value: Parcours) {
        this.learnService.parcourCurrent = value;
    }

    delete(homework: HomeWork) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + homework.libelle + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.homeWorkService.deleteHomeWorkById(homework.id).subscribe(
                    data => {
                        for (let i = 0; i < this.homeWorks.length; i++) {
                            if (homework.id === this.homeWorks[i].id) {
                                this.homeWorks.splice(i, 1);
                            }
                        }
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Successful',
                            detail: 'Home Work has been deleted successfully',
                            life: 3000
                        });
                    }
                );
            }
        });

    }

    showImage(imgUrl: string, code: string) {
        console.log('-----------------------------------------');
        console.log(imgUrl);
        if (code === 'img') {
            this.showSrcImg = true;
        } else {
            this.showSrcImg = false;

        }
        this.urlMedia = imgUrl;
        this.visibleSidebar = true;
    }

    showAnswers(qst: HomeWorkQST) {
        this.showAnswersDialog = true;
        this.answers = this.answersList.get(qst);
        console.log(this.answers);
    }

    get typeOfQuestions(): Array<TypeDeQuestion> {
        return this.homeWorkService.types;
    }

    set typeOfQuestions(typeDeQuestions) {
        this.homeWorkService.types = typeDeQuestions;
    }

    get homeWorkSelected(): HomeWork {
        return this.homeWorkService.homeWork;
    }

    set homeWorkSelected(homeWork) {
        this.homeWorkService.homeWork = homeWork;
    }

    editWriteItUp(homeWork: HomeWork) {
        this.selectedHomeWork = homeWork;
        this.homeWorkEtudiantService.findQuestions(homeWork).subscribe(data => {
            console.log(data);
            if (data.length === 0) {
                this.qstWriteItUp = new HomeWorkQST();
            } else {
                this.qstWriteItUp = data[0];

            }
        });
        this.showEditWriteItUpDialog = true;
    }

    updateHomeWork() {
        if (this.qstWriteItUp?.typeDeQuestion?.id === undefined ||
            this.qstWriteItUp?.typeDeQuestion?.id === 0 ||
            this.qstWriteItUp?.typeDeQuestion?.id === null) {
            if (this.selectedHomeWork?.typeHomeWork?.lib === TypeHomeWorkEnum.READING) {
                this.qstWriteItUp.typeDeQuestion = this.typeOfQuestions.filter(t => t.ref === TypeQuestionEnum.READ_AND_ADD_NEW_WORDS)[0];

            } else {
                this.qstWriteItUp.typeDeQuestion = this.typeOfQuestions.filter(t => t.ref === TypeQuestionEnum.WRITE_IT_UP)[0];
            }
        }
        this.selectedHomeWork.questions = new Array<HomeWorkQST>();
        this.selectedHomeWork.questions.push({...this.qstWriteItUp});
        console.log(this.selectedHomeWork);
        this.homeWorkService.updateHomeWork(this.selectedHomeWork).subscribe(data => {
            console.log(data);
            this.messageService.add({
                severity: 'info',
                summary: 'Successful',
                detail: 'Home Work Updated',
                life: 3000
            });

        }, error => {
            console.log(error);
            this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'Error to update Home Work please try again !',
                life: 3000
            });
        });
        this.showEditWriteItUpDialog = false;
    }

    getUrlVideo(urlVideo: string): string {
        let video = urlVideo.replace('watch?v=', 'embed/');
        const index = video.indexOf('&t=');
        const startTime: number = Number(video.substring(index + '&t='.length, (video.length - 1)));
        if (index !== -1) {
            video = video.substring(0, index) + '?start=' + startTime;
        }
        return video;
    }

    isValidated(homework: HomeWork): boolean {
        if (homework?.typeHomeWork?.lib === TypeHomeWorkEnum.WATCH_IT) {
            return (homework.urlVideo?.length >= 5 || homework.urlImage == null || undefined);
        } else if (homework?.typeHomeWork?.lib === TypeHomeWorkEnum.READING) {
            return !(homework.urlImage?.length < 5);
        } else if (homework?.typeHomeWork?.lib === TypeHomeWorkEnum.WRITE_IT_UP) {
            return !(homework.urlImage === null || homework.urlImage?.length < 5);
        } else {
            return true;
        }
    }

    addHomeWork(cours: Cours) {
        if (cours?.id === undefined || cours?.id === null ||
            this.selectedparcours?.id === undefined || this.selectedparcours?.id === null) {
            this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'Please select a level and course !',
                life: 3000
            });
            return;
        }
        this.learnService.courseSelected = cours;
        this.learnService.parcourCurrent = this.selectedparcours;
        this.router.navigate(['admin/homeWork']);
    }

    deleteQst(qst: HomeWorkQST) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this question ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.homeWorkService.deleteQst(qst).subscribe(
                    data => {
                        this.qstList = this.qstList.filter(q => q.id !== qst.id);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Question has been deleted successfully.',
                            life: 3000
                        });
                    }, error => {
                        console.log(error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: error?.error?.message || 'Something went wrong, please try again.',
                            life: 3000
                        });
                    }
                );
            }
        });
    }
}
