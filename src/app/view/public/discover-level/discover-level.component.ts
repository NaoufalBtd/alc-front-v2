import {Component, OnInit} from '@angular/core';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {EtudiantService} from '../../../controller/service/etudiant.service';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {TranslateService} from '@ngx-translate/core';
import {InscriptionService} from '../../../controller/service/inscription.service';
import {Router} from '@angular/router';
import {AnimationService} from '../../../controller/service/animation.service';

@Component({
    selector: 'app-discover-level',
    templateUrl: './discover-level.component.html',
    styleUrls: ['./discover-level.component.scss']
})
export class DiscoverLevelComponent implements OnInit {
    displayModal: boolean;
    nextModel: boolean;

    constructor(private messageService: MessageService,
                private etudiantService: EtudiantService,
                private animation: AnimationService,
                private confirmationService: ConfirmationService,
                private authenticationService: AuthenticationService,
                private packStudentService: PackStudentService,
                public translate: TranslateService,
                private service: InscriptionService,
                private router: Router) {
    }

    get selected(): Etudiant {
        return this.etudiantService.selected;
    }

    set selected(value: Etudiant) {
        this.etudiantService.selected = value;
    }

    ngOnInit(): void {
    }

    startPractice() {
        this.router.navigate(['/start-test-level']);
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
                        summary: 'Successful',
                        detail: 'Registration added, please check your email to get your password.',
                        life: 4000
                    });
                    this.displayModal = false;
                    this.nextModel = true;
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


    startTest() {
        this.router.navigate(['etudiant/test-level']);
    }
}
