import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {InvitedStudentService} from '../../../controller/service/invited-student.service';
import {EtudiantService} from '../../../controller/service/etudiant.service';

@Component({
  selector: 'app-connect-as-invited',
  templateUrl: './connect-as-invited.component.html',
  styleUrls: ['./connect-as-invited.component.scss']
})
export class ConnectAsInvitedComponent implements OnInit {

  email: string;
  code: string;

  constructor( public router: Router, public invitationService: InvitedStudentService) {
  }

  ngOnInit(): void {
  }


    findInvation() {
        this.invitationService.findByEmailAndCode(this.email, this.code);
    }
}
