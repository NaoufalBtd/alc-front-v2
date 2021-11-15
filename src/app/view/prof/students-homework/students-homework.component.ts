import { Component, OnInit } from '@angular/core';
import {HomeWOrkEtudiant} from "../../../controller/model/home-work-etudiant.model";
import {StudenthomeworkForProfService} from "../../../controller/service/studenthomework-for-prof.service";

@Component({
  selector: 'app-students-homework',
  templateUrl: './students-homework.component.html',
  styleUrls: ['./students-homework.component.scss']
})
export class StudentsHomeworkComponent implements OnInit {

  constructor(private homeworkprofservice: StudenthomeworkForProfService) { }

  get HomeWorkEtudiantVo(): HomeWOrkEtudiant {

    return this.homeworkprofservice.HomeWorkEtudiantVo;
  }

  set HomeWorkEtudiantVo(value: HomeWOrkEtudiant) {
    this.homeworkprofservice.HomeWorkEtudiantVo = value;
  }
  get studentHomeWorkList(): Array<HomeWOrkEtudiant> {
    return this.homeworkprofservice.studentHomeWorkList;
  }

  set studentHomeWorkList(value: Array<HomeWOrkEtudiant>) {
    this.homeworkprofservice.studentHomeWorkList = value;
  }
  ngOnInit(): void {
    this.homeworkprofservice.findByProf();
  }

  public findByVo(){
    this.homeworkprofservice.findByVo();
  }
}
