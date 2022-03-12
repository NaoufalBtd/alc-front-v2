import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {StatutSocialService} from '../../../controller/service/statut-social.service';
import {StatutSocial} from '../../../controller/model/statut-social.model';
import {TypeTeacher} from '../../../controller/model/type-teacher.model';

@Component({
  selector: 'app-statut-social',
  templateUrl: './statut-social.component.html',
  styleUrls: ['./statut-social.component.scss']
})
export class StatutSocialComponent implements OnInit {


  constructor(private messageService: MessageService, private statutSocialService: StatutSocialService,
              private confirmationService: ConfirmationService) { }


  ngOnInit(): void {
    this.statutSocialService.findAllStatutSocial().subscribe(data => {
      this.statutSocials = data;
      console.log(this.statutSocials);
    } );
  }
  public save() {

    if (this.statutSocial.libelle.trim()) {
      this.statutSocialService.save().subscribe(data => {
        // tslint:disable-next-line:no-shadowed-variable
        this.statutSocialService.findAllStatutSocial().subscribe(data => this.statutSocials = data);
        this.statutSocials.push({...this.statutSocial});
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Social status Created',
          life: 3000
        });
      });
      this.createDialogEtud = false;
      this.statutSocial = new StatutSocial();
    }
  }
  public showEdit(statutSocial1: StatutSocial) {
    this.statutSocial = {...statutSocial1};
    this.editDialog = true;
  }
  showEditDialog() {
    this.createDialogEtud = true;
    this.statutSocial = null;

  }
  hideCreateDialog() {
    this.createDialogEtud = false;

  }

  get editDialog(): boolean {
    return this.statutSocialService.editDialog;
  }

  set editDialog(value: boolean) {
    this.statutSocialService.editDialog = value;
  }
  get createDialogEtud(): boolean {
    return this.statutSocialService.createDialog;
  }

  set createDialogEtud(value: boolean) {
    this.statutSocialService.createDialog = value;
  }

  get statutSocial(): StatutSocial {
    return this.statutSocialService.statutSocial;
  }

  set statutSocial(value: StatutSocial) {
    this.statutSocialService.statutSocial = value;
  }
  get statutSocials(): Array<StatutSocial>{
    return this.statutSocialService.statutSocials;
  }

  set statutSocials(value: Array<StatutSocial>) {
    this.statutSocialService.statutSocials = value;
  }
  public edit() {
    this.statutSocials[this.statutSocialService.findIndexById(this.statutSocial.id)] = this.statutSocial;
    this.statutSocialService.edit().subscribe(data => {
      this.statutSocial = data;
      this.statutSocialService.findAllStatutSocial();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Social status Updated',
        life: 3000
      });
    });
    this.editDialog = false;
    this.statutSocial = new StatutSocial();
  }
  public delete(statutSocial: StatutSocial) {
    this.statutSocial = statutSocial;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + statutSocial.libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.statutSocialService.deleteByLibelle().subscribe(data => {
          this.statutSocials = this.statutSocials.filter(val => val.id !== this.statutSocial.id);
          this.statutSocial = new TypeTeacher();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Social status  Deleted',
            life: 3000
          });
        });
      }
    });
  }

}
