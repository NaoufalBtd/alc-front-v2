import {Component, OnInit} from '@angular/core';
import {HomeWorkEtudiantServiceService} from '../../../../controller/service/home-work-etudiant-service.service';
import {HomeWOrkEtudiant} from '../../../../controller/model/home-work-etudiant.model';
import {ReponseEtudiantHomeWork} from '../../../../controller/model/reponse-etudiant-home-work.model';

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
