import { Component, OnInit } from '@angular/core';
import {PackStudentService} from '../../../../controller/service/pack-student.service';
import {PackStudent} from '../../../../controller/model/pack-student.model';

@Component({
  selector: 'app-home-three-courses',
  templateUrl: './home-three-courses.component.html',
  styleUrls: ['./home-three-courses.component.scss']
})
export class HomeThreeCoursesComponent implements OnInit {


  constructor(private packService: PackStudentService) { }

  get packs(): Array<PackStudent> {
    return this.packService.packs;
  }

  set packs(value: Array<PackStudent>) {
    this.packService.packs = value;
  }
  ngOnInit(): void {
    this.packService.findAllPacks();
  }

}
