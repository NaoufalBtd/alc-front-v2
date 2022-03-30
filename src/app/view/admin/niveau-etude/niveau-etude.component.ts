import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FonctionService} from '../../../controller/service/fonction.service';
import {Fonction} from '../../../controller/model/fonction.model';
import {NiveauEtudeService} from '../../../controller/service/niveau-etude.service';
import {NiveauEtude} from '../../../controller/model/niveau-etude.model';

@Component({
  selector: 'app-niveau-etude',
  templateUrl: './niveau-etude.component.html',
  styleUrls: ['./niveau-etude.component.scss']
})
export class NiveauEtudeComponent implements OnInit {


  constructor(private messageService: MessageService, private niveauEtudeService: NiveauEtudeService,
              private confirmationService: ConfirmationService) { }
  public popoverTitle1 = 'Confirmation';
  public popoverMessage1 = 'Êtes-vous sûr de vouloir supprimer la marque ?';
  public confirmCliked1 = false;
  public cancelCliked1 = false;
  first = 0;
  rows = 10;
  cols: any[];
  ngOnInit(): void {
    this.niveauEtudeService.findAllNiveauEtude().subscribe(data => {
      this.niveauEtudes = data;

    } );
  }
  public save() {

    if (this.niveauEtude.libelle.trim()) {
      this.niveauEtudeService.save().subscribe(data => {
        // tslint:disable-next-line:no-shadowed-variable
        this.niveauEtudeService.findAllNiveauEtude().subscribe(data => this.niveauEtudes = data);
        this.niveauEtudes.push({...this.niveauEtude});
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Social status Created',
          life: 3000
        });
      });
      this.createDialogEtud = false;
      this.niveauEtude = new NiveauEtude();
    }
  }
  public showEdit(niveauEtude1: NiveauEtude) {
    this.niveauEtude = {...niveauEtude1};
    this.editDialog = true;
  }
  showEditDialog() {
    this.createDialogEtud = true;

  }
  hideCreateDialog() {
    this.createDialogEtud = false;

  }

  get editDialog(): boolean {
    return this.niveauEtudeService.editDialog;
  }

  set editDialog(value: boolean) {
    this.niveauEtudeService.editDialog = value;
  }
  get createDialogEtud(): boolean {
    return this.niveauEtudeService.createDialog;
  }

  set createDialogEtud(value: boolean) {
    this.niveauEtudeService.createDialog = value;
  }
    deleteConfirmation: boolean;

  public confirmationDelete(niveauEtude: NiveauEtude) {
       this.niveauEtude = niveauEtude;
       console.log(this.niveauEtude);
       this.deleteConfirmation = true;

  }
  get niveauEtude(): NiveauEtude {
    return this.niveauEtudeService.niveauEtude;
  }

  set niveauEtude(value: NiveauEtude) {
    this.niveauEtudeService.niveauEtude = value;
  }
  get niveauEtudes(): Array<NiveauEtude>{
    return this.niveauEtudeService.niveauEtudes;
  }

  set niveauEtudes(value: Array<NiveauEtude>) {
    this.niveauEtudeService.niveauEtudes = value;
  }
  public edit() {
    this.niveauEtudes[this.niveauEtudeService.findIndexById(this.niveauEtude.id)] = this.niveauEtude;
    this.niveauEtudeService.edit().subscribe(data => {
      this.niveauEtude = data;
      this.niveauEtudeService.findAllNiveauEtude();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Social status Updated',
        life: 3000
      });
    });
    this.editDialog = false;
    this.niveauEtude = new NiveauEtude();
  }
  public delete() {

        this.niveauEtudeService.deleteByLibelle().subscribe(data => {
          this.niveauEtudes = this.niveauEtudes.filter(val => val.id !== this.niveauEtude.id);

          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Social status  Deleted',
            life: 3000
          });

        });
    this.deleteConfirmation = false;
  }

}
