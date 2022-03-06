import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {EtudiantService} from '../../../../controller/service/etudiant.service';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {EtudiantVo} from '../../../../controller/model/etudiant-vo.model';
import {MenuService} from '../../../shared/slide-bar/app.menu.service';
import {AuthenticationService} from '../../../../controller/service/authentication.service';
import {UserService} from '../../../../controller/service/user.service';
import {AppComponent} from '../../../../app.component';
import {User} from '../../../../controller/model/user.model';
import {FileUploadStatus} from '../../../../controller/model/FileUploadStatus';
import {Subscription} from 'rxjs';
import {Inscription} from '../../../../controller/model/inscription.model';


@Component({
    selector: 'app-etudiant-list',
    templateUrl: './etudiant-list.component.html',
    styleUrls: ['./etudiant-list.component.scss']
})
export class EtudiantListComponent implements OnInit {
    user: User = new User();
    userInfo: User = new User();
    userDelete: User = new User();
    public users: Etudiant[];
    first = 0;
    rows = 10;
    deleteDialog: boolean;
    private subscriptions: Subscription[] = [];
    public editUser = new User();
    editDialog: boolean;
    newUserDialog: boolean;
    public index: number;
    public etudiant: Etudiant = new Etudiant();


    constructor(private menuService: MenuService,
                private authenticationService: AuthenticationService,
                private userService: UserService,
                private studentService: EtudiantService,
                private primengConfig: PrimeNGConfig, public app: AppComponent) {
    }


    public searchUsers(): void {
        console.log(this.etudiant);
        this.studentService.findByCriteria(this.etudiant).subscribe(
            data => {
                this.users.splice(0, this.users.length);
                this.users = data;
            }, error => {
                console.log(error);
            }
        );
        // const results: Etudiant[] = [];
        // for (const user of this.users) {
        //     if (
        //         user.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        //         user.prenom.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        //         user?.prof?.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        //         user?.parcours?.libelle.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        //         user?.parcours?.code.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        //         user?.prof?.prenom.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        //         user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        //         results.push(user);
        //     }
        // }
        // if (results.length === 0 || !searchTerm) {
        //     this.findAll();
        // } else {
        //     this.users.splice(0, this.users.length);
        //     for (const item of results) {
        //         this.users.push(item);
        //     }
        // }
    }

    findAll() {
        this.studentService.findAll().subscribe(
            data => {
                this.users = data;
            }, error => {
                console.log(error);
            }
        );
    }

    ngOnInit(): void {
        console.log(this.userInfo);
        this.findAll();

        this.studentService.findByEtudiantId(this.user.id).subscribe(
            data => {
                this.inscription = data;
            console.log(this.inscription);
            }
        );
    }
private _inscription =  new Inscription();

    get inscription(): Inscription {
        return this._inscription;
    }

    set inscription(value: Inscription) {
        this._inscription = value;
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

    // addNewUser() {
    //     this.newUser.role = 'STUDENT';
    //     this.userService.addUser(this.newUser).subscribe(
    //         data => {
    //             if (data == null) {
    //                 alert('error to save user');
    //             } else {
    //                 const student: Etudiant = new Etudiant(data);
    //                 console.log(student);
    //                 this.users.push({...student});
    //                 console.log(data);
    //             }
    //         }, error => {
    //             console.log(error);
    //         }
    //     );
    //     this.newUser = new User();
    // }

    deleteUser() {
        console.log(this.userDelete);
        this.studentService.deleteById(this.userDelete.id).subscribe(
            data => {
                console.log(data);
            }, error => {
                console.log(error);
            }
        );
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === this.userDelete.id) {
                this.users.splice(i, 1);
            }
        }
        this.userDelete = new User();
    }

    showAddUserDialog() {
        this.newUserDialog = true;
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


}
