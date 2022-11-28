import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {EtudiantService} from '../../../../controller/service/etudiant.service';
import {AuthenticationService} from '../../../../controller/service/authentication.service';
import {PackStudentService} from '../../../../controller/service/pack-student.service';
import {InscriptionService} from '../../../../controller/service/inscription.service';
import {Router} from '@angular/router';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-home-three',
    templateUrl: './home-three.component.html',
    styleUrls: ['./home-three.component.scss']
})
export class HomeThreeComponent implements OnInit {
    displayModal: boolean;

    locality = [
        {name: 'native'},
        {name: 'non-native'},
    ];
    id: number;
    showdialog = false;

    constructor(private messageService: MessageService,
                public etudiantService: EtudiantService,
                private confirmationService: ConfirmationService,
                public authenticationService: AuthenticationService,
                public packStudentService: PackStudentService,
                public translate: TranslateService,
                private service: InscriptionService, private router: Router) {
    }

    get numberOfTime(): number {
        return this.etudiantService.numberOfTime;
    }

    set numberOfTime(value: number) {
        this.etudiantService.numberOfTime = value;
    }


    ngOnInit(): void {
        setInterval(() => {
            if (this.numberOfTime === 0) {
                this.displayModal = true;
            }
            this.numberOfTime = 1;
        }, 15000);
    }



    get selected(): Etudiant {
        return this.etudiantService.selected;
    }

    set selected(value: Etudiant) {
        this.etudiantService.selected = value;
    }


    createEtudiant() {
        console.log('clicked');
        this.etudiantService.create().subscribe(
            data => {
                if (data != null) {
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
                this.showdialog = true;
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
            || this.selected?.numero?.length < 4
        ) {
            return true;
        } else {
            return false;
        }
    }

}
