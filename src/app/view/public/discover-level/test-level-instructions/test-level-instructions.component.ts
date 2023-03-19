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
    showValidateDialog: boolean = false;
    code: string;
    clear_code: string;
    isValid: boolean = true;

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
        this.etudiantService.startLevelTestForStudent(this.selected).subscribe(
            (response) => {
                this.animation.showAnimation = false;
                this.selected = response.body;
                if (response?.status === 201) {
                    this.messageService.add({
                        severity: 'success',
                        detail: ' يرجى التحقق من صحة بريدك الإلكتروني من خلال الرمز الذي تلقيته في بريدك الالكتروني',
                        life: 8000
                    });
                    this.showValidateDialog = true;
                } else {
                    this.startTest(this.selected);
                }
            }, error => {
                this.animation.showAnimation = false;
                this.messageService.add({
                    severity: 'info',
                    detail: error?.error?.message || 'Registration Canceled',
                    life: 10000
                });
                console.log(error);
            }
        );
    }

    verifyCode(): boolean {
        this.clear_code = this.code?.toString()?.replace(/\s/g, '');
        const pattern = /^[0-9]*$/; // regular expression to match only numbers
        this.isValid = pattern.test(this.clear_code);
        console.log(this.isValid);
        console.log(this.clear_code);
        return this.isValid;
    }

    verifyEmail() {
        console.log(this.code);
        if (this.verifyCode()) {
            this.animation.showAnimation = true;
            this.etudiantService.verifyEmail(this.selected, this.clear_code).subscribe(
                data => {
                    this.animation.showAnimation = false;
                    if (data === 1) {
                        this.messageService.add({
                            severity: 'success',
                            detail: ' تم التأكد من بريدك الالكتروني بنجاح',
                            life: 8000
                        });
                        this.startTest(this.selected);
                    } else {
                        this.messageService.add({
                            severity: 'warn',
                            detail: 'الرمز الذي أدخلتموه غير صحيح ',
                            life: 15000
                        });
                    }
                }, error => {
                    this.animation.showAnimation = false;
                    this.messageService.add({
                        severity: 'info',
                        detail: error?.error?.message || 'Registration Canceled',
                        life: 10000
                    });
                    console.log(error);
                }
            );
        }
    }

    private startTest(selected: Etudiant) {
        this.authenticationService.addUserToLocalCache(selected);
        this.router.navigate(['/etudiant/test-level']);
    }
}
