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
import {GroupeEtudiantDetail} from '../model/groupe-etudiant-detail.model';
import {WorkloadBonusProf} from '../model/workload-bonus-prof.model';
import {ClassAverageBonusProf} from '../model/class-average-bonus-prof.model';
import {GroupeEtudiant} from '../model/groupe-etudiant.model';

@Injectable({
    providedIn: 'root'
})
export class SessionCoursService {
    private adminUrl = environment.adminUrl;
    private adminUrlGroupeEtudiantDetail = environment.adminUrl + 'groupeEtudiantDetail/';
    private adminUrlsessioncours = environment.adminUrl + 'session/';
    private adminUrletudiantCours = environment.adminUrl + 'etudiantCours/';
    private adminUrletudiant = environment.etudiantUrl + 'session/';
    private profUrlSession = environment.profUrl + 'session/';
    private _sessioncours: SessionCours;
    private _sessioncourssearch: SessionCours;
    private _sessioncourslist: Array<SessionCours>;
    private _sessioncourslistProf: Array<SessionCours>;
    private _selectionsessioncourslist: Array<SessionCours>;
    public _testsessioncours: boolean = false;
    public _idgroup: number;
    private _groupeEtudiantDetailList: Array<GroupeEtudiantDetail>;
    private adminUrlpaiement = environment.adminUrl + 'paiement/';
    private adminUrlWorkloadBonusProf = environment.adminUrl + 'workloadBonusProf/';
    private adminUrlclassAverageBonusProf = environment.adminUrl + 'classAverageBonusProf/';
    private _workloadBonusProf: Array<WorkloadBonusProf>;
    private _classAverageBonusProf: Array<ClassAverageBonusProf>;

    constructor(private http: HttpClient,
                private messageService: MessageService,
                private router: Router,
                private review: EtudiantReviewService) {
    }


    get workloadBonusProf(): Array<WorkloadBonusProf> {
        if (this._workloadBonusProf == null) {
            this._workloadBonusProf = new Array<WorkloadBonusProf>();
        }
        return this._workloadBonusProf;
    }

    set workloadBonusProf(value: Array<WorkloadBonusProf>) {
        this._workloadBonusProf = value;
    }

    get classAverageBonusProf(): Array<ClassAverageBonusProf> {
        if (this._classAverageBonusProf == null) {
            this._classAverageBonusProf = new Array<ClassAverageBonusProf>();
        }
        return this._classAverageBonusProf;
    }

    set classAverageBonusProf(value: Array<ClassAverageBonusProf>) {
        this._classAverageBonusProf = value;
    }

    get selectionsessioncourslist(): Array<SessionCours> {
        if (this._selectionsessioncourslist == null) {
            this._selectionsessioncourslist = new Array<SessionCours>();
        }
        return this._selectionsessioncourslist;
    }

    set selectionsessioncourslist(value: Array<SessionCours>) {
        this._selectionsessioncourslist = value;
    }

    get groupeEtudiantDetailList(): Array<GroupeEtudiantDetail> {
        if (this._groupeEtudiantDetailList == null) {
            this._groupeEtudiantDetailList = new Array<GroupeEtudiantDetail>();
        }
        return this._groupeEtudiantDetailList;
    }

    set groupeEtudiantDetailList(value: Array<GroupeEtudiantDetail>) {
        this._groupeEtudiantDetailList = value;
    }

    get sessioncourslistProf(): Array<SessionCours> {
        if (this._sessioncourslistProf == null) {
            this._sessioncourslistProf = new Array<SessionCours>();
        }
        return this._sessioncourslistProf;
    }

    set sessioncourslistProf(value: Array<SessionCours>) {
        this._sessioncourslistProf = value;
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
                if (data > 0) {
                    this.coursecomplited = false;
                } else {
                    this.coursecomplited = true;
                }
            }
        );
    }

    public saveetudiantcours(idprof: number, idetudiant: number, idcours: number) {
        console.log(this.adminUrletudiantCours + idprof + '/' + idetudiant + '/' + idcours);

        this.http.get(this.adminUrletudiantCours + idprof + '/' + idetudiant + '/' + idcours).subscribe(
            data => {
                console.log('tzwji bya');
                if (data > 0) {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Info',
                        detail: 'You Start This Course',
                        life: 3000
                    });
                    this.savesessioncours(idprof, idetudiant, idcours);
                    this.router.navigate(['/etudiant/etudiant-simulate-sections']);
                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Info',
                        detail: 'This Course is already completed',
                        life: 3000
                    });
                    this.savesessioncours(idprof, idetudiant, idcours);

                    this.router.navigate(['/etudiant/etudiant-simulate-sections']);

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
        console.log('sallllalaladkgberbgkbbgkerbgd');
        console.log(this.sessioncourssearch.payer);
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

    // @ts-ignore
    public findByProfId(idprof: number): number {
        this.http.get<Array<SessionCours>>(this.profUrlSession + 'prof/id/' + idprof).subscribe(
            data => {
                this.sessioncourslistProf = data;
                return data;
            }
        );
    }

    // this._idgroup + '/' + idprof + '/' + idcours
    public saveSessionCoursForGroupEtudiant(idprof: number, idcours: number) {
        this.http.get(this.profUrlSession + idprof + '/' + this._idgroup + '/' + idcours).subscribe(
            data => {

            }
        );
    }

    public findAllGroupeEtudiantDetailByGroupeEtudiantId(id: number) {
        this.http.get<Array<GroupeEtudiantDetail>>(this.adminUrlGroupeEtudiantDetail + 'GroupeEtudiantId/' + id).subscribe(
            data => {
                this.groupeEtudiantDetailList = data;
            }
        );
    }

    public savepaiement(idsessioncours: number) {
        this.http.get(this.adminUrlpaiement + idsessioncours).subscribe(
            data => {
                if (data === 1) {
                    console.log(data);
                    this.findAllSessionCours();
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

    public saveListpaiement() {
        this.http.post(this.adminUrlpaiement + 'saveList', this.selectionsessioncourslist).subscribe(
            data => {
                if (data === 1) {
                    console.log(data);
                    this.findAllSessionCours();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'List of Sessions payed',
                        life: 3000
                    });
                    console.log(data);
                }
            }
        );
    }

    findWorkloadBonusProfBySessionCoursId(id: number) {
        this.http.get<Array<WorkloadBonusProf>>(this.adminUrlWorkloadBonusProf + 'id/' + id).subscribe(
            data => {
                this.workloadBonusProf = data;
            }
        );
    }

    findClassAverageBonusProfBySessionCoursId(id: number) {
        this.http.get<Array<ClassAverageBonusProf>>(this.adminUrlclassAverageBonusProf + 'id/' + id).subscribe(
            data => {
                this.classAverageBonusProf = data;
            }
        );
    }

    public saveSessionCours(sessionCours: SessionCours) {
        this.http.post(this.profUrlSession, sessionCours).subscribe(data => {
            this.messageService.add({severity: 'success', summary: ' ', life: 5000, detail: 'Lesson is over', sticky: true});
        }, error => {
            this.messageService.add({
                severity: 'error',
                summary: ' ',
                detail: 'We got same problems, please contact administration !',
                sticky: true
            });
        });

    }

    public findSessionCoursByGroupeEtudiantId(groupeEtudiant: GroupeEtudiant): Observable<Array<SessionCours>> {
        return this.http.get<Array<SessionCours>>(this.profUrlSession + 'groupeEtudiant/id/' + groupeEtudiant.id);
    }
}
