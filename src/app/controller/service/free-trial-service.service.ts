import { Injectable } from '@angular/core';
import {FreeTrialFormule} from '../model/free-trial-formule.model';
import {HttpClient} from '@angular/common/http';
import {InscriptionService} from './inscription.service';
import {LoginService} from './login.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FreeTrialServiceService {


  public adminUrl = environment.adminUrl;
  private _freeTrialFormule: FreeTrialFormule;
  private _freeTrialFormuleVo: FreeTrialFormule;
  private _freeTrialList: Array<FreeTrialFormule>;
  constructor(private http: HttpClient, public inscriptionService: InscriptionService, public loginService: LoginService) { }


  get freeTrialFormule(): FreeTrialFormule {
    if (this._freeTrialFormule == null){
      this._freeTrialFormule = new FreeTrialFormule();
    }
    return this._freeTrialFormule;
  }

  set freeTrialFormule(value: FreeTrialFormule) {
    this._freeTrialFormule = value;
  }
  get freeTrialFormuleVo(): FreeTrialFormule {
    if (this._freeTrialFormuleVo == null){
      this._freeTrialFormuleVo = new FreeTrialFormule();
    }
    return this._freeTrialFormuleVo;
  }

  set freeTrialFormuleVo(value: FreeTrialFormule) {
    this._freeTrialFormuleVo = value;
  }

  get freeTrialList(): Array<FreeTrialFormule> {
    if (this._freeTrialList == null){
      this._freeTrialList = new Array<FreeTrialFormule>();
    }
    return this._freeTrialList;
  }

  set freeTrialList(value: Array<FreeTrialFormule>) {
    this._freeTrialList = value;
  }

  public save() {
    console.log('dkhlt');
    console.log(this.freeTrialFormule.dayspeerweek);
    console.log(this.freeTrialFormule.timeperday);
    this.freeTrialFormule.inscription.etudiant = this.loginService.getConnectedStudent();
    this.http.post<number>(this.adminUrl + 'freeTrial/', this.freeTrialFormule).subscribe(
        data => {
          if (data > 0) {
            console.log('raha khedama');
            this.freeTrialFormule = new FreeTrialFormule();
          }
        }
    );
  }
  public findAll(){
    this.http.get<Array<FreeTrialFormule>>(this.adminUrl + 'freeTrial/').subscribe(
        data => {
          this.freeTrialList = data;
        }
    );
  }
  public findByCriteria(){
    this.http.post<Array<FreeTrialFormule>>(this.adminUrl + 'freeTrial/criteria', this.freeTrialFormuleVo).subscribe(
        data => {
          this.freeTrialList = data ;
        }
    );
  }
}
