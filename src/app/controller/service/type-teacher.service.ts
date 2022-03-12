import { Injectable } from '@angular/core';
import {TypeTeacher} from '../model/type-teacher.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {GroupeEtude} from '../model/groupe-etude.model';
import {HttpClient} from '@angular/common/http';
import {GroupeEtudiant} from '../model/groupe-etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class TypeTeacherService {
  private  urlProf = environment.profUrl;
   private _typeTeacher : TypeTeacher;
   private _typeTeachers: Array<TypeTeacher>;
  private  adminUrl= environment.adminUrl;
  private typeUrl = 'type/typeTeacher/';
  private _createDialog: boolean;
  private _editDialog: boolean;
  constructor(private http: HttpClient) {
  }
  public save(): Observable<number> {
    return this.http.post<number>(this.adminUrl + this.typeUrl, this.typeTeacher);
  }

  public findAllType(): Observable<Array<TypeTeacher>>{
    return this.http.get<Array<TypeTeacher>>(this.urlProf + 'typeTeacher/');
  }

  public edit(): Observable<TypeTeacher> {
    return this.http.put<TypeTeacher>(this.adminUrl + this.typeUrl, this.typeTeacher);
  }

  public deleteByLibelle(): Observable<number> {
    return this.http.delete<number>(this.adminUrl + this.typeUrl +'libelle/'+ this.typeTeacher.libelle);
  }
  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.typeTeachers.length; i++) {
      if (this.typeTeachers[i].id === id) {
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

  get typeTeacher(): TypeTeacher {
    if (this._typeTeacher == null){
      this._typeTeacher = new TypeTeacher();

    }
    return this._typeTeacher;
  }

  set typeTeacher(value: TypeTeacher) {
    this._typeTeacher = value;
  }

  get typeTeachers(): Array<TypeTeacher> {
    if (this._typeTeachers == null){
      this._typeTeachers = new  Array<TypeTeacher>();

    }
    return this._typeTeachers;
  }

  set typeTeachers(value: Array<TypeTeacher>) {
    this._typeTeachers = value;
  }


  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }


}
