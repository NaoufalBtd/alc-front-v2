import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {TypeTeacherService} from '../../../controller/service/type-teacher.service';
import {TypeTeacher} from '../../../controller/model/type-teacher.model';
import {StatutSocialService} from '../../../controller/service/statut-social.service';
import {StatutSocial} from '../../../controller/model/statut-social.model';

@Component({
  selector: 'app-info-etudiant',
  templateUrl: './info-etudiant.component.html',
  styleUrls: ['./info-etudiant.component.scss']
})
export class InfoEtudiantComponent implements OnInit {

  constructor() {
  }


  ngOnInit(): void {


  }
}
