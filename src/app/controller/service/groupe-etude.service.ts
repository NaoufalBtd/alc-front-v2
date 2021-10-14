import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupeEtude} from '../model/groupe-etude.model';
import {Admin} from '../model/admin.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {GroupeEtudeDetail} from '../model/groupe-etude-detail.model';
import {GroupeEtudiant} from '../model/groupe-etudiant.model';
import {Etudiant} from '../model/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class GroupeEtudeService {
  private urlBase = 'http//localhost:8030';
  private urlGroupeEtude = '/admin/groupeEtude/';

  // tslint:disable-next-line:variable-name
  private _submitted: boolean;
  // tslint:disable-next-line:variable-name
  private _groupeEtude: GroupeEtude;
  private _groupeEtudes: Array<GroupeEtude>;
  // tslint:disable-next-line:variable-name
  private _createDialog: boolean;
  // tslint:disable-next-line:variable-name
  private _viewDialog: boolean;
  // tslint:disable-next-line:variable-name
   private _groupeEtudeDetails: Array<GroupeEtudeDetail>;
  private _groupeEtudeDetail: GroupeEtudeDetail;
   private _groupeEtudiant: GroupeEtudiant;

  constructor(private http: HttpClient) {
  }

  public save(): Observable<number> {
    return this.http.post<number>(this.urlBase + this.urlGroupeEtude, this.groupeEtude);
  }
  public findAll(): Observable<Array<GroupeEtude>> {
    return this.http.get<Array<GroupeEtude>>(this.urlBase + this.urlGroupeEtude);
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
      this._groupeEtudiant = new GroupeEtudiant () ;
    }
    return this._groupeEtudiant;
  }
  set groupeEtudes(value: Array<GroupeEtude>) {
    this._groupeEtudes = value;
  }
  get groupeEtudes(): Array<GroupeEtude> {
    if (this._groupeEtudes == null) {
      this._groupeEtudes = new Array<GroupeEtude> () ;
    }
    return this._groupeEtudes;
  }
  set groupeEtudeDetails(value: Array <GroupeEtudeDetail>) {
    this._groupeEtudeDetails = value;
  }
  get groupeEtudeDetails(): Array <GroupeEtudeDetail> {
    if (this._groupeEtudeDetails == null) {
      this._groupeEtudeDetails = new Array <GroupeEtudeDetail> () ;
    }
    return this._groupeEtudeDetails;
  }
  set groupeEtudeDetail(value: GroupeEtudeDetail) {
    this._groupeEtudeDetail = value;
  }
  get groupeEtudeDetail(): GroupeEtudeDetail {
    if (this._groupeEtudeDetail == null) {
      this._groupeEtudeDetail = new GroupeEtudeDetail () ;
    }
    return this._groupeEtudeDetail;
  }




  set items(value: Array<GroupeEtude>) {
    this._groupeEtudes = value;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }


}
