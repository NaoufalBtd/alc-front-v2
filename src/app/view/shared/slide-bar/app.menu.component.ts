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


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
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
                public appMain: PublicComponent,
                private service: LoginService,
                public authenticationService: AuthenticationService) {
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

            if (this.user.role === 'ADMIN') {
                this.model = [
                    {label: 'Manage Levels', icon: 'pi pi-fw pi-table', routerLink: ['/admin/parcours']},
                    {label: 'Manage Section', icon: 'pi pi-briefcase', routerLink: ['/admin/manage-section']},
                    {label: 'Inscriptions List', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/inscription']},
                    {label: 'Students List', icon: 'pi pi-fw pi-list', routerLink: ['/admin/students-List']},
                    {label: 'Groups Option', icon: 'pi pi-fw pi-user-edit', routerLink: ['/admin/groups-List']},
                    {label: 'Students Group List', icon: 'pi pi-fw pi-list', routerLink: ['/admin/groups-students']},
                    {label: 'Professors', icon: 'pi pi-fw pi-user', routerLink: ['/admin/teacher-lists']},
                    {label: 'Home Work', icon: 'pi pi-question-circle', routerLink: ['/admin/home-work-review']},
                    {label: 'Sessions List ', icon: 'pi pi-fw pi-paperclip', routerLink: ['/admin/sessioncours']},
                    {label: 'FAQ ANSWER', icon: 'pi pi-fw pi-reply', routerLink: ['/admin/faq-admin']},
                    {label: 'FAQ List', icon: 'pi pi-fw pi-info-circle', routerLink: ['/admin/faq-admin-list']},
                    {label: 'CREATE NEWS', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/admin/news-admin']},
                    {label: 'Schedule', icon: 'pi pi-calendar', routerLink: ['/admin/schedule']},
                    {label: 'Emails', icon: 'pi pi-envelope', routerLink: ['/admin/emails']},
                    {label: 'Promotion', icon: 'pi pi-slack', routerLink: ['/admin/promotion']},
                    {label: 'Bonus', icon: 'pi pi-fw pi-wallet', routerLink: ['/admin/bonus']},
                    {label: 'Packs', icon: 'pi pi-briefcase', routerLink: ['/admin/PackStudent']},
                    {label: 'Complaint', icon: 'pi pi-bell', routerLink: ['/admin/complaint']},
                    {label: 'Type of Complaint', icon: 'pi pi-bell', routerLink: ['/admin/typeofcomplaint']},
                    {label: 'Invited List', icon: 'pi pi-share-alt', routerLink: ['/admin/invitedList']},
                    {label: 'More information', icon: 'pi pi-plus', routerLink: ['/admin/infoEtudiant']},
                    {label: 'Recommendation', icon: 'pi pi-fw pi-user-plus', routerLink: ['/admin/recommend-admin']},


                ];
            } else if (this.user.role === 'TEACHER') {
                this.model = [
                    {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/prof/home']},
                    {label: 'Recommend A teacher', icon: 'pi pi-fw pi-comment', routerLink: ['/prof/recommendation-teacher']},
                    {label: 'Salary', icon: 'pi pi-fw pi-money-bill', routerLink: ['/prof/salary']},
                    {label: 'Classes', icon: 'pi pi-fw pi-table', routerLink: ['/prof/classes']},
                    {label: 'Session-Synthese', icon: 'pi pi-fw pi-briefcase', routerLink: ['/prof/synthese']},
                    {label: 'Students Review', icon: 'pi pi-fw pi-comment', routerLink: ['/prof/etudiantReviewcomment']},
                    {label: 'Schedule', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/prof/schedule']},
                    {label: 'News', icon: 'pi pi-fw pi-clock', routerLink: ['/prof/news-teacher']},
                    {label: 'Student HomeWork', icon: 'pi pi-sliders-h', routerLink: ['/prof/sudents-homework']},
                    {label: 'FAQ', icon: 'pi pi-fw pi-question-circle', routerLink: ['/prof/faq-teacher']},
                ];
            } else {
                this.model = [
                    {label: 'Dashboard ', icon: 'pi pi-fw pi-home', routerLink: ['/etudiant/dashboard']},
                    {label: 'FAQ ', icon: 'pi pi-fw pi-question-circle', routerLink: ['/etudiant/faq-student']},
                    {label: 'News ', icon: 'pi pi-fw pi-clock', routerLink: ['/etudiant/news-student']},
                    {label: 'Schedule', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/etudiant/schedule-student']},
                    {label: 'Invited Student', icon: 'pi pi-fw pi-share-alt', routerLink: ['/etudiant/inviteStudent']},
                    {label: 'My Promotion', icon: 'pi pi-th-large', routerLink: ['/etudiant/myPromotionList']},
                ];
            }
        }
    }


    onMenuClick(event) {
        console.log(event);
        this.appMain.onMenuClick(event);
        this.appMain.onMenuClick(event);
        this.appMain.rightPanelMenuActive = false;
    }
}
