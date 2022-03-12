import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {NiveauEtude} from '../model/niveau-etude.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StatutSocial} from '../model/statut-social.model';

@Injectable({
  providedIn: 'root'
})
export class NiveauEtudeService {
  private  urlProf = environment.profUrl;
  private _niveauEtude : NiveauEtude;
  private _niveauEtudes: Array<NiveauEtude>;

  private  etudiantUrl= environment.etudiantUrl;
  private typeUrl = 'type/typeTeacher/';
  private _createDialog: boolean;
  private _editDialog: boolean;
  constructor(private http: HttpClient) {
  }
  public save(): Observable<number> {
    return this.http.post<number>(this.etudiantUrl + 'niveauEtude/', this.niveauEtude);
  }
  public findAllNiveauEtude(): Observable<Array<NiveauEtude>> {
    return this.http.get<Array<NiveauEtude>>(this.etudiantUrl + 'niveauEtude/');

  }


  public edit(): Observable<NiveauEtude> {
    return this.http.put<NiveauEtude>(this.etudiantUrl + 'niveauEtude/', this.niveauEtude);
  }

  public deleteByLibelle(): Observable<number> {
    return this.http.delete<number>(this.etudiantUrl + 'niveauEtude/' + 'libelle/' + this.niveauEtude.libelle);
  }
  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.niveauEtudes.length; i++) {
      if (this.niveauEtudes[i].id === id) {
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

  get niveauEtude(): NiveauEtude {
    if (this._niveauEtude == null){
      this._niveauEtude = new NiveauEtude();

    }
    return this._niveauEtude;
  }

  set niveauEtude(value: NiveauEtude) {
    this._niveauEtude = value;
  }

  get niveauEtudes(): Array<NiveauEtude> {
    if (this._niveauEtudes == null){
      this._niveauEtudes = new  Array<NiveauEtude>();

    }
    return this._niveauEtudes;
  }

  set niveauEtudes(value: Array<NiveauEtude>) {
    this._niveauEtudes = value;
  }


  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }

}
