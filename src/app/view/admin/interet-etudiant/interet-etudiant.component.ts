import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {TypeTeacherService} from '../../../controller/service/type-teacher.service';
import {TypeTeacher} from '../../../controller/model/type-teacher.model';
import {InteretEtudiantService} from '../../../controller/service/interet-etudiant.service';
import {InteretEtudiant} from '../../../controller/model/interet-etudiant.model';
import {Fonction} from '../../../controller/model/fonction.model';
import {StatutSocial} from '../../../controller/model/statut-social.model';

@Component({
  selector: 'app-interet-etudiant',
  templateUrl: './interet-etudiant.component.html',
  styleUrls: ['./interet-etudiant.component.scss']
})
export class InteretEtudiantComponent implements OnInit {

  constructor(private messageService: MessageService, private interetEtudiantService: InteretEtudiantService,
              private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this.interetEtudiantService.findAlInteret().subscribe(data => {
      this.interetEtudiants = data;
      console.log(this.interetEtudiants);
    } );
  }
  deleteConfirmation:boolean;

  public save() {

    if (this.interetEtudiant.libelle.trim()) {
      this.interetEtudiantService.save().subscribe(data => {
        // tslint:disable-next-line:no-shadowed-variable
        this.interetEtudiantService.findAlInteret().subscribe(data => this.interetEtudiants = data);
        this.interetEtudiants.push({...this.interetEtudiant});
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Main goal with learning English Teacher Created',
          life: 3000
        });
      });
      this.createDialogEtud = false;
      this.interetEtudiant = new InteretEtudiant();
    }
  }
  public showEdit(interetEtudiant1: InteretEtudiant) {
    this.interetEtudiant = {...interetEtudiant1};
    this.editDialog = true;
  }
  showEditDialog() {
    this.createDialogEtud = true;
    this.interetEtudiant =null;
    this.interetEtudiant=null;

  }
  hideCreateDialog() {
    this.createDialogEtud = false;

  }

  get editDialog(): boolean {
    return this.interetEtudiantService.editDialog;
  }

  set editDialog(value: boolean) {
    this.interetEtudiantService.editDialog = value;
  }
  get createDialogEtud(): boolean {
    return this.interetEtudiantService.createDialog;
  }

  set createDialogEtud(value: boolean) {
    this.interetEtudiantService.createDialog = value;
  }

  get interetEtudiant(): InteretEtudiant {
    return this.interetEtudiantService.interetEtudiant;
  }

  set interetEtudiant(value: InteretEtudiant) {
    this.interetEtudiantService.interetEtudiant = value;
  }
  get interetEtudiants(): Array<TypeTeacher>{
    return this.interetEtudiantService.interetEtudiants;
  }

  set interetEtudiants(value: Array<InteretEtudiant>) {
    this.interetEtudiantService.interetEtudiants = value;
  }
  public edit() {
    this.interetEtudiants[this.interetEtudiantService.findIndexById(this.interetEtudiant.id)] = this.interetEtudiant;
    this.interetEtudiantService.edit().subscribe(data => {
      this.interetEtudiant = data;
      this.interetEtudiantService.findAlInteret();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Main goal with learning English Updated',
        life: 3000
      });
    });
    this.editDialog = false;
    this.interetEtudiant = new InteretEtudiant();
  }

  public delete() {

        this.interetEtudiantService.deleteByLibelle().subscribe(data => {
          this.interetEtudiants = this.interetEtudiants.filter(val => val.id !== this.interetEtudiant.id);
          this.interetEtudiant = new InteretEtudiant();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Main goal with learning English  Deleted',
            life: 3000
          });
        });
this.deleteConfirmation= false;
  }

  hideCreateDialog1() {
    this.deleteConfirmation = false ;
  }
  public confirmationDelete(interetEtudiant : InteretEtudiant) {
    this.interetEtudiant = interetEtudiant;
    console.log(this.interetEtudiant);
    this.deleteConfirmation = true;

  }
}
