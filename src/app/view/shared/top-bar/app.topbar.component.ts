import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from '../../../app.component';
import {MenuItem} from 'primeng/api';
import {LoginService} from '../../../controller/service/login.service';
import {PublicComponent} from '../../public/public.component';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {User} from '../../../controller/model/user.model';
import {Router} from '@angular/router';
import {Role} from '../../../enum/role.enum';
import {Subscription} from 'rxjs';
import {ProfService} from '../../../controller/service/prof.service';
import {EtudiantService} from '../../../controller/service/etudiant.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app-topbar.component.css'],
})
export class AppTopBarComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    role: Role;
    items: MenuItem[];
    user: User = new User();
    hidePopUp = true;
    itemstopBar: string[];


    constructor(public app: AppComponent, public appMain: PublicComponent,
                public router: Router,
                public authenticationService: AuthenticationService, public loginservice: LoginService,
                private profService: ProfService, private studentservice: EtudiantService, public translate: TranslateService) {
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }


    ngOnInit(): void {
        this.user = this.authenticationService.getUserFromLocalCache();
        this.itemstopBar = ['sign In', 'admin', 'Teacher', 'Student'];

    }

    public logOut() {
        this.loginservice.model = [];
        this.loginservice.hasloged = false;
        if (this.isStudent()) {
            this.profService.removeConnectedStudent(this.user.id);
        }
        this.authenticationService.logOut();
        this.router.navigate(['']);
    }

    public isAdmin(): boolean {
        if (this.authenticationService.getUserFromLocalCache() == null) {
            return false;
        } else {
            return this.authenticationService.getUserFromLocalCache().role === Role.ADMIN;

        }
    }

    public isProf(): boolean {
        if (this.authenticationService.getUserFromLocalCache() == null) {
            return false;
        } else {
            return this.authenticationService.getUserFromLocalCache().role === Role.PROF;

        }
    }

    public isStudent(): boolean {
        if (this.authenticationService.getUserFromLocalCache() == null) {
            return false;
        } else {
            return this.authenticationService.getUserFromLocalCache().role === Role.STUDENT;

        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    selectedLangage(event: any) {
        console.log(event.target.value);
        this.translate.use(event.target.value);
    }

    goToProfile() {
        if (this.authenticationService.getUserFromLocalCache() == null) {
            return;
        } else {
            if (this.authenticationService.getUserFromLocalCache().role === Role.STUDENT) {
                this.router.navigate(['etudiant/profile']);
            } else if (this.authenticationService.getUserFromLocalCache().role === Role.PROF) {
                this.router.navigate(['prof/profile']);
            } else {
                this.router.navigate(['admin/profile']);
            }
        }
    }
}
