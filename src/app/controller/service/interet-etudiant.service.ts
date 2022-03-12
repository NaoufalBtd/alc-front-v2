import { Injectable } from '@angular/core';
import {NiveauEtude} from '../model/niveau-etude.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InteretEtudiant} from '../model/interet-etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class InteretEtudiantService {

  private _interetEtudiant : InteretEtudiant;
  private _interetEtudiants: Array<InteretEtudiant>;

  private  etudiantUrl= environment.etudiantUrl;
  private typeUrl = 'type/typeTeacher/';
  private _createDialog: boolean;
  private _editDialog: boolean;
  constructor(private http: HttpClient) {
  }
  public save(): Observable<number> {
    return this.http.post<number>(this.etudiantUrl + 'interetEtudiant/', this.interetEtudiant);
  }
  public findAlInteret(): Observable<Array<InteretEtudiant>> {
    return this.http.get<Array<InteretEtudiant>>(this.etudiantUrl + 'interetEtudiant/');

  }


  public edit(): Observable<InteretEtudiant> {
    return this.http.put<InteretEtudiant>(this.etudiantUrl + 'interetEtudiant/', this.interetEtudiant);
  }

  public deleteByLibelle(): Observable<number> {
    return this.http.delete<number>(this.etudiantUrl + 'interetEtudiant/' + 'libelle/' + this.interetEtudiant.libelle);
  }
  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.interetEtudiants.length; i++) {
      if (this.interetEtudiants[i].id === id) {
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

  get interetEtudiant(): InteretEtudiant {
    if (this._interetEtudiant == null){
      this._interetEtudiant = new InteretEtudiant();

    }
    return this._interetEtudiant;
  }

  set interetEtudiant(value: InteretEtudiant) {
    this._interetEtudiant = value;
  }

  get interetEtudiants(): Array<InteretEtudiant> {
    if (this._interetEtudiants == null){
      this._interetEtudiants = new  Array<NiveauEtude>();

    }
    return this._interetEtudiants;
  }

  set interetEtudiants(value: Array<InteretEtudiant>) {
    this._interetEtudiants = value;
  }


  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }
}
