import {Component, OnInit} from '@angular/core';
import {Paiement} from '../../../controller/model/paiement.model';
import {PaiementService} from '../../../controller/service/paiement.service';
import {LoginService} from '../../../controller/service/login.service';

@Component({
    selector: 'app-paiementlist',
    templateUrl: './paiementlist.component.html',
    styleUrls: ['./paiementlist.component.scss']
})
export class PaiementlistComponent implements OnInit {
    get paiement(): Paiement {
        return this.paiementService.paiement;
    }

    set paiement(value: Paiement) {
        this.paiementService.paiement = value;
    }


    get paiementlist(): Array<Paiement> {
        return this.paiementService.paiementlist;

    }


    set paiementlist(value: Array<Paiement>) {
        this.paiementService.paiementlist = value;
    }


    constructor(private paiementService: PaiementService, private loginservice: LoginService) {
    }

    ngOnInit(): void {
        this.paiementService.findallPaimentByProfId(this.loginservice.prof.id).subscribe(
            data => {
                // @ts-ignore
                if (data != null) {
                    console.log('hahahahaha');
                    this.paiementlist = data;
                } else {
                    console.log('101010');

                }
            }
        );
    }

    get paiementsearch(): Paiement {
        return this.paiementService.paiementsearch;
    }

    public findAllByCriteria() {
        this.paiementService.findAllByCriteria();
    }

}
