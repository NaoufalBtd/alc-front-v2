import {Component, OnInit} from '@angular/core';
import {SessionCoursService} from '../../../controller/service/session-cours.service';
import {SessionCours} from '../../../controller/model/session-cours.model';
import {PaiementService} from '../../../controller/service/paiement.service';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-sessioncours',
    templateUrl: './sessioncours.component.html',
    styleUrls: ['./sessioncours.component.scss']
})
export class SessioncoursComponent implements OnInit {
    constructor(private sessionCoursService: SessionCoursService,
                private paiementService: PaiementService,
                private messageService: MessageService) {
    }

    get sessioncourssearch(): SessionCours {
        return this.sessionCoursService.sessioncourssearch;
    }

    set sessioncourssearch(value: SessionCours) {
        this.sessionCoursService.sessioncourssearch = value;
    }

    get sessioncours(): SessionCours {
        return this.sessionCoursService.sessioncours;
    }

    get sessioncourslist(): Array<SessionCours> {
        return this.sessionCoursService.sessioncourslist;

    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set sessioncours(value: SessionCours) {
        this.sessionCoursService.sessioncours = value;

    }


    // tslint:disable-next-line:adjacent-overload-signatures
    set sessioncourslist(value: Array<SessionCours>) {
        this.sessionCoursService.sessioncourslist = value;

    }


    ngOnInit(): void {
        this.sessionCoursService.findAllSessionCours();
    }

    public savepaiement(idsessioncours: number) {
        this.paiementService.savepaiement(idsessioncours);
    }

    public updatesessioncours(sessioncoursid: number) {
        this.sessionCoursService.updatesessioncours(sessioncoursid);
    }

    public findAllByCriteria() {
        this.sessionCoursService.findAllByCriteria();
        this.sessioncourssearch = null;
    }
}
