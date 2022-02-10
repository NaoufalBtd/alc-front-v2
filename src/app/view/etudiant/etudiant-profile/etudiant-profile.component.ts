import { Component, OnInit } from '@angular/core';
import {User} from '../../../controller/model/user.model';
import {FileUploadStatus} from '../../../controller/model/FileUploadStatus';
import {Subscription} from 'rxjs';
import {MenuService} from '../../shared/slide-bar/app.menu.service';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {UserService} from '../../../controller/service/user.service';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {GroupeEtude} from "../../../controller/model/groupe-etude.model";
import {EtudiantService} from "../../../controller/service/etudiant.service";
import {Parcours} from "../../../controller/model/parcours.model";
import {ParcoursService} from "../../../controller/service/parcours.service";
import {InscriptionService} from "../../../controller/service/inscription.service";
import {Etudiant} from "../../../controller/model/etudiant.model";
import {PackStudent} from "../../../controller/model/pack-student.model";
import {PackStudentService} from "../../../controller/service/pack-student.service";
import {MessageService} from "primeng/api";
import {Inscription} from "../../../controller/model/inscription.model";
import {GroupeEtudeService} from "../../../controller/service/groupe-etude.service";

@Component({
  selector: 'app-etudiant-profile',
  templateUrl: './etudiant-profile.component.html',
  styleUrls: ['./etudiant-profile.component.scss']
})
export class EtudiantProfileComponent implements OnInit {

  user: User = new User();
  public users: User[];
  allUsers: User[];
  public fileName: string;
  public profileImage: File;
  public fileStatus = new FileUploadStatus();
  private subscriptions: Subscription[] = [];
  showdialog = false;
  packChossen: PackStudent = new PackStudent();
  inscription: Inscription = new Inscription();
    updated = false;




  constructor(private menuService: MenuService,
              private authenticationService: AuthenticationService,
              private userService: UserService, public etudiantService: EtudiantService, private service: InscriptionService,
              public packStudentService: PackStudentService, private messageService: MessageService,
              public groupeEtudeService: GroupeEtudeService) {
  }


  ngOnInit(): void {
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
  get etudiant(): Etudiant {
    return this.etudiantService.selected;
  }

  set etudiant(etudiant1){
    this.etudiantService.selected = etudiant1;
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
    this.etudiantService.updateInscriptionByStudent(this.packChossen.code).subscribe(
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
