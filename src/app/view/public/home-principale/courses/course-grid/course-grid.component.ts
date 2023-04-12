import {Component, OnInit} from '@angular/core';
import {PackStudentService} from '../../../../../controller/service/pack-student.service';
import {PackStudent} from '../../../../../controller/model/pack-student.model';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {PriceService} from '../../../../../controller/service/price.service';
import {Price} from '../../../../../controller/model/price.model';

@Component({
    selector: 'app-course-grid',
    templateUrl: './course-grid.component.html',
    styleUrls: ['./course-grid.component.scss']
})
export class CourseGridComponent implements OnInit {
    isGroup: boolean = false;
    prices: Price[];
    selectedPriceForIndividual: Price;
    selectedPriceForGroup: Price;
    numberOfClasses = 48;


    constructor(private packService: PackStudentService,
                private priceService: PriceService,
                public translate: TranslateService,
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
        this.packService.findAll().subscribe(packs => this.packs = packs.filter(p => p.level?.id === 1));
        this.priceService.getAll().subscribe(prices => {
            this.selectedPriceForGroup = prices.filter(d => d.forGroup)[0];
            this.prices = prices.filter(d => d.forGroup === false);
            this.selectedPriceForIndividual = this.prices[this.prices.length - 1];
        });
    }

    getPercentage(price: Price): number {
        return Math.floor(100 - ((Number(price?.price) / Number(price?.oldPrice)) * 100));
    }

    getPrice(price: Price) {
        return Math.floor(price?.price / price?.nreCourse);
    }

    getOldPrice(price: Price) {
        return Math.floor(price?.oldPrice / price?.nreCourse);
    }

    passValue(value: any) {
        console.log(value);
        this.selectedPriceForIndividual = value;
    }

    subscribe(price: Price) {
        const pack: PackStudent = this.packs.filter(p => p.price?.id === price?.id)[0];
        if (pack !== null) {
            this.router.navigate(['/course-details/' + pack?.id]);
        }
    }

    changeValueOfRange() {
        if (this.numberOfClasses === 40) {
            this.numberOfClasses = 48;
        }
        console.log(this.prices);
        this.selectedPriceForIndividual = this.prices.filter(p => p.nreCourse === this.numberOfClasses)[0];
    }
}
