import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../controller/model/user.model';
import {FileUploadStatus} from '../../../controller/model/FileUploadStatus';
import {Subscription} from 'rxjs';
import {MenuService} from '../../shared/slide-bar/app.menu.service';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {UserService} from '../../../controller/service/user.service';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {GroupeEtude} from '../../../controller/model/groupe-etude.model';
import {EtudiantService} from '../../../controller/service/etudiant.service';
import {Parcours} from '../../../controller/model/parcours.model';
import {InscriptionService} from '../../../controller/service/inscription.service';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {PackStudent} from '../../../controller/model/pack-student.model';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {MessageService} from 'primeng/api';
import {Inscription} from '../../../controller/model/inscription.model';
import {GroupeEtudeService} from '../../../controller/service/groupe-etude.service';
import {InteretEtudiant} from '../../../controller/model/interet-etudiant.model';
import {Fonction} from '../../../controller/model/fonction.model';
import {StatutSocial} from '../../../controller/model/statut-social.model';
import {NiveauEtude} from '../../../controller/model/niveau-etude.model';
import {LoginService} from '../../../controller/service/login.service';
import {Router} from '@angular/router';
import {Skill} from '../../../controller/model/skill.model';


@Component({
    selector: 'app-etudiant-profile',
    templateUrl: './etudiant-profile.component.html',
    styleUrls: ['./etudiant-profile.component.scss']
})
export class EtudiantProfileComponent implements OnInit {
    @ViewChild('mySpan', {static: true}) mySpan: ElementRef;

    user: User = new User();
    public users: User[];
    allUsers: User[];
    public etudiant = new Etudiant();
    public fileName: string;
    public profileImage: File;
    public fileStatus = new FileUploadStatus();
    private subscriptions: Subscription[] = [];
    showdialog = false;
    packChossen: PackStudent = new PackStudent();
    inscription: Inscription = new Inscription();
    updated = false;
    showpackInput = false;

    Student = false;
    Employed = false;

    private submitted: boolean;
    changePass = false;
    newPassword = '';
    newPasswordRepated = '';
    selectedElement = 'PROFILE' || 'SET' || 'PASS' || 'INS_TAB';
    languages = [
        {code: 'ar', libelle: 'Arabic'},
        {code: 'fr', libelle: 'French'},
        {code: 'en', libelle: 'English'}
    ];
    selectedLanguage: any;
    public showPassNotValidMessage: string;
    public showPassNotValid: boolean;


    constructor(private menuService: MenuService,
                private authenticationService: AuthenticationService,
                public userService: UserService,
                public loginService: LoginService, public etudiantService: EtudiantService,
                private service: InscriptionService,
                public packStudentService: PackStudentService, private messageService: MessageService,
                public groupeEtudeService: GroupeEtudeService, public router: Router) {
    }


    get selectedPack(): PackStudent {
        return this.etudiantService.selectedPack;
    }

    set selectedPack(value: PackStudent) {
        this.etudiantService.selectedPack = value;
    }

    get selected(): Etudiant {
        return this.userService.selected;
    }


    set selected(value: Etudiant) {
        this.userService.selected = value;
    }

    public edit() {
        console.log(this.etudiant.skype);
        this.userService.edit(this.etudiant).subscribe(data => {
            this.etudiant = data;

        });
    }

    get packs(): Array<PackStudent> {
        return this.packStudentService.packs;
    }

    set packs(value: Array<PackStudent>) {
        this.packStudentService.packs = value;
    }

