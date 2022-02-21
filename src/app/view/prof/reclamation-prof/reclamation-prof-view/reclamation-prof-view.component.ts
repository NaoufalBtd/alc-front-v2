import {Component, OnInit} from '@angular/core';
import {ReclamationProf} from '../../../../controller/model/reclamation-prof.model';
import {ReclamationProfService} from '../../../../controller/service/reclamation-prof.service';

@Component({
    selector: 'app-reclamation-prof-view',
    templateUrl: './reclamation-prof-view.component.html',
    styleUrls: ['./reclamation-prof-view.component.scss']
})
export class ReclamationProfViewComponent implements OnInit {

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

    get reclamationProfView(): ReclamationProf {
        return this.reclamationProfService.reclamationProfView;
    }

    set reclamationProfView(value: ReclamationProf) {
        this.reclamationProfService.reclamationProfView = value;
    }

    hide() {
        this.displayReclamationViewProf = false;
    }

    public findReclamationProfByIdAndProfId(idreclamationProf: number, idprof: number) {
        this.reclamationProfService.findReclamationProfByIdAndProfId(idreclamationProf, idprof);
    }

}
