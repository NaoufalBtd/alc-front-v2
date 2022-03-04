import {Component, OnInit} from '@angular/core';
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

@Component({
    selector: 'app-home-work-review',
    templateUrl: './home-work-review.component.html',
    styleUrls: ['./home-work-review.component.scss']
})
export class HomeWorkReviewComponent implements OnInit {
    selectedStudent: Etudiant = new Etudiant();
    question: HomeWorkQST = new HomeWorkQST();
    homeWorkEtudiantList: Array<HomeWOrkEtudiant> = new Array<HomeWOrkEtudiant>();
    homeWorkEtudiantSelected: HomeWOrkEtudiant = new HomeWOrkEtudiant();
    reponse: ReponseEtudiantHomeWork = new ReponseEtudiantHomeWork();
    noteProf: HomeWorkReponse = new HomeWorkReponse();
    showResult: boolean;

    constructor(private homeWorkService: HomeworkService,
                private parcoursService: ParcoursService,
                private learnService: LearnService,
                private messageService: MessageService,
                public loginService: LoginService,
                private homeWorkEtudiantService: HomeWorkEtudiantServiceService) {
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

    ngOnInit(): void {
        this.homeWorkService.findhomeworkbyCoursId(this.selectedcours).subscribe(homeWork => {
            console.log(homeWork);
            this.homeWorkSelected = homeWork.filter(h => h.libelle === 'WRITE IT UP')[0];
            if (this.homeWorkSelected.id !== undefined && this.homeWorkSelected.id !== null && this.homeWorkSelected.id !== 0) {
                this.homeWorkService.findHomeWorkEtudiantByHomeWorkId(this.homeWorkSelected).subscribe(homeWorkEtudiantData => {
                    console.log(homeWorkEtudiantData);
                    this.homeWorkEtudiantList = homeWorkEtudiantData;
                });
                this.homeWorkEtudiantService.findQuestions(this.homeWorkSelected).subscribe(data2 => {
                    this.question = data2[0];
                });
            }
        });
    }


    getResult() {
        console.log(this.homeWorkEtudiantList);
        console.log(this.selectedStudent);
        this.homeWorkEtudiantSelected = this.homeWorkEtudiantList.filter(h => h.etudiant.id === this.selectedStudent.id)[0];
        if (this.homeWorkEtudiantSelected.id !== undefined) {
            this.homeWorkEtudiantService.findHomeWorkEtudiantReponseByHomeWorkEtudiantId(this.homeWorkEtudiantSelected.id).subscribe(
                data => {
                    this.reponse = data[0];
                });
        }
        this.showResult = true;
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
