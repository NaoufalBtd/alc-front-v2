import { Component, OnInit } from '@angular/core';
import {User} from '../../../controller/model/user.model';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {FileUploadStatus} from '../../../controller/model/FileUploadStatus';
import {Subscription} from 'rxjs';
import {PackStudent} from '../../../controller/model/pack-student.model';
import {Inscription} from '../../../controller/model/inscription.model';
import {MenuService} from '../../shared/slide-bar/app.menu.service';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {UserService} from '../../../controller/service/user.service';
import {LoginService} from '../../../controller/service/login.service';
import {EtudiantService} from '../../../controller/service/etudiant.service';
import {InscriptionService} from '../../../controller/service/inscription.service';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {MessageService} from 'primeng/api';
import {GroupeEtudeService} from '../../../controller/service/groupe-etude.service';
import {GroupeEtude} from '../../../controller/model/groupe-etude.model';
import {Parcours} from '../../../controller/model/parcours.model';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {InteretEtudiant} from '../../../controller/model/interet-etudiant.model';
import {Fonction} from '../../../controller/model/fonction.model';
import {StatutSocial} from '../../../controller/model/statut-social.model';
import {NiveauEtude} from '../../../controller/model/niveau-etude.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


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




  constructor(private menuService: MenuService, public router: Router,
              private authenticationService: AuthenticationService,
              public userService: UserService,
              public loginService: LoginService, private etudiantService: EtudiantService,
              private service: InscriptionService,
              public packStudentService: PackStudentService, private messageService: MessageService,
              public groupeEtudeService: GroupeEtudeService) {
  }
  get selected(): Etudiant {
    return this.userService.selected;
  }


  set selected(value: Etudiant) {
    this.userService.selected = value;
  }

  public edit(){
    console.log(this.etudiant);
    this.router.navigate(['etudiant/profile']);
    this.userService.edit(this.etudiant).subscribe(data => {
      this.etudiant  = data;
    });
  }
  ngOnInit(): void {
    this.etudiantService.findAllEtudiant().subscribe(data =>
        this.etudiant = data );
    this.user = this.authenticationService.getUserFromLocalCache();
    this.etudiantService.findAllParcours().subscribe(
        data => {
          this.parcoursList = data ;
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
          this.groupeEtudeList = data ;
        }
    );
    this.packStudentService.findPackIndividualOrgroupe(true);
    this.packStudentService.findPackIndividualOrgroupe(false);
    this.userService.findAllStatutSocial().subscribe(
        data => {
          this.statutSocials = data;
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
    this.subscriptions.push(
        this.userService.updateUser(user).subscribe(
            data => {
              this.user = data;
              this.authenticationService.addUserToLocalCache(this.user);
              console.log(data);
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

  showdialogPacks(){
    this.getgroupechosen(this.etudiant.groupeEtude.id);
    this.showdialog = true;
    if (this.etudiantService.groupeEtude.nombreEtudiant > 1){
      this.packStudentService.findPackIndividualOrgroupe(true);
      console.log(this.packStudentService.packstudentgroupeList);

    }else {
      this.packStudentService.findPackIndividualOrgroupe(false);
      console.log(this.packStudentService.packstudentIndividialList);
    }
  }
  getgroupechosen(id: number) {
    this.etudiantService.findGroupeById(id);
  }
  selectedPack(pack: PackStudent) {
    this.etudiantService.packCode = pack.code ;
    this.packChossen = pack;
    this.showdialog = false;
    console.log(this.etudiantService.packCode);
  }
  updateInscriptionByStudent(){
    this.etudiantService.updateInscriptionByStudent(this.packChossen.code, this.etudiant).subscribe(
        data => {
          if (data > 0){
            this.updated = true;
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Registration updated Successfully',
            life: 3000}
          );
        }, error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Update canceled',
            life: 3000}
          );
        }
    );

  }

}
