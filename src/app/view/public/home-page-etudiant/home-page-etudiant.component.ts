import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {MessageService} from 'primeng/api';
import {EtudiantService} from '../../../controller/service/etudiant.service';
import {UserService} from '../../../controller/service/user.service';
import {AuthenticationService} from '../../../controller/service/authentication.service';

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

    constructor(public router: Router,
                private _activatedRoute: ActivatedRoute,
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
                            detail: 'Your account is already validated, please try to sign in.'
                        });
                        this.router.navigate(['/public/login']);
                    } else {
                        this.etudiantService.validateStudent(this.token).subscribe(
                            student => {
                                this.currentUser = student;
                                this.messageService.add({
                                    severity: 'success',
                                    life: 8000,
                                    detail: 'Your account has been validated.'
                                });
                                this.authService.addUserToLocalCache(student);
                            }, error => {
                                console.log(error);
                                this.messageService.add({
                                    severity: 'warn',
                                    life: 8000,
                                    detail: error?.error?.message || 'Email does not found! Are you sure you are already a member ?'
                                });
                            }
                        );
                    }
                }, error => {
                    this.messageService.add({
                        severity: 'warn',
                        life: 30000,
                        detail: 'Your account not found.'
                    });
                    this.router.navigate(['/free-trial']);
                }
            );
        } else {
            this.messageService.add({
                severity: 'warn',
                life: 4000,
                detail: 'Email does not found! Are you sure you are already a member?'
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
        if (this.verify()) {
            this.etudiantService.updatePassword(this.newPassword, this.currentUser.username).subscribe(
                data => {
                    if (data > 0) {
                        this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'Password updated Successfully',
                                life: 3000
                            }
                        );
                        this.index = 1;
                    }
                }, error => {
                    this.messageService.add({
                            severity: 'Error',
                            summary: 'error',
                            detail: 'error while updating your password',
                            life: 3000
                        }
                    );
                }
            );
        }
    }

    private verify(): boolean {
        if (this.newPassword === null ||
            this.newPassword?.length < 4 ||
            this.newPasswordRepated?.length < 4 ||
            this.newPasswordRepated === null ||
            this.newPasswordRepated !== this.newPassword
        ) {
            return false;
        }
        return true;
    }
}
