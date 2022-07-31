import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Contact} from '../../../../controller/model/contact.model';
import {ContactService} from '../../../../controller/service/contact.service';
import {DatePipe} from '@angular/common';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-home-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @Input() footerPadd: string | undefined;
    contact: Contact = new Contact();

    constructor(private contactService: ContactService,
                private datepipe: DatePipe,
                public translate: TranslateService,
                private messageService: MessageService) {

    }

    ngOnInit(): void {
    }

    save(): void {
        if (this.contact.email === null ||
            this.contact.email === undefined ||
            this.contact.email?.length === 0 ||
            this.contact.email?.includes('@') === false
        ) {
            this.messageService.add({
                severity: 'success',
                detail: 'Email required ',
                life: 4000
            });
            return;
        }
        this.contact.setFrom = 'ANONYMOUS';
        const date = new Date();
        this.contact.date = this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss');
        this.contactService.save(this.contact).subscribe(
            data => {
                this.messageService.add({
                    severity: 'success',
                    detail: 'Subscription successful. ',
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
