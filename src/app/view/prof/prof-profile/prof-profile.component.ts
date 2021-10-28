import { Component, OnInit } from '@angular/core';
import {User} from '../../../controller/model/user.model';
import {FileUploadStatus} from '../../../controller/model/FileUploadStatus';
import {Subscription} from 'rxjs';
import {MenuService} from '../../shared/slide-bar/app.menu.service';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {UserService} from '../../../controller/service/user.service';

import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-prof-profile',
  templateUrl: './prof-profile.component.html',
  styleUrls: ['./prof-profile.component.scss']
})
export class ProfProfileComponent implements OnInit {

  user: User = new User();
  public users: User[];
  allUsers: User[];
  public fileName: string;
  public profileImage: File;
  public fileStatus = new FileUploadStatus();
  private subscriptions: Subscription[] = [];


  constructor(private menuService: MenuService,
              private authenticationService: AuthenticationService,
              private userService: UserService, )
  {
  }


  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.findAll();
  }

  findAll() {
    this.userService.getUsers().subscribe(
        data => {
          this.users = data;
          this.allUsers = data;
          console.log(this.users);
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


}
