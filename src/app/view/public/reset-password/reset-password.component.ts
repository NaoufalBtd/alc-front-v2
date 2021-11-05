import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../controller/service/user.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    public username: string;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
    }

    public resetPassword() {
        console.log(this.username);
        this.userService.resetPassword(this.username).subscribe(
            data => {
                if (data === 0) {
                    alert('please check your email to get the new password.');
                } else {
                    alert('Your email is not valid, please try again or contact administrator for more information.');
                }
            }, error => {
                console.log(error);
            }
        );
    }

    sort(value: any) {
        console.log(value);
    }
}
