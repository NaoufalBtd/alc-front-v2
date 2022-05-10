import {Component, NgModule, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {LoginService} from '../../../controller/service/login.service';
import {ProfService} from '../../../controller/service/prof.service';
import {EtudiantService} from '../../../controller/service/etudiant.service';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {Prof} from '../../../controller/model/prof.model';
import {ParcoursService} from '../../../controller/service/parcours.service';
import {Cours} from '../../../controller/model/cours.model';
import {PackStudentService} from '../../../controller/service/pack-student.service';
import {Router, RouterModule} from '@angular/router';
import {User} from '../../../controller/model/user.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {HeaderType} from '../../../enum/header-type.enum';
import {AuthenticationService} from '../../../controller/service/authentication.service';
import {Subscription} from 'rxjs';

import {VonPrimengFormModule} from '@von-development-studio/primeng-form-validation';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./tabledemo.scss']
})
export class DashboardDemoComponent implements OnInit {

    products: any[];
    private subscriptions: Subscription[] = [];

    events: any[];

    fullcalendarOptions: any;

    home: any[];
    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    // tslint:disable-next-line:max-line-length
    showdialogindiv = false;
    showdialoggroupe = false;
    showdialog = false;
    message = '';
    exform: FormGroup;
    isSuccessful = false;
    form2: any = {};

    constructor(private login: LoginService, public profservice: ProfService, public studentservice: EtudiantService, public parcoursService: ParcoursService,
                public packStudentService: PackStudentService,
                public etudiantService: EtudiantService,
                public messageService: MessageService,
                public profService: ProfService, public router: Router, public authenticationService: AuthenticationService) {
    }

    public progress = 0;
    public next = false;
    public previous = false;
    public progressgroup = 0;
    public nextgroup = false;
    public previousgroup = false;
    title = 'landingDemo';
    value = 10;

    public showNext() {
        if (this.progress >= 0 && this.progress < 3) {
            if (this.previous) {
                this.previous = false;
            }
            this.next = true;
            this.progress++;
            this.value += 33;
            console.log(this.progress);
        }

    }

    public showPrevious() {
        if (this.progress > 0) {
            if (this.next) {
                this.next = false;
            }
            this.previous = true;
            this.progress--;
            this.value -= 33;

        }

    }

    public showNextgroup() {
        if (this.progressgroup >= 0 && this.progressgroup < 3) {
            if (this.previousgroup) {
                this.previousgroup = false;
            }
            this.nextgroup = true;
            this.progressgroup++;
            console.log(this.progress);
        }

    }

    public showPreviousgroup() {
        if (this.progressgroup > 0) {
            if (this.nextgroup) {
                this.nextgroup = false;
            }
            this.previousgroup = true;
            this.progressgroup--;
        }

    }


    get model(): any[] {
        return this.login.model;
    }

    set model(value: any[]) {
        this.login.model = value;
    }

    get items(): Array<Etudiant> {
        return this.studentservice.items;
    }

    set items(value: Array<Etudiant>) {
        this.studentservice.items = value;
    }

    get listprof(): Array<Prof> {
        return this.profservice.listprof;

    }

    set listprof(value: Array<Prof>) {
        this.profservice.listprof = value;
    }

    get listcours(): Array<Cours> {
        return this.parcoursService.listcours;
    }

    set listcours(value: Array<Cours>) {
        this.parcoursService.listcours = value;
    }

    ngOnInit() {
        this.exform = new FormGroup({
            'fullName': new FormControl(null, Validators.required),

            'email': new FormControl(null, Validators.required)
        });


        console.log('nbr of student');
        console.log(this.studentservice.items);
        if (this.login.getConnecteUser() != null) {
            if (this.login.getConnecteUser().role === 'STUDENT') {
                this.router.navigate(['etudiant/etudiant-cours']);
            } else if (this.login.getConnecteUser().role === 'PROF') {
                this.router.navigate(['prof/cours']);
            } else if (this.login.getConnecteUser().role === 'ADMIN' || this.login.getConnecteUser().role === 'SUPER_ADMIN') {
                this.router.navigate(['admin/parcours']);
            }
        }
        this.studentservice.findAll().subscribe(data => this.items = data);
        this.profservice.findAll().subscribe(data => this.listprof = data);
        this.parcoursService.findAll().subscribe(data => this.listcours = data);
        // this.model = [];
        this.fullcalendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: '2017-02-12',
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true
        };

