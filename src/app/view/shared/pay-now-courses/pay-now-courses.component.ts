import {Component, OnInit} from '@angular/core';
import {PackStudent} from '../../../controller/model/pack-student.model';
import {PackStudentService} from '../../../controller/service/pack-student.service';

@Component({
    selector: 'app-pay-now-courses',
    templateUrl: './pay-now-courses.component.html',
    styleUrls: ['./pay-now-courses.component.scss']
})
export class PayNowCoursesComponent implements OnInit {

    constructor(private packService: PackStudentService) {
    }

    get selectedCourse(): PackStudent {
        return this.packService.selectedCourse;
    }

    set selectedCourse(value: PackStudent) {
        this.packService.selectedCourse = value;
    }

    ngOnInit(): void {
    }

}
