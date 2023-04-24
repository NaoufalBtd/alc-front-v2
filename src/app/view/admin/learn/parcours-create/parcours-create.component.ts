import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {Parcours} from '../../../../controller/model/parcours.model';
import {Centre} from '../../../../controller/model/centre.model';

@Component({
    selector: 'app-parcours-create',
    templateUrl: './parcours-create.component.html',
    styleUrls: ['./parcours-create.component.scss']
})
export class ParcoursCreateComponent implements OnInit {
    // tslint:disable-next-line:max-line-length
    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
                private parcoursService: ParcoursService) {
    }

    get itemsscentre(): Array<Centre> {
        return this.parcoursService.itemsscentre;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set itemsscentre(value: Array<Centre>) {
        this.parcoursService.itemsscentre = value;
    }

    get selecteddparcours(): Parcours {
        return this.parcoursService.selecteddparcours;
    }

    set selecteddparcours(value: Parcours) {
        this.parcoursService.selecteddparcours = value;
    }

    get itemsparcours(): Array<Parcours> {
        return this.parcoursService.itemsparcours;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set itemsparcours(value: Array<Parcours>) {
        this.parcoursService.itemsparcours = value;
    }

    get createDialog(): boolean {
        return this.parcoursService.createDialog;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set createDialog(value: boolean) {
        this.parcoursService.createDialog = value;
    }

    get submitted(): boolean {
        return this.parcoursService.submitted;
    }

    set submitted(value: boolean) {
        this.parcoursService.submitted = value;
    }

    ngOnInit(): void {
        this.findAllCentre();
    }

    public hideCreateDialog() {
        this.createDialog = false;
        this.submitted = false;
    }

    public save() {
        console.log(this.selecteddparcours);
        this.submitted = true;
        this.parcoursService.save().subscribe(data => {
            this.parcoursService.findAllLevels().subscribe((levels) => {
                this.itemsparcours = levels;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Level Created',
                    life: 3000
                });
            });
        }, error => {
            console.log(error);
            this.messageService.add({
                severity: 'error',
                detail: error?.error?.message,
                life: 5000
            });
        });
        this.createDialog = false;
    }

    findAllCentre() {
        this.parcoursService.findAllCentre().subscribe(data => {
            this.itemsscentre = data;
        });
    }
}
