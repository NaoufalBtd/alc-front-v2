import { Component, OnInit } from '@angular/core';
import {GroupeEtudiantService} from '../../../../controller/service/groupe-etudiant-service';
import {GroupeEtude} from '../../../../controller/model/groupe-etude.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {MessageService} from 'primeng/api';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import { GroupeEtudiantDetail} from '../../../../controller/model/groupe-etudiant-detail.model';
import {Parcours} from '../../../../controller/model/parcours.model';

@Component({
  selector: 'app-groupe-etudiant-create',
  templateUrl: './groupe-etudiant-create.component.html',
  styleUrls: ['./groupe-etudiant-create.component.scss']
})
export class GroupeEtudiantCreateComponent implements OnInit {
  constructor( private groupeEtudiantService: GroupeEtudiantService, private messageService: MessageService) { }
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
  public  libelle2 = '';
  public id1 = '';
  public id2 = Number(this.id1);
  public id3 = Number(this.libelle2);
  cols: any[];
  public full:boolean = false;
  ngOnInit(): void {
  }
  public findAllGroupeEtude() {
    this.groupeEtudiantService.findAllGroupeEtude().subscribe(data => this.groupeEtudeList = data);
  }
  public findAllParcours() {
    this.groupeEtudiantService.findAllParcours().subscribe(data => this.parcoursList = data);
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
    this.createDialogEtud = false;
    this.selected = new GroupeEtudiant();

  }

  selectChangeHandler(event) {
    this.libelle1 = event.target.value;

  }
  selectChangeHandler2(event) {
    this.id2 = event.target.value.split(': ')[1];

  }
  selectChangeGroupeEtude(event) {
    this.id3 = event.target.value.split(': ')[1];
  }
 public addEtudiant(){
    this.groupeEtudiant.groupeEtudiantDetails.push({...this.groupeEtudiantDetail});
    this.groupeEtudiantDetail = null ;
  }
public trouver(id: number){
    for (let i = 0 ; i<this.groupeEtudeList.length ; i++){
      if( id == this.groupeEtudeList[i].id){

        console.log('ha l groupe etude ' + this.groupeEtudeList[i].nombreEtudiant);
        this.selected.groupeEtude.nombreEtudiant = this.groupeEtudeList[i].nombreEtudiant;
        console.log('ha le nombre ' +this.selected.groupeEtude.nombreEtudiant );
        this.selected.nombrePlacevide =   this.selected.groupeEtude.nombreEtudiant ;
        this.selected.nombrePlaceNonVide=0;
      }
    }
}

  public exit(id: number){
    for ( let i = 0 ; i < this.etudiantList.length ; i++){
      if (id == this.etudiantList[i].id)
      {
        console.log( this.etudiantList[i]);
        //this.etudiantList2.push(this.etudiantList[i]);
        this.groupeEtudiantDetail.etudiant = this.etudiantList[i];
        this.selected.nombrePlacevide =    this.selected.nombrePlacevide-1;
        this.selected.nombrePlaceNonVide =  this.selected.groupeEtude.nombreEtudiant- this.selected.nombrePlacevide;
        this.groupeEtudiant.groupeEtudiantDetails.push({...this.groupeEtudiantDetail});
        this.groupeEtudiantDetail = null;
        this.isfull();
        return 0;
      }
    }
    this.etudiantList = null ;
  }
  public deleteFromView(groupeEtudiantDetail: GroupeEtudiantDetail ) {
    const index = this.groupeEtudiant.groupeEtudiantDetails.findIndex(c => c.etudiant.nom === groupeEtudiantDetail.etudiant.nom);
    if (index !== -1 ) {
      this.groupeEtudiant.groupeEtudiantDetails.splice(index, 1);
      this.selected.nombrePlaceNonVide --;
      this.selected.nombrePlacevide++;
      this.isfull();
    }
  }
  public validateSave(): boolean {
    return this.selected.libelle != null &&   this.groupeEtudiant.groupeEtudiantDetails.length > 0;

  }
  public isfull(){
    if ((this.groupeEtudiant.groupeEtudiantDetails.length - this.selected.groupeEtude.nombreEtudiant)=== 0){
      this.full = true;

    }
    else {
      this.full = false ;
    }
  }
}

