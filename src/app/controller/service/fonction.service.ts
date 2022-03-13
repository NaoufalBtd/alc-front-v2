import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {StatutSocial} from '../model/statut-social.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Parcours} from '../model/parcours.model';
import {TypeTeacher} from '../model/type-teacher.model';
import {NiveauEtude} from '../model/niveau-etude.model';
import {Fonction} from '../model/fonction.model';

@Injectable({
  providedIn: 'root'
})
export class FonctionService {


  private  urlProf = environment.profUrl;
  private _fonction : Fonction;
  private _fonctions: Array<Fonction>;

  private  etudiantUrl= environment.etudiantUrl;
  private typeUrl = 'type/typeTeacher/';
  private _createDialog: boolean;
  private _editDialog: boolean;
  constructor(private http: HttpClient) {
  }
  public save(): Observable<number> {
    return this.http.post<number>(this.etudiantUrl + 'fonction/', this.fonction);
  }
  public findAllStatutSocial(): Observable<Array<Fonction>> {
    return this.http.get<Array<Fonction>>(this.etudiantUrl + 'fonction/');

  }


  public edit(): Observable<Fonction> {
    return this.http.put<Fonction>(this.etudiantUrl + 'fonction/', this.fonction);
  }

  public deleteByLibelle(): Observable<number> {
    return this.http.delete<number>(this.etudiantUrl + 'fonction/' + 'libelle/' + this.fonction.libelle);
  }
  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.fonctions.length; i++) {
      if (this.fonctions[i].id === id) {
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

  get fonction(): Fonction {
    if (this._fonction == null){
      this._fonction = new Fonction();

    }
    return this._fonction;
  }

  set fonction(value: Fonction) {
    this._fonction = value;
  }

  get fonctions(): Array<Fonction> {
    if (this._fonctions == null){
      this._fonctions = new  Array<Fonction>();

    }
    return this._fonctions;
  }

  set fonctions(value: Array<Fonction>) {
    this._fonctions = value;
  }


  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }
}
