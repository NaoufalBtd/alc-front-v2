import {Component, OnInit} from '@angular/core';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {PackStudent} from '../../../controller/model/pack-student.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Parcours} from '../../../controller/model/parcours.model';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {Price} from '../../../controller/model/price.model';
import {PriceService} from '../../../controller/service/price.service';

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
    prices: Array<Price> = new Array<Price>();
    priceList: Array<Price> = new Array<Price>();

    constructor(public packStudentServie: PackStudentService,
                private parcoursService: ParcoursService,
                private priceService: PriceService,
                private confirmation: ConfirmationService,
                private messageService: MessageService) {
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
        this.priceList = this.prices.filter(p => p.forGroup === false);
    }

    showgroupeforUpdate(c: PackStudent) {
        if (this.displayPackIndividualforUpdate === true) {
            this.displayPackIndividualforUpdate = false;
        }
        this.displayPackgroupeforUpdate = true;
        this.priceList = this.prices.filter(p => p.forGroup === true);
        this.packStudentServie.packstudentIndividial = c;
    }

    showindividualforupdate(c: PackStudent) {
        if (this.displayPackgroupeforUpdate === true) {
            this.displayPackgroupeforUpdate = false;
        }
        this.displayPackIndividualforUpdate = true;
        this.priceList = this.prices.filter(p => p.forGroup === false);
        this.packStudentServie.packstudentIndividial = c;
    }

    showgroupe() {
        if (this.displayPackIndividual === true) {
            this.displayPackIndividual = false;
        }
        this.displayPackgroupe = true;
        this.priceList = this.prices.filter(p => p.forGroup === true);
    }

    ngOnInit(): void {
        this.packStudentServie.findPackIndividualOrgroupe(true);
        this.packStudentServie.findPackIndividualOrgroupe(false);
        this.parcoursService.FindAllParcours().subscribe(
            data => {
                this.parcours = data;
            }
        );
        this.priceService.getAll().subscribe(d => this.prices = d);
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

    deletebycode(pack: PackStudent) {
        this.confirmation.confirm({
            message: 'Are you sure you want to delete this pack ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.packStudentServie.deleteById(pack);
            }
        });
    }

    findBycreteria(b: boolean) {
        this.packStudentServie.packstudentVo.forGroupe = b;
        this.packStudentServie.findbycretira(b);
    }

}
