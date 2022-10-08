import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AuthenticationService} from '../../../../../controller/service/authentication.service';
import {UserService} from '../../../../../controller/service/user.service';
import {LoginService} from '../../../../../controller/service/login.service';
import {Router} from '@angular/router';
import {User} from '../../../../../controller/model/user.model';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {HeaderType} from '../../../../../enum/header-type.enum';
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
                private authenticationService: AuthenticationService,private translate: TranslateService,
                private userService: UserService,
                private service: LoginService, private router: Router) {

    }


    public onLogin(user: User): void {
        this.showLoading = true;
        this.subscriptions.push(
            this.authenticationService.login(user).subscribe(
                (response: HttpResponse<User>) => {
                    const token = response.headers.get(HeaderType.JWT_TOKEN);
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
                    this.messageService.add({
                        severity: 'error',
                        detail: 'bad credited for username ',
                        life: 4000
                    });
                    console.log(errorResponse);
                }
            )
        );
    }

    ngOnInit(): void {
    }
    
}
