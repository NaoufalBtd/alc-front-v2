import {Component, OnInit} from '@angular/core';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {PackStudent} from '../../../controller/model/pack-student.model';
import {MessageService} from 'primeng/api';
import {Parcours} from '../../../controller/model/parcours.model';
import {ParcoursService} from '../../../controller/service/parcours.service';

@Component({
    selector: 'app-pack-student',
    templateUrl: './pack-student.component.html',
    styleUrls: ['./pack-student.component.scss']
})
export class PackStudentComponent implements OnInit {

    public displayPackIndividual = false;
    public displayPackgroupe = false;
    public displayPackIndividualforUpdate = false;
    public displayPackgroupeforUpdate = false;
    parcours: Array<Parcours> = new Array<Parcours>();

    constructor(public packStudentServie: PackStudentService, private parcoursService: ParcoursService, private messageService: MessageService) {
    }

    get packstudentIndividial(): PackStudent {
        return this.packStudentServie.packstudentIndividial;
    }


    get packstudentgroupe(): PackStudent {

        return this.packStudentServie.packstudentgroupe;
    }


    get packstudentIndividialList(): Array<PackStudent> {

        return this.packStudentServie.packstudentIndividialList;
    }

    set packstudentIndividialList(value: Array<PackStudent>) {
        this.packStudentServie.packstudentIndividialList = value;
    }

    get packstudentgroupeList(): Array<PackStudent> {

        return this.packStudentServie.packstudentgroupeList;
    }

    set packstudentgroupeList(value: Array<PackStudent>) {
        this.packStudentServie.packstudentgroupeList = value;
    }

    showindividual() {
        if (this.displayPackgroupe === true) {
            this.displayPackgroupe = false;
        }
        this.displayPackIndividual = true;
    }

    showgroupeforUpdate(c: PackStudent) {
        if (this.displayPackIndividualforUpdate === true) {
            this.displayPackIndividualforUpdate = false;
        }
        this.displayPackgroupeforUpdate = true;
        this.packStudentServie.packstudentIndividial = c;
    }

    showindividualforupdate(c: PackStudent) {
        if (this.displayPackgroupeforUpdate === true) {
            this.displayPackgroupeforUpdate = false;
        }
        this.displayPackIndividualforUpdate = true;
        this.packStudentServie.packstudentIndividial = c;
    }

    showgroupe() {
        if (this.displayPackIndividual === true) {
            this.displayPackIndividual = false;
        }
        this.displayPackgroupe = true;
    }

    ngOnInit(): void {
        this.packStudentServie.findPackIndividualOrgroupe(true);
        this.packStudentServie.findPackIndividualOrgroupe(false);
        this.parcoursService.FindAllParcours().subscribe(
            data => {
                this.parcours = data;
            }
        );
    }

    saveIndividualPack() {
        this.packStudentServie.packstudentIndividial.forGroupe = false;
        this.packStudentServie.savePack();
    }

    savegroupePack() {
        this.packstudentIndividial.forGroupe = true;
        this.packStudentServie.savePack();
        this.displayPackIndividual = false;
        this.displayPackgroupe = false;
        this.displayPackIndividualforUpdate = false;
        this.displayPackgroupeforUpdate = false;
    }

    updatepack() {
        this.packStudentServie.updatePack();
        this.displayPackIndividual = false;
        this.displayPackgroupe = false;
        this.displayPackIndividualforUpdate = false;
        this.displayPackgroupeforUpdate = false;
    }

    deletebycode(code: string) {
        this.packStudentServie.deletebycode(code);
    }

    findBycreteria(b: boolean) {
        this.packStudentServie.packstudentVo.forGroupe = b;
        this.packStudentServie.findbycretira(b);
    }
}
