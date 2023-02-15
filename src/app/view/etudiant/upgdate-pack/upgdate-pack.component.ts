import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../controller/service/login.service';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {PriceService} from '../../../controller/service/price.service';
import {MessageService} from 'primeng/api';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {Price} from '../../../controller/model/price.model';
import {Parcours} from '../../../controller/model/parcours.model';

@Component({
    selector: 'app-upgdate-pack',
    templateUrl: './upgdate-pack.component.html',
    styleUrls: ['./upgdate-pack.component.scss']
})
export class UpgdatePackComponent implements OnInit {

    activeIndex = 0;
    prices: Array<Price> = new Array<Price>();
    priceList: Array<Price> = new Array<Price>();
    levels: Array<Parcours> = new Array<Parcours>();
    private priceSelected: Price;

    constructor(public translate: TranslateService,
                private router: Router,
                private login: LoginService,
                private levelSerivce: ParcoursService,
                private priceService: PriceService,
                private messageService: MessageService,
                private packService: PackStudentService) {
    }

    get selectedOption(): boolean {
        return this.packService.selectedOption;
    }

    set selectedOption(value: boolean) {
        this.packService.selectedOption = value;
    }

    ngOnInit(): void {
        this.getPrices();
        this.levelSerivce.findAllLevels().subscribe(d => this.levels = d);
    }

    private getPrices() {
        this.priceService.getAll().subscribe(d => {
            this.priceList = d;
            this.prices = this.priceList.filter(c => c.forGroup === this.selectedOption);
        });
    }


    chooseType(price: Price) {
        this.priceSelected = price;
        this.activeIndex = 1;
    }

    optionChange(isGroup: boolean) {
        this.selectedOption = isGroup;
        this.activeIndex = 0;
        this.getPrices();
    }

    getCourse(level: Parcours) {
        this.packService.findPackByGroupOption(this.selectedOption).subscribe(data => {
            const course = data.filter(d => d.price?.id === this.priceSelected.id &&
                d.level.id === level.id);
            if (course.length > 0) {
                this.router.navigate(['etudiant/pack/' + course[0].id]);
            } else {
                this.messageService.add({
                    severity: 'info',
                    detail: 'نعتذر لا توجد نتيجة، المرجو اعادة المخاولة او تغيير تفضيلات السعر و المجموعة.',
                    life: 7000
                });
            }
        });
    }
}
