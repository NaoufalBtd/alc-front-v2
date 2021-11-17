import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {GroupeEtudeService} from '../../../../controller/service/groupe-etude.service';
import {GroupeEtudiantService} from '../../../../controller/service/groupe-etudiant-service';
import {GroupeEtude} from '../../../../controller/model/groupe-etude.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';



@Component({
  selector: 'app-groupe-etudiant-list',
  templateUrl: './groupe-etudiant-list.component.html',
  styleUrls: ['./groupe-etudiant-list.component.scss']
})
export class GroupeEtudiantListComponent implements OnInit {

  private submitted: boolean;
  cols: any[];

  constructor(private messageService: MessageService, private groupeEtudiantService: GroupeEtudiantService, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.initCol();
    this.groupeEtudiantService.findAll().subscribe(data => {
          this.groupeEtudiants = data;
          console.log( this.groupeEtudiants);
        }
    );

  }
  public findAllGroupeEtudiantDetail(groupeEtudiant: GroupeEtudiant) {
    console.log(this.groupeEtudiant.id);
    console.log(this.groupeEtudiant.groupeEtudiantDetails);
    this.groupeEtudiantService.findAllGroupeEtudiantDetail(groupeEtudiant.id).subscribe(
        data =>  this.groupeEtudiant.groupeEtudiantDetails = data);
  }
  public delete(groupeEtudiant: GroupeEtudiant) {
    this.groupeEtudiant = groupeEtudiant;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + groupeEtudiant.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.groupeEtudiantService.deleteByLibelle().subscribe(data => {
          this.groupeEtudiants = this.groupeEtudiants.filter(val => val.id !== this.selected.id);
          this.groupeEtudiant = new GroupeEtudiant();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Group of students Deleted',
            life: 3000
          });
        });
      }
    });
  }
  public deleteMultiple() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected groups?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.groupeEtudiantService.deleteMultipleByLibelle().subscribe(data => {
          this.groupeEtudiantService.deleteMultipleIndexById();
          this.selectes = null;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Groups  Deleted',
            life: 3000
          });
        });
      }
    });
  }

  private initCol() {
    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'libelle', header: 'Group Label'},
      {field: 'dateDebut', header: 'Date Debut '},
       {field: 'dateFin', header: 'Date Fin '},

    ];
    }

  public edit(groupeEtduiant1: GroupeEtudiant) {
    this.groupeEtudiant = {...groupeEtduiant1};
    this.editDialog = true;
    console.log(groupeEtduiant1);
  }

  public openCreateEtud() {
    this.selected = new GroupeEtudiant();
    this.submitted = false;
    this.createDialogEtud = true;
  }
  public openGroupeEtudiantDetail() {
    this.submitted = false;
    this.createDialogGroupeEtudiantDetail = true;
  }

  set createDialogGroupeEtudiantDetail(value: boolean) {
    this.groupeEtudiantService.createDialog2 = value;
  }
  set createDialogEtud(value: boolean) {
    this.groupeEtudiantService.createDialog = value;
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
  get selected(): GroupeEtudiant {
    return this.groupeEtudiantService.groupeEtudiant;
  }
  set selected(value: GroupeEtudiant) {
    this.groupeEtudiantService.groupeEtudiant = value;
  }
  get selectes(): Array<GroupeEtudiant> {
    return this.groupeEtudiantService.selectes;
  }

  set selectes(value: Array<GroupeEtudiant>) {
    this.groupeEtudiantService.selectes = value;
  }
  get editDialog(): boolean {
    return this.groupeEtudiantService.editDialog;
  }

  set editDialog(value: boolean) {
    this.groupeEtudiantService.editDialog = value;
  }


}
