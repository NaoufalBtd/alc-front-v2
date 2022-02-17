import {Component, OnInit} from '@angular/core';
import {ReclamationProfComponent} from '../reclamation-prof.component';
import {ReclamationProfService} from '../../../../controller/service/reclamation-prof.service';
import {TypeReclamationProf} from '../../../../controller/model/type-reclamation-prof.model';
import {TypeReclamationProfService} from '../../../../controller/service/type-reclamation-prof.service';
import {ReclamationProf} from '../../../../controller/model/reclamation-prof.model';
import {LoginService} from '../../../../controller/service/login.service';

@Component({
    selector: 'app-reclamation-prof-create',
    templateUrl: './reclamation-prof-create.component.html',
    styleUrls: ['./reclamation-prof-create.component.scss']
})
export class ReclamationProfCreateComponent implements OnInit {


    ngOnInit(): void {
        this.typeReclamationProfService.findAll();
    }

    constructor(private reclamationProfService: ReclamationProfService, private typeReclamationProfService: TypeReclamationProfService, private serviceLogin: LoginService) {
    }

    get displayReclamationProf(): boolean {
        return this.reclamationProfService.displayReclamationProf;
    }

    set displayReclamationProf(value: boolean) {
        this.reclamationProfService.displayReclamationProf = value;
    }

    get typeReclamationProfList(): Array<TypeReclamationProf> {

        return this.typeReclamationProfService.typeReclamationProfList;
    }

    set typeReclamationProfList(value: Array<TypeReclamationProf>) {
        this.typeReclamationProfService.typeReclamationProfList = value;
    }

    get reclamationProf(): ReclamationProf {
        return this.reclamationProfService.reclamationProf;
    }

    set reclamationProf(value: ReclamationProf) {
        this.reclamationProfService.reclamationProf = value;
    }

    get reclamationProfList(): Array<ReclamationProf> {
        return this.reclamationProfService.reclamationProfList;
    }

    set reclamationProfList(value: Array<ReclamationProf>) {
        this.reclamationProfService.reclamationProfList = value;
    }

    public saveReclamationProf() {
        this.reclamationProf.prof = this.serviceLogin.getConnectedProf();
        this.reclamationProfService.saveReclamationProf();
    }

    hideCreateDialog() {
        this.displayReclamationProf = false;
    }
}
