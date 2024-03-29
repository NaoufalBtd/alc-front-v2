import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AuthenticationService} from '../../../../../controller/service/authentication.service';
import {UserService} from '../../../../../controller/service/user.service';
import {LoginService} from '../../../../../controller/service/login.service';
import {Router} from '@angular/router';
import {User} from '../../../../../controller/model/user.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Role} from '../../../../../enum/role.enum';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-sign-in-area',
    templateUrl: './sign-in-area.component.html',
    styleUrls: ['./sign-in-area.component.scss']
})
export class SignInAreaComponent implements OnInit {
    user: User = new User();
    public showLoading: boolean | undefined;
    subscriptions: Subscription[] = [];

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
                private authenticationService: AuthenticationService,
                public translate: TranslateService,
                private userService: UserService,
                private service: LoginService, private router: Router) {
    }


    public onLogin(user: User): void {
        this.showLoading = true;
        this.subscriptions.push(
            this.authenticationService.login(user).subscribe(
                (response: HttpResponse<User>) => {
                    const token = response.body.token;
                    console.log(token);
                    this.authenticationService.saveToken(token);
                    this.authenticationService.addUserToLocalCache(response.body);
                    this.service.hasloged = true;
                    if (response.body.role === Role.PROF) {
                        this.router.navigate(['prof/home']);
                    } else if (response.body.role === Role.ADMIN) {
                        this.router.navigate(['admin/parcours']);
                    } else {
                        this.router.navigate(['/etudiant/dashboard']);
                    }
                    this.showLoading = false;
                },
                (errorResponse: HttpErrorResponse) => {
                    console.log(errorResponse.message.indexOf('password'));
                    if (errorResponse.error.message.indexOf('password') != -1) {
                        this.messageService.add({
                            severity: 'error',
                            detail: 'It seems that you forget the password, you\'ve redirected to reset password page',
                            life: 5000
                        });
                        this.router.navigateByUrl('resetPassword');
                    } else if (errorResponse.error.message.indexOf('Lock') != -1) {
                        this.messageService.add({
                            summary: 'Blocked Try us soon',
                            severity: 'error',
                            detail: 'We are sorry it seems that you passed the authorized number of tries. \n Try us soon',
                            life: 5000
                        });
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            detail: 'bad credited for username ',
                            life: 4000
                        });
                        console.log(errorResponse);
                    }
                }
            )
        );
    }

    ngOnInit(): void {
    }

}
