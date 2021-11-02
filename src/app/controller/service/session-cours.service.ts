/* tslint:disable:variable-name */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SessionCours} from '../model/session-cours.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Etudiant} from '../model/etudiant.model';
import {Prof} from '../model/prof.model';
import {EtudiantCours} from '../model/etudiant-cours.model';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {EtudiantReviewService} from './etudiant-review.service';

@Injectable({
    providedIn: 'root'
})
export class SessionCoursService {
    private adminUrl = environment.adminUrl;
    private adminUrlsessioncours = environment.adminUrl + 'session/';
    private adminUrletudiantCours = environment.adminUrl + 'etudiantCours/';
    private adminUrletudiant = environment.etudiantUrl + 'session/';
    private _sessioncours: SessionCours;
    private _sessioncourssearch: SessionCours;
    private _sessioncourslist: Array<SessionCours>;
    public _testsessioncours: boolean = false;

    constructor(private http: HttpClient,
                private messageService: MessageService,
                private router: Router,
                private review: EtudiantReviewService) {
    }

    get sessioncourssearch(): SessionCours {
        if (this._sessioncourssearch == null) {
            this._sessioncourssearch = new SessionCours();
        }
        return this._sessioncourssearch;
    }

    set sessioncourssearch(value: SessionCours) {
        this._sessioncourssearch = value;
    }

    get coursecomplited(): boolean {
        return this.review.coursecomplited;
    }

    set coursecomplited(value: boolean) {
        this.review.coursecomplited = value;
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

    get sessioncourslist(): Array<SessionCours> {
        if (this._sessioncourslist == null) {
            this._sessioncourslist = new Array<SessionCours>();
        }
        return this._sessioncourslist;
    }

    set sessioncourslist(value: Array<SessionCours>) {
        this._sessioncourslist = value;
    }

    public findAllSessionCours() {
        return this.http.get<Array<SessionCours>>(this.adminUrlsessioncours).subscribe(
            data => {
                if (data != null) {
                    this.sessioncourslist = data;
                }
            }
        );
    }


    public savesessioncours(profid: number, etudiantid: number, coursid: number) {
        this.http.get(this.adminUrletudiant + profid + '/' + etudiantid + '/' + coursid).subscribe(
            data => {
                if (data === 1) {
                    this.coursecomplited = false;
                    //    this.router.navigate(['/etudiant/etudiant-simulate-sections']);
                } else if (data === 2) {
                    this.coursecomplited = true;
                    //     this.router.navigate(['/etudiant/etudiant-simulate-sections']);

                } else {

                }

            }
        );
    }

    public saveetudiantcours(idprof: number, idetudiant: number, idcours: number) {
        this.http.get(this.adminUrletudiantCours + idprof + '/' + idetudiant + '/' + idcours).subscribe(
            data => {
                if (data > 0) {
                    console.log('tzwji bya');
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Info',
                        detail: 'You Start This Course',
                        life: 3000
                    });
                    this.savesessioncours(idprof, idetudiant, idcours);
                    this.router.navigate(['/etudiant/etudiant-simulate-sections']);
                } else {
                    console.log('tele9ni');

                    this.findSessionCoursByCoursIdAndEtudiantIdAndProfId(idcours, idetudiant, idprof);
                }


            }
        );
    }

    public updatesessioncours(sessioncoursid: number) {
        this.http.get(this.adminUrlsessioncours + 'update/' + sessioncoursid).subscribe(
            data => {
                if (data > 0) {
                    this.findAllSessionCours();
                }
            }
        );
    }

    public findAllByCriteria() {
        this.http.post<Array<SessionCours>>(this.adminUrlsessioncours + 'allByCriteria', this.sessioncourssearch).subscribe(
            data => {
                if (data != null) {
                    this.sessioncourslist = data;
                }
            }
        );
    }

    public findSessionCoursByCoursIdAndEtudiantIdAndProfId(idcours: number, idetudiant: number, idprof: number) {
        this.http.get<SessionCours>(this.adminUrletudiant + 'idc/' + idcours + '/ids/' + idetudiant + '/idp/' + idprof).subscribe(
            data => {
                if (data.payer) {
                 /*   this.messageService.add({
                        severity: 'info',
                        summary: 'Info',
                        detail: 'You need to contact your admin in order to start this cours again',
                        life: 3000
                    });*/
                    /*
                    <p-dialog header="Header" [(visible)]="displayBasic" [style]="{width: '50vw'}" [baseZIndex]="10000">
    <p>You need to contact your admin in order to start this cours again</p>

</p-dialog>
                    */
                    this._testsessioncours = true;

                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Info',
                        detail: 'This course is already Completed',
                        life: 3000
                    });
                    this.savesessioncours(idprof, idetudiant, idcours);
                    /*routerLink="/etudiant/etudiant-simulate-sections"*/
                    this.router.navigate(['/etudiant/etudiant-simulate-sections']);
                }
            }
        );
    }

}
