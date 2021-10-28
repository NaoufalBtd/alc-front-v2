import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {LoginService} from '../../../controller/service/login.service';
import {Prof} from '../../../controller/model/prof.model';
import {Admin} from '../../../controller/model/admin.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {HeaderType} from '../../../enum/header-type.enum';
import {User} from '../../../controller/model/user.model';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {AdminService} from '../../../controller/service/admin.service';
import {UserService} from '../../../controller/service/user.service';

@Component({
    selector: 'app-login-admin',
    templateUrl: './login-admin.component.html',
    styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
    public showLoading: boolean | undefined;
    private subscriptions: Subscription[] = [];
    admin: User = new User();

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
                private authenticationService: AuthenticationService,
                private userService: UserService,
                private adminService: AdminService,
                private service: LoginService, private router: Router) {

    }

    // get admin(): Admin {
    //     return this.adminService.selected;
    // }
    // get user(): Admin {
    //     return this.userService.us;
    // }


    get model(): MenuItem[] {
        return this.service.model;
    }

    set model(value: MenuItem[]) {
        this.service.model = value;
    }


    public onLogin(user: User): void {
        this.showLoading = true;
        this.subscriptions.push(
            this.authenticationService.login(user).subscribe(
                (response: HttpResponse<User>) => {
                    const token = response.headers.get(HeaderType.JWT_TOKEN);
                    this.authenticationService.saveToken(token);
                    this.authenticationService.addUserToLocalCache(response.body);
                    this.model = [
                        {label: 'Manage Parcours', icon: 'pi pi-fw pi-table', routerLink: ['/admin/parcours']},
                        {label: 'Inscriptions List', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/inscription']},
                        {label: 'Students List', icon: 'pi pi-fw pi-list', routerLink: ['/admin/students-List']},
                        {label: 'Professor', icon: 'pi pi-fw pi-user', routerLink: ['/admin/teacher-lists']},
                        {label: 'Professor Recommendation', icon: 'pi pi-fw pi-user-plus', routerLink: ['/admin/recommend-admin']},
                        {label: 'Paiement', icon: 'pi pi-fw pi-wallet', routerLink: ['/admin/paiement']},
                        {label: 'FAQ ANSWER', icon: 'pi pi-fw pi-reply', routerLink: ['/admin/faq-admin']},
                        {label: 'FAQ List', icon: 'pi pi-fw pi-info-circle', routerLink: ['/admin/faq-admin-list']},
                        {label: 'CREATE NEWS', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/admin/news-admin']},
                        {label: 'Schedule', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/admin/schedule']},
                        {label: 'LogOut ', icon: 'pi pi-fw pi-sign-out', routerLink: ['']},
                    ];
                    this.router.navigate(['admin/parcours']);
                    this.showLoading = false;
                },
                (errorResponse: HttpErrorResponse) => {
                    console.log(errorResponse.message);
                    this.showLoading = false;
                }
            )
        );
    }




    ngOnInit(): void {

        if (this.authenticationService.isUserLoggedIn()) {
            this.model = [
                {label: 'Manage Parcours', icon: 'pi pi-fw pi-table', routerLink: ['/admin/parcours']},
                {label: 'Inscriptions List', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/inscription']},
                {label: 'Students List', icon: 'pi pi-fw pi-list', routerLink: ['/admin/students-List']},
                {label: 'Professor', icon: 'pi pi-fw pi-user', routerLink: ['/admin/teacher-lists']},
                {label: 'Recommendation', icon: 'pi pi-fw pi-user-plus', routerLink: ['/admin/recommend-admin']},
                {label: 'Paiement', icon: 'pi pi-fw pi-wallet', routerLink: ['/admin/paiement']},
                {label: 'FAQ ANSWER', icon: 'pi pi-fw pi-reply', routerLink: ['/admin/faq-admin']},
                {label: 'FAQ List', icon: 'pi pi-fw pi-info-circle', routerLink: ['/admin/faq-admin-list']},
                {label: 'CREATE NEWS', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/admin/news-admin']},
                {label: 'Schedule', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/admin/schedule']},
                {label: 'LogOut ', icon: 'pi pi-fw pi-sign-out', routerLink: ['']},
            ];
            this.router.navigate(['admin/parcours']);
        } else {
            this.router.navigateByUrl('public/login-admin');
        }
    }

}
