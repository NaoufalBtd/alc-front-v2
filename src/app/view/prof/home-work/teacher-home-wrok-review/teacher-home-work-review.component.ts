import {Component, Input, OnInit} from '@angular/core';
import {ReponseEtudiantHomeWork} from '../../../../controller/model/reponse-etudiant-home-work.model';
import {HomeWorkEtudiantServiceService} from '../../../../controller/service/home-work-etudiant-service.service';
import {HomeWOrkEtudiant} from '../../../../controller/model/home-work-etudiant.model';

@Component({
  selector: 'app-teacher-home-wrok-review',
  templateUrl: './teacher-home-work-review.component.html',
  styleUrls: ['./teacher-home-work-review.component.scss']
})
export class TeacherHomeWorkReviewComponent implements OnInit {


  public homeWorkEtudiantReponseList: Array<ReponseEtudiantHomeWork> = new Array<ReponseEtudiantHomeWork>();
  displayDetailsDialog: boolean;

  constructor(
      public homeWorkEtudiantservice: HomeWorkEtudiantServiceService ) {
  }


  get homeWorkEtudiantList(): Array<HomeWOrkEtudiant> {
    return this.homeWorkEtudiantservice.homeWorkEtudiantList;
  }
  @Input()
  set homeWorkEtudiantList(value: Array<HomeWOrkEtudiant>) {
    this.homeWorkEtudiantservice.homeWorkEtudiantList = value;
  }

  ngOnInit(): void {
    console.log(this.homeWorkEtudiantList);
  }


  showDetails(homeWork: HomeWOrkEtudiant) {
    this.homeWorkEtudiantReponseList = new Array<ReponseEtudiantHomeWork>();
    console.log(homeWork);
    this.homeWorkEtudiantservice.findHomeWorkEtudiantReponseByHomeWorkEtudiantId(homeWork.id).subscribe(homeWorkRps => {
      console.log(homeWorkRps);
      this.homeWorkEtudiantReponseList = homeWorkRps;
      console.log(homeWorkRps);
      this.displayDetailsDialog = true;
    }, error => {
      console.log(error);
    });

  }
}