        this.home = [
            {
                label: 'assets/layout/images/home1.jpg',
                icon: 'pi pi-check',
                titre: 'HOME',
                descreption: 'We have been serving the Casablanca community for over 40 consecutive years. We are located on Moulay Youssef Boulevard across from the Place de la Liberté. In addition to the administration and our modern classrooms, our facility includes a large multimedia lab, a study center, a bookstore and a student café. Our classes are designed to help students improve their communication skills in English. We also offer business English, TOEFL preparation, BULATS preparation, TOEIC preparation courses. The American Language Center exists to give all of our students the best teaching and learning experience in Casablanca'
            },
            {
                label: 'assets/layout/images/home.jpg',
                icon: 'pi pi-check',
                titre: 'Registration Open',
                descreption: 'WINTER SESSION 2021 ONLINE',
                descreption2: 'January 12 – March 22'
            },
            {
                label: 'assets/layout/images/winter.jpg',
                icon: 'pi pi-check',
                titre: 'Free activities Winter 2020',
                descreption: 'To provide our students with practice using English in a relaxed and friendly setting, we offer free club activities for each session. Our club activities include music club, public speaking club, personal development club, talk club, business club, reading club, critical thinking club, community club, writing club, and journalism club. All our English Clubs are moderated by professional English teachers and are free of charge. In addition to these free clubs, the ALC also offers free beginning 1 and beginning 2 reinforcement classes.'
            },
            {
                label: 'assets/layout/images/contact.jpg',
                icon: 'pi pi-check',
                titre: 'CONTACT US',
                descreption: '> Tel: (+212) 522 277 765 – (+212) 522 275 270',
                descreption2: '> Fax: (+212) 522 207 457',
                descreption3: '> Postal: 1, place de la fraternité, boulevard Moulay Youssef, Casablanca, Morocco ',
                descreption4: '> Instagram: @alccasablanaofficial',
                descreption5: '> Facebook: @alccasablanaofficial'
            }
        ];
    }

    showPacks(b: boolean) {
        if (b) {
            this.showdialoggroupe = true;
        } else {
            this.showdialogindiv = true;
        }
        this.packStudentService.findPackIndividualOrgroupe(b);
    }

    public onLogin(user: User): void {
        // this.showLoading = true;
        this.subscriptions.push(
            this.authenticationService.login(user).subscribe(
                response => {
                    this.etudiantService.connectedStudent.set(response.body.id, response.body);
                    this.model = [
                        {label: 'Courses ', icon: 'pi pi-fw pi-briefcase', routerLink: ['/etudiant/etudiant-cours']},
                        {label: 'FAQ ', icon: 'pi pi-fw pi-question-circle', routerLink: ['/etudiant/faq-student']},
                        {label: 'News ', icon: 'pi pi-fw pi-clock', routerLink: ['/etudiant/news-student']},
                        {label: 'Schedule', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/etudiant/schedule-student']},
                        {label: 'LogOut ', icon: 'pi pi-fw pi-sign-out', routerLink: ['']},
                    ];
                    this.login.hasloged = true;

                    this.router.navigate(['/etudiant/etudiant-cours']);
                },
                (errorResponse: HttpErrorResponse) => {
                    console.log(errorResponse.message);
                }
            )
        );
    }

    createEtudiant() {
        this.etudiantService.create().subscribe(
            data => {
                if (data != null) {
                    console.log(data);
                    // this.onLogin(data);
                    this.authenticationService.addUserToLocalCache(data);
                    console.log('waqila dazt');
                    this.showdialog = true;
                    this.message = 'Registration added, please check your email to get your password.';
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Registration added, please check your email to get your password.',
                        life: 4000
                    });
                    this.router.navigate(['public/etudianthomepage']);
                }
            }, error => {
                console.log('error a m3lm');
                this.showdialog = true;
                this.message = 'Registration Canceled, there was an error during saving your registration!!.';
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Registration Canceled',
                    life: 4000
                });
            }
        );
    }

    createProf() {
        this.profService.save().subscribe(
            data => {
                if (data != null) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Registration added, please check your email to get your password.',
                        life: 4000
                    });
                }
            }, error => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Registration Canceled',
                    life: 4000
                });
            }
        );
    }
}
