import {Component, OnInit} from '@angular/core';
import {Table} from 'primeng/table';
import {Email} from '../../../../controller/model/email';
import {EmailService} from '../../../../controller/service/email.service';
import {Etudiant} from '../../../../controller/model/etudiant.model';

@Component({
    selector: 'app-email-inbox',
    templateUrl: './email-inbox.component.html',
    styleUrls: ['./email-inbox.component.scss']
})
export class EmailInboxComponent implements OnInit {
    emailList: Email[];


    constructor(private emailService: EmailService) {
    }

    get loading(): boolean {
        return this.emailService.loading;
    }

    set loading(value: boolean) {
        this.emailService.loading = value;
    }

    get students(): Array<Etudiant> {
        return this.emailService.students;
    }

    set students(value: Array<Etudiant>) {
        this.emailService.students = value;
    }

    get selectedEmail(): Email {
        return this.emailService.selectedEmail;
    }

    set selectedEmail(value: Email) {
        this.emailService.selectedEmail = value;
    }

    get emails(): Email[] {
        return this.emailService.emails;
    }

    set emails(value: Email[]) {
        this.emailService.emails = value;
    }

    get showDetail(): boolean {
        return this.emailService.showDetail;
    }

    set showDetail(value: boolean) {
        this.emailService.showDetail = value;
    }

    ngOnInit() {
    }

    clear(table: Table) {
        table.clear();
    }


    showDetail_fct(email: Email) {
        this.selectedEmail = email;
        this.showDetail = true;
    }
}
