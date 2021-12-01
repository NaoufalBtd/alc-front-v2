import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {EtudiantService} from '../../../../controller/service/etudiant.service';
import {GroupeEtudeService} from '../../../../controller/service/groupe-etude.service';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {GroupeEtude} from '../../../../controller/model/groupe-etude.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';

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

  get selected(): GroupeEtude{
    return this.groupeEtudeService.selected;
  }

  set selected(value: GroupeEtude) {
    this.groupeEtudeService.selected = value;
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
  /*
  public save() {
    this.submitted = true;
    this.selected.id = 1;
    this.groupeEtudeService.save().subscribe(data => {
      this.groupeEtudes.push({...this.selected});
      // tslint:disable-next-line:no-shadowed-variable
      this.groupeEtudeService.findAll().subscribe(data => this.groupeEtudes = data);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'group Created',
        life: 3000
      });
    });
    this.createDialogEtud = false;
    this.selected = new GroupeEtude();
  }
*/
  public save() {
    this.submitted = true;
    if (this.selected.libelle.trim()) {
      this.groupeEtudeService.save().subscribe(data => {
        // tslint:disable-next-line:no-shadowed-variable
        this.groupeEtudeService.findAll().subscribe(data => this.items = data);
        this.items.push({...this.selected});
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Etudiant Created',
          life: 3000
        });
      });
      this.createDialogEtud = false;
      this.selected = new GroupeEtude();
    }
  }
  public hideCreateDialog() {
    this.createDialogEtud = false;
    this.submitted = false;
  }

  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }


  get items(): Array<GroupeEtude>{
    return this.groupeEtudeService.items;
  }

  set items(value: Array<GroupeEtude>) {
    this.groupeEtudeService.items = value;
  }
 public  findAllByCriteria(){
    this.groupeEtudeService.findAllByCriteria();
 }
  get groupeEtudeVo(): GroupeEtude {

    return this.groupeEtudeService.groupeEtudeVo;
  }
  set groupeEtudeVo(value: GroupeEtude) {
    this.groupeEtudeService.groupeEtudeVo = value;
  }
}
