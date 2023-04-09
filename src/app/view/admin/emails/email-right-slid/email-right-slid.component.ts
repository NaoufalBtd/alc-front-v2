import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {EmailService} from '../../../../controller/service/email.service';

@Component({
    selector: 'app-email-right-slid',
    templateUrl: './email-right-slid.component.html',
    styleUrls: ['./email-right-slid.component.scss']
})
export class EmailRightSlidComponent implements OnInit {
    items: MenuItem[];

    constructor(private emailService: EmailService) {
        this.items = [{
            label: 'Options',
            items: [{
                label: 'inbox',
                icon: 'pi pi-inbox',
                command: () => {
                    this.getInbox();
                }
            },
                {
                    label: 'Sent mail',
                    icon: 'pi pi-send',
                    command: () => {
                        this.getSentMail();
                    }
                },
                {
                    label: 'Important',
                    icon: 'pi pi-star',
                    command: () => {
                        this.getImportant();
                    }
                },
                {
                    label: 'Trash',
                    icon: 'pi pi-trash',
                    command: () => {
                        this.getImportant();
                    }
                }
            ]
        }
        ];
    }

    ngOnInit(): void {
    }


    get showCompose(): boolean {
        return this.emailService.showCompose;
    }

    set showCompose(value: boolean) {
        this.emailService.showCompose = value;
    }

    get showDetail(): boolean {
        return this.emailService.showDetail;
    }

    set showDetail(value: boolean) {
        this.emailService.showDetail = value;
    }


    private getInbox() {
        this.showCompose = false;
        this.showDetail = false;
    }

    private getSentMail() {
        this.showCompose = false;
        this.showDetail = false;
    }

    private getImportant() {
        this.showCompose = false;
        this.showDetail = false;
    }
}
