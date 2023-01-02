import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PackStudent} from '../../../../controller/model/pack-student.model';
import {Router} from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import {PackStudentService} from '../../../../controller/service/pack-student.service';
import {PriceService} from '../../../../controller/service/price.service';

@Component({
    selector: 'app-prices',
    templateUrl: './prices.component.html',
    styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {
    indexOfGroup = 0;
    isIndividual = true;

    constructor(public translate: TranslateService,
                private router: Router,
                private priceService: PriceService,
                private messageService: MessageService,
                private packService: PackStudentService) {
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

    get priceLib(): string {
        return this.priceService.priceLib;
    }

    set priceLib(value: string) {
        this.priceService.priceLib = value;
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


    get items(): MenuItem[] {
        return this.priceService.items;
    }

    set items(value: MenuItem[]) {
        this.priceService.items = value;
    }

    ngOnInit(): void {
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

    tabChange(groupOption: string) {
        this.groupOption = groupOption;
        if (groupOption === 'INDIVIDUAL') {
            this.indexOfGroup = 0;
            this.isIndividual = true;
        } else {
            this.indexOfGroup = 1;
            this.isIndividual = false;
        }
    }


    chooseType(type: string, price: number) {
        this.index = 3;
        this.activeIndex = 2;
        this.items[1].label = type;
        this.priceLib = type;
        if (this.indexOfGroup === 0) {
            this.items[0].label = 'INDIVIDUAL';
        } else {
            this.items[0].label = 'GROUP';
        }
        this.priceSelected = price;
        this.router.navigate(['/courses']);
    }


}
