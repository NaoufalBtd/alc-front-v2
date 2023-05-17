import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../controller/service/user.service';
import {MessageService} from 'primeng/api';
import {AnimationService} from '../../../controller/service/animation.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    public username: string;

    constructor(private userService: UserService,
                public translate: TranslateService,
                private  router: Router,
                private animation: AnimationService,
                private messageService: MessageService,
    ) {
    }

    ngOnInit(): void {
    }

    set showAnimation(value: boolean) {
        this.animation.showAnimation = value;
    }

    public resetPassword() {
        this.showAnimation = true;
        this.userService.resetPassword(this.username).subscribe(
            data => {
                this.showAnimation = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    life: 3000,
                    detail: 'The new password has been sent to your email'
                });

            }, error => {
                this.showAnimation = false;
                console.log(error);
                if (error?.status === 200) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        life: 3000,
                        detail: 'The new password has been sent to your email'
                    });
                } else {
                    this.messageService.add({
                        severity: 'info',
                        detail: error?.error?.message,
                        life: 5000
                    });
                }
            }
        );
    }

    sort(value: any) {
        console.log(value);
    }

    emailValidator(): { [key: string]: any } | null {
        const valid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.username);
        return valid ? null : {invalidEmail: true};
    }
}
