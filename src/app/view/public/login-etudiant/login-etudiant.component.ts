import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LoginService} from '../../../controller/service/login.service';
import {Prof} from '../../../controller/model/prof.model';
import {Admin} from '../../../controller/model/admin.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {Subscription} from 'rxjs';
import {User} from '../../../controller/model/user.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {HeaderType} from '../../../enum/header-type.enum';

@Component({
    selector: 'app-login-etudiant',
    templateUrl: './login-etudiant.component.html',
    styleUrls: ['./login-etudiant.component.scss']
})
export class LoginEtudiantComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    user: User = new User();

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
                private service: LoginService, private router: Router,
                private authenticationService: AuthenticationService,
    ) {

    }

    get model(): any[] {
        return this.service.model;
    }

    set model(value: any[]) {
        this.service.model = value;
    }

    public onLogin(user: User): void {
        // this.showLoading = true;
        this.subscriptions.push(
            this.authenticationService.login(user).subscribe(
                (response: HttpResponse<User>) => {
                    const token = response.headers.get(HeaderType.JWT_TOKEN);
                    this.authenticationService.saveToken(token);
                    this.authenticationService.addUserToLocalCache(response.body);
                    this.model = [
                        {label: 'Courses ', icon: 'pi pi-fw pi-briefcase', routerLink: ['/etudiant/etudiant-cours']},
                        {label: 'FAQ ', icon: 'pi pi-fw pi-question-circle', routerLink: ['/etudiant/faq-student']},
                        {label: 'News ', icon: 'pi pi-fw pi-clock', routerLink: ['/etudiant/news-student']},
                        {label: 'Schedule', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/etudiant/schedule-student']},
                        {label: 'LogOut ', icon: 'pi pi-fw pi-sign-out', routerLink: ['']},
                    ];
                    this.router.navigate(['/etudiant/etudiant-cours']);
                },
                (errorResponse: HttpErrorResponse) => {
                    console.log(errorResponse.message);
                }
            )
        );
    }

    //
    // public findEtudiant() {
    //
    //     this.service.findEtudiant(this.login, this.password).subscribe(
    //         data => {
    //             this.etudiant = data;
    //             this.admin = null;
    //             this.prof = null;
    //             console.log(this.etudiant);
    //             this.correct = true;
    //
    //         },
    //         error => {
    //             document.getElementById('log-pass').style.visibility = 'visible';
    //             this.correct = false;
    //         });
    // }


    ngOnInit(): void {
        if (this.authenticationService.isUserLoggedIn()) {
            this.model = [
                {label: 'Courses ', icon: 'pi pi-fw pi-briefcase', routerLink: ['/etudiant/etudiant-cours']},
                {label: 'FAQ ', icon: 'pi pi-fw pi-question-circle', routerLink: ['/etudiant/faq-student']},
                {label: 'News ', icon: 'pi pi-fw pi-clock', routerLink: ['/etudiant/news-student']},
                {label: 'Schedule', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/etudiant/schedule-student']},
                {label: 'LogOut ', icon: 'pi pi-fw pi-sign-out', routerLink: ['']},
            ];
            this.router.navigate(['/etudiant/etudiant-cours']);
        } else {
            this.router.navigateByUrl('public/login-etudiant');
        }
    }

}
