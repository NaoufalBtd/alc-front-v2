import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {PackStudentService} from '../../../../../controller/service/pack-student.service';
import {PackStudent} from '../../../../../controller/model/pack-student.model';
import {Router} from '@angular/router';
import {PriceService} from '../../../../../controller/service/price.service';
import {Price} from '../../../../../controller/model/price.model';
import {LoginService} from '../../../../../controller/service/login.service';

@Component({
    selector: 'app-filter-courses',
    templateUrl: './filter-courses.component.html',
    styleUrls: ['./filter-courses.component.scss']
})
export class FilterCoursesComponent implements OnInit {
    prices: Array<Price> = new Array<Price>();
    priceList: Array<Price> = new Array<Price>();

    constructor(private translate: TranslateService,
                private router: Router,
                private login: LoginService,
                private priceService: PriceService,
                private messageService: MessageService,
                private packService: PackStudentService) {
    }

    get items(): MenuItem[] {
        return this.priceService.items;
    }

    set items(value: MenuItem[]) {
        this.priceService.items = value;
    }

    get groupOption(): string {
        return this.priceService.groupOption;
    }

    set groupOption(value: string) {
        this.priceService.groupOption = value;
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
        if (this.activeIndex === 0) {
            let group: string;
            let price: string;
            let level: string;
            if (this.translate.currentLang === 'en') {
                group = 'Individual or group';
                price = 'Choose price';
                level = 'Choose your level';

            } else if (this.translate.currentLang === 'fr') {
                group = 'Individual or group';
                price = 'Choose price';
                level = 'Choose your level';
            } else if (this.translate.currentLang === 'ar') {
                group = 'تفضيلات المجموعة( فردي او مجموعة)';
                price = ' السعر ';
                level = 'المستوى';
            }
            this.changeText(group, price, level);
        }
        this.priceService.getAll().subscribe(d => this.priceList = d);
    }

    private changeText(group: string, price: string, level: string) {
        this.items = [
            {
                label: group,

            },
            {
                label: price,

            },
            {
                label: level,

            }
        ];
    }

    chooseOption(type: string) {
        this.activeIndex = 1;
        this.items[0].label = type;
        this.groupOption = type;
        this.index = 1;
        if (type === 'GROUP') {
            this.prices = this.priceList.filter(p => p.forGroup === true);
        } else {
            this.prices = this.priceList.filter(p => p.forGroup === false);
        }
    }

    chooseType(type: string, price: number) {
        this.index = 3;
        this.activeIndex = 2;
        this.items[1].label = type;
        this.priceSelected = price;
    }

    indexChange() {
        this.index = this.activeIndex;
    }

    getCourse(level: string) {
        if (this.groupOption === 'GROUP') {
            this.packService.findPackByGroupOption(true).subscribe(data => {
                const course = data.filter(d => d.level.libelle === level && d.price?.price === this.priceSelected);
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
                const course = data.filter(d => d.level.libelle === level && d.price?.price === this.priceSelected);
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
