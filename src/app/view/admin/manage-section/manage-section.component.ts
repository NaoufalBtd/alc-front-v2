import {Component, OnInit} from '@angular/core';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {Parcours} from '../../../controller/model/parcours.model';
import {Cours} from '../../../controller/model/cours.model';
import {Section} from '../../../controller/model/section.model';
import {CategorieSection} from '../../../controller/model/categorie-section.model';
import {MessageService} from 'primeng/api';
import {QuizService} from '../../../controller/service/quiz.service';
import {QuizEtudiantService} from '../../../controller/service/quiz-etudiant.service';
import {Quiz} from '../../../controller/model/quiz.model';
import {Router} from '@angular/router';
import {LearnService} from '../../../controller/service/learn.service';

@Component({
    selector: 'app-manage-section',
    templateUrl: './manage-section.component.html',
    styleUrls: ['./manage-section.component.scss']
})
export class ManageSectionComponent implements OnInit {
    public parcours: Array<Parcours> = new Array<Parcours>();
    public cours: Array<Cours> = new Array<Cours>();
    public sections: Array<Section> = new Array<Section>();
    public sectionSelected: Section = new Section();
    public section: Section = new Section();
    visibleSidebar: boolean;
    rows = 10;
    first = 0;

    imgUrl: string;
    showEditDialog: boolean;
    categorieSections: Array<CategorieSection> = new Array<CategorieSection>();

    constructor(private parcoursService: ParcoursService,
                private quizEtudiantService: QuizEtudiantService,
                private quizService: QuizService,
                private learnService: LearnService,
                private router: Router,
                private messageService: MessageService) {
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

    set parcourCurrent(value: Parcours) {
        this.learnService.parcourCurrent = value;
    }




    set sectionCurrent(value: Section) {
        this.learnService.sectionCurrent = value;
    }



    set courseCurrent(value: Cours) {
        this.learnService.courseCurrent = value;
    }


    ngOnInit(): void {
        this.selectedparcours = new Parcours();
        this.selectedcours = new Cours();
        this.parcoursService.FindAllParcours().subscribe(
            data => {
                this.parcours = data;
            }
        );
    }

    getCours() {
        this.parcourCurrent = this.selectedparcours;
        console.log(this.selectedparcours.id);
        if (this.selectedparcours.id !== undefined) {
            this.parcoursService.afficheCours().subscribe(
                data => {
                    this.cours = data;
                });
        }
    }

    getSections() {
        this.courseCurrent = this.selectedcours;
        console.log(this.selectedcours.id);
        if (this.selectedcours.id !== undefined) {
            if (this.selectedparcours.id !== undefined) {
                this.parcoursService.affichelistSection().subscribe(
                    data => {
                        this.sections = data;
                    });
            }
        }
    }

    showImage(imgUrl: string) {
        this.imgUrl = imgUrl;
        this.visibleSidebar = true;
    }

    showEditDialogFct(section: Section) {
        this.sectionSelected = section;
        this.findAllCategorie();
        this.showEditDialog = true;
        console.log(section);
    }

    findAllCategorie() {
        this.parcoursService.findAllCategorieSection().subscribe(data => {
            this.categorieSections = data;
        });
    }

    findSection() {
        this.section.cours = this.selectedcours;
        this.section.cours.parcours = this.selectedparcours;
        console.log(this.section);
        this.parcoursService.findByCriteria(this.section).subscribe(data => {
            this.sections = data;
        }, error => {
            console.log(error);
        });
    }

    save() {
        this.showEditDialog = false;
        this.parcoursService.updateSection(this.sectionSelected).subscribe(data => {
            this.messageService.add({
                severity: 'info',
                summary: 'Successful',
                detail: 'Section Updated',
                life: 3000
            });
        }, error => {
            console.log(error);
            this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'Error to update section please try again !',
                life: 3000
            });

        });

    }

    isValidated(section: Section): boolean {
        if (section.urlImage.length < 5 && section.urlVideo.length < 5) {
            return false;
        } else {
            return section.contenu.length >= 5;
        }
    }

    get selectedQuiz(): Quiz {
        return this.quizEtudiantService.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.quizEtudiantService.selectedQuiz = value;
    }

    showQuiz(section: Section) {
        this.sectionCurrent = section;
        this.quizEtudiantService.findQuizBySectionId(section).subscribe(
            data => {
                this.selectedQuiz = data;
                if (this.selectedQuiz.section.id == null) {
                    this.router.navigate(['admin/quiz-create']);
                } else {
                    this.quizService.refQuiz = this.selectedQuiz.ref;
                    console.log(this.quizService.refQuiz);
                    this.router.navigate(['admin/quiz-preview-prof']);
                }
            }, error => {
                // tslint:disable-next-line:no-unused-expression
                this.selectedQuiz == null;
            });
    }
}