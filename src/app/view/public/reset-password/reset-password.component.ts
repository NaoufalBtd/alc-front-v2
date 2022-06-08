import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../controller/service/user.service';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    public username: string;

    constructor(private userService: UserService,
                private messageService: MessageService,
    ) {
    }

    ngOnInit(): void {
    }

    public resetPassword() {
        this.userService.resetPassword(this.username).subscribe(
            data => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'The new password has been sent to your email'
                });

            }, error => {
                console.log(error);
            }
        );
    }

    sort(value: any) {
        console.log(value);
    }
}
