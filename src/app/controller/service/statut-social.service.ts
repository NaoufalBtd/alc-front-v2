import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {TypeTeacher} from '../model/type-teacher.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StatutSocial} from '../model/statut-social.model';
import {Parcours} from '../model/parcours.model';

@Injectable({
  providedIn: 'root'
})
export class StatutSocialService {

  private  urlProf = environment.profUrl;
  private _statutSocial : StatutSocial;
  private _statutSocials: Array<StatutSocial>;

  private  etudiantUrl= environment.etudiantUrl;
  private typeUrl = 'type/typeTeacher/';
  private _createDialog: boolean;
  private _editDialog: boolean;
  constructor(private http: HttpClient) {
  }
  public save(): Observable<number> {
    return this.http.post<number>(this.etudiantUrl + 'statutSocial/', this.statutSocial);
  }
  public findAllStatutSocial(): Observable<Array<StatutSocial>> {
    return this.http.get<Array<Parcours>>(this.etudiantUrl + 'statutSocial/');

  }


  public edit(): Observable<StatutSocial> {
    return this.http.put<StatutSocial>(this.etudiantUrl + 'statutSocial/', this.statutSocial);
  }

  public deleteByLibelle(): Observable<number> {
    return this.http.delete<number>(this.etudiantUrl + 'statutSocial/' + 'libelle/' + this.statutSocial.libelle);
  }
  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.statutSocials.length; i++) {
      if (this.statutSocials[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }

  get statutSocial(): StatutSocial {
    if (this._statutSocial == null){
      this._statutSocial = new StatutSocial();

    }
    return this._statutSocial;
  }

  set statutSocial(value: StatutSocial) {
    this._statutSocial = value;
  }

  get statutSocials(): Array<StatutSocial> {
    if (this._statutSocials == null){
      this._statutSocials = new  Array<StatutSocial>();

    }
    return this._statutSocials;
  }

  set statutSocials(value: Array<StatutSocial>) {
    this._statutSocials = value;
  }


  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }
}
