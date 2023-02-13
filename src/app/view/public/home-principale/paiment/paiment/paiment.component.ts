import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {Etudiant} from '../../../../../controller/model/etudiant.model';
import {EtudiantService} from '../../../../../controller/service/etudiant.service';
import {AuthenticationService} from '../../../../../controller/service/authentication.service';
import {PackStudentService} from '../../../../../controller/service/pack-student.service';
import {InscriptionService} from '../../../../../controller/service/inscription.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AnimationService} from '../../../../../controller/service/animation.service';
import {PackStudent} from '../../../../../controller/model/pack-student.model';
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from '../../../../../controller/service/login.service';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../../../controller/model/user.model';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-paiment',
    templateUrl: './paiment.component.html',
    styleUrls: ['./paiment.component.scss'],
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
export class PaimentComponent implements OnInit {
    callbackUrl = environment.callbackUrl;
    shopUrl = environment.shopUrl;
    failUrl = environment.failUrl;
    okUrl = environment.okUrl;
    items: MenuItem[];
    activeIndex = 0;
    selected: Etudiant = new Etudiant();
    userRequest: User = new User();
    nameNotValid = false;

    constructor(private messageService: MessageService,
                public etudiantService: EtudiantService,
                public animation: AnimationService,
                private http: HttpClient,
                private _activatedRoute: ActivatedRoute,
                private login: LoginService,
                public translate: TranslateService,
                private confirmationService: ConfirmationService,
                public authenticationService: AuthenticationService,
                public packStudentService: PackStudentService, private packService: PackStudentService,
                private nscriptionService: InscriptionService, private router: Router) {
    }

    get selectedCourse(): PackStudent {
        return this.packService.selectedCourse;
    }

    set selectedCourse(value: PackStudent) {
        this.packService.selectedCourse = value;
    }

    ngOnInit(): void {
        const packId = this._activatedRoute.snapshot.params.id;
        const studentId = this._activatedRoute.snapshot.params.studentId;
        if (packId !== null && packId !== undefined) {
            this.packService.findById(packId).subscribe(pack => {
                this.selectedCourse = pack;
            });
            if (studentId !== null && studentId !== undefined) {
                this.etudiantService.findById(studentId).subscribe(user => {
                    this.userRequest = user;
                    this.selected = user;
                });
                this.activeIndex = 1;
            }
        } else {
            this.router.navigate(['/courses']);
            return;
        }

        if (this.translate.currentLang === 'en') {
            this.items = [
                {
                    label: 'Personal',

                },
                {
                    label: 'Payment',

                }
            ];
        } else if (this.translate.currentLang === 'fr') {
            this.items = [
                {
                    label: 'Personnel',

                },
                {
                    label: 'Payement',

                }
            ];
        } else if (this.translate.currentLang === 'ar') {
            this.items = [

                {
                    label: 'المعلومات الشخصية',

                },
                {
                    label: 'الدفع',

                }
            ];
        }

    }

    public verifyEmail() {
        // const url = 'https://emailvalidation.abstractapi.com/v1/?api_key=d928649ca44341bba9a9482419202c4c&email=' + this.selected?.username;
        // return this.http.get<any>(url).subscribe(data => {
        //     console.log(data);
        //     if (data?.deliverability === 'UNDELIVERABLE') {
        //         this.messageService.add({
        //             severity: 'info',
        //             detail: 'لم يتم العثور على بريدك الالكتروني، يرجى محاولة استخدام بريد إلكتروني حقيقي',
        //             life: 30000
        //         });
        //     } else {
        this.animation.showAnimation = true;
        this.etudiantService.addStudentWithPack(this.selected, this.selectedCourse.id).subscribe(
            st => {
                this.animation.showAnimation = false;
                if (st != null) {
                    this.userRequest = st;
                    this.activeIndex = 1;
                    this.router.navigate(['/payment/' + this.selectedCourse.id + '/' + st.id]);
                } else {
                    this.messageService.add({
                        severity: 'info',
                        detail: 'البريد الالكتروني موجود بالفعل، من فضلك تفقد بريدك الالكتروني للحصول على اسم المستخدم و كلمة المرور للولوج الى حسابك',
                        life: 30000
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
        // }
        // }, error => {
        //     console.log(error);
        // });
    }

    createEtudiant() {
        this.animation.showAnimation = true;
        this.selected.parcours = this.selectedCourse.level;
        console.log(this.selected);
        this.etudiantService.addStudentWithPack(this.selected, this.selectedCourse.id).subscribe(
            data => {
                if (data != null) {
                    this.animation.showAnimation = false;
                    this.authenticationService.addUserToLocalCache(data);
                    this.messageService.add({
                        severity: 'success',
                        detail: 'تم التسجيل بنجاح 😍،  يرجى التحقق من بريدك الإلكتروني للحصول على كلمة المرور الخاصة بك',
                        life: 30000
                    });
                    this.router.navigate(['/etudiant/dashboard']);
                } else {
                    this.messageService.add({
                        severity: 'info',
                        detail: 'البريد الالكتروني موجود بالفعل، من فضلك تفقد بريدك الالكتروني للحصول على اسم المستخدم و كلمة المرور للولوج الى حسابك',
                        life: 30000
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
            }
        );
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
            || this.nameNotValid
            || this.selected?.numero?.length < 4
        ) {
            return true;
        } else {
            return false;
        }
    }

    copy() {
        this.messageService.add({
            severity: 'info',
            detail: 'RIB copied',
            life: 2000
        });
    }

    next() {
        if (this.login.getConnecteUser() === null) {
            this.activeIndex = 1;
        } else {
            this.selected = this.login.getConnectedStudent();
            this.createEtudiant();
        }
    }

    checkNameInput() {
        const specialCharacters = '@#$%^&*()_-+<>/!?,.';

        for (let i = 0; i < this.selected.nom.length; i++) {
            if (specialCharacters.indexOf(this.selected.nom.charAt(i)) >= 0) {
                this.nameNotValid = true;
                return;
            }
        }
        this.nameNotValid = false;
    }
}
