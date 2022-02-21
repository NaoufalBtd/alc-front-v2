import {Component, OnInit} from '@angular/core';
import {ReclamationProfService} from '../../../controller/service/reclamation-prof.service';
import {ReclamationProf} from '../../../controller/model/reclamation-prof.model';
import {LoginService} from '../../../controller/service/login.service';

@Component({
    selector: 'app-reclamation-prof',
    templateUrl: './reclamation-prof.component.html',
    styleUrls: ['./reclamation-prof.component.scss']
})
export class ReclamationProfComponent implements OnInit {


    ngOnInit(): void {
        //this.reclamationProfService.findAll();
        this.reclamationProfService.findReclamationProfByProfId(this.serviceLogin.getConnectedProf().id);
    }

    constructor(private reclamationProfService: ReclamationProfService, private serviceLogin: LoginService) {
    }

    get displayReclamationProf(): boolean {
        return this.reclamationProfService.displayReclamationProf;
    }

    set displayReclamationProf(value: boolean) {
        this.reclamationProfService.displayReclamationProf = value;
    }

    get reclamationProfList(): Array<ReclamationProf> {
        return this.reclamationProfService.reclamationProfList;
    }

    set reclamationProfList(value: Array<ReclamationProf>) {
        this.reclamationProfService.reclamationProfList = value;
    }

    showReclamationProf() {
        this.reclamationProfService.displayReclamationProf = true;
    }

    showReclamationProfView(idreclamationProf: number, idprof: number) {
        this.reclamationProfService.displayReclamationViewProf = true;
        this.findReclamationProfByIdAndProfId(idreclamationProf, idprof);

    }

    public findReclamationProfByIdAndProfId(idreclamationProf: number, idprof: number) {
        this.reclamationProfService.findReclamationProfByIdAndProfId(idreclamationProf, idprof);
    }

}
