import {Component, OnInit} from '@angular/core';
import {InvitedStudentService} from '../../../controller/service/invited-student.service';
import {InvitedStudent} from '../../../controller/model/invited-student.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-invited-liste',
  templateUrl: './invited-liste.component.html',
  styleUrls: ['./invited-liste.component.scss']
})
export class InvitedListeComponent implements OnInit {

  constructor(private invitedService: InvitedStudentService,public router: Router) {
  }

  ngOnInit(): void {
    this.invitedService.findAll();
  }
  get inviteStudentAdminList(): Array<InvitedStudent> {

    return this.invitedService.inviteStudentAdminList;
  }

  set inviteStudentAdminList(value: Array<InvitedStudent>) {
    this.invitedService.inviteStudentAdminList = value;
  }

}
