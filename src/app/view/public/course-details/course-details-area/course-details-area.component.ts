import {Component, OnInit} from '@angular/core';
// import Swiper core and required modules
import SwiperCore, {Autoplay, Pagination} from 'swiper';
import {PackStudent} from '../../../../controller/model/pack-student.model';
import {PackStudentService} from '../../../../controller/service/pack-student.service';
import {Cours} from '../../../../controller/model/cours.model';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../../controller/service/login.service';

// install Swiper modules
SwiperCore.use([Pagination, Autoplay]);

@Component({
    selector: 'app-course-details-area',
    templateUrl: './course-details-area.component.html',
    styleUrls: ['./course-details-area.component.scss']
})
export class CourseDetailsAreaComponent implements OnInit {
    courses: Array<Cours> = new Array<Cours>();
    nombreCours = 5;

    courseData: Array<PackStudent> = new Array<PackStudent>();

    constructor(private packService: PackStudentService,
                private translate: TranslateService,
                private router: Router,
                private login: LoginService,
                private parcoursService: ParcoursService,
    ) {
    }

    get packs(): Array<PackStudent> {
        return this.packService.packs;
    }


    get selectedCourse(): PackStudent {
        return this.packService.selectedCourse;
    }

    set selectedCourse(value: PackStudent) {
        this.packService.selectedCourse = value;
    }

    ngOnInit(): void {
        this.findCourses();
        this.packService.findPackIndividualOrgroupe(this.selectedCourse.forGroupe);
    }

    findCourses() {
        this.parcoursService.FindCoursByParcours(this.selectedCourse.level.id).subscribe(
            data => {
                this.courses = data;
                console.log(this.courses);
            }
        );
    }

    getPercentage(): number {
        return (100 - ((Number(this.selectedCourse.price?.price) / Number(this.selectedCourse.oldPrice)) * 100));
    }

    pay() {
        if (this.login.getConnecteUser() === null) {
            this.router.navigate(['/payment']);
        } else {
            this.router.navigate(['/pay']);
        }
    }
}
