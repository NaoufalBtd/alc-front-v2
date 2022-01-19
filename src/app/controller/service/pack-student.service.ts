import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PackStudent} from "../model/pack-student.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PackStudentService {

  private _packstudentIndividial: PackStudent;
  private _packstudentVo: PackStudent;
  private _packstudentgroupe: PackStudent;
  private _packstudentIndividialList: Array<PackStudent>;
  private _packstudentgroupeList: Array<PackStudent>;
  private adminUrl = environment.adminUrl;
  constructor(private http: HttpClient) { }


  get packstudentVo(): PackStudent {
    if (this._packstudentVo == null){
      this._packstudentVo = new PackStudent();
    }
    return this._packstudentVo;
  }

  set packstudentVo(value: PackStudent) {
    this._packstudentVo = value;
  }

  get packstudentIndividial(): PackStudent {
    if (this._packstudentIndividial == null){
      this._packstudentIndividial = new PackStudent();
    }
    return this._packstudentIndividial;
  }

  set packstudentIndividial(value: PackStudent) {
    this._packstudentIndividial = value;
  }

  get packstudentgroupe(): PackStudent {
    if (this._packstudentgroupe == null){
      this._packstudentgroupe = new PackStudent();
    }
    return this._packstudentgroupe;
  }

  set packstudentgroupe(value: PackStudent) {
    this._packstudentgroupe = value;
  }

  get packstudentIndividialList(): Array<PackStudent> {
    if (this._packstudentIndividialList == null){
      this._packstudentIndividialList = new Array<PackStudent>();
    }
    return this._packstudentIndividialList;
  }

  set packstudentIndividialList(value: Array<PackStudent>) {
    this._packstudentIndividialList = value;
  }

  get packstudentgroupeList(): Array<PackStudent> {
    if (this._packstudentgroupeList == null){
      this._packstudentgroupeList = new Array<PackStudent>();
    }
    return this._packstudentgroupeList;
  }

  set packstudentgroupeList(value: Array<PackStudent>) {
    this._packstudentgroupeList = value;
  }

  public findPackIndividualOrgroupe(isforgroupe: boolean){
    this.http.get<Array<PackStudent>>(this.adminUrl + 'packStudent/packForgroupe/' + isforgroupe ).subscribe(
        data => {
          if (data !== null){
            if (isforgroupe){
               this.packstudentgroupeList = data;
            }else {
              this.packstudentIndividialList = data;
            }
          }
        }
    );
  }
  public findbyCode(code: string){
    this.http.get(this.adminUrl + 'packStudent/code/' + code ).subscribe(

    );
  }

  savePack() {
    console.log(this.packstudentIndividial);
    this.http.post<number>(this.adminUrl + 'packStudent/' , this.packstudentIndividial).subscribe(
        data => {
          if (data > 0){
            if (this.packstudentIndividial.forGroupe){
              this.packstudentgroupeList.push(this.packstudentIndividial);

            }else {
              this.packstudentIndividialList.push(this.packstudentIndividial);
            }
            this.packstudentIndividial = new PackStudent();
          }else if (data === -2) {
            console.log('nombre de cours khawi');
          }
        }, error => {
          console.log('chi erreur');
        }
    );
  }

  updatePack() {
    this.http.put<number>(this.adminUrl + 'packStudent/' , this.packstudentIndividial ).subscribe(
        data => {
          if (data > 0){
            if (this.packstudentIndividial.forGroupe){
              this.findPackIndividualOrgroupe(true);
            }else {
              this.findPackIndividualOrgroupe(false);
            }
            this.packstudentIndividial = new PackStudent();
          }
        }
    );
  }

  deletebycode(code: string) {
    this.http.delete<number>(this.adminUrl + 'packStudent/code/' + code).subscribe(
        data => {
          if (data > 0){
            this.findPackIndividualOrgroupe(true);
            this.findPackIndividualOrgroupe(false);
          }
        }
    );
  }

  findbycretira(b: boolean) {
    this.http.post<Array<PackStudent>>(this.adminUrl + 'packStudent/criteria', this.packstudentVo).subscribe(
        data => {
          if (data !== null){
            if (b){
              this.packstudentgroupeList = data ;
            }else {
              this.packstudentIndividialList = data;
            }
          }
        }
    );
  }
}