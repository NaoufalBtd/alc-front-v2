import {Component, OnInit} from '@angular/core';
import {ReclamationProfService} from '../../../../../controller/service/reclamation-prof.service';
import {ReclamationProf} from '../../../../../controller/model/reclamation-prof.model';

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
        this.displayReclamationViewProf = false;
    }

    get idReclamationProf(): number {
        return this.reclamationProfService.idReclamationProf;
    }

    set idReclamationProf(value: number) {
        this.reclamationProfService.idReclamationProf = value;
    }

    get reclamationProfView(): ReclamationProf {

        return this.reclamationProfService.reclamationProfView;
    }

    set reclamationProfView(value: ReclamationProf) {
        this.reclamationProfService.reclamationProfView = value;
    }

}
