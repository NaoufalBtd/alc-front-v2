import {Component, OnInit} from '@angular/core';
import {PackStudent} from '../../../controller/model/pack-student.model';
import {PackStudentService} from '../../../controller/service/pack-student.service';

@Component({
  selector: 'app-pay-now',
  templateUrl: './pay-now.component.html',
  styleUrls: ['./pay-now.component.scss']
})
export class PayNowComponent implements OnInit {

  constructor(private packService: PackStudentService) { }

  ngOnInit(): void {
    console.log(this.selectedCourse);
  }

  get selectedCourse(): PackStudent {
    return this.packService.selectedCourse;
  }

}
