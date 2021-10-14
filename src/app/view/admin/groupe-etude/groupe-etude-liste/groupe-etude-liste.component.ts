import { Component, OnInit } from '@angular/core';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {MessageService} from 'primeng/api';
import {GroupeEtudeService} from '../../../../controller/service/groupe-etude.service';
import {GroupeEtude} from '../../../../controller/model/groupe-etude.model';

@Component({
  selector: 'app-groupe-etude-liste',
  templateUrl: './groupe-etude-liste.component.html',
  styleUrls: ['./groupe-etude-liste.component.scss']
})
export class GroupeEtudeListeComponent implements OnInit {
  private submitted: boolean;

  constructor(private messageService: MessageService, private groupeEtudeService: GroupeEtudeService) { }

  ngOnInit(): void {
  }
  public openCreateEtud() {
    this.selected = new GroupeEtude();
    this.submitted = false;
    this.createDialogEtud = true;
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

}
