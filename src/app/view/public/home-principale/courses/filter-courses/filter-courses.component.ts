import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {PackStudentService} from '../../../../../controller/service/pack-student.service';
import {PackStudent} from '../../../../../controller/model/pack-student.model';
import {Router} from '@angular/router';
import {PriceService} from '../../../../../controller/service/price.service';
import {Price} from '../../../../../controller/model/price.model';
import {LoginService} from '../../../../../controller/service/login.service';
import {ParcoursService} from '../../../../../controller/service/parcours.service';
import {Parcours} from '../../../../../controller/model/parcours.model';

@Component({
    selector: 'app-filter-courses',
    templateUrl: './filter-courses.component.html',
    styleUrls: ['./filter-courses.component.scss']
})
export class FilterCoursesComponent implements OnInit {


    constructor(private translate: TranslateService,
                private router: Router,
                private login: LoginService,
                private levelSerivce: ParcoursService,
                private priceService: PriceService,
                private messageService: MessageService,
                private packService: PackStudentService) {
    }


    get prices(): Array<Price> {
        return this.priceService.prices;
    }

    set prices(value: Array<Price>) {
        this.priceService.prices = value;
    }

    get priceList(): Array<Price> {
        return this.priceService.priceList;
    }

    set priceList(value: Array<Price>) {
        this.priceService.priceList = value;
    }

    get levels(): Array<Parcours> {
        return this.priceService.levels;
    }

    set levels(value: Array<Parcours>) {
        this.priceService.levels = value;
    }

    get groupOption(): string {
        return this.priceService.groupOption;
    }

    set groupOption(value: string) {
        this.priceService.groupOption = value;
    }

    get priceLib(): string {
        return this.priceService.priceLib;
    }

    set priceLib(value: string) {
        this.priceService.priceLib = value;
    }

    get priceSelected(): number {
        return this.priceService.priceSelected;
    }

    set priceSelected(value: number) {
        this.priceService.priceSelected = value;
    }

    get index(): number {
        return this.priceService.index;
    }

    set index(value: number) {
        this.priceService.index = value;
    }

    get activeIndex(): number {
        return this.priceService.activeIndex;
    }

    set activeIndex(value: number) {
        this.priceService.activeIndex = value;
    }

    get selectedCourse(): PackStudent {
        return this.packService.selectedCourse;
    }

    set selectedCourse(value: PackStudent) {
        this.packService.selectedCourse = value;
    }

    ngOnInit(): void {
        this.levelSerivce.findAllLevels().subscribe(d => this.priceService.levels = d);
        this.priceService.getAll().subscribe(d => this.priceService.priceList = d);
    }

    chooseOption(type: string) {
        this.activeIndex = 1;
        this.groupOption = type;
        this.index = 1;
        if (type === 'GROUP') {
            this.priceService.prices = this.priceService.priceList.filter(p => p.forGroup === true);
        } else {
            this.priceService.prices = this.priceService.priceList.filter(p => p.forGroup === false);
        }
    }

    chooseType(type: string, price: number) {
        this.index = 3;
        this.activeIndex = 2;
        this.priceSelected = price;
        this.priceLib = type;
        console.log(this.priceSelected);
    }

    indexChange(index: number) {
        if (index >= this.activeIndex) {
            return;
        }

        this.activeIndex = index;
    }

    getCourse(level: string) {
        if (this.groupOption === 'GROUP') {
            this.packService.findPackByGroupOption(true).subscribe(data => {
                const course = data.filter(d => d.price?.price === this.priceSelected);
                if (course.length > 0) {
                    this.courseDetail(course[0]);
                } else {
                    this.messageService.add({
                        severity: 'info',
                        detail: 'نعتذر لا توجد نتيجة، المرجو اعادة المخاولة او تغيير تفضيلات السعر و المجموعة.',
                        life: 4000
                    });
                }
            });
        } else {
            this.packService.findPackByGroupOption(false).subscribe(data => {
                const course = data.filter(d => d.level.libelle === level);
                if (course.length > 0) {
                    this.courseDetail(course[0]);
                } else {
                    this.messageService.add({
                        severity: 'info',
                        detail: 'نعتذر لا توجد نتيجة، المرجو اعادة المخاولة او تغيير تفضيلات السعر و المجموعة.',
                        life: 4000
                    });
                }
            });
        }
    }

    courseDetail(course: PackStudent): void {
        this.selectedCourse = course;
        if (this.login.getConnecteUser() !== null) {
            this.router.navigate(['/our-packs/' + course.id]);
        } else {
            this.router.navigate(['/course-details']);
        }
    }
}
