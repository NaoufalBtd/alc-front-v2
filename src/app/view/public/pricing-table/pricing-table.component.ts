import {Component, OnInit} from '@angular/core';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-pricing-table',
    templateUrl: './pricing-table.component.html',
    styleUrls: ['./pricing-table.component.scss']
})
export class PricingTableComponent implements OnInit {

    constructor(private packService: PackStudentService,
                private router: Router) {
    }

    ngOnInit(): void {
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
