import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionCours} from "../model/session-cours.model";
import {environment} from "../../../environments/environment";
import {MessageService} from "primeng/api";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PaiementService {

    constructor(private http: HttpClient, private messageService: MessageService) {
    }

    private _sessioncours: SessionCours;
    private _listsessioncours: Array<SessionCours>;
    private adminurl = environment.adminUrl;

    get sessioncours(): SessionCours {
        if (this._sessioncours == null) {
            this._sessioncours = new SessionCours();
        }
        return this._sessioncours;
    }

    set sessioncours(value: SessionCours) {
        this._sessioncours = value;
    }

    get listsessioncours(): Array<SessionCours> {
        if (this._listsessioncours == null) {
            this._listsessioncours = new Array<SessionCours>();
        }
        return this._listsessioncours;
    }

    set listsessioncours(value: Array<SessionCours>) {
        this._listsessioncours = value;
    }

    public findallsessioncours() {
        this.http.get<Array<SessionCours>>(this.adminurl + 'session/').subscribe(
            data => {
                if (data != null) {
                    this.listsessioncours = data;
                }
            }
        );
    }

    public savepaiement(id: number): Observable<number> {
        // @ts-ignore
      return   this.http.post(this.adminurl + 'paiement/' + id).subscribe(
            data => {
                // @ts-ignore
                if (data > 0) {
                    console.log('3a');
                    this.findallsessioncours();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Quiz Created',
                        life: 3000
                    });
                }

            }
        );
    }
}
