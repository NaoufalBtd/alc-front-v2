import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {StatutSocialService} from '../../../controller/service/statut-social.service';
import {StatutSocial} from '../../../controller/model/statut-social.model';
import {TypeTeacher} from '../../../controller/model/type-teacher.model';
import {FonctionService} from '../../../controller/service/fonction.service';
import {Fonction} from '../../../controller/model/fonction.model';

@Component({
  selector: 'app-fonction',
  templateUrl: './fonction.component.html',
  styleUrls: ['./fonction.component.scss']
})
export class FonctionComponent implements OnInit {


  constructor(private messageService: MessageService, private fonctionService: FonctionService,
              private confirmationService: ConfirmationService) { }

  first = 0;
  rows = 10;
  cols: any[];
  ngOnInit(): void {
    this.fonctionService.findAllStatutSocial().subscribe(data => {
      this.fonctions = data;
      console.log(this.fonctions);
    } );
  }
  public save() {

    if (this.fonction.libelle.trim()) {
      this.fonctionService.save().subscribe(data => {
        // tslint:disable-next-line:no-shadowed-variable
        this.fonctionService.findAllStatutSocial().subscribe(data => this.fonctions = data);
        this.fonctions.push({...this.fonction});
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Area of work Created',
          life: 3000
        });
      });
      this.createDialogEtud = false;
      this.fonction = new Fonction();
    }
  }
  public showEdit(fonction1: Fonction) {
    this.fonction = {...fonction1};
    this.editDialog = true;
  }
  showEditDialog() {
    this.createDialogEtud = true;

  }
  hideCreateDialog() {
    this.createDialogEtud = false;

  }

  get editDialog(): boolean {
    return this.fonctionService.editDialog;
  }

  set editDialog(value: boolean) {
    this.fonctionService.editDialog = value;
  }
  get createDialogEtud(): boolean {
    return this.fonctionService.createDialog;
  }

  set createDialogEtud(value: boolean) {
    this.fonctionService.createDialog = value;
  }

  get fonction(): Fonction {
    return this.fonctionService.fonction;
  }

  set fonction(value: Fonction) {
    this.fonctionService.fonction = value;
  }
  get fonctions(): Array<Fonction>{
    return this.fonctionService.fonctions;
  }

  set fonctions(value: Array<Fonction>) {
    this.fonctionService.fonctions = value;
  }
  public edit() {
    this.fonctions[this.fonctionService.findIndexById(this.fonction.id)] = this.fonction;
    this.fonctionService.edit().subscribe(data => {
      this.fonction = data;
      this.fonctionService.findAllStatutSocial();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
          detail: 'Area of work Updated',
        life: 3000
      });
    });
    this.editDialog = false;
    this.fonction = new Fonction();
  }
  public delete(fonction: Fonction) {
    this.fonction = fonction;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + fonction.libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.fonctionService.deleteByLibelle().subscribe(data => {
          this.fonctions = this.fonctions.filter(val => val.id !== this.fonction.id);
          this.fonction = new Fonction();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Area of work  Deleted',
            life: 3000
          });
        });
      }
    });
  }
}
