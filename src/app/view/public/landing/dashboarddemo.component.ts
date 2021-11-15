import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
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


@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./tabledemo.scss']
})
export class DashboardDemoComponent implements OnInit {

    products: any[];


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

    constructor(private login: LoginService, private profservice: ProfService, private studentservice: EtudiantService, private parcoursService: ParcoursService) {
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
        console.log('nbr of student');
        console.log(this.studentservice.items);
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
}
