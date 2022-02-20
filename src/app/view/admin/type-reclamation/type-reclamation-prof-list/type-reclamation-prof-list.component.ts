import {Component, OnInit} from '@angular/core';
import {TypeReclamationProfService} from '../../../../controller/service/type-reclamation-prof.service';
import {TypeReclamationProf} from '../../../../controller/model/type-reclamation-prof.model';

@Component({
    selector: 'app-type-reclamation-prof-list',
    templateUrl: './type-reclamation-prof-list.component.html',
    styleUrls: ['./type-reclamation-prof-list.component.scss']
})
export class TypeReclamationProfListComponent implements OnInit {
    constructor(private typeReclamationProfService: TypeReclamationProfService) {
    }

    ngOnInit(): void {
        this.typeReclamationProfService.findAll();

    }
    get typeReclamationProfList(): Array<TypeReclamationProf> {
        return this.typeReclamationProfService.typeReclamationProfList;
    }

    set typeReclamationProfList(value: Array<TypeReclamationProf>) {
        this.typeReclamationProfService.typeReclamationProfList = value;
    }

    showReclamation() {
        this.typeReclamationProfService.displayTypeReclamationProf = true;
    }
}
