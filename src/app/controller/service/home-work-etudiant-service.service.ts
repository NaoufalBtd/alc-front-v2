import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HomeWork} from '../model/home-work.model';
import {HomeWOrkEtudiant} from '../model/home-work-etudiant.model';
import {ReponseEtudiantHomeWork} from '../model/reponse-etudiant-home-work.model';
import {Observable} from 'rxjs';
import {HomeWorkQST} from '../model/home-work-qst.model';
import {HoweWorkQSTReponse} from '../model/howe-work-qstreponse.model';
import {TreeNode} from 'primeng/api';
import {LoginService} from './login.service';
import {Environment} from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import {environment} from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class HomeWorkEtudiantServiceService {

    private etudianturl = environment.etudiantUrl;
    private _homeWorkEtudiant: HomeWOrkEtudiant;
    private _homeWorkEtudiantList: Array<HomeWOrkEtudiant> = new Array<HomeWOrkEtudiant>();
    private _HomeWorkEtudiantReponse: ReponseEtudiantHomeWork;
    private _homeWork: HomeWork;
    private _homeWorkQuestion: HomeWorkQST;
    private _homeWorkQuestionList: Array<HomeWorkQST>;
    private _homeWorkQstReponses: Array<HoweWorkQSTReponse>;
    private _etudiantReponse: HoweWorkQSTReponse;
    private _QstReponseetudiant: Array<ReponseEtudiantHomeWork>;
    private _nodes: TreeNode[];
    public result: number = 0;
    public isUpdate = false;

    constructor(private http: HttpClient, private loginservice: LoginService) {
    }


    get nodes(): TreeNode[] {
        return this._nodes;
    }

    set nodes(value: TreeNode[]) {
        this._nodes = value;
    }

    get QstReponseetudiant(): Array<ReponseEtudiantHomeWork> {
        if (this._QstReponseetudiant == null) {
            this._QstReponseetudiant = new Array<ReponseEtudiantHomeWork>();
        }
        return this._QstReponseetudiant;
    }

    set QstReponseetudiant(value: Array<ReponseEtudiantHomeWork>) {
        this._QstReponseetudiant = value;
    }

    get etudiantReponse(): HoweWorkQSTReponse {
        if (this._etudiantReponse == null) {
            this._etudiantReponse = new HoweWorkQSTReponse();
        }
        return this._etudiantReponse;
    }

    set etudiantReponse(value: HoweWorkQSTReponse) {
        this._etudiantReponse = value;
    }

    get homeWorkQstReponses(): Array<HoweWorkQSTReponse> {
        if (this._homeWorkQstReponses == null) {
            this._homeWorkQstReponses = new Array<HoweWorkQSTReponse>();
        }
        return this._homeWorkQstReponses;
    }

    set homeWorkQstReponses(value: Array<HoweWorkQSTReponse>) {
        this._homeWorkQstReponses = value;
    }

    get homeWorkQuestionList(): Array<HomeWorkQST> {
        if (this._homeWorkQuestionList == null) {
            this._homeWorkQuestionList = new Array<HomeWorkQST>();
        }
        return this._homeWorkQuestionList;
    }

    set homeWorkQuestionList(value: Array<HomeWorkQST>) {
        this._homeWorkQuestionList = value;
    }

    get homeWorkQuestion(): HomeWorkQST {
        if (this._homeWorkQuestion == null) {
            this._homeWorkQuestion = new HomeWorkQST();
        }
        return this._homeWorkQuestion;
    }

    set homeWorkQuestion(value: HomeWorkQST) {
        this._homeWorkQuestion = value;
    }

    get homeWorkEtudiant(): HomeWOrkEtudiant {
        if (this._homeWorkEtudiant == null) {
            this._homeWorkEtudiant = new HomeWOrkEtudiant();
        }
        return this._homeWorkEtudiant;
    }

    set homeWorkEtudiant(value: HomeWOrkEtudiant) {
        this._homeWorkEtudiant = value;
    }

    get HomeWorkEtudiantReponse(): ReponseEtudiantHomeWork {
        if (this._HomeWorkEtudiantReponse == null) {
            this._HomeWorkEtudiantReponse = new ReponseEtudiantHomeWork();
        }
        return this._HomeWorkEtudiantReponse;
    }

    set HomeWorkEtudiantReponse(value: ReponseEtudiantHomeWork) {
        this._HomeWorkEtudiantReponse = value;
    }

    get homeWork(): HomeWork {
        if (this._homeWork == null) {
            this._homeWork = new HomeWork();
        }
        return this._homeWork;
    }


    get homeWorkEtudiantList(): Array<HomeWOrkEtudiant> {
        if (this._homeWorkEtudiantList == null) {
            this._homeWorkEtudiantList = new Array<HomeWOrkEtudiant>();
        }
        return this._homeWorkEtudiantList;
    }

    set homeWorkEtudiantList(value: Array<HomeWOrkEtudiant>) {
        this._homeWorkEtudiantList = value;
    }

    set homeWork(value: HomeWork) {
        this._homeWork = value;
    }

    public findQuestions(homeWork: HomeWork): Observable<Array<HomeWorkQST>> {
        return this.http.get<Array<HomeWorkQST>>(this.etudianturl + 'homeWorkQST/homework/' + homeWork.id);
    }

    public save(homeWorkEtudiant: HomeWOrkEtudiant): Observable<HomeWOrkEtudiant> {
        console.log('hani f save t service');
        return this.http.post<HomeWOrkEtudiant>(this.etudianturl + 'homeWorkEtudiant/', homeWorkEtudiant);
    }


    public saveHomeWorkEtudiantReponse(reponseEtudiantHomeWork: ReponseEtudiantHomeWork): Observable<ReponseEtudiantHomeWork> {
        console.log(reponseEtudiantHomeWork);
        return this.http.post<ReponseEtudiantHomeWork>(this.etudianturl + 'reponseEtudiantHomeWork/', reponseEtudiantHomeWork);
    }

    public update(): Observable<number> {
        return this.http.post<number>(this.etudianturl + 'homeWorkEtudiant/update', this.homeWorkEtudiant);
    }

    public findbyetudiantIdAndHomeWorkID(homeWork: HomeWork): Observable<Array<HomeWOrkEtudiant>> {
        return this.http.get<Array<HomeWOrkEtudiant>>(this.etudianturl + 'homeWorkEtudiant/etudiant/id/' + this.loginservice.etudiant.id + '/homeWork/id/' + homeWork.id);
    }

    public findReponsesByQuestionId(id: number): Observable<Array<HoweWorkQSTReponse>> {
        return this.http.get<Array<HoweWorkQSTReponse>>(this.etudianturl + 'homeWorkqstReponse/question/' + id);
    }


    public findHomeWorkEtudiantReponseByHomeWorkEtudiantId(id: number): Observable<Array<ReponseEtudiantHomeWork>> {
        return this.http.get<Array<ReponseEtudiantHomeWork>>(this.etudianturl + 'reponseEtudiantHomeWork/homeWorkEtudiant/id/' + id);
    }

    public findByQuestionId(id: number) {
        this.http.get<Array<ReponseEtudiantHomeWork>>(this.etudianturl + 'reponseEtudiantHomeWork/QuestionId/' + id).subscribe(
            data => {
                this.QstReponseetudiant = data;
            }
        );
    }


}
