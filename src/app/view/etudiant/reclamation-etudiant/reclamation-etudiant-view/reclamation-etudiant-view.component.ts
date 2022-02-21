import {Component, OnInit} from '@angular/core';
import {ReclamationEtudiantService} from '../../../../controller/service/reclamation-etudiant.service';
import {ReclamationEtudiant} from '../../../../controller/model/reclamation-etudiant.model';

@Component({
    selector: 'app-reclamation-etudiant-view',
    templateUrl: './reclamation-etudiant-view.component.html',
    styleUrls: ['./reclamation-etudiant-view.component.scss']
})
export class ReclamationEtudiantViewComponent implements OnInit {

    constructor(private reclamationEtudiantService: ReclamationEtudiantService) {
    }

    ngOnInit(): void {
    }

    get displayReclamationViewEtudiant(): boolean {
        return this.reclamationEtudiantService.displayReclamationViewEtudiant;
    }

    set displayReclamationViewEtudiant(value: boolean) {
        this.reclamationEtudiantService.displayReclamationEtudiant = value;
    }

    get reclamationEtudiantView(): ReclamationEtudiant {
        return this.reclamationEtudiantService.reclamationEtudiantView;
    }

    set reclamationEtudiantView(value: ReclamationEtudiant) {
        this.reclamationEtudiantService.reclamationEtudiantView = value;
    }

    hide() {
        this.reclamationEtudiantService.displayReclamationViewEtudiant = false;
    }

    public findReclamationEtudiantById(id: number, idprof: number) {
        this.reclamationEtudiantService.findReclamationEtudiantById(id, idprof);
    }
}
