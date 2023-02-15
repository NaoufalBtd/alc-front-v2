import {Component, OnInit} from '@angular/core';
import {MenuService} from '../shared/slide-bar/app.menu.service';
import {AppComponent} from '../../app.component';
import {Role} from '../../enum/role.enum';
import {User} from '../../controller/model/user.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../controller/service/authentication.service';
import {LearnService} from '../../controller/service/learn.service';
import {ReclamationEtudiant} from '../../controller/model/reclamation-etudiant.model';
import {DatePipe} from '@angular/common';
import {ReclamationEtudiantService} from '../../controller/service/reclamation-etudiant.service';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-etudiant',
    templateUrl: './etudiant.component.html',
    styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {

    private user: User = new User();
    displayChatDialog: boolean = false;


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
        this.menuClick = false;
        this.profileClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.topbarUserMenuActive = false;
        this.topbarNotificationMenuActive = false;
        this.rightPanelMenuActive = false;

        if (this.isOverlay()) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }

        if (this.isDesktop()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
            if (this.staticMenuMobileActive) {
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

    get showTpBar(): boolean {
        return this.menuService.showTpBar;
    }

    set showTpBar(value: boolean) {
        this.menuService.showTpBar = value;
    }

    constructor(private menuService: MenuService,
                private router: Router,
                private datePipe: DatePipe,
                private authenticationService: AuthenticationService,
                private reclamationService: ReclamationEtudiantService,
                private messageService: MessageService,
                private learnService: LearnService,
                private primengConfig: PrimeNGConfig,
                public translate: TranslateService,
                public app: AppComponent) {

    }

    get showAppMenu(): boolean {
        return this.learnService.showAppMenu;
    }

    set showAppMenu(value: boolean) {
        this.learnService.showAppMenu = value;
    }


    ngOnInit(): void {
        this.user = this.authenticationService.getUserFromLocalCache();
        if (this.user === null) {
            this.router.navigate(['#/']);
        } else {
            // @ts-ignore
            if (this.user.role === Role.ADMIN || this.user.role === Role.PROF
                || this.user.authorities.length === 0) {
                this.router.navigate([' ']);
            }
            this.findReclamation();
        }
    }

    private findReclamation() {
        this.reclamationService.findReclamationByEtudiantId(this.user.id).subscribe(
            data => {
                if (data != null) {
                    this.reclamationList = data;
                }
            }
        );
    }

// Reclamation
    reclamation: ReclamationEtudiant = new ReclamationEtudiant();
    reclamationList: Array<ReclamationEtudiant> = new Array<ReclamationEtudiant>();
    public role = Role;
    public img: null | File;
    displayImgDialog: boolean;
    position: string;
    reader = new FileReader();
    selectedImgUrl: string;
    showOverLayImg: boolean;


    sendReclamation() {
        this.reclamation.user = this.authenticationService.getConnectedStudent();
        this.reclamation.setFrom = this.authenticationService.getConnectedStudent().role;
        this.reclamation.dateReclamation = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
        this.reclamation.traite = false;
        this.reclamation.typeReclamationEtudiant = null;
        this.displayImgDialog = false;
        this.reclamation.file = this.img;
        this.reclamationService.send(this.reclamation).subscribe(data => {
            if (this.img === undefined || this.img === null) {
                this.reclamationList.push({...data});
            } else {
                const formData = new FormData();
                formData.append('id', data.id.toString());
                formData.append('img', this.img);
                this.reclamationService.updateImg(formData).subscribe(
                    dataFinal => {
                        console.log(dataFinal);
                        this.reclamationList.push({...dataFinal});
                    }
                );
            }
            this.reclamation = new ReclamationEtudiant();
        }, error => {
            this.messageService.add({severity: 'error', life: 3000, detail: error?.error?.message});

        });
    }

    getData() {
        this.displayChatDialog = true;
        this.findReclamation();
    }

    getValueOfBadge(): number {
        return this.reclamationList.filter(r => r.setFrom === Role.ADMIN).length;
    }

    showChatDialog() {
        this.displayChatDialog = true;
        this.findReclamation();
    }

    onBasicUpload(event: any) {
        this.img = (event.files as FileList)[0];
        this.reader.readAsDataURL(this.img);
        this.showPositionDialog('bottom-right');
    }

    showPositionDialog(position: string) {
        this.position = position;
        this.displayImgDialog = true;
    }


    cancel() {
        this.displayImgDialog = false;
        this.img = null;
    }

    showImage(img: string) {
        this.selectedImgUrl = img;
        this.showOverLayImg = true;
    }
}


