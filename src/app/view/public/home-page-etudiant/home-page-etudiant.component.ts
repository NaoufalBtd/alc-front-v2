import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {MessageService} from 'primeng/api';
import {EtudiantService} from '../../../controller/service/etudiant.service';
import {UserService} from '../../../controller/service/user.service';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-home-page-etudiant',
    templateUrl: './home-page-etudiant.component.html',
    styleUrls: ['./home-page-etudiant.component.scss']
})
export class HomePageEtudiantComponent implements OnInit {
    idCurrentUser: string;
    token: string;
    currentUser: Etudiant = new Etudiant();
    index = 0;
    newPassword = '';
    newPasswordRepated = '';
    message = {
        showMessage: true,
        message: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
        severity: 'warn'
    };

    constructor(public router: Router,
                private _activatedRoute: ActivatedRoute,
                private translate: TranslateService,
                private messageService: MessageService,
                private authService: AuthenticationService,
                private etudiantService: EtudiantService,
                private userService: UserService,
                private packService: PackStudentService) {
    }

    ngOnInit(): void {
        this.idCurrentUser = this._activatedRoute.snapshot.params.id;
        this.token = this._activatedRoute.snapshot.params.token;
        if (this.idCurrentUser !== undefined && this.idCurrentUser !== null) {
            this.etudiantService.findById(this.idCurrentUser).subscribe(
                st => {
                    if (st.enabled) {
                        this.messageService.add({
                            severity: 'info',
                            life: 30000,
                            detail: this.translate.instant('Your account is already validated, please try to sign in.')
                        });
                        this.router.navigate(['/public/login']);
                    } else {
                        this.etudiantService.validateStudent(this.token).subscribe(
                            student => {
                                this.currentUser = student;
                                this.messageService.add({
                                    severity: 'success',
                                    life: 8000,
                                    detail: this.translate.instant('Your account has been validated.')
                                });
                                this.authService.addUserToLocalCache(student);
                            }, error => {
                                console.log(error);
                                this.messageService.add({
                                    severity: 'warn',
                                    life: 8000,
                                    detail: this.translate.instant(error?.error?.message) ||
                                        this.translate.instant('Email does not found! Are you sure you are already a member?')
                                });
                            }
                        );
                    }
                }, error => {
                    this.messageService.add({
                        severity: 'warn',
                        life: 30000,
                        detail: this.translate.instant('Your account not found.')
                    });
                    this.router.navigate(['/free-trial']);
                }
            );
        } else {
            this.messageService.add({
                severity: 'warn',
                life: 4000,
                detail: this.translate.instant('Email does not found! Are you sure you are already a member?')
            });
        }
    }

    navigatetopurchase() {
        this.packService.findPackIndividualOrgroupe(true);
        this.packService.findPackIndividualOrgroupe(false);
        this.router.navigate(['/our-packs']);
    }

    showPass(newPass: HTMLInputElement) {
        if (newPass.type === 'password') {
            newPass.type = 'text';
        } else {
            newPass.type = 'password';
        }
    }

    changePassword() {
        this.etudiantService.updatePassword(this.newPassword, this.currentUser.username).subscribe(
            data => {
                if (data > 0) {
                    this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: this.translate.instant('Password updated Successfully'),
                            life: 3000
                        }
                    );
                    this.index = 1;
                }
            }, error => {
                this.messageService.add({
                        severity: 'Error',
                        summary: 'error',
                        detail: this.translate.instant('error while updating your password'),
                        life: 3000
                    }
                );
            }
        );
    }


    onPasswordInput(password: string): boolean {
        const minLength = 8;
        const containsSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
        if (password.length < minLength) {
            this.message = {
                showMessage: true,
                message: this.translate.instant('Password should be at least 8 characters long'),
                severity: 'warn'
            };
            return false;
        } else if (!containsSpecialChar) {
            this.message = {
                showMessage: true,
                message: this.translate.instant('Password should contain at least one special character'),
                severity: 'warn'
            };
            return false;

        } else if (password !== this.newPasswordRepated) {
            this.message = {
                showMessage: true,
                message: this.translate.instant('Repeat password'),
                severity: 'warn'
            };
            return false;
        } else {
            this.message = {
                showMessage: true,
                severity: 'success',
                message: this.translate.instant('valid password')
            };
            return true;
        }
    }

    onRepatPassword() {
        if (this.newPassword !== this.newPasswordRepated) {
            this.message = {
                showMessage: true,
                message: this.translate.instant('Password does not match'),
                severity: 'warn'
            };
        } else {
            console.log('');
            this.message = {
                showMessage: true,
                severity: 'success',
                message: this.translate.instant('valid password')
            };
        }
    }
}


