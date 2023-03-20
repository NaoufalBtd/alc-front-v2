import {Component, OnInit} from '@angular/core';
import {MenuService} from '../shared/slide-bar/app.menu.service';
import {MenuItem, MessageService, PrimeNGConfig} from 'primeng/api';
import {AppComponent} from '../../app.component';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../controller/service/authentication.service';
import {User} from '../../controller/model/user.model';
import {Role} from '../../enum/role.enum';
import {QuizEtudiantService} from '../../controller/service/quiz-etudiant.service';
import {ReclamationEtudiant} from '../../controller/model/reclamation-etudiant.model';
import {ReclamationEtudiantService} from '../../controller/service/reclamation-etudiant.service';
import {DatePipe, KeyValue} from '@angular/common';
import {ContactService} from '../../controller/service/contact.service';
import {Contact} from '../../controller/model/contact.model';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
    user: User = new User();
    overlayMenuActive2: boolean;
    items: MenuItem[];
    staticMenuMobileActive2: boolean;
    notificationMenuClick2: boolean;
    topbarUserMenuActive2: boolean;
    topbarNotificationMenuActive2: boolean;
    displayDictionaryDialogAdmin: boolean;
    textSeleted: string;
    synonymes: string;
    contactMessage: Array<Contact> = new Array<Contact>();
    nreNonLueContact = 0;
    nreNonLueReclamation = 0;
    // Reclamation
    displayChatDialog: boolean;
    reclamation: ReclamationEtudiant = new ReclamationEtudiant();
    reclamationList: Array<ReclamationEtudiant> = new Array<ReclamationEtudiant>();
    allReclamation: Array<ReclamationEtudiant> = new Array<ReclamationEtudiant>();
    public role = Role;
    showButtons: boolean;
    selectedUser: User = new User();
    map: Map<number, ReclamationEtudiant[]> = new Map<number, ReclamationEtudiant[]>();
    img: null | File;
    displayImgDialog: boolean;
    position: string;
    reader = new FileReader();
    selectedImgUrl: string;
    showOverLayImg: boolean;

    constructor(private menuService: MenuService, private primengConfig: PrimeNGConfig,
                private router: Router,
                private contactService: ContactService,
                private quizEtudiantService: QuizEtudiantService,
                private reclamationService: ReclamationEtudiantService,
                private datePipe: DatePipe,
                private messageService: MessageService,
                private authenticationService: AuthenticationService,
                public app: AppComponent) {
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


    get displayContactMessage(): boolean {
        return this.contactService.displayContactMessage;
    }

    set displayContactMessage(value: boolean) {
        this.contactService.displayContactMessage = value;
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
        if (this.user === null) {
            this.router.navigate(['/']);
        } else {
            // @ts-ignore
            if (this.user.role === Role.PROF || this.user.role === Role.STUDENT
                || this.user.authorities.length === 0) {
                this.router.navigate([' ']);
            }
            this.getAllReclamation();
            this.getContactMessages();
        }

    }

    private getContactMessages() {
        this.contactService.findAll().subscribe(
            data => {
                this.contactMessage = data;
                this.nreNonLueContact = this.contactMessage.filter(c => c.replied === false).length;
            }
        );
    }

    private getAllReclamation() {
        this.map.clear();
        this.reclamationService.getAll().subscribe(
            data => {
                this.allReclamation = data;
                this.nreNonLueReclamation = this.allReclamation.filter(c => c.traite === false).length;
                if (data != null) {
                    for (const item of data) {
                        const user = item.user;
                        if (this.map.has(user.id) === false) {
                            this.map.set(user.id, data.filter(r => r.user.id === user.id));
                        }
                    }
                }
            }
        );
    }

    getTranslation() {
        this.quizEtudiantService.translate(this.textSeleted).subscribe(data => {
            this.synonymes = data;
        });
    }


    sendReclamation() {
        this.displayImgDialog = false;
        this.reclamation.user = this.authenticationService.getConnectedStudent();
        this.reclamation.setFrom = this.authenticationService.getConnectedStudent().role;
        this.reclamation.dateReclamation = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
        this.reclamation.traite = true;
        this.reclamation.user = this.selectedUser;
        this.reclamation.file = this.img;
        this.reclamation.typeReclamationEtudiant = null;
        this.reclamationService.send(this.reclamation).subscribe(data => {
            if (this.img === undefined || this.img === null) {
                this.reclamationList.push({...data});
            } else {
                const formData = new FormData();
                formData.append('id', data?.id?.toString());
                formData.append('img', this.img);
                this.reclamationService.updateImg(formData).subscribe(
                    dataFinal => {
                        this.reclamationList.push({...dataFinal});
                    }
                );
            }
            this.reclamation = new ReclamationEtudiant();
        }, error => {
            this.messageService.add({severity: 'error', life: 3000, detail: error?.error?.message});
            console.log(error);
        });
    }

    showOrHideButtons() {
        this.showButtons = !this.showButtons;
        this.getAllReclamation();
        this.getContactMessages();
    }

    showData(value: KeyValue<number, ReclamationEtudiant[]>) {
        this.selectedUser = value.value[0].user;
        const index = value.value.filter(f => f.traite === false).length;
        if (index === 0) {
            this.reclamationList = value.value;
        } else {
            this.reclamationService.update(value.value).subscribe(
                data => {
                    this.reclamationList = data;
                }, error => {
                    console.log(error);
                }
            );
        }
    }

    getValueOfBadge(key: number): number {
        return this.map.get(key)?.filter(r => r.traite !== true).length;
    }

    showChatDialog() {
        this.displayChatDialog = true;
        this.getAllReclamation();
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
        this.img = undefined;
    }


    showImage(img: string) {
        this.selectedImgUrl = img;
        this.showOverLayImg = true;
    }

    notReadReclamation() {
        if (this.allReclamation.filter(r => r.traite === false).length !== 0) {
            return true;
        } else {
            return false;
        }
    }
}


