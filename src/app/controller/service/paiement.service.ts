import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {Paiement} from '../model/paiement.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SessionCoursService} from './session-cours.service';

@Injectable({
    providedIn: 'root'
})
export class PaiementService {
    constructor(private http: HttpClient,
                private messageService: MessageService,
                private sessionCoursService: SessionCoursService) {
    }

    private adminUrl = environment.adminUrl;
    private profUrl = environment.profUrl;
    private adminUrlpaiement = environment.profUrl + 'paiement/';

    private _paiement: Paiement;
    private _paiementsearch: Paiement;
    private _paiementlist: Array<Paiement>;


    get paiementsearch(): Paiement {
        if (this._paiementsearch == null) {
            this._paiementsearch = new Paiement();
        }
        return this._paiementsearch;
    }

    set paiementsearch(value: Paiement) {
        this._paiementsearch = value;
    }

    get paiement(): Paiement {
        if (this._paiement == null) {
            this._paiement = new Paiement();
        }
        return this._paiement;
    }

    set paiement(value: Paiement) {
        this._paiement = value;
    }

    get paiementlist(): Array<Paiement> {
        if (this._paiementlist == null) {
            this._paiementlist = new Array<Paiement>();
        }
        return this._paiementlist;
    }

    set paiementlist(value: Array<Paiement>) {
        this._paiementlist = value;
    }

    public savepaiement(idsessioncours: number) {
        this.http.get(this.adminUrlpaiement + 'save/' + idsessioncours).subscribe(
            data => {
                if (data === 1) {
                    console.log(data);
                    this.sessionCoursService.findAllSessionCours();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Sessions payed',
                        life: 3000
                    });
                    console.log(data);
                }
            }
        );
    }

    public findallPaiment() {
        return this.http.get<Array<Paiement>>(this.adminUrlpaiement).subscribe(
            data => {
                this.paiementlist = data;
            }
        );
    }

    public findallPaimentByProfId(idprof: number): Observable<Array<Paiement>> {
        return this.http.get<Array<Paiement>>(this.adminUrlpaiement + idprof);
    }

    public findAllByCriteria() {
        this.http.post<Array<Paiement>>(this.adminUrl + 'paiement/ByCriteria', this.paiementsearch).subscribe(
            data => {
                if (data != null) {
                    this.paiementlist = data;
                    this.paiementsearch = null;
                }
            }
        );
    }
}
