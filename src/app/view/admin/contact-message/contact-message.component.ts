import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../../controller/service/contact.service';
import {Contact} from '../../../controller/model/contact.model';
import {Role} from '../../../enum/role.enum';
import {KeyValue} from '@angular/common';

@Component({
    selector: 'app-contact-message',
    templateUrl: './contact-message.component.html',
    styleUrls: ['./contact-message.component.scss']
})
export class ContactMessageComponent implements OnInit {
    contacts: Array<Contact> = new Array<Contact>();
    role = Role;
    map: Map<string, Contact[]> = new Map<string, Contact[]>();
    contact: Contact = new Contact();

    constructor(private contactService: ContactService) {
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
        this.contacts = item.value;
    }


    send() {
        this.contact = new Contact();
    }
}
