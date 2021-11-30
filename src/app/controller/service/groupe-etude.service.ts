import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupeEtude} from '../model/groupe-etude.model';
import {Admin} from '../model/admin.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

import {GroupeEtudiant} from '../model/groupe-etudiant.model';
import {Etudiant} from '../model/etudiant.model';
import {SessionCours} from '../model/session-cours.model';

@Injectable({
  providedIn: 'root'
})
export class GroupeEtudeService {
  constructor(private http: HttpClient) {
  }
  private urlAdminBase = environment.adminUrl;
  private urlGroupeEtude = '/admin/groupeEtude/';

  // tslint:disable-next-line:variable-name
  private _submitted: boolean;
  // tslint:disable-next-line:variable-name
  private _groupeEtude: GroupeEtude;
  private _groupeEtudeVo: GroupeEtude;
  private _selected: GroupeEtude;
  private _groupeEtudes: Array<GroupeEtude>;
  // tslint:disable-next-line:variable-name
  private _createDialog: boolean;
  // tslint:disable-next-line:variable-name
  private _viewDialog: boolean;
  // tslint:disable-next-line:variable-name
  private _editDialog: boolean;
  private _groupeEtudiant: GroupeEtudiant;
  // tslint:disable-next-line:variable-name
  private _items: Array<GroupeEtude>;
  private _selectes: Array<GroupeEtude>;



  public save(): Observable<number> {
    console.log(this.groupeEtude);

    return this.http.post<number>(this.urlAdminBase + 'groupeEtude/', this.selected);
  }

  public findAll(): Observable<Array<GroupeEtude>> {
    return this.http.get<Array<GroupeEtude>>(this.urlAdminBase + 'groupeEtude/');
  }

  public deleteByLibelle(): Observable<number> {
    return this.http.delete<number>(this.urlAdminBase + 'groupeEtude/libelle/' + this.groupeEtude.libelle);
  }
  public deleteMultipleByLibelle(): Observable<number> {
    return this.http.post<number>(this.urlAdminBase + 'groupeEtude' + '/delete-multiple-by-id', this.selectes);
  }
  public deleteMultipleIndexById() {
    for (const item of this.selectes) {
      this.deleteIndexById(item.id);
    }
  }
  public findAllByCriteria() {
    this.http.post<Array<GroupeEtude>>( this.urlAdminBase + 'groupeEtude/' + 'allByCriteria', this.groupeEtudeVo).subscribe(
        data => {
          if (data != null) {
            this.items = data;
          }
        }
    );
  }
  public deleteIndexById(id: number) {
    this.items.splice(this.findIndexById(id), 1);
  }
  public edit(): Observable<GroupeEtude> {
    return this.http.put<GroupeEtude>( this.urlAdminBase + 'groupeEtude/', this.groupeEtude);
  }
  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }


  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }


  get groupeEtude(): GroupeEtude {
    if (this._groupeEtude == null) {
      this._groupeEtude = new GroupeEtude();
    }
    return this._groupeEtude;
  }

  set groupeEtude(value: GroupeEtude) {
    this._groupeEtude = value;
  }


  set groupeEtudiant(value: GroupeEtudiant) {
    this._groupeEtudiant = value;
  }

  get groupeEtudiant(): GroupeEtudiant {
    if (this._groupeEtudiant == null) {
      this._groupeEtudiant = new GroupeEtudiant();
    }
    return this._groupeEtudiant;
  }
  set selected(value: GroupeEtude) {
    this._selected = value;
  }

  get selected(): GroupeEtude {
    if (this._selected == null) {
      this._selected = new GroupeEtude();
    }
    return this._selected;
  }
  set groupeEtudes(value: Array<GroupeEtude>) {
    this._groupeEtudes = value;
  }

  get groupeEtudes(): Array<GroupeEtude> {
    if (this._groupeEtudes == null) {
      this._groupeEtudes = new Array<GroupeEtude>();
    }
    return this._groupeEtudes;
  }

  get items(): Array<GroupeEtude> {
    if (this._items == null) {
      this._items = new Array<GroupeEtude>();
    }
    return this._items;
  }

  set items(value: Array<GroupeEtude>) {
    this._items = value;
  }

  get selectes(): Array<GroupeEtude> {
    if (this._selectes == null) {
      this._selectes = new Array<GroupeEtude>();
    }
    return this._selectes;
  }

  set selectes(value: Array<GroupeEtude>) {
    this._selectes = value;
  }


  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }
  get groupeEtudeVo(): GroupeEtude {
    if (this._groupeEtudeVo == null) {
      this._groupeEtudeVo = new GroupeEtude();
    }
    return this._groupeEtude;
  }

  set groupeEtudeVo(value: GroupeEtude) {
    this._groupeEtudeVo = value;
  }
}
