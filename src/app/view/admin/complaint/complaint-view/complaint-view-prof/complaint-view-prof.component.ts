import {Component, OnInit} from '@angular/core';
import {ReclamationProfService} from '../../../../../controller/service/reclamation-prof.service';

@Component({
    selector: 'app-complaint-view-prof',
    templateUrl: './complaint-view-prof.component.html',
    styleUrls: ['./complaint-view-prof.component.scss']
})
export class ComplaintViewProfComponent implements OnInit {

    constructor(private reclamationProfService: ReclamationProfService) {
    }

    ngOnInit(): void {
    }

    get displayReclamationViewProf(): boolean {
        return this.reclamationProfService.displayReclamationViewProf;
    }

    set displayReclamationViewProf(value: boolean) {
        this.reclamationProfService.displayReclamationViewProf = value;
    }

    hideCreateDialog() {
        this.displayReclamationViewProf=false;
    }
}
