import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {EtudiantService} from '../../../../controller/service/etudiant.service';
import {GroupeEtudeService} from '../../../../controller/service/groupe-etude.service';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {GroupeEtude} from '../../../../controller/model/groupe-etude.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {GroupeEtudeDetail} from '../../../../controller/model/groupe-etude-detail.model';
import {Prof} from '../../../../controller/model/prof.model';

@Component({
  selector: 'app-groupe-etude-create',
  templateUrl: './groupe-etude-create.component.html',
  styleUrls: ['./groupe-etude-create.component.scss']
})
export class GroupeEtudeCreateComponent implements OnInit {

  constructor(private messageService: MessageService, private groupeEtudeService: GroupeEtudeService) {
  }
  // tslint:disable-next-line:variable-name
  private _createDialog: boolean;
  ngOnInit(): void {
  }
  get createDialogEtud(): boolean {
    return this.groupeEtudeService.createDialog;
  }

  set createDialogEtud(value: boolean) {
    this.groupeEtudeService.createDialog = value;
  }


  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }
  get groupeEtude(): GroupeEtude{
    return this.groupeEtudeService.groupeEtude;
  }

  set groupeEtude(value: GroupeEtude) {
    this.groupeEtudeService.groupeEtude = value;
  }


  get groupeEtudiant(): GroupeEtudiant{
    return this.groupeEtudeService.groupeEtudiant;
  }

  set groupeEtudiant(value: GroupeEtudiant) {
    this.groupeEtudeService.groupeEtudiant = value;
  }
  get groupeEtudeDetails(): Array<GroupeEtudeDetail>{
    return this.groupeEtudeService.groupeEtudeDetails;
  }

  set groupeEtudeDetails(value: Array<GroupeEtudeDetail>) {
    this.groupeEtudeService.groupeEtudeDetails = value;
  }
  get groupeEtudeDetail(): GroupeEtudeDetail{
    return this.groupeEtudeService.groupeEtudeDetail;
  }

  set groupeEtudeDetail(value: GroupeEtudeDetail) {
    this.groupeEtudeService.groupeEtudeDetail = value;
  }
  get submitted(): boolean {
    return this.groupeEtudeService.submitted;
  }
  set submitted(value: boolean) {
    this.groupeEtudeService.submitted = value;
  }
  get groupeEtudes(): Array<GroupeEtude>{
    return this.groupeEtudeService.groupeEtudes;
  }

  set groupeEtudes(value: Array<GroupeEtude>) {
    this.groupeEtudeService.groupeEtudes = value;
  }
  public save() {
    this.submitted = true;
    this.groupeEtude.id = 1;
    this.groupeEtudeService.save().subscribe(data => {
      this.groupeEtudes.push({...this.groupeEtude});
      // tslint:disable-next-line:no-shadowed-variable
      this.groupeEtudeService.findAll().subscribe(data => this.groupeEtudes = data);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'group Created',
        life: 3000
      });
    });
    this.createDialog = false;
    this.groupeEtude = new GroupeEtude();
  }
  public addGroupeEtudeDetail(){
    this.groupeEtude.groupeEtudeDetails.push({...this.groupeEtudeDetail});
    this.groupeEtudeDetail = null;
  }
}
