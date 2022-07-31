import {Component, OnInit} from '@angular/core';
import {PackStudentService} from '../../../../../controller/service/pack-student.service';
import {PackStudent} from '../../../../../controller/model/pack-student.model';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-course-grid',
    templateUrl: './course-grid.component.html',
    styleUrls: ['./course-grid.component.scss']
})
export class CourseGridComponent implements OnInit {



    constructor(private packService: PackStudentService, private translate: TranslateService,
                private router: Router) {
    }

    get selectedCourse(): PackStudent {
        return this.packService.selectedCourse;
    }

    set selectedCourse(value: PackStudent) {
        this.packService.selectedCourse = value;
    }

    get packs(): Array<PackStudent> {
        return this.packService.packs;
    }

    set packs(value: Array<PackStudent>) {
        this.packService.packs = value;
    }

    ngOnInit(): void {
        this.packService.findAllPacks();
    }

    courseDetail(course: PackStudent): void {
        this.selectedCourse = course;
        this.router.navigate(['/course-details']);
    }
}
