import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../../../controller/service/contact.service';
import {Contact} from '../../../../controller/model/contact.model';
import {MessageService} from 'primeng/api';
import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
    contact: Contact = new Contact();

    constructor(private contactService: ContactService,
                private datepipe: DatePipe, private translate: TranslateService,
                private messageService: MessageService) {

    }

    ngOnInit(): void {
    }

    save(): void {
        this.contact.setFrom = 'ANONYMOUS';
        let  date = new Date();
        this.contact.date = this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss');
        this.contactService.save(this.contact).subscribe(
            data => {
                this.messageService.add({
                    severity: 'success',
                    detail: 'Message sent successfully ',
                    life: 4000
                });
                this.contact = new Contact();
            }, error => {
                this.messageService.add({
                    severity: 'error',
                    detail: 'Something went wrong, please try again.',
                    life: 4000
                });
            }
        );
    }


}
