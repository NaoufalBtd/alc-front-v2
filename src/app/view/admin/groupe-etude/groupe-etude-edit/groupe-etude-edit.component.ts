import { Component, OnInit } from '@angular/core';
import {GroupeEtudeService} from '../../../../controller/service/groupe-etude.service';
import {GroupeEtude} from '../../../../controller/model/groupe-etude.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-groupe-etude-edit',
  templateUrl: './groupe-etude-edit.component.html',
  styleUrls: ['./groupe-etude-edit.component.scss']
})
export class GroupeEtudeEditComponent implements OnInit {

  constructor(private groupeEtudeService: GroupeEtudeService, private messageService: MessageService) { }

  ngOnInit(): void {
  }
  get editDialog(): boolean {
    return this.groupeEtudeService.editDialog;
  }

  set editDialog(value: boolean) {
    this.groupeEtudeService.editDialog = value;
  }
  get groupeEtude(): GroupeEtude{
    return this.groupeEtudeService.groupeEtude;
  }

  set groupeEtude(value: GroupeEtude) {
    this.groupeEtudeService.groupeEtude = value;
  }
  set submitted(value: boolean) {
    this.groupeEtudeService.submitted = value;
  }
  get items(): Array<GroupeEtude>{
    return this.groupeEtudeService.items;
  }

  set items(value: Array<GroupeEtude>) {
    this.groupeEtudeService.items = value;
  }
  public edit() {
    this.submitted = true;
    this.items[this.groupeEtudeService.findIndexById(this.groupeEtude.id)] = this.groupeEtude;
    this.groupeEtudeService.edit().subscribe(data => {
      this.groupeEtude = data;
      this.groupeEtudeService.findAll();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Etudiant Updated',
        life: 3000
      });
    });
    this.editDialog = false;
    this.groupeEtude = new GroupeEtude();
  }

}
