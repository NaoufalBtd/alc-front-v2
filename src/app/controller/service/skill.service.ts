import { Injectable } from '@angular/core';
import {TypeTeacher} from '../model/type-teacher.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Skill} from '../model/skill.model';
import {NiveauEtude} from '../model/niveau-etude.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private _skill : Skill;
  private _skills: Array<Skill>;
  private  etudiantUrl= environment.etudiantUrl;
  private typeUrl = 'type/typeTeacher/';
  private _createDialog: boolean;
  private _editDialog: boolean;
  constructor(private http: HttpClient) {
  }
  public save(): Observable<number> {
    return this.http.post<number>(this.etudiantUrl + 'skill/', this.skill);
  }
  public findAllSkill(): Observable<Array<NiveauEtude>> {
    return this.http.get<Array<NiveauEtude>>(this.etudiantUrl + 'skill/');

  }
  public edit(): Observable<NiveauEtude> {
    return this.http.put<NiveauEtude>(this.etudiantUrl + 'skill/', this.skill);
  }

  public deleteByLibelle(): Observable<number> {
    return this.http.delete<number>(this.etudiantUrl + 'skill/' + 'libelle/' + this.skill.libelle);
  }
  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.skills.length; i++) {
      if (this.skills[i].id === id) {
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

  get skill(): Skill {
    if (this._skill == null){
      this._skill = new Skill();

    }
    return this._skill;
  }

  set skill(value: Skill) {
    this._skill = value;
  }

  get skills(): Array<Skill> {
    if (this._skills == null){
      this._skills = new  Array<Skill>();

    }
    return this._skills;
  }

  set skills(value: Array<Skill>) {
    this._skills = value;
  }


  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }


}
