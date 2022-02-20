import {Component, OnInit} from '@angular/core';
import {ReclamationProf} from '../../../controller/model/reclamation-prof.model';
import {ReclamationProfService} from '../../../controller/service/reclamation-prof.service';

@Component({
    selector: 'app-complaint',
    templateUrl: './complaint.component.html',
    styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {

    constructor(private reclamationProfService: ReclamationProfService) {
    }

    ngOnInit(): void {
    }

    get reclamationProfView(): ReclamationProf {
        return this.reclamationProfService.reclamationProfView;
    }

    set reclamationProfView(value: ReclamationProf) {
        this.reclamationProfService.reclamationProfView = value;
    }

    get idReclamationProf(): number {
        return this.reclamationProfService.idReclamationProf;
    }

    set idReclamationProf(value: number) {
        this.reclamationProfService.idReclamationProf = value;
    }

    public findReclamationEtudiantById() {
        this.reclamationProfService.findReclamationEtudiantById(this.reclamationProfService.idReclamationProf);
    }

}
