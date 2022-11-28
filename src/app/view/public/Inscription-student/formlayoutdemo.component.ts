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

@Component({
    selector: 'app-formlayoutdemo',
    templateUrl: './formlayoutdemo.component.html',
    styleUrls: ['./formlayoutdemo.component.css']
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

    constructor(private messageService: MessageService,
                public etudiantService: EtudiantService,
                private animation: AnimationService,
                private translate: TranslateService,
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


    createEtudiant() {
        this.showAnimation = true;
        this.etudiantService.create().subscribe(
            data => {
                this.showAnimation = false;
                console.log(data);
                if (data != null) {
                    this.showAnimation = false;
                    this.authenticationService.addUserToLocalCache(data);
                    this.showdialog = true;
                    this.messageService.add({
                        severity: 'success',
                        detail: 'تم التسجيل بنجاح 😍،  يرجى التحقق من بريدك الإلكتروني للحصول على كلمة المرور الخاصة بك',
                        life: 8000
                    });
                    this.router.navigate(['public/etudianthomepage']);
                } else {
                    this.messageService.add({
                        severity: 'info',
                        detail: 'البريد الالكتروني موجود بالفعل، من فضلك تفقد بريدك الالكتروني للحصول على اسم المستخدم و كلمة المرور للولوج الى حسابك',
                        life: 9000
                    });
                }
            }, error => {
                this.showAnimation = false;
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
}
