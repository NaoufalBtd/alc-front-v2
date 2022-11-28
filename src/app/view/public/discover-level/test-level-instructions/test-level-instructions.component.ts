import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {AnimationService} from '../../../../controller/service/animation.service';
import {TranslateService} from '@ngx-translate/core';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {EtudiantService} from '../../../../controller/service/etudiant.service';
import {AuthenticationService} from '../../../../controller/service/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-test-level-instructions',
    templateUrl: './test-level-instructions.component.html',
    styleUrls: ['./test-level-instructions.component.scss'],
    styles: [`
        .ui-steps .ui-steps-item {
            width: 25%;
        }

        .ui-steps.steps-custom {
            margin-bottom: 30px;
        }

        .ui-steps.steps-custom .ui-steps-item .ui-menuitem-link {
            padding: 0 1em;
            overflow: visible;
        }

        .ui-steps.steps-custom .ui-steps-item .ui-steps-number {
            display: inline-block;
            width: 36px;
            margin-top: -14px;
            margin-bottom: 10px;
        }

        .ui-steps.steps-custom .ui-steps-item .ui-steps-title {
            color: #555555;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class TestLevelInstructionsComponent implements OnInit {
    items: MenuItem[];
    activeIndex = 0;

    constructor(public animation: AnimationService,
                private etudiantService: EtudiantService,
                private messageService: MessageService,
                private authenticationService: AuthenticationService,
                private router: Router,
                public translate: TranslateService) {
    }

    get selected(): Etudiant {
        return this.etudiantService.selected;
    }

    set selected(value: Etudiant) {
        this.etudiantService.selected = value;
    }


    ngOnInit(): void {
        this.translate.use('ar');
        if (this.translate.currentLang === 'en') {
            this.items = [
                {
                    label: 'Instructions',

                },
                {
                    label: 'START TEST',

                }
            ];
        } else if (this.translate.currentLang === 'fr') {
            this.items = [
                {
                    label: 'Instructions',

                },
                {
                    label: 'START TEST',

                }
            ];
        } else if (this.translate.currentLang === 'ar') {
            this.items = [
                {
                    label: 'التعليمات',

                },
                {
                    label: 'بدأ الاختبار',

                }
            ];
        }

    }

    isDisabled(): boolean {
        if (this.selected?.nom === undefined
            || this.selected?.username === undefined
            || this.selected?.username?.length === 0
            || this.selected?.username === null
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

    createEtudiant() {
        this.animation.showAnimation = true;
        this.etudiantService.create().subscribe(
            data => {
                if (data != null) {
                    this.animation.showAnimation = false;
                    this.authenticationService.addUserToLocalCache(data);
                    this.messageService.add({
                        severity: 'success',
                        detail: 'تم التسجيل بنجاح 😍،  يرجى التحقق من بريدك الإلكتروني للحصول على كلمة المرور الخاصة بك',
                        life: 8000
                    });
                    this.router.navigate(['etudiant/test-level']);
                } else {
                    this.messageService.add({
                        severity: 'info',
                        detail: 'البريد الالكتروني موجود بالفعل، من فضلك تفقد بريدك الالكتروني للحصول على اسم المستخدم و كلمة المرور للولوج الى حسابك',
                        life: 9000
                    });
                }
            }, error => {
                this.animation.showAnimation = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Registration Canceled',
                    life: 4000
                });
                console.log(error);
            }
        );
    }

}
