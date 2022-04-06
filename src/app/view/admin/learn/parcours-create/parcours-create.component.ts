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
    constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private service: ParcoursService) {
    }

    get itemsscentre(): Array<Centre> {
        return this.service.itemsscentre;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set itemsscentre(value: Array<Centre>) {
        this.service.itemsscentre = value;
    }

    get selecteddparcours(): Parcours {
        return this.service.selecteddparcours;
    }

    set selecteddparcours(value: Parcours) {
        this.service.selecteddparcours = value;
    }

    get itemsparcours(): Array<Parcours> {
        return this.service.itemsparcours;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set itemsparcours(value: Array<Parcours>) {
        this.service.itemsparcours = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get submitted(): boolean {
        return this.service.submitted;
    }

    set submitted(value: boolean) {
        this.service.submitted = value;
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
        console.log('hani kandkhl lhnaya');
        this.submitted = true;
        this.service.save().subscribe(data => {
            console.log('hani kandkhl lsubscribe');
            if ( data === 1){
                console.log('hani kandkhl l data positive');
                // tslint:disable-next-line:no-shadowed-variable
                this.service.init().subscribe(data => {
                    this.itemsparcours = data;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Parcours Created',
                        life: 3000
                    });
                });
            }else if (data === -2){
                console.log('l courses makaytcreyawch kamlin');
            }else if (data === -1){
                console.log('centre kaydouz null');
            }
        });
        this.createDialog = false;
    }

    findAllCentre() {
        this.service.findAllCentre().subscribe(data => {
            this.itemsscentre = data;
        });
    }
}
