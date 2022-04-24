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
        this.userService.resetPassword(this.username).subscribe(
            data => {

                alert(data);

            }, error => {
                console.log(error);
            }
        );
    }

    sort(value: any) {
        console.log(value);
    }
}
