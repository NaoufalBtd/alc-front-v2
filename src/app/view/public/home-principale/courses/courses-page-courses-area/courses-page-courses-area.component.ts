import { Component, OnInit } from '@angular/core';
import {PackStudentService} from '../../../../../controller/service/pack-student.service';

@Component({
  selector: 'app-courses-page-courses-area',
  templateUrl: './courses-page-courses-area.component.html',
  styleUrls: ['./courses-page-courses-area.component.scss']
})
export class CoursesPageCoursesAreaComponent implements OnInit {
  selectedOption: boolean = true;

  constructor(private packStudentService: PackStudentService) { }

  ngOnInit(): void {
  }

  getCourses(b: boolean) {
    this.selectedOption  = b;
    this.packStudentService.findPackIndividualOrgroupe(b);
  }
}
