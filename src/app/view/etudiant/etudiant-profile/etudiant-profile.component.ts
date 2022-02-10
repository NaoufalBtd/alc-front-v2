import { Component, OnInit } from '@angular/core';
import {User} from '../../../controller/model/user.model';
import {FileUploadStatus} from '../../../controller/model/FileUploadStatus';
import {Observable, Subscription} from 'rxjs';
import {MenuService} from '../../shared/slide-bar/app.menu.service';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {UserService} from '../../../controller/service/user.service';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {InteretEtudiant} from '../../../controller/model/interet-etudiant.model';
import {Fonction} from '../../../controller/model/fonction.model';
import {StatutSocial} from '../../../controller/model/statut-social.model';
import {NiveauEtude} from '../../../controller/model/niveau-etude.model';
import {LoginComponent} from '../../public/login/login.component';
import {LoginService} from '../../../controller/service/login.service';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {Inscription} from '../../../controller/model/inscription.model';
import {InscriptionService} from '../../../controller/service/inscription.service';
import {EtudiantService} from '../../../controller/service/etudiant.service';

@Component({
  selector: 'app-etudiant-profile',
  templateUrl: './etudiant-profile.component.html',
  styleUrls: ['./etudiant-profile.component.scss']
})
export class EtudiantProfileComponent implements OnInit {

  user: User = new User();
  public users: User[];
  allUsers: User[];
  public etudiant = new Etudiant();
  public fileName: string;
  public profileImage: File;
  public fileStatus = new FileUploadStatus();
  private subscriptions: Subscription[] = [];


  constructor(private menuService: MenuService,
              private authenticationService: AuthenticationService,
              public userService: UserService,
              public loginService: LoginService, private etudiantService: EtudiantService) {
  }
  get selected(): Etudiant {
    return this.userService.selected;
  }

  set selected(value: Etudiant) {
    this.userService.selected = value;
  }

  public edit(){
    console.log(this.etudiant);
    this.userService.edit(this.etudiant).subscribe(data => {
      this.etudiant  = data;
    });
  }
  ngOnInit(): void {
  this.etudiantService.findAllEtudiant().subscribe(data =>
  this.etudiant = data );
    this.user = this.authenticationService.getUserFromLocalCache();
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


}
