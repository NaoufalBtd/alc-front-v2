import {Component, OnInit} from '@angular/core';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {Router} from '@angular/router';
import {PriceService} from '../../../controller/service/price.service';

@Component({
    selector: 'app-pricing-table',
    templateUrl: './pricing-table.component.html',
    styleUrls: ['./pricing-table.component.scss']
})
export class PricingTableComponent implements OnInit {
    minPriceForGroup: number;
    minPriceForIndividual: number;
    constructor(private packService: PackStudentService,
                private priceService: PriceService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.priceService.getMaxPrice(true).subscribe(d => this.minPriceForGroup = Math.floor(d.price / d.nreHours));
        this.priceService.getMaxPrice(false).subscribe(d => this.minPriceForIndividual = Math.floor(d.price / d.nreHours));

    }

    get selectedOption(): boolean {
        return this.packService.selectedOption;
    }

    set selectedOption(value: boolean) {
        this.packService.selectedOption = value;
    }

    purchase(isGroup: boolean) {
        this.selectedOption = isGroup;
        this.router.navigate(['/etudiant/purchase']);
    }
}
