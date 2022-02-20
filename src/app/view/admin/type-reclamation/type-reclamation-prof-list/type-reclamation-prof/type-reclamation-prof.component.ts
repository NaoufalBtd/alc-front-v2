import {Component, OnInit} from '@angular/core';
import {TypeReclamationProf} from '../../../../../controller/model/type-reclamation-prof.model';
import {TypeReclamationProfService} from '../../../../../controller/service/type-reclamation-prof.service';

@Component({
    selector: 'app-type-reclamation-prof',
    templateUrl: './type-reclamation-prof.component.html',
    styleUrls: ['./type-reclamation-prof.component.scss']
})
export class TypeReclamationProfComponent implements OnInit {

    constructor(private typeReclamationProfService: TypeReclamationProfService) {
    }

    ngOnInit(): void {
        this.typeReclamationProfService.findAll();
    }

    get displayTypeReclamationProf(): boolean {
        return this.typeReclamationProfService.displayTypeReclamationProf;
    }

    set displayTypeReclamationProf(value: boolean) {
        this.typeReclamationProfService.displayTypeReclamationProf = value;
    }

    get typeReclamationProf(): TypeReclamationProf {
        return this.typeReclamationProfService.typeReclamationProf;
    }

    set typeReclamationProf(value: TypeReclamationProf) {
        this.typeReclamationProfService.typeReclamationProf = value;
    }

    get typeReclamationProfList(): Array<TypeReclamationProf> {
        return this.typeReclamationProfService.typeReclamationProfList;
    }

    set typeReclamationProfList(value: Array<TypeReclamationProf>) {
        this.typeReclamationProfService.typeReclamationProfList = value;
    }

    public saveTypeReclamationProf() {
        this.typeReclamationProfService.saveTypeReclamationProf();
    }
}
