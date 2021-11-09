import { Component, OnInit } from '@angular/core';
import {GroupeEtudiantService} from '../../../../controller/service/groupe-etudiant-service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {GroupeEtude} from '../../../../controller/model/groupe-etude.model';
import {Parcours} from '../../../../controller/model/parcours.model';
import {GroupeEtudiantDetail} from '../../../../controller/model/groupe-etudiant-detail.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';

@Component({
  selector: 'app-groupe-etudiant-edit',
  templateUrl: './groupe-etudiant-edit.component.html',
  styleUrls: ['./groupe-etudiant-edit.component.scss']
})
export class GroupeEtudiantEditComponent implements OnInit {


  constructor(private messageService: MessageService, private groupeEtudiantService: GroupeEtudiantService, private confirmationService: ConfirmationService) {
  }

  get groupeEtudeList(): Array<GroupeEtude> {
    return this.groupeEtudiantService.groupeEtudeList;
  }
  set groupeEtudeList(value: Array<GroupeEtude>) {
    this.groupeEtudiantService.groupeEtudeList = value;
  }

  get parcoursList(): Array<Parcours> {
    return this.groupeEtudiantService.parcoursList;
  }
  set parcoursList(value: Array<Parcours>) {
    this.groupeEtudiantService.parcoursList = value;
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
  get etudiantList2(): Array<Etudiant> {
    return this.groupeEtudiantService.etudiantList2;
  }

  set etudiantList2(value: Array<Etudiant>) {
    this.groupeEtudiantService.etudiantList2 = value;
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
  get parcours(): Parcours {
    return this.groupeEtudiantService.parcours;
  }
  set parcours(value: Parcours) {
    this.groupeEtudiantService.parcours = value;
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
  private submitted: boolean;
  private _createDialog: boolean;
  public  libelle1 = '';
  public id1 = '';
  public id2 = Number(this.id1);
  cols: any[]; ngOnInit(): void {
    this.groupeEtudiantService.findAllGroupeEtudiantDetail(this.groupeEtudiant.id).subscribe(
        data =>  this.groupeEtudiant.groupeEtudiantDetails = data);
    this.groupeEtudiantService.findAllParcours().subscribe(
        data => this.parcoursList = data);
    this.groupeEtudiantService.findAllGroupeEtude().subscribe(
        data => this.groupeEtudeList = data);
  }
  public findAllGroupeEtude() {
    this.groupeEtudiantService.findAllGroupeEtude().subscribe(data => this.groupeEtudeList = data);
  }
  public findAllEtudiant() {
    this.groupeEtudiantService.findAllEtudiant().subscribe(data => this.etudiantList = data);
  }

  public findEtudiantListByParcoursLibelle(libelle2) {
    console.log(libelle2);
    console.log(this.etudiantList);
    this.groupeEtudiantService.findEtudiantListByParcoursLibelle(libelle2)
        .subscribe(data => this.etudiantList = data);
  }
  public findAllParcours() {
    this.groupeEtudiantService.findAllParcours().subscribe(data => this.parcoursList = data);
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

  selectChangeHandler(event) {
    this.libelle1 = event.target.value;

  }
  selectChangeHandler2(event) {
    this.id2 = event.target.value.split(': ')[1];

  }
  public addEtudiant(){
    this.groupeEtudiant.groupeEtudiantDetails.push({...this.groupeEtudiantDetail});
    this.groupeEtudiantDetail = null ;
  }


  public exit(id: number){

    for ( let i = 0 ; i < this.etudiantList.length ; i++){
      if (id == this.etudiantList[i].id)
      {
        console.log( this.etudiantList[i]);
        //this.etudiantList2.push(this.etudiantList[i]);
        this.groupeEtudiantDetail.etudiant = this.etudiantList[i];
        this.groupeEtudiant.groupeEtudiantDetails.push({...this.groupeEtudiantDetail});
        this.groupeEtudiantDetail = null;
        return 0;
      }
    }
    this.etudiantList = null ;
  }
  public deleteFromView(groupeEtudiantDetail: GroupeEtudiantDetail ) {
    const index = this.groupeEtudiant.groupeEtudiantDetails.findIndex(c => c.etudiant.nom === groupeEtudiantDetail.etudiant.nom);
    if (index !== -1 ) {
      this.groupeEtudiant.groupeEtudiantDetails.splice(index, 1);
    }
  }
  public edit() {

    this.groupeEtudiants[this.groupeEtudiantService.findIndexById(this.groupeEtudiant.id)] = this.groupeEtudiant;
    this.groupeEtudiantService.edit().subscribe(data => {
      this.groupeEtudiant = data;
      this.groupeEtudiantService.findAll();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Etudiant Updated',
        life: 3000
      });
    });
    this.editDialog = false;
    this.groupeEtudiant = new GroupeEtudiant();
  }
  get editDialog(): boolean {

    return this.groupeEtudiantService.editDialog;
  }
  public delete(groupeEtudiantDetail: GroupeEtudiantDetail) {
    this.groupeEtudiantDetail = groupeEtudiantDetail;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + groupeEtudiantDetail.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.groupeEtudiantService.deleteGroupeEtudiantDetailById().subscribe(data => {
          this.groupeEtudiantDetails = this.groupeEtudiantDetails.filter(val => val.id !== this.groupeEtudiantDetail.id);
          this.groupeEtudiantDetail = new GroupeEtudiantDetail();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Student Deleted',
            life: 3000
          });
        });
      }
    });
  }
  set editDialog(value: boolean) {
    this.groupeEtudiantService.editDialog = value;
  }



}
