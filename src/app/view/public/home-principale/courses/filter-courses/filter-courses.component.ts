import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {PackStudentService} from '../../../../../controller/service/pack-student.service';
import {PackStudent} from '../../../../../controller/model/pack-student.model';
import {Router} from '@angular/router';
import {PriceService} from '../../../../../controller/service/price.service';

@Component({
    selector: 'app-filter-courses',
    templateUrl: './filter-courses.component.html',
    styleUrls: ['./filter-courses.component.scss']
})
export class FilterCoursesComponent implements OnInit {
    constructor(private translate: TranslateService,
                private router: Router,
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
        if (type === 'GROUP') {
            this.index = 2;
        } else {
            this.index = 1;
        }
    }

    chooseType(type: string, price: number) {
        this.index = 3;
        this.activeIndex = 2;
        this.items[1].label = type;
        this.priceSelected = price;
    }

    indexChange() {
        if (this.activeIndex === 1) {
            if (this.groupOption === 'GROUP') {
                this.index = 2;
            } else {
                this.index = 1;
            }
        } else {
            this.index = this.activeIndex;
        }
    }

    getCourse(level: string) {
        if (this.groupOption === 'GROUP') {
            this.packService.findPackByGroupOption(true).subscribe(data => {
                const course = data.filter(d => d.level.libelle === level && d.prix === this.priceSelected);
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
                const course = data.filter(d => d.level.libelle === level && d.prix === this.priceSelected);
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
        this.router.navigate(['/course-details']);
    }
}
