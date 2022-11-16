import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HomeWork} from '../model/home-work.model';
import {HomeWorkQST} from '../model/home-work-qst.model';
import {HomeWorkReponse} from '../model/home-work-reponse.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TypeDeQuestion} from '../model/type-de-question.model';
import {Section} from '../model/section.model';
import {Cours} from '../model/cours.model';
import {HomeWOrkEtudiant} from '../model/home-work-etudiant.model';

import {HomeWorkEtudiantServiceService} from './home-work-etudiant-service.service';
import {ParcoursService} from './parcours.service';
import {GroupeEtudiant} from '../model/groupe-etudiant.model';

@Injectable({
    providedIn: 'root'
})
export class HomeworkService {

    private adminUrl = environment.adminUrl;
    private _homeWork: HomeWork = new HomeWork();
    private _homeWorkSelected: HomeWork = new HomeWork();
    private _homeworkQST: HomeWorkQST;
    private _homeworkReponse: HomeWorkReponse;
    private _types: Array<TypeDeQuestion>;
    private _reponses: Array<HomeWorkReponse>;
    private _section: Section;
    private _homeWorkList: Array<HomeWork>;
    private _groupStudent: GroupeEtudiant = new GroupeEtudiant();


    constructor(private http: HttpClient,
                private service: ParcoursService,
                private homeWorkEtudiantService: HomeWorkEtudiantServiceService,
    ) {
    }


    get groupStudent(): GroupeEtudiant {
        return this._groupStudent;
    }

    set groupStudent(value: GroupeEtudiant) {
        this._groupStudent = value;
    }

    get homeWorkSelected(): HomeWork {
        return this._homeWorkSelected;
    }

    set homeWorkSelected(value: HomeWork) {
        this._homeWorkSelected = value;
    }


    get homeWorkList(): Array<HomeWork> {
        if (this._homeWorkList == null) {
            this._homeWorkList = new Array<HomeWork>();
        }
        return this._homeWorkList;
    }

    set homeWorkList(value: Array<HomeWork>) {
        this._homeWorkList = value;
    }

    get section(): Section {
        if (this._section == null) {
            this._section = new Section();
        }
        return this._section;
    }

    set section(section1) {
        this._section = section1;
    }

    get reponses(): Array<HomeWorkReponse> {
        if (this._reponses == null) {
            this._reponses = new Array<HomeWorkReponse>();
        }
        return this._reponses;
    }

    set reponses(homeWorkReponses) {
        this._reponses = homeWorkReponses;
    }

    get types(): Array<TypeDeQuestion> {
        if (this._types == null) {
            this._types = new Array<TypeDeQuestion>();
        }
        return this._types;
    }

    set types(typeDeQuestions) {
        this._types = typeDeQuestions;
    }

    get homeworkReponse(): HomeWorkReponse {
        if (this._homeworkReponse == null) {
            this._homeworkReponse = new HomeWorkReponse();
        }
        return this._homeworkReponse;
    }

    set homeworkReponse(homeWorkReponse) {
        this._homeworkReponse = homeWorkReponse;
    }

    get HomeWorkQST(): HomeWorkQST {
        if (this._homeworkQST == null) {
            this._homeworkQST = new HomeWorkQST();
        }
        return this._homeworkQST;
    }

    set HomeWorkQST(homeWorkQST) {
        this._homeworkQST = homeWorkQST;
    }

    get homeWork(): HomeWork {
        if (this._homeWork == null) {
            this._homeWork = new HomeWork();
        }
        return this._homeWork;
    }

    set homeWork(homeWork) {
        this._homeWork = homeWork;
    }


    set homeWorkEtudiantList(value: Array<HomeWOrkEtudiant>) {
        this.homeWorkEtudiantService.homeWorkEtudiantList = value;
    }


    public saveHomeWork(): Observable<HomeWork> {
        console.log(this.homeWork.questions);
        return this.http.post<HomeWork>(this.adminUrl + 'homeWork/', this.homeWork);
    }


    public updateHomeWork(homeWork: HomeWork): Observable<HomeWork> {
        console.log(this.homeWork.questions);
        return this.http.post<HomeWork>(this.adminUrl + 'homeWork/', homeWork);
    }

    public findType(): Observable<Array<TypeDeQuestion>> {
        return this.http.get<Array<TypeDeQuestion>>(this.adminUrl + 'TypeDeQuestion/');
    }

    public findhomeworkbyCoursId(cours: Cours): Observable<Array<HomeWork>> {
        console.log(cours);
        return this.http.get<Array<HomeWork>>(this.adminUrl + 'homeWork/cours/id/' + cours.id);
    }

    findHomeWorkEtudiantByHomeWorkId(homeWorkSelected: HomeWork): Observable<Array<HomeWOrkEtudiant>> {
        return this.http.get<Array<HomeWOrkEtudiant>>(this.adminUrl + 'homeWorkEtudiant/homeWork/id/' + homeWorkSelected.id);
    }


    deleteQst(rps: HomeWorkQST): Observable<any> {
        return this.http.delete(this.adminUrl + 'homeWorkQST/id/' + rps.id);
    }

    deleteHomeWorkById(id: number): Observable<any> {
        return this.http.delete(this.adminUrl + 'homeWork/id/' + id);
    }
}
