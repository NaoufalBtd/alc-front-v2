import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from '../../../app.component';
import {MenuItem} from 'primeng/api';
import {LoginService} from '../../../controller/service/login.service';
import {PublicComponent} from '../../public/public.component';
import {AdminComponent} from '../../admin/admin.component';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {User} from '../../../controller/model/user.model';
import {Router} from '@angular/router';
import {Role} from '../../../enum/role.enum';
import {Subscription} from 'rxjs';
import {ProfService} from '../../../controller/service/prof.service';
import {EtudiantService} from '../../../controller/service/etudiant.service';

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

    constructor(public app: AppComponent, public appMain: PublicComponent,
                private router: Router,
                private authenticationService: AuthenticationService, public loginservice: LoginService,
                private profService: ProfService, private studentservice: EtudiantService) {
    }


    private getUserRole(): string {
        if (this.user.authorities.length > 0) {
            // @ts-ignore
            return this.authenticationService.getUserFromLocalCache().authorities[0].authority;
        } else {
            return null;
        }
    }

    ngOnInit(): void {
        this.user = this.authenticationService.getUserFromLocalCache();
        // // @ts-ignore
        // console.log(this.user.authorities[0].authority); // get role
    }

    public logOut() {
        this.loginservice.hasloged = false;
        if (this.isStudent()) {
            this.profService.removeConnectedStudent(this.user.id);
        }
        this.authenticationService.logOut();
        this.router.navigate(['/']);
    }

    public isAdmin(): boolean {
        if (this.user == null) {
            return false;
        } else {
            // @ts-ignore
            return this.user.authorities[0].authority === Role.ADMIN;

        }
    }

    public isProf(): boolean {
        if (this.user == null) {
            return false;
        } else {
            // @ts-ignore
            return this.user.authorities[0].authority === Role.PROF;

        }
    }

    public isStudent(): boolean {
        if (this.user == null) {
            return false;
        } else {
            // @ts-ignore
            return this.user.authorities[0].authority === Role.STUDENT;

        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
