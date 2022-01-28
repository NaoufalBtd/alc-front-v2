import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../controller/service/user.service';
import {User} from '../../../controller/model/user.model';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {MenuService} from '../../shared/slide-bar/app.menu.service';
import {PrimeNGConfig} from 'primeng/api';
import {AppComponent} from '../../../app.component';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {FileUploadStatus} from '../../../controller/model/FileUploadStatus';
import {Role} from '../../../enum/role.enum';
import {AdminService} from '../../../controller/service/admin.service';
import {Admin} from '../../../controller/model/admin.model';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    user: User = new User();
    userInfo: User = new User();
    userDelete: User = new User();
    newUser: User = new User();
    public users: Admin[];
    allUsers: Admin[];
    public refreshing: boolean;
    public selectedUser: User = new User();
    public fileName: string;
    public profileImage: File;
    public fileStatus = new FileUploadStatus();
    first = 0;
    rows = 10;
    deleteDialog: boolean;
    private subscriptions: Subscription[] = [];
    public editUser = new User();
    editDialog: boolean;
    newUserDialog: boolean;
    roles = [
        {authority: 'ADMIN', id: '1'},
        {authority: 'TEACHER', id: '2'},
        {authority: 'STUDENT', id: '3'},
    ];
    public index: number;


    constructor(private menuService: MenuService,
                private authenticationService: AuthenticationService,
                private userService: UserService,
                private adminService: AdminService,
                private primengConfig: PrimeNGConfig, public app: AppComponent) {
    }


    ngOnInit(): void {
        this.user = this.authenticationService.getUserFromLocalCache();
        this.findAll();
    }

    findAll() {
        this.adminService.findAll().subscribe(
            data => {
                this.users = data;
                this.allUsers = data;
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

    public updateOtherUser(user: User) {
        this.subscriptions.push(
            this.userService.updateUser(user).subscribe(
                data => {
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

    public isAdmin(user: User): boolean {
        if (user == null) {
            return false;
        } else {
            // @ts-ignore
            return user.role === Role.ADMIN;

        }
    }
    public isSuperAdmin(user: User): boolean {
        if (user == null) {
            return false;
        } else {
            // @ts-ignore
            return user.role === Role.SUPERADMIN;
        }
    }

    public isProf(user: User): boolean {
        if (user == null) {
            return false;
        } else {
            // @ts-ignore
            return user.role === Role.PROF;

        }
    }

    public isStudent(user: User): boolean {
        if (user == null) {
            return false;
        } else {
            // @ts-ignore
            return user.role === Role.STUDENT;

        }
    }


    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.users ? this.first === (this.users.length - this.rows) : true;
    }

    isFirstPage(): boolean {
        return this.users ? this.first === 0 : true;
    }

    showDeleteDialog(user: User, index: number) {
        this.userDelete = user;
        this.index = index;
        console.log(this.index);
        this.deleteDialog = true;
    }

    showEditDialog(user: User) {
        this.editDialog = true;
        this.userInfo = user;
    }

    addNewUser() {
        this.newUser.role = 'ADMIN';
        this.userService.addUser(this.newUser).subscribe(
            data => {
                if (data == null) {
                    alert('error to save user');
                } else {
                    this.users.push({...data});
                    console.log(data);
                }
            }, error => {
                console.log(error);
            }
        );
        this.newUser = new User();
    }

    deleteUser() {
        console.log(this.userDelete);
        this.userService.deleteUser(this.userDelete);
        this.users.splice(0, this.users.length);
        this.users = this.users.filter(user => user.id === this.userDelete.id);
        this.userDelete = new User();
    }

    showAddUserDialog() {
        this.newUserDialog = true;
    }

    public searchUsers(searchTerm: string): void {
        console.log(this.allUsers);
        const results: User[] = [];
        for (const user of this.users) {
            if (
                user.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
                user.prenom.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
                user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                results.push(user);
            }
        }
        if (results.length === 0 || !searchTerm) {
            this.findAll();
        } else {
            this.users.splice(0, this.users.length);
            for (const item of results) {
                this.users.push(item);
            }
        }
    }
}