    ngOnInit(): void {
        this.etudiantService.findAllEtudiant().subscribe((data) => {
            this.etudiant = data;
            this.getValue();
        });
        this.user = this.authenticationService.getUserFromLocalCache();
        this.etudiantService.findAllParcours().subscribe(
            data => {
                this.parcoursList = data;
                console.log(data);
            }
        );
        this.service.findByEtudiantId(this.user.id).subscribe(
            data => {
                this.inscription = data;
                this.packChossen = this.inscription.packStudent;
            }
        );
        this.groupeEtudeService.findAll().subscribe(
            data => {
                this.groupeEtudeList = data;
            }
        );
        // this.packStudentService.findPackIndividualOrgroupe(true);
        // this.packStudentService.findPackIndividualOrgroupe(false);
        this.packStudentService.findAllPacks();
        this.userService.findAllStatutSocial().subscribe(
            data => {
                this.statutSocials = data;
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
        this.service.findAllSkill().subscribe(
            data => {
                this.skills = data;
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
        this.userService.findAllFonction().subscribe(
            data => {
                this.fonctions = data;
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
        this.userService.findAllInteretEtudiant().subscribe(
            data => {
                this.interetEtudiants = data;
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
        this.userService.findAllNiveauEtude().subscribe(
            data => {
                this.niveauEtudes = data;
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
    }

    get groupeEtudeList(): Array<GroupeEtude> {
        return this.etudiantService.groupeEtudeList;
    }

    set groupeEtudeList(value: Array<GroupeEtude>) {
        this.etudiantService.groupeEtudeList = value;
    }

    get parcoursList(): Array<Parcours> {
        return this.service.parcoursList;

    }

    set parcoursList(value: Array<Parcours>) {
        this.service.parcoursList = value;
    }


    public onProfileImageChange(event: any): void {
        const target = event.target as HTMLInputElement;
        this.profileImage = (target.files as FileList)[0];
        this.fileName = (target.files as FileList)[0].name;
        console.log(this.profileImage);
        console.log(this.fileName);
    }


    public updateUser(user: User) {
        this.submitted = true;
        this.subscriptions.push(
            this.userService.updateUser(user).subscribe(
                data => {
                    this.user = data;
                    this.authenticationService.addUserToLocalCache(this.user);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'profile updated',
                        life: 3000,

                    });
                    console.log('salut');
                }, err => {
                    console.log(err);
                }
            )
        );
    }


    public onUpdateProfileImage(): void {
        const formData = new FormData();
        formData.append('username', this.user.username);
        formData.append('profileImage', this.profileImage);
        console.log(formData);
        this.subscriptions.push(
            this.userService.updateProfileImage(formData).subscribe(
                (event: HttpEvent<any>) => {
                    this.reportUploadProgress(event);
                },
                (errorResponse: HttpErrorResponse) => {
                    this.fileStatus.status = 'done';
                }
            )
        );
    }

    private reportUploadProgress(event: HttpEvent<any>): void {
        switch (event.type) {
            case HttpEventType.UploadProgress:
                // @ts-ignore
                this.fileStatus.percentage = Math.round(100 * event.loaded / event.total);
                this.fileStatus.status = 'progress';
                break;
            case HttpEventType.Response:
                if (event.status === 200) {
                    this.user.image = `${event.body.image}?time=${new Date().getTime()}`;
                    this.fileStatus.status = 'done';
                    break;
                } else {
                    break;
                }
            default:
                `Finished all processes`;
        }
    }

    public updateProfileImage(): void {
        this.clickButton('profile-image-input');
    }


    private clickButton(buttonId: string): void {
        document.getElementById(buttonId).click();
    }

    get interetEtudiant(): InteretEtudiant {
        return this.userService.interetEtudiant;
    }

    set interetEtudiant(value: InteretEtudiant) {
        this.userService.interetEtudiant = value;
    }

    get interetEtudiants(): Array<InteretEtudiant> {
        return this.userService.interetEtudiants;
    }

    set interetEtudiants(value: Array<InteretEtudiant>) {
        this.userService.interetEtudiants = value;
    }

    get fonctions(): Array<Fonction> {
        return this.userService.fonctions;
    }

    set fonctions(value: Array<Fonction>) {
        this.userService.fonctions = value;
    }

    get fonction(): Fonction {
        return this.userService.fonction;
    }

    set fonction(value: Fonction) {
        this.userService.fonction = value;
    }

    get statutSocial(): StatutSocial {
        return this.userService.statutSocial;
    }

    set statutSocial(value: StatutSocial) {
        this.userService.statutSocial = value;
    }

    get statutSocials(): Array<StatutSocial> {
        return this.userService.statutSocials;
    }

    set statutSocials(value: Array<StatutSocial>) {
        this.userService.statutSocials = value;
    }

    get niveauEtudes(): Array<NiveauEtude> {
        return this.userService.niveauEtudes;
    }

    set niveauEtudes(value: Array<NiveauEtude>) {
        this.userService.niveauEtudes = value;
    }

    get niveauEtude(): NiveauEtude {
        return this.userService.niveauEtude;
    }

    set niveauEtude(value: NiveauEtude) {
        this.userService.niveauEtude = value;
    }


    public findAllGroupeEtude() {
        this.etudiantService.findAllGroupeEtude().subscribe(data => this.groupeEtudeList = data);
    }

    public findAllParcoursList() {
        this.etudiantService.findAllParcoursList().subscribe(data => {
                this.parcoursList = data;
                console.log(this.parcoursList);
            }
        );

    }


    getgroupechosen(id: number) {
        this.etudiantService.findGroupeById(id);
        this.showpackInput = true;
    }

    selectedPackFct(pack: PackStudent) {
        this.selectedPack = pack;
        this.router.navigate(['/etudiant/pack/' + pack.id]);
    }

    updateInscriptionByStudent() {
        this.etudiantService.updateInscriptionByStudent(this.packChossen.code, this.etudiant).subscribe(
            data => {
                if (data > 0) {
                    this.updated = true;
                }
                this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Registration updated Successfully',
                        life: 3000
                    }
                );
            }, error => {
                this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Update canceled',
                        life: 3000
                    }
                );
            }
        );

    }

    navigateToProfilEdit() {
        this.router.navigate(['etudiant/profileEdit']);

    }

    getValue() {
        if (this.etudiant?.statutSocial?.libelle == 'Student') {
            this.Student = true;
            this.Employed = false;
        } else if (this.etudiant?.statutSocial?.libelle == 'Employed') {
            this.Student = false;
            this.Employed = true;
        } else {
            this.Student = false;
            this.Employed = false;
        }

    }

    get skills(): Array<Skill> {

        return this.service.skills;
    }

    set skill(value: Skill) {
        this.service.skill = value;
    }

    set skills(value: Array<Skill>) {
        this.service.skills = value;
    }

    get skill(): Skill {
        return this.service.skill;
    }

    changePassword() {
        if (this.newPassword !== this.newPasswordRepated) {
            this.showPassNotValid = true;
            this.showPassNotValidMessage = 'true';
        }
        if (this.newPassword !== null &&
            this.newPassword !== undefined &&
            this.newPassword?.length > 7 &&
            this.newPassword === this.newPasswordRepated
        ) {
            this.etudiantService.updatePassword(this.newPassword, this.loginService.getConnectedStudent().username).subscribe(
                data => {
                    if (data > 0) {
                        this.changePass = false;
                        this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'Password updated Successfully',
                                life: 3000
                            }
                        );
                    }
                }, error => {
                    this.messageService.add({
                            severity: 'Error',
                            detail: error?.error?.message || 'error while updating your password',
                            life: 3000
                        }
                    );
                }
            );
        }
    }

    showMenuElemnt(elemnent: string) {
        this.selectedElement = elemnent;
    }

    showPass(newPass: HTMLInputElement) {
        if (newPass.type === 'password') {
            newPass.type = 'text';
        } else {
            newPass.type = 'password';
        }
    }

    isForGroupOrindev(forGroupe: boolean): string {
        if (forGroupe) {
            return 'Group';
        } else {
            return 'Individual';
        }
    }

    getPercentage(pack: PackStudent): number {
        return (100 - ((Number(pack?.price?.price) / Number(pack?.price?.oldPrice)) * 100));
    }

    filterByLevel(level: Parcours) {
        console.log(level);
    }
}

