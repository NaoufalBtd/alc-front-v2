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
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-etudiant',
    templateUrl: './etudiant.component.html',
    styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {
    overlayMenuActive: boolean;
    private user: User = new User();

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    menuClick: boolean;

    userMenuClick: boolean;

    notificationMenuClick: boolean;
    notificationMenuClick2: boolean;

    rightMenuClick: boolean;

    menuHoverActive: boolean;

    topbarUserMenuActive: boolean;

    topbarNotificationMenuActive: boolean;
    topbarNotificationMenuActive2: boolean;

    rightPanelMenuActive: boolean;

    configActive: boolean;

    configClick: boolean;

    profileClick: boolean;

    inlineUserMenuActive = false;
    displayChatDialog: boolean;

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
                public app: AppComponent) {
    }

    get showAppMenu(): boolean {
        return this.learnService.showAppMenu;
    }

    set showAppMenu(value: boolean) {
        this.learnService.showAppMenu = value;
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


    isHorizontal() {
        return this.app.layoutMode === 'horizontal';
    }

    isSlim() {
        return this.app.layoutMode === 'slim';
    }


    hideOverlayMenu() {
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
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
            this.router.navigate(['#/']);
        } else {
            // @ts-ignore
            if (this.user.role === Role.ADMIN || this.user.role === Role.PROF
                || this.user.authorities.length === 0) {
                this.router.navigate([' ']);
            }
            this.reclamationService.findReclamationByEtudiantId(this.user.id).subscribe(
                data => {
                    if (data != null) {
                        this.reclamationList = data;
                    }
                }
            );
        }
    }

    // Reclamation
    reclamation: ReclamationEtudiant = new ReclamationEtudiant();
    reclamationList: Array<ReclamationEtudiant> = new Array<ReclamationEtudiant>();
    public role = Role;

    sendReclamation() {
        this.reclamation.etudiant = this.authenticationService.getConnectedStudent();
        this.reclamation.setFrom = this.authenticationService.getConnectedStudent().role;
        this.reclamation.dateReclamation = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss');
        this.reclamation.traite = false;
        this.reclamation.typeReclamationEtudiant = null;
        this.reclamationService.send(this.reclamation).subscribe(data => {
            console.log(data);
            this.reclamationList.push({...data});
            this.reclamation = new ReclamationEtudiant();
        }, error => {
            this.messageService.add({severity: 'error', life: 3000, detail: error?.error?.message});

        });
    }
}


