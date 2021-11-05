import { Component, OnInit } from '@angular/core';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {GroupeEtudeService} from '../../../../controller/service/groupe-etude.service';
import {GroupeEtude} from '../../../../controller/model/groupe-etude.model';

@Component({
  selector: 'app-groupe-etude-liste',
  templateUrl: './groupe-etude-liste.component.html',
  styleUrls: ['./groupe-etude-liste.component.scss']
})
export class GroupeEtudeListeComponent implements OnInit {
  private submitted: boolean;
  cols: any[];
  constructor(private messageService: MessageService, private groupeEtudeService: GroupeEtudeService, private confirmationService: ConfirmationService,) { }

  ngOnInit(): void {
    this.initCol();
    this.groupeEtudeService.findAll().subscribe(data => this.items = data);
  }
  public openCreateEtud() {
    this.selected = new GroupeEtude();
    this.submitted = false;
    this.createDialogEtud = true;
  }
  public edit(groupeEtude1: GroupeEtude) {
    this.selected = {...groupeEtude1};
    this.editDialog = true;
  }
  public delete(selected: GroupeEtude) {
    this.selected = selected;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + selected.libelle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.groupeEtudeService.deleteByLibelle().subscribe(data => {
          this.items = this.items.filter(val => val.id !== this.selected.id);
          this.selected = new GroupeEtude();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Group Deleted',
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
        this.groupeEtudeService.deleteMultipleByLibelle().subscribe(data => {
          this.groupeEtudeService.deleteMultipleIndexById();
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

  public findAllByCriteria() {
    this.groupeEtudeService.findAllByCriteria();

  }

  get selected(): GroupeEtude {
    return this.groupeEtudeService.groupeEtude;
  }

  set selected(value: GroupeEtude) {
    this.groupeEtudeService.groupeEtude = value;
  }
  set createDialogEtud(value: boolean) {
    this.groupeEtudeService.createDialog = value;
  }
  get groupeEtudes(): Array<GroupeEtude>{
    return this.groupeEtudeService.groupeEtudes;
  }

  set groupeEtudes(value: Array<GroupeEtude>) {
    this.groupeEtudeService.groupeEtudes = value;
  }
  get items(): Array<GroupeEtude>{
    return this.groupeEtudeService.items;
  }

  set items(value: Array<GroupeEtude>) {
    this.groupeEtudeService.items = value;
  }
  get selectes(): Array<GroupeEtude> {
    return this.groupeEtudeService.selectes;
  }
  get editDialog(): boolean {
    return this.groupeEtudeService.editDialog;
  }

  set editDialog(value: boolean) {
    this.groupeEtudeService.editDialog = value;
  }


  set selectes(value: Array<GroupeEtude>) {
    this.groupeEtudeService.selectes = value;
  }
  private initCol() {
    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'description', header: 'Description'},
      {field: 'nombreEtudiant', header: 'Number of Students '},

    ];
  }
  get groupeEtudeVo(): GroupeEtude {
    return this.groupeEtudeService.groupeEtudeVo;
  }

  set groupeEtudeVo(value: GroupeEtude) {
    this.groupeEtudeService.groupeEtudeVo = value;
  }
}

