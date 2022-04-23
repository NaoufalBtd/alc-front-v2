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
import {Menu} from 'primeng/menu';
import {backgroundColor} from 'html2canvas/dist/types/css/property-descriptors/background-color';
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
    itemstopBar: String[];


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
        this.router.navigate(['/']);
    }

    public isAdmin(): boolean {
        if (this.authenticationService.getUserFromLocalCache() == null) {
            return false;
        } else {
            return this.authenticationService.getUserFromLocalCache().role === 'ADMIN';

        }
    }

    public isProf(): boolean {
        if (this.authenticationService.getUserFromLocalCache() == null) {
            return false;
        } else {
            return this.authenticationService.getUserFromLocalCache().role === 'TEACHER';

        }
    }

    public isStudent(): boolean {
        if (this.authenticationService.getUserFromLocalCache() == null) {
            return false;
        } else {
            return this.authenticationService.getUserFromLocalCache().role === 'STUDENT';

        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    selectedLangage(event: any) {
        console.log(event.target.value);
        this.translate.use(event.target.value);

    }
}
