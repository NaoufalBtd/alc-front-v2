import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {EtudiantService} from '../../../../controller/service/etudiant.service';
import {AuthenticationService} from '../../../../controller/service/authentication.service';
import {PackStudentService} from '../../../../controller/service/pack-student.service';
import {InscriptionService} from '../../../../controller/service/inscription.service';
import {Router} from '@angular/router';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {TranslateService} from '@ngx-translate/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AnimationService} from '../../../../controller/service/animation.service';
import {ParcoursService} from '../../../../controller/service/parcours.service';

@Component({
    selector: 'app-home-three',
    templateUrl: './home-three.component.html',
    styleUrls: ['./home-three.component.scss']
})
export class HomeThreeComponent implements OnInit {
    displayModal: boolean;
    selectedLevel = null;

    id: number;
    showdialog = false;
    public isSmallScreen: boolean;

    constructor(private messageService: MessageService,
                public etudiantService: EtudiantService,
                private animation: AnimationService,
                private levelService: ParcoursService,
                public authenticationService: AuthenticationService,
                public packStudentService: PackStudentService,
                public translate: TranslateService,
                public breakpointObserver: BreakpointObserver,
                private service: InscriptionService, private router: Router) {
        const layoutChanges = breakpointObserver.observe('(max-width: 599px)');

        layoutChanges.subscribe(result => {
            this.isSmallScreen = result.matches;
        });
    }

    get numberOfTime(): number {
        return this.etudiantService.numberOfTime;
    }

    set numberOfTime(value: number) {
        this.etudiantService.numberOfTime = value;
    }


    ngOnInit(): void {
        if (!this.isSmallScreen) {
            setInterval(() => {
                if (this.numberOfTime === 0) {
                    this.displayModal = true;
                }
                this.numberOfTime = 1;
            }, 15000);
        }

    }


    get selected(): Etudiant {
        return this.etudiantService.selected;
    }

    set selected(value: Etudiant) {
        this.etudiantService.selected = value;
    }


    createEtudiant() {
        this.animation.showAnimation = true;
        this.etudiantService.create().subscribe(
            data => {
                this.animation.showAnimation = false;
                if (data != null) {
                    this.showdialog = true;
                    this.messageService.add({
                        severity: 'success',
                        detail: 'تم التسجيل بنجاح 😍،  يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب الخاص بك',
                        life: 8000
                    });
                } else {
                    this.messageService.add({
                        severity: 'info',
                        detail: 'البريد الالكتروني موجود بالفعل، من فضلك تفقد بريدك الالكتروني للحصول على اسم المستخدم و كلمة المرور للولوج الى حسابك',
                        life: 9000
                    });
                }
            }, error => {
                this.animation.showAnimation = false;

                this.showdialog = true;
                this.messageService.add({
                    severity: 'info',
                    detail: error?.error?.message || 'Registration Canceled',
                    life: 10000
                });
            }
        );
    }


    isDisabled(): boolean {
        if (this.selected?.nom === undefined
            || this.selected?.username === undefined
            || this.selected?.username?.length === 0
            || this.selected?.username === null
            || this.selectedLevel === null
            || this.selectedLevel === undefined
            || !this.selected?.username?.includes('@')
            || !this.selected?.username?.includes('.')
            || !this.selected?.username?.includes('com')
            || this.selected?.numero === null
            || this.selected?.numero === undefined
            || this.selected?.numero?.length < 4
        ) {
            return true;
        } else {
            return false;
        }
    }

    chooseLevel(event: any) {
        if (event !== null && event !== undefined) {
            this.levelService.findParcoursById(event).subscribe(level => {
                console.log(level);
                this.selected.parcours = level;
            }, error => {
                console.log(error);
            });
        }
    }
}
