import {Component, OnInit} from '@angular/core';
import {ReclamationProfService} from '../../../../../controller/service/reclamation-prof.service';
import {ReclamationEtudiant} from '../../../../../controller/model/reclamation-etudiant.model';
import {ReclamationEtudiantService} from '../../../../../controller/service/reclamation-etudiant.service';

@Component({
    selector: 'app-complaint-view-etudiant',
    templateUrl: './complaint-view-etudiant.component.html',
    styleUrls: ['./complaint-view-etudiant.component.scss']
})
export class ComplaintViewEtudiantComponent implements OnInit {

    constructor(private reclamationEtudiantService: ReclamationEtudiantService) {
    }

    ngOnInit(): void {
    }

    get displayReclamationViewEtudiant(): boolean {
        return this.reclamationEtudiantService.displayReclamationViewEtudiant;
    }

    set displayReclamationViewEtudiant(value: boolean) {
        this.reclamationEtudiantService.displayReclamationViewEtudiant = value;
    }
}
