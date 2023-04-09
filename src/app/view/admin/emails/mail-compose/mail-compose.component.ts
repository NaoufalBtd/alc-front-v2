import {Component, OnDestroy, OnInit} from '@angular/core';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {EmailService} from '../../../../controller/service/email.service';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {Email} from '../../../../controller/model/email';
import {AnimationService} from '../../../../controller/service/animation.service';
import {GroupeEtudiantService} from '../../../../controller/service/groupe-etudiant-service';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-mail-compose',
    templateUrl: './mail-compose.component.html',
    styleUrls: ['./mail-compose.component.scss']
})
export class MailComposeComponent implements OnInit, OnDestroy {
    to: any = null;
    toGroup: number = null;
    email: Email = new Email();
    froms: any = [
        'noreply@engflexy.com',
        'info@engflexy.com',
        'contact@engflexy.com',
    ];

    constructor(private emailService: EmailService,
                private groupService: GroupeEtudiantService,
                private messageService: MessageService,
                private animation: AnimationService) {
    }

    get groups(): Array<GroupeEtudiant> {
        return this.emailService.groups;
    }

    get students(): Array<Etudiant> {
        return this.emailService.students;
    }


    get emails(): Email[] {
        return this.emailService.emails;
    }

    set emails(value: Email[]) {
        this.emailService.emails = value;
    }

    ngOnInit(): void {

    }


    ngOnDestroy(): void {
    }

    sent() {
        if (this.toGroup !== null) {
            this.groupService.findAllGroupeEtudiantDetail(this.toGroup).subscribe(d => {
                const to: Array<string> = new Array<string>();
                for (const item of d) {
                    to.push(item?.etudiant?.username);
                }
                console.log(to);
                this.email.to = JSON.stringify(to);
                this.sentMessage(this.email);
            });
            return;
        } else if (this.to !== null) {
            this.email.to = JSON.stringify(this.to);
            this.sentMessage(this.email);
        }
    }

    private sentMessage(email: Email) {
        this.animation.showAnimation = true;
        this.emailService.save(email).subscribe(d => {
            console.log(d);
            this.emails.push({...d});
            this.animation.showAnimation = false;
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'message sent Successful',
                life: 5000
            });
        }, error => {
            this.animation.showAnimation = false;
            this.messageService.add({
                severity: 'error',
                detail: error?.error?.message,
                life: 5000
            });
            console.log(error);
        });
    }
}
