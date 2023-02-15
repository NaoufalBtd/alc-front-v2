import {Component, Injectable, OnInit} from '@angular/core';
import {MenuService} from '../shared/slide-bar/app.menu.service';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {AppComponent} from '../../app.component';
import {User} from '../../controller/model/user.model';
import {AuthenticationService} from '../../controller/service/authentication.service';
import {Role} from '../../enum/role.enum';
import {LoginService} from '../../controller/service/login.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-public',
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.scss']
})
@Injectable({
    providedIn: 'root' // just before your class
})
export class PublicComponent implements OnInit {
    user: User = null;

    overlayMenuActive2: boolean;
    staticMenuMobileActive2: boolean;
    notificationMenuClick2: boolean;
    topbarUserMenuActive2: boolean;
    topbarNotificationMenuActive2: boolean;


    get model(): any[] {
        return this.service.model;
    }

    set model(value: any[]) {
        this.service.model = value;
    }

    constructor(private menuService: MenuService,
                private service: LoginService,
                private router: Router,
                private messageService: MessageService,
                private translate: TranslateService,
                private authenticationService: AuthenticationService,
                private primengConfig: PrimeNGConfig, public app: AppComponent) {

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

    get profileClick(): boolean {
        return this.menuService.profileClick;
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


    onLayoutClick() {
        if (!this.userMenuClick) {
            this.topbarUserMenuActive = false;
        }

        if (!this.notificationMenuClick) {
            this.topbarNotificationMenuActive = false;
        }
        if (!this.notificationMenuClick2) {
            this.topbarNotificationMenuActive2 = false;
        }
        if (!this.rightMenuClick) {
            this.rightPanelMenuActive = false;
        }

        if (!this.profileClick && this.isSlim()) {
            this.inlineUserMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.menuService.reset();
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
            this.unblockBodyScroll();
        }

        if (this.configActive && !this.configClick) {
            this.configActive = false;
        }

        this.configClick = false;
        this.userMenuClick = false;
        this.rightMenuClick = false;
        this.notificationMenuClick = false;
        this.notificationMenuClick2 = false;
        this.menuClick = false;
        this.profileClick = false;
    }


    onMenuButtonClick(event) {
        console.log(event);
        this.menuClick = true;
        this.topbarUserMenuActive = false;
        this.topbarNotificationMenuActive = false;
        this.rightPanelMenuActive = false;

        if (this.isOverlay()) {
            console.log('event1');
            this.overlayMenuActive = !this.overlayMenuActive;
        }

        if (this.isDesktop()) {
            console.log('DESKTOP');
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            console.log('MOBILE');
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
            if (this.staticMenuMobileActive) {
                this.blockBodyScroll();
            } else {
                console.log('MOBILE 2');
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
        this.topbarUserMenuActive2 = !this.topbarUserMenuActive2;
        this.hideOverlayMenu();
        event.preventDefault();
    }

    onTopbarNotificationMenuButtonClick2(event) {
        this.notificationMenuClick2 = true;
        this.topbarNotificationMenuActive2 = !this.topbarNotificationMenuActive2;

        this.hideOverlayMenu2();

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


    isHorizontal() {
        return this.app.layoutMode === 'vertical';
    }

    isSlim() {
        return this.app.layoutMode === 'slim';
    }

    isOverlay() {
        return this.app.layoutMode === 'overlay';
    }

    isStatic() {
        return this.app.layoutMode === 'static';
    }

    isMobile() {
        return window.innerWidth < 1025;
    }

    isDesktop() {
        return window.innerWidth > 896;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    hideOverlayMenu() {
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    hideOverlayMenu2() {
        this.overlayMenuActive2 = false;
        this.staticMenuMobileActive2 = false;
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

    ngOnInit(): void {
        this.user = this.authenticationService.getUserFromLocalCache();
        if (this.user !== null) {
            if (this.user?.role === Role?.ADMIN) {
                this.router.navigate(['/admin/parcours']);
            } else if (this.user?.role === Role?.PROF) {
                this.router.navigate(['/prof/home']);

            } else if (this.user?.role === Role?.STUDENT) {
                this.router.navigate(['/etudiant/dashboard']);
            }
        }
    }

}



