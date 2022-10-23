import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../../controller/service/contact.service';
import {Contact} from '../../../controller/model/contact.model';
import {Role} from '../../../enum/role.enum';
import {DatePipe, KeyValue} from '@angular/common';
import {MessageService} from 'primeng/api';
import {AnimationService} from '../../../controller/service/animation.service';
import {User} from '../../../controller/model/user.model';

@Component({
    selector: 'app-contact-message',
    templateUrl: './contact-message.component.html',
    styleUrls: ['./contact-message.component.scss']
})
export class ContactMessageComponent implements OnInit {
    contacts: Array<Contact> = new Array<Contact>();
    role = Role;
    selectedUser: string ;
    map: Map<string, Contact[]> = new Map<string, Contact[]>();
    contact: Contact = new Contact();

    constructor(private contactService: ContactService,
                private animation: AnimationService,
                private datepipe: DatePipe, private toast: MessageService) {
    }

    get displayContactMessage(): boolean {
        return this.contactService.displayContactMessage;
    }

    set displayContactMessage(value: boolean) {
        this.contactService.displayContactMessage = value;
    }


    ngOnInit(): void {
        this.contactService.findAll().subscribe(
            data => {

                for (const item of data) {
                    if (this.map.has(item.email) === false) {
                        this.map.set(item.email, data.filter(t => t.email === item.email));
                    }
                }
                console.log(this.map);
            }
        );
    }

    showData(item: KeyValue<string, Contact[]>) {
        this.selectedUser = item.key;
        console.log(item.value);
        const unreadMessages = item.value.filter(m => m.replied === false);
        if (unreadMessages?.length > 0) {
            for (const value of unreadMessages) {
                value.replied = true;
                this.contactService.save(value).subscribe();
            }
        }
        this.contacts = item.value;
    }


    send() {
        this.contact.setFrom = 'ADMIN';
        const date = new Date();
        this.contact.date = this.datepipe.transform(date, 'yyyy-MM-dd hh:mm:ss');
        this.contact.email = this.contacts[0].email;
        this.contact.name = this.contacts[0].name;
        this.contact.phone = this.contacts[0].phone;
        this.contact.replied = true;
        this.animation.showAnimation = true;
        this.contactService.reply(this.contact).subscribe(data => {
            this.contacts.push({...data});
            this.contact = new Contact();
            this.animation.showAnimation = false;
        }, error => {
            console.log(error);
            this.animation.showAnimation = false;
            this.toast.add({
                severity: 'error',
                detail: 'Something went wrong, please try again.',
                life: 4000
            });
        });
    }

    getBadgeValue(value: Contact[]): number {
        const num =  value.filter(c => c.replied === false).length;
        console.log('-----------:  ' + num);
        return num;
    }
}
