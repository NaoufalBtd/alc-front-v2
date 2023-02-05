import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {EtudiantService} from '../../../../controller/service/etudiant.service';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {MenuService} from '../../../shared/slide-bar/app.menu.service';
import {AuthenticationService} from '../../../../controller/service/authentication.service';
import {UserService} from '../../../../controller/service/user.service';
import {AppComponent} from '../../../../app.component';
import {User} from '../../../../controller/model/user.model';
import {Subscription} from 'rxjs';
import {Inscription} from '../../../../controller/model/inscription.model';
import {Role} from '../../../../enum/role.enum';
import {PackStudentService} from '../../../../controller/service/pack-student.service';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {GroupeEtudeService} from '../../../../controller/service/groupe-etude.service';
import {GroupeEtude} from '../../../../controller/model/groupe-etude.model';
import {PackStudent} from '../../../../controller/model/pack-student.model';
import {Parcours} from '../../../../controller/model/parcours.model';
import {AnimationService} from '../../../../controller/service/animation.service';


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
    allGroups: Array<GroupeEtude> = new Array<GroupeEtude>();
    allPacks: Array<PackStudent> = new Array<PackStudent>();
    packs: Array<PackStudent> = new Array<PackStudent>();
    parcours: Array<Parcours> = new Array<Parcours>();
    selectedPack: PackStudent = null;
    groupNotValid: boolean;
    packNotValid: boolean;
    levelNotValid: boolean;

    constructor(private menuService: MenuService,
                private authenticationService: AuthenticationService,
                private userService: UserService,
                private studentService: EtudiantService,
                private packService: PackStudentService,
                private parcourService: ParcoursService,
                private messageService: MessageService,
                private animation: AnimationService,
                private groupService: GroupeEtudeService,
                private primengConfig: PrimeNGConfig, public app: AppComponent) {
    }


    public searchUsers(): void {
        this.studentService.findByCriteria(this.etudiant).subscribe(
            data => {
                this.users.splice(0, this.users.length);
                this.users = data;
            }, error => {
                console.log(error);
            }
        );

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
        this.findAll();
        this.parcourService.findAllLevels().subscribe(d => this.parcours = d);
        this.groupService.findAll().subscribe(d => this.allGroups = d);
        this.packService.findAll().subscribe(d => this.allPacks = d);
    }

    public findEtud(i: number) {
        console.log('hahoa');
        console.log(this.userInfo);
        this.studentService.findByEtudiantId(i).subscribe(
            data => {
                this.inscription = data;
                console.log(this.inscription);
            }
        );
    }

    private _inscription = new Inscription();

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
        this.findEtud(user.id);
        this.editDialog = true;
        this.userInfo = user;
    }


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

    showAddUserDialog() {
        this.etudiant = new Etudiant();
        this.etudiant.parcours = null;
        this.etudiant.groupeEtude = null;
        this.newUserDialog = true;
    }

    save() {
        this.etudiant.role = Role.STUDENT;
        console.log(this.etudiant);
        if (this.etudiant.parcours === null) {
            this.levelNotValid = true;
            return;
        } else if (this.etudiant.groupeEtude === null) {
            this.groupNotValid = true;
            return;
        } else if (this.selectedPack === null) {
            this.packNotValid = true;
            return;
        }
        this.animation.showAnimation = true;
        this.studentService.addStudentWithPack(this.etudiant, this.selectedPack.id).subscribe(student => {
            this.animation.showAnimation = false;
            this.users.push({...student});
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'student Created',
                life: 3000
            });
            this.newUserDialog = false;
        }, error => {
            this.animation.showAnimation = false;
            console.log(error);
            this.messageService.add({
                severity: 'error',
                detail: error?.error?.message,
                life: 3000
            });
        });

    }

    getPacks() {
        console.log(this.etudiant.parcours);
        this.packs = this.allPacks.filter(p => p.level.id === this.etudiant?.parcours?.id);
    }
}
