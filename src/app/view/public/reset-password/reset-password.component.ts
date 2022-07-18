import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../controller/service/user.service';
import {MessageService} from 'primeng/api';
import {AnimationService} from '../../../controller/service/animation.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    public username: string;

    constructor(private userService: UserService,
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
                if (error?.status === 200){
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        life: 3000,
                        detail: 'The new password has been sent to your email'
                    });
                }
                else {
                    this.messageService.add({
                        severity: 'error',
                        summary: ' ',
                        detail: error?.error?.error,
                        life: 3000
                    });
                }
            }
        );
    }

    sort(value: any) {
        console.log(value);
    }
}
