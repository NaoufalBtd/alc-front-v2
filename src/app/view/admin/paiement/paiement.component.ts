import {Component, OnInit} from '@angular/core';
import {Prof} from '../../../controller/model/prof.model';
import {MessageService, SelectItem} from 'primeng/api';
import {ProfessorService} from '../../../controller/service/professor.service';
import {SessionCoursService} from '../../../controller/service/session-cours.service';
import {HttpClient} from '@angular/common/http';
import {PaiementService} from '../../../controller/service/paiement.service';
import {SessionCours} from '../../../controller/model/session-cours.model';
import {Paiement} from "../../../controller/model/paiement.model";

@Component({
    selector: 'app-paiement',
    templateUrl: './paiement.component.html',
    styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

    val: number;
    profs: Prof[];
    prof: Prof;
    duree = 0;
    namecours: string;
    items: SelectItem[];
    item: string;

    constructor(private service: ProfessorService,
                private messageService: MessageService,
                private sessionService: SessionCoursService,
                private http: HttpClient,
                private paiementservice: PaiementService) {
        this.items = [];
        this.items.push({label: 'true', value: 'true'}, {label: 'false', value: 'false'});
    }

    get paiement(): Paiement {
        return this.paiementservice.paiement;
    }

    get paiementlist(): Array<Paiement> {
        return this.paiementservice.paiementlist;

    }

    ngOnInit(): void {
        this.paiementservice.findallPaiment();
    }

    get paiementsearch(): Paiement {
        return this.paiementservice.paiementsearch;
    }

    public findAllByCriteria() {
        this.paiementservice.findAllByCriteria();
    }
}

