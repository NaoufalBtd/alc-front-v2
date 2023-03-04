import {Component, NgModule, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {InscriptionService} from '../../../controller/service/inscription.service';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {Router} from '@angular/router';
import {EtudiantService} from '../../../controller/service/etudiant.service';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {VonPrimengFormModule} from '@von-development-studio/primeng-form-validation';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {AnimationService} from '../../../controller/service/animation.service';
import {TranslateService} from '@ngx-translate/core';
import {ParcoursService} from '../../../controller/service/parcours.service';

@Component({
    selector: 'app-formlayoutdemo',
    templateUrl: './formlayoutdemo.component.html',
    styleUrls: ['./formlayoutdemo.component.scss']
})
export class FormLayoutDemoComponent implements OnInit {
    @NgModule({
        imports: [
            VonPrimengFormModule,

        ]
    })
    locality = [
        {name: 'native'},
        {name: 'non-native'},
    ];
    id: number;
    showdialog = false;
    selectedLevel = null;

    constructor(private messageService: MessageService,
                public etudiantService: EtudiantService,
                private animation: AnimationService,
                private translate: TranslateService,
                private levelService: ParcoursService,
                private confirmationService: ConfirmationService,
                public authenticationService: AuthenticationService,
                public packStudentService: PackStudentService,
                private service: InscriptionService, private router: Router) {
    }

    get showAnimation(): boolean {
        return this.animation.showAnimation;
    }

    set showAnimation(value: boolean) {
        this.animation.showAnimation = value;
    }

    get selected(): Etudiant {
        return this.etudiantService.selected;
    }

    set selected(value: Etudiant) {
        this.etudiantService.selected = value;
    }

    ngOnInit(): void {
    }

    showConfirm() {
        this.messageService.clear();
        this.messageService.add({
            key: 'ccc',
            sticky: true,
            closable: false,
            severity: 'success',
            detail: 'تم التسجيل بنجاح 😍،  يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب الخاص بك'
        });
    }

    onReject() {
        this.messageService.clear('ccc');
    }

    clear() {
        this.messageService.clear();
    }

    createEtudiant() {
        this.verifyEmail(this.selected.username);
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

    openGmail() {
        this.clear();
        window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
    }

    private verifyEmail(username: string) {
        // const url = 'https://emailvalidation.abstractapi.com/v1/?api_key=d928649ca44341bba9a9482419202c4c&email=' + username;
        // return this.http.get<any>(url).subscribe(data => {
        //     console.log(data);
        //     if (data?.deliverability === 'UNDELIVERABLE') {
        //         this.messageService.add({
        //             severity: 'info',
        //             detail: 'لم يتم العثور على بريدك الالكتروني، يرجى محاولة استخدام بريد إلكتروني حقيقي',
        //             life: 30000
        //         });
        //     } else {
        this.showAnimation = true;
        this.etudiantService.create().subscribe(
            st => {
                this.showAnimation = false;
                if (st != null) {
                    this.showAnimation = false;
                    this.showdialog = true;
                    this.showConfirm();
                } else {
                    this.messageService.add({
                        severity: 'info',
                        detail: 'البريد الالكتروني موجود بالفعل، من فضلك تفقد بريدك الالكتروني للحصول على اسم المستخدم و كلمة المرور للولوج الى حسابك',
                        life: 30000
                    });
                }
            }, error => {
                this.showAnimation = false;
                this.messageService.add({
                    key: 'newAccount',
                    severity: 'info',
                    detail: error?.error?.message || 'Something went wrong, please try again.',
                    life: 10000
                });
                console.log(error);
            }
        );
        //     }
        // }, error => {
        //     console.log(error);
        // });
    }

    chooseLevel(event: any) {
        console.log(event);
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
