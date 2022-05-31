import {Component, Injectable, OnInit} from '@angular/core';
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

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
    user: User = new User();
    overlayMenuActive: boolean;
    overlayMenuActive2: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;
    staticMenuMobileActive2: boolean;

    layoutMenuScroller: HTMLDivElement;

    menuClick: boolean;

    userMenuClick: boolean;

    notificationMenuClick: boolean;
    notificationMenuClick2: boolean;

    rightMenuClick: boolean;

    resetMenu: boolean;

    menuHoverActive: boolean;

    topbarUserMenuActive: boolean;
    topbarUserMenuActive2: boolean;

    topbarNotificationMenuActive: boolean;
    topbarNotificationMenuActive2: boolean;
    topbarNotificationMenuActive3: boolean;

    rightPanelMenuActive: boolean;

    configActive: boolean;

    configClick: boolean;

    profileClick: boolean;

    inlineUserMenuActive = false;
    displayDictionaryDialogAdmin: boolean;
    textSeleted: string;
    synonymes: string;

    constructor(private menuService: MenuService, private primengConfig: PrimeNGConfig,
                private router: Router,
                private quizEtudiantService: QuizEtudiantService,
                private reclamationService: ReclamationEtudiantService,
                private datePipe: DatePipe,
                private messageService: MessageService,
                private authenticationService: AuthenticationService,
                public app: AppComponent) {
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

    items: MenuItem[];

    ngOnInit(): void {
        this.items = [
            {
                icon: 'pi pi-pencil',
                command: () => {
                    this.messageService.add({severity: 'info', summary: 'Add', detail: 'Data Added'});
                }
            },
            {
                icon: 'pi pi-refresh',
                command: () => {
                    this.messageService.add({severity: 'success', summary: 'Update', detail: 'Data Updated'});
                }
            },
            {
                icon: 'pi pi-trash',
                command: () => {
                    this.messageService.add({severity: 'error', summary: 'Delete', detail: 'Data Deleted'});
                }
            },
            {
                icon: 'pi pi-upload',
                routerLink: ['/fileupload']
            },
            {
                icon: 'pi pi-external-link',
                url: 'http://angular.io'

            }
        ];
        this.user = this.authenticationService.getUserFromLocalCache();
        if (this.user === null) {
            this.router.navigate(['#/']);
        } else {
            // @ts-ignore
            if (this.user.role === Role.PROF || this.user.role === Role.STUDENT
                || this.user.authorities.length === 0) {
                this.router.navigate([' ']);
            }
            this.getAllReclamation();
        }

    }

    private getAllReclamation() {
        this.map.clear();
        this.reclamationService.getAll().subscribe(
            data => {
                this.allReclamation = data;
                if (data != null) {
                    for (const item of data) {
                        let user = item.user;
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
            console.log(data);
            this.synonymes = data;
        });
    }

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
            console.log(this.img);
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
            console.log(error);
        });
    }

    showOrHideButtons() {
        this.showButtons = !this.showButtons;
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

    onSend(event: any) {
        console.log(event);
    }

    showImage(img: string) {
        this.selectedImgUrl = img;
        this.showOverLayImg = true;
    }
}


