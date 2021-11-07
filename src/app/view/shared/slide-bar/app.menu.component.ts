import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AppComponent} from '../../../app.component';
import {LoginService} from '../../../controller/service/login.service';
import {Prof} from '../../../controller/model/prof.model';
import {Admin} from '../../../controller/model/admin.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {PublicComponent} from '../../public/public.component';
import {User} from '../../../controller/model/user.model';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {Role} from '../../../enum/role.enum';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app.menu.component.css'],
    animations: [
        trigger('inline', [
            state('hidden', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*',
            })),
            state('hiddenAnimated', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visibleAnimated', style({
                height: '*',
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMenuComponent implements OnInit {
    user: User = new User();

    // model: any[];

    constructor(public app: AppComponent,
                private authService: AuthenticationService,
                public appMain: PublicComponent, private service: LoginService) {
    }

    get model(): any[] {
        return this.service.model;
    }

    set model(value: any[]) {
        this.service.model = value;
    }

    get prof(): Prof {
        return this.service.prof;
    }


    get admin(): Admin {
        return this.service.admin;
    }


    get etudiant(): Etudiant {
        return this.service.getConnectedStudent();
    }


    ngOnInit() {
        this.user = this.authService.getUserFromLocalCache();

        if (this.user === null) {
            return;
        } else {


            // @ts-ignore
            if (this.user.authorities[0].authority === Role.ADMIN) {
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
                ];
            } // @ts-ignore
            else if (this.user.authorities[0].authority === Role.PROF) {
                this.model = [
                    {label: 'HomeTeacher', icon: 'pi pi-fw pi-home', routerLink: ['/prof/home']},
                    {label: 'Recommend A teacher', icon: 'pi pi-fw pi-comment', routerLink: ['/prof/recommendation-teacher']},
                    {label: 'Salary', icon: 'pi pi-fw pi-money-bill', routerLink: ['/prof/salary']},
                    {label: 'Parcours', icon: 'pi pi-fw pi-list', routerLink: ['/prof/courses']},
                    {label: 'Classes', icon: 'pi pi-fw pi-table', routerLink: ['/prof/classes']},
                    {label: 'Synthese-Session-Cours', icon: 'pi pi-fw pi-briefcase', routerLink: ['/prof/synthese']},
                    {label: 'Schedule', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/prof/schedule']},
                    {label: 'News', icon: 'pi pi-fw pi-clock', routerLink: ['/prof/news-teacher']},
                    {label: 'Student Review', icon: 'pi pi-fw pi-comments', routerLink: ['/prof/comment-review']},
                    {label: 'FAQ', icon: 'pi pi-fw pi-question-circle', routerLink: ['/prof/faq-teacher']},
                ];
            } else {
                this.model = [
                    {label: 'Courses ', icon: 'pi pi-fw pi-briefcase', routerLink: ['/etudiant/etudiant-cours']},
                    {label: 'FAQ ', icon: 'pi pi-fw pi-question-circle', routerLink: ['/etudiant/faq-student']},
                    {label: 'News ', icon: 'pi pi-fw pi-clock', routerLink: ['/etudiant/news-student']},
                    {label: 'Schedule', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/etudiant/schedule-student']},

                ];
            }
        }
    }


    onMenuClick(event) {
        this.appMain.onMenuClick(event);
        this.appMain.rightPanelMenuActive = false;
    }
}
