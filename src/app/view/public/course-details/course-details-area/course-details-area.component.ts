import {Component, OnInit} from '@angular/core';
// import Swiper core and required modules
import SwiperCore, {Autoplay, Pagination} from 'swiper';
import {PackStudent} from '../../../../controller/model/pack-student.model';
import {PackStudentService} from '../../../../controller/service/pack-student.service';
import {Cours} from '../../../../controller/model/cours.model';
import {ParcoursService} from '../../../../controller/service/parcours.service';

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

    constructor(private packService: PackStudentService, private parcoursService: ParcoursService,
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
        return (Number(this.selectedCourse.prix) / Number(this.selectedCourse.oldPrice)) * 100;
    }
}
