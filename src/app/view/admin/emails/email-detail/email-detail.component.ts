import {Component, OnInit} from '@angular/core';
import {Email} from '../../../../controller/model/email';
import {EmailService} from '../../../../controller/service/email.service';

@Component({
    selector: 'app-email-detail',
    templateUrl: './email-detail.component.html',
    styleUrls: ['./email-detail.component.scss']
})
export class EmailDetailComponent implements OnInit {

    constructor(private emailService: EmailService) {
    }

    ngOnInit(): void {
        console.log(this.selectedEmail);
    }

    get selectedEmail(): Email {
        return this.emailService.selectedEmail;
    }

    set selectedEmail(value: Email) {
        this.emailService.selectedEmail = value;
    }


    mailList(to: string): string[] {
        return to.split(',');
    }

}
