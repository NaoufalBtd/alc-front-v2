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
    private _searchsession: SessionCours;


    get searchsession(): SessionCours {
        if (this._searchsession == null) {
            this._searchsession = new SessionCours();
        }
        return this._searchsession;
    }

    set searchsession(value: SessionCours) {
        this._searchsession = value;
    }

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

    public savepaiement(id: number) {
        // @ts-ignore
        return this.http.post(this.adminurl + 'paiement/' + id).subscribe(
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

    public findByCriteriaCoursName(namecourse: string) {
        this.searchsession.cours.libelle = namecourse;
        this.http.post(this.adminurl + 'session/bycoursname', this.searchsession).subscribe(
            data => {
                if (data != null) {
                    console.log(data);
                    console.log("haha");
                    // @ts-ignore
                    this.listsessioncours = data;
                    console.log(this.listsessioncours);
                } else {
                    this.listsessioncours = null;
                }

            }, error => {
                console.log(error);
            }
        );
    }

    public findByCriteriaProfName(profname: string) {
        this.searchsession.prof.nom = profname;
        this.http.post(this.adminurl + 'session/byprofname', this.searchsession).subscribe(
            data => {
                if (data != null) {
                    console.log(data);
                    console.log("haha");
                    // @ts-ignore
                    this.listsessioncours = data;
                    console.log(this.listsessioncours);
                } else {
                    this.listsessioncours = null;
                }

            }, error => {
                console.log(error);
            }
        );
    }

    public findByCriteriaStudentName(student: string) {
        this.searchsession.etudiant.nom = student;
        this.http.post(this.adminurl + 'session/bystudentname', this.searchsession).subscribe(
            data => {
                if (data != null) {
                    console.log(data);
                    console.log("haha");
                    // @ts-ignore
                    this.listsessioncours = data;
                    console.log(this.listsessioncours);
                } else {
                    this.listsessioncours = null;
                }

            }, error => {
                console.log(error);
            }
        );
    }

    public findByCriteriaReference(reference: string) {
        this.searchsession.reference = reference;
        this.http.post(this.adminurl + 'session/byReference', this.searchsession).subscribe(
            data => {
                if (data != null) {
                    console.log(data);
                    console.log("haha");
                    // @ts-ignore
                    this.listsessioncours = data;
                    console.log(this.listsessioncours);
                } else {
                    this.listsessioncours = null;
                }

            }, error => {
                console.log(error);
            }
        );
    }

    public findByCriteriaDate(date: Date) {
        this.searchsession.dateFin = date;
        this.http.post(this.adminurl + 'session/bydate', this.searchsession).subscribe(
            data => {
                if (data != null) {
                    console.log(data);
                    console.log("haha");
                    // @ts-ignore
                    this.listsessioncours = data;
                    console.log(this.listsessioncours);
                } else {
                    this.listsessioncours = null;
                }

            }, error => {
                console.log(error);
            }
        );
    }
}
