import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {Etudiant} from '../../../../../controller/model/etudiant.model';
import {EtudiantService} from '../../../../../controller/service/etudiant.service';
import {AuthenticationService} from '../../../../../controller/service/authentication.service';
import {PackStudentService} from '../../../../../controller/service/pack-student.service';
import {InscriptionService} from '../../../../../controller/service/inscription.service';
import {Router} from '@angular/router';
import {AnimationService} from '../../../../../controller/service/animation.service';
import {PackStudent} from '../../../../../controller/model/pack-student.model';
import {TranslateService} from '@ngx-translate/core';

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
    items: MenuItem[];
    activeIndex = 0;
    selected: Etudiant = new Etudiant();

    constructor(private messageService: MessageService,
                public etudiantService: EtudiantService,
                public animation: AnimationService,
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
        this.translate.use('ar');
        if (this.translate.currentLang === 'en') {
            this.items = [
                {
                    label: 'Payment',

                },
                {
                    label: 'Personal',

                }
            ];
        } else if (this.translate.currentLang === 'fr') {
            this.items = [
                {
                    label: 'Payement',

                },
                {
                    label: 'Personnel',

                }
            ];
        } else if (this.translate.currentLang === 'ar') {
            this.items = [
                {
                    label: 'الدفع',

                },
                {
                    label: 'المعلومات الشخصية',

                }
            ];
        }

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
                        summary: 'Successful',
                        detail: 'Registration added, please check your email to get your password.',
                        life: 4000
                    });
                    this.router.navigate(['/etudiant/dashboard']);
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
}
