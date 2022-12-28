import {Component, OnInit} from '@angular/core';
import {Price} from '../../../controller/model/price.model';
import {PriceService} from '../../../controller/service/price.service';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
    selector: 'app-create-price',
    templateUrl: './create-price.component.html',
    styleUrls: ['./create-price.component.scss']
})
export class CreatePriceComponent implements OnInit {
    prices: Array<Price> = new Array<Price>();
    showAddDialog: boolean;
    price: Price = new Price();

    constructor(private priceService: PriceService,
                private confirmation: ConfirmationService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.priceService.getAll().subscribe(data => this.prices = data);
    }

    edit(price: Price) {
        this.price = price;
        this.showAddDialog = true;
    }


    add() {
        this.price = new Price();
        this.showAddDialog = true;
    }

    save() {
        this.priceService.save(this.price).subscribe(
            data => {
                this.showAddDialog = false;
                if (this.price?.id === 0 || this.price?.id === undefined || this.price?.id === null) {
                    this.prices.push({...data});
                    this.messageService.add({
                        severity: 'success',
                        detail: 'price Created',
                        life: 3000
                    });
                } else {
                    for (let i = 0; i < this.prices.length; i++) {
                        if (this.prices[i].id === this.price.id) {
                            this.prices[i] = data;
                        }
                    }
                    this.messageService.add({
                        severity: 'info',
                        detail: 'price updated',
                        life: 3000
                    });
                }
            }, error => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    detail: error?.error?.message || 'Something went wrong, please try again.',
                    life: 3000
                });
            }
        );
    }
}
