import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SyntheseSessionCoursService} from '../../../../controller/service/synthese-session-cours.service';
import {ProfessorService} from '../../../../controller/service/professor.service';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {SessionCours} from '../../../../controller/model/session-cours.model';

@Component({
  selector: 'app-view-profil-etudiant',
  templateUrl: './view-profil-etudiant.component.html',
  styleUrls: ['./view-profil-etudiant.component.scss']
})
export class ViewProfilEtudiantComponent implements OnInit {

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private service: SyntheseSessionCoursService, private servicePrf: ProfessorService){ }

  ngOnInit(): void {
      this.servicePrf.findEtudiantById(this.etudiant.id).subscribe(
      data => this.etudiant = data);

       this.servicePrf.findCoursByEtudiantId(this.etudiant.id).subscribe(data => this.sessionCours = data);
  }
    get sessionCours(): Array<SessionCours> {


      return this.servicePrf.sessionCours;
    }

    set sessionCours(value: Array<SessionCours>) {
        this.servicePrf.sessionCours = value;
    }
 get etudiant(): Etudiant{
    return  this.servicePrf.etudiant;
 }

  set etudiant(value: Etudiant) {
    this.servicePrf.etudiant = value;
  }


  get profilDiaglog(): boolean {
    return this.service.profilDiaglog;
  }

  set profilDiaglog(value: boolean) {
    this.service.profilDiaglog = value;
  }
  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }




}
