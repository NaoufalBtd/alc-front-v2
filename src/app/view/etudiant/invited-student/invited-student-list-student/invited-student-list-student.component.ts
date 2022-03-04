import {Component, OnInit} from '@angular/core';
import {InvitedStudent} from '../../../../controller/model/invited-student.model';
import {InvitedStudentService} from '../../../../controller/service/invited-student.service';
import {LoginService} from '../../../../controller/service/login.service';

@Component({
    selector: 'app-invited-student-list-student',
    templateUrl: './invited-student-list-student.component.html',
    styleUrls: ['./invited-student-list-student.component.scss']
})
export class InvitedStudentListStudentComponent implements OnInit {

    constructor(private invitedStudentService: InvitedStudentService, public loginService: LoginService) {
    }

    ngOnInit(): void {
        this.findAllByStudentId(this.loginService.getConnectedStudent().id);
    }

    get inviteStudentEtudiant(): InvitedStudent {
        return this.invitedStudentService.inviteStudentEtudiant;

    }

    get inviteStudentEtudiantList(): Array<InvitedStudent> {
        return this.invitedStudentService.inviteStudentEtudiantList;
    }

    public findAllByStudentId(idStudent) {
        this.invitedStudentService.findAllByStudentId(idStudent);
    }

    public sendInvitation(idStudent: number, emailInvited: string) {
        this.invitedStudentService.sendInvitation(idStudent, emailInvited);
    }

}
