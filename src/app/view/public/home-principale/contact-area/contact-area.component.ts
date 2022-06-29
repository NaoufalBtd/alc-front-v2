import {Component, OnInit} from '@angular/core';
import {Prof} from '../../../../controller/model/prof.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ProfService} from '../../../../controller/service/prof.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-contact-area',
    templateUrl: './contact-area.component.html',
    styleUrls: ['./contact-area.component.scss']
})
export class ContactAreaComponent implements OnInit {
    submitted = false;

    constructor(private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private service: ProfService, private router: Router) {
    }

    ngOnInit(): void {
    }

    get selectedProf(): Prof {
        return this.service.selectedProf;
    }

    set selectedProf(value: Prof) {
        this.service.selectedProf = value;
    }

    isDisabled(): boolean {
        if (this.selectedProf?.nom === undefined
            || this.selectedProf?.username === undefined
            || this.selectedProf?.username?.length === 0
            || this.selectedProf?.username === null
            || !this.selectedProf?.username?.includes('@')
            || !this.selectedProf?.username?.includes('.')
            || !this.selectedProf?.username?.includes('com')
            || this.selectedProf?.numero === null
            || this.selectedProf?.numero === undefined
            || this.selectedProf?.numero?.length < 4
        ) {
            return true;
        } else {
            return false;
        }
    }


    public save() {
        if (this.isDisabled()) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Please fill out all required fields',
                life: 6000
            });
            return;
        }
        this.selectedProf.categorieProf.id = 1;
        this.submitted = true;
        console.log(this.selectedProf);
        this.service.save().subscribe(
            (data) => {
                this.selectedProf = new Prof();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Registration added, please check your email to get your password.',
                    life: 3000
                });
                this.router.navigate(['/public/login']);
            }, error => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Warning',
                    detail: 'Registration canceled',
                    life: 3000
                });
                console.log(error);
            });
        this.selectedProf = new Prof();
    }


}
