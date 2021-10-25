import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HomeWork} from '../model/home-work.model';
import {HomeWOrkEtudiant} from '../model/home-work-etudiant.model';
import {ReponseEtudiantHomeWork} from '../model/reponse-etudiant-home-work.model';
import {Observable} from 'rxjs';
import {HomeWorkQST} from '../model/home-work-qst.model';
import {HoweWorkQSTReponse} from '../model/howe-work-qstreponse.model';


@Injectable({
  providedIn: 'root'
})
export class HomeWorkEtudiantServiceService {

  private _homeWorkEtudiant: HomeWOrkEtudiant;
  private _HomeWorkEtudiantReponse: ReponseEtudiantHomeWork;
  private _homeWork: HomeWork;
  private _homeWorkQuestion: HomeWorkQST;
  private _homeWorkQuestionList: Array<HomeWorkQST>;
  private _homeWorkQstReponses: Array<HoweWorkQSTReponse>;
  private _etudiantReponse: HoweWorkQSTReponse;
  constructor(private http: HttpClient) { }


  get etudiantReponse(): HoweWorkQSTReponse {
    if (this._etudiantReponse == null){
      this._etudiantReponse = new HoweWorkQSTReponse();
    }
    return this._etudiantReponse;
  }

  set etudiantReponse(value: HoweWorkQSTReponse) {
    this._etudiantReponse = value;
  }

  get homeWorkQstReponses(): Array<HoweWorkQSTReponse> {
    if (this._homeWorkQstReponses == null){
      this._homeWorkQstReponses = new Array<HoweWorkQSTReponse>();
    }
    return this._homeWorkQstReponses;
  }

  set homeWorkQstReponses(value: Array<HoweWorkQSTReponse>) {
    this._homeWorkQstReponses = value;
  }

  get homeWorkQuestionList(): Array<HomeWorkQST> {
    if (this._homeWorkQuestionList == null){
      this._homeWorkQuestionList = new Array<HomeWorkQST>();
    }
    return this._homeWorkQuestionList;
  }

  set homeWorkQuestionList(value: Array<HomeWorkQST>) {
    this._homeWorkQuestionList = value;
  }

  get homeWorkQuestion(): HomeWorkQST {
    if (this._homeWorkQuestion == null)
    {
      this._homeWorkQuestion = new HomeWorkQST();
    }
    return this._homeWorkQuestion;
  }

  set homeWorkQuestion(value: HomeWorkQST) {
    this._homeWorkQuestion = value;
  }

  get homeWorkEtudiant(): HomeWOrkEtudiant {
    if (this._homeWorkEtudiant == null){
      this._homeWorkEtudiant = new HomeWOrkEtudiant();
    }
    return this._homeWorkEtudiant;
  }

  set homeWorkEtudiant(value: HomeWOrkEtudiant) {
    this._homeWorkEtudiant = value;
  }

  get HomeWorkEtudiantReponse(): ReponseEtudiantHomeWork {
    if (this._HomeWorkEtudiantReponse == null){
      this._HomeWorkEtudiantReponse = new ReponseEtudiantHomeWork();
    }
    return this._HomeWorkEtudiantReponse;
  }

  set HomeWorkEtudiantReponse(value: ReponseEtudiantHomeWork) {
    this._HomeWorkEtudiantReponse = value;
  }

  get homeWork(): HomeWork {
    if (this._homeWork == null){
      this._homeWork = new HomeWork();
    }
    return this._homeWork;
  }

  set homeWork(value: HomeWork) {
    this._homeWork = value;
  }

  public findQuestions(): Observable<Array<HomeWorkQST>>{
    return this.http.get<Array<HomeWorkQST>>('http://localhost:8036/etudiant/homeWorkQST/homework/' + this.homeWork.id);
  }

  public save(): Observable<HomeWOrkEtudiant>{
    return this.http.post<HomeWOrkEtudiant>('http://localhost:8036/etudiant/homeWork/', this.homeWorkEtudiant);
  }

  public findReponsesByQuestionId(): Observable<Array<HoweWorkQSTReponse>> {
  return this.http.get<Array<HoweWorkQSTReponse>>('http://localhost:8036/etudiant/homeWorkqstReponse/question/' + this.homeWorkQuestion.id);
  }
}
