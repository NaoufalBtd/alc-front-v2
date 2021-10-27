import { Component, OnInit } from '@angular/core';
import {GroupeEtudiantService} from '../../../../controller/service/groupe-etudiant-service';
import {GroupeEtude} from '../../../../controller/model/groupe-etude.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {MessageService} from 'primeng/api';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import { GroupeEtudiantDetail} from '../../../../controller/model/groupe-etudiant-detail.model';

@Component({
  selector: 'app-groupe-etudiant-create',
  templateUrl: './groupe-etudiant-create.component.html',
  styleUrls: ['./groupe-etudiant-create.component.scss']
})
export class GroupeEtudiantCreateComponent implements OnInit {
  private submitted: boolean;
  constructor( private groupeEtudiantService: GroupeEtudiantService,private messageService: MessageService) { }
  private _createDialog: boolean;
  ngOnInit(): void {
  }
  public findAllGroupeEtude() {
    this.groupeEtudiantService.findAllGroupeEtude().subscribe(data => this.groupeEtudeList = data);
  }
  public findAllEtudiant() {
    this.groupeEtudiantService.findAllEtudiant().subscribe(data => this.etudiantList = data);
  }
  public hideCreateDialog() {
    this.createDialogEtud = false;
    this.submitted = false;
  }
  public save() {
    console.log(this.groupeEtudiant);
    this.submitted = true;
    this.groupeEtudiantService.save().subscribe(data => {
      this.groupeEtudiants.push({...this.groupeEtudiant});
      // tslint:disable-next-line:no-shadowed-variable
      this.groupeEtudiantService.findAll().subscribe(data => this.groupeEtudiants = data);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'group Created',
        life: 3000
      });
    });
    this.createDialog = false;

  }
  public addEtudiant(){
    this.groupeEtudiantService.addEtudiant();
  }
  get createDialogEtud(): boolean {
    return this.groupeEtudiantService.createDialog;
  }
  set createDialogEtud(value: boolean) {
    this.groupeEtudiantService.createDialog = value;
  }

  get groupeEtudeList(): Array<GroupeEtude> {
    return this.groupeEtudiantService.groupeEtudeList;
  }
  set groupeEtudeList(value: Array<GroupeEtude>) {
    this.groupeEtudiantService.groupeEtudeList = value;
  }
  set groupeEtudiantDetails(value: Array<GroupeEtudiantDetail>) {
    this.groupeEtudiantService.groupeEtudiantDetails = value;
  }

  get groupeEtudiantDetails(): Array<GroupeEtudiantDetail> {
    return this.groupeEtudiantService.groupeEtudiantDetails;
  }
  set groupeEtudiantDetail(value: GroupeEtudiantDetail) {
    this.groupeEtudiantService.groupeEtudiantDetail = value;
  }

  get groupeEtudiantDetail(): GroupeEtudiantDetail {
    return this.groupeEtudiantService.groupeEtudiantDetail;
  }
  get etudiantList(): Array<Etudiant> {
    return this.groupeEtudiantService.etudiantList;
  }

  set etudiantList(value: Array<Etudiant>) {
    this.groupeEtudiantService.etudiantList = value;
  }
  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }

  get selected(): GroupeEtudiant {
    return this.groupeEtudiantService.groupeEtudiant;
  }
  set selected(value: GroupeEtudiant) {
    this.groupeEtudiantService.groupeEtudiant = value;
  }
  get groupeEtudiants(): Array<GroupeEtudiant> {
    return this.groupeEtudiantService.groupeEtudiants;
  }
  set groupeEtudiants(value: Array<GroupeEtudiant>) {
    this.groupeEtudiantService.groupeEtudiants = value;
  }
  get groupeEtudiant(): GroupeEtudiant {
    return this.groupeEtudiantService.groupeEtudiant;
  }
  set groupeEtudiant(value: GroupeEtudiant) {
    this.groupeEtudiantService.groupeEtudiant = value;
  }
  get etudiant(): Etudiant {
    return this.groupeEtudiantService.etudiant;
  }


  set etudiant(value: Etudiant) {
    this.groupeEtudiantService.etudiant = value;
  }

  selectOption(value: any) {
    console.log(value);

    this.selected.groupeEtude.id = value.target.value;

  }
}
