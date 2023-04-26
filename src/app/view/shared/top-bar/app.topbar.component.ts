import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from '../../../app.component';
import {MenuItem, PrimeNGConfig} from 'primeng/api';
import {LoginService} from '../../../controller/service/login.service';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {User} from '../../../controller/model/user.model';
import {Router} from '@angular/router';
import {Role} from '../../../enum/role.enum';
import {Subscription} from 'rxjs';
import {ProfService} from '../../../controller/service/prof.service';
import {EtudiantService} from '../../../controller/service/etudiant.service';
import {TranslateService} from '@ngx-translate/core';
import {MenuService} from '../slide-bar/app.menu.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app-topbar.component.scss'],
})
export class AppTopBarComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    role: Role;
    items: MenuItem[];
    user: User = new User();
    langs = [
        {code: 'en', lab: 'English', img: '/assets/images/united-states-of-america-flag.png'},
        {code: 'fr', lab: 'Francais', img: '/assets/images/france-flag.png'},
        {code: 'ar', lab: 'العربية', img: '/assets/images/morocco-flag.png'}
    ];


    constructor(public app: AppComponent,
                public router: Router,
                private menuService: MenuService,
                private primengConfig: PrimeNGConfig,
                public authenticationService: AuthenticationService,
                public loginservice: LoginService,
                private profService: ProfService,
                private studentservice: EtudiantService,
                public translate: TranslateService) {
    }


    get itemstopBar(): string[] {
        return this.menuService.itemstopBar;
    }

    set itemstopBar(value: string[]) {
        this.menuService.itemstopBar = value;
    }

    get overlayMenuActive(): boolean {
        return this.menuService.overlayMenuActive;
    }

    set overlayMenuActive(value: boolean) {
        this.menuService.overlayMenuActive = value;
    }

    get staticMenuDesktopInactive(): boolean {
        return this.menuService.staticMenuDesktopInactive;
    }

    set staticMenuDesktopInactive(value: boolean) {
        this.menuService.staticMenuDesktopInactive = value;
    }

    get staticMenuMobileActive(): boolean {
        return this.menuService.staticMenuMobileActive;
    }

    set staticMenuMobileActive(value: boolean) {
        this.menuService.staticMenuMobileActive = value;
    }

    get layoutMenuScroller(): HTMLDivElement {
        return this.menuService.layoutMenuScroller;
    }

    set layoutMenuScroller(value: HTMLDivElement) {
        this.menuService.layoutMenuScroller = value;
    }

    get menuClick(): boolean {
        return this.menuService.menuClick;
    }

    set menuClick(value: boolean) {
        this.menuService.menuClick = value;
    }

    get userMenuClick(): boolean {
        return this.menuService.userMenuClick;
    }

    set userMenuClick(value: boolean) {
        this.menuService.userMenuClick = value;
    }

    get notificationMenuClick(): boolean {
        return this.menuService.notificationMenuClick;
    }

    set notificationMenuClick(value: boolean) {
        this.menuService.notificationMenuClick = value;
    }

    get rightMenuClick(): boolean {
        return this.menuService.rightMenuClick;
    }

    set rightMenuClick(value: boolean) {
        this.menuService.rightMenuClick = value;
    }

    get resetMenu(): boolean {
        return this.menuService.resetMenu;
    }

    set resetMenu(value: boolean) {
        this.menuService.resetMenu = value;
    }

    get menuHoverActive(): boolean {
        return this.menuService.menuHoverActive;
    }

    set menuHoverActive(value: boolean) {
        this.menuService.menuHoverActive = value;
    }

    get topbarUserMenuActive(): boolean {
        return this.menuService.topbarUserMenuActive;
    }

    set topbarUserMenuActive(value: boolean) {
        this.menuService.topbarUserMenuActive = value;
    }

    get topbarNotificationMenuActive(): boolean {
        return this.menuService.topbarNotificationMenuActive;
    }

    set topbarNotificationMenuActive(value: boolean) {
        this.menuService.topbarNotificationMenuActive = value;
    }

    get rightPanelMenuActive(): boolean {
        return this.menuService.rightPanelMenuActive;
    }

    set rightPanelMenuActive(value: boolean) {
        this.menuService.rightPanelMenuActive = value;
    }

    get configActive(): boolean {
        return this.menuService.configActive;
    }

    set configActive(value: boolean) {
        this.menuService.configActive = value;
    }

    get configClick(): boolean {
        return this.menuService.configClick;
    }

    set configClick(value: boolean) {
        this.menuService.configClick = value;
    }



    set profileClick(value: boolean) {
        this.menuService.profileClick = value;
    }

    get inlineUserMenuActive(): boolean {
        return this.menuService.inlineUserMenuActive;
    }

    set inlineUserMenuActive(value: boolean) {
        this.menuService.inlineUserMenuActive = value;
    }


    ngOnInit(): void {
        this.user = this.authenticationService.getUserFromLocalCache();
        this.menuService.itemstopBar = ['sign In', 'admin', 'Teacher', 'Student'];

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
        console.log(event);
        this.translate.use(event);
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


    onLayoutClick() {
        if (!this.menuService.userMenuClick) {
            this.menuService.topbarUserMenuActive = false;
        }

        if (!this.menuService.notificationMenuClick) {
            this.menuService.topbarNotificationMenuActive = false;
        }

        if (!this.menuService.rightMenuClick) {
            this.menuService.rightPanelMenuActive = false;
        }

        if (!this.menuService.profileClick && this.isSlim()) {
            this.menuService.inlineUserMenuActive = false;
        }

        if (!this.menuService.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.menuService.reset();
            }

            if (this.menuService.overlayMenuActive || this.menuService.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuService.menuHoverActive = false;
            this.unblockBodyScroll();
        }

        if (this.menuService.configActive && !this.menuService.configClick) {
            this.menuService.configActive = false;
        }

        this.menuService.configClick = false;
        this.menuService.userMenuClick = false;
        this.menuService.rightMenuClick = false;
        this.menuService.notificationMenuClick = false;
        this.menuService.menuClick = false;
        this.menuService.profileClick = false;
    }

    onMenuButtonClick(event) {
        this.menuService.menuClick = true;
        this.menuService.topbarUserMenuActive = false;
        this.menuService.topbarNotificationMenuActive = false;
        this.menuService.rightPanelMenuActive = false;

        if (this.isOverlay()) {
            this.menuService.overlayMenuActive = !this.menuService.overlayMenuActive;
        }

        if (this.isDesktop()) {
            this.menuService.staticMenuDesktopInactive = !this.menuService.staticMenuDesktopInactive;
        } else {
            this.menuService.staticMenuMobileActive = !this.menuService.staticMenuMobileActive;
            if (this.menuService.staticMenuMobileActive) {
                this.blockBodyScroll();
            } else {
                this.unblockBodyScroll();
            }
        }

        event.preventDefault();
    }

    onMenuClick(event) {
        this.menuClick = true;
        this.resetMenu = false;
    }

    onTopbarUserMenuButtonClick(event) {
        this.userMenuClick = true;
        this.topbarUserMenuActive = !this.topbarUserMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarNotificationMenuButtonClick(event) {
        this.notificationMenuClick = true;
        this.topbarNotificationMenuActive = !this.topbarNotificationMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onRightMenuClick(event) {
        this.rightMenuClick = true;
        this.rightPanelMenuActive = !this.rightPanelMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onProfileClick(event) {
        this.profileClick = true;
        this.inlineUserMenuActive = !this.inlineUserMenuActive;
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    onRippleChange(event) {
        this.app.ripple = event.checked;
        this.primengConfig = event.checked;
    }

    isHorizontal() {
        return this.app.layoutMode === 'horizontal';
    }

    isSlim() {
        return this.app.layoutMode === 'slim';
    }

    isOverlay() {
        return this.app.layoutMode === 'overlay';
    }


    isDesktop() {
        return window.innerWidth > 896;
    }


    hideOverlayMenu() {
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    hideOrShowRightBar($event: MouseEvent) {
        this.onMenuButtonClick($event);
    }
}
