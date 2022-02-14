import {Component, OnInit} from '@angular/core';
import {HomeWorkEtudiantServiceService} from '../../../../controller/service/home-work-etudiant-service.service';
import {HomeWOrkEtudiant} from '../../../../controller/model/home-work-etudiant.model';
import {HomeWorkQST} from '../../../../controller/model/home-work-qst.model';
import {HomeWorkReponse} from '../../../../controller/model/home-work-reponse.model';
import {MenuItem, TreeNode} from 'primeng/api';
import {HoweWorkQSTReponse} from '../../../../controller/model/howe-work-qstreponse.model';
import {ReponseEtudiantHomeWork} from '../../../../controller/model/reponse-etudiant-home-work.model';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {DictionaryService} from '../../../../controller/service/dictionary.service';
import {Section} from '../../../../controller/model/section.model';
import {Dictionary} from '../../../../controller/model/dictionary.model';
import {HomeWork} from '../../../../controller/model/home-work.model';
import {HomeworkService} from '../../../../controller/service/homework.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home-work-result',
    templateUrl: './home-work-result.component.html',
    styleUrls: ['./home-work-result.component.scss']
})
export class HomeWorkResultComponent implements OnInit {

    public homeWorkEtudiantReponseList: Array<ReponseEtudiantHomeWork> = new Array<ReponseEtudiantHomeWork>();
    displayDetailsDialog: boolean;

    constructor(
        public homeWorkEtudiantservice: HomeWorkEtudiantServiceService,) {
    }


    get homeWorkEtudiantList(): Array<HomeWOrkEtudiant> {
        return this.homeWorkEtudiantservice.homeWorkEtudiantList;
    }

    ngOnInit(): void {
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log(this.homeWorkEtudiantList);
    }


    showDetails(homeWork: HomeWOrkEtudiant) {
        this.homeWorkEtudiantReponseList = new Array<ReponseEtudiantHomeWork>();
        console.log(homeWork);
        this.homeWorkEtudiantservice.findHomeWorkEtudiantReponseByHomeWorkEtudiantId(homeWork.id).subscribe(homeWorkRps => {
            this.homeWorkEtudiantReponseList = homeWorkRps;
            console.log(homeWorkRps);
            this.displayDetailsDialog = true;
        }, error => {
            console.log(error);
        });

    }
}
