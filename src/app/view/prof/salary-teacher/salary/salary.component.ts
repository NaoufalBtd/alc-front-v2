import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {ClassRoomService} from '../../../../controller/service/class-room.service';
import {SalaryVo} from '../../../../controller/model/salary-vo.model';
import {LoginService} from '../../../../controller/service/login.service';
import {SalaryService} from '../../../../controller/service/salary.service';
import {Salary} from '../../../../controller/model/salary.model';
import {SessionCours} from '../../../../controller/model/session-cours.model';
import {SessionCoursService} from '../../../../controller/service/session-cours.service';
import {DateTimePicker} from '@syncfusion/ej2-angular-calendars';


@Component({
    selector: 'app-salary',
    templateUrl: './salary.component.html',
    styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
    data: any;
    items: MenuItem[];
    itemsannee: MenuItem[];
    activeItem: MenuItem;
    mois: number;
    annee: number;
    globalAnnee: number;
    displaySalary: boolean = false;
    itemsMOIS: MenuItem[];


    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
                private service: ClassRoomService, private serviceUser: LoginService, private salaryservice: SalaryService, private sessionCoursService: SessionCoursService) {

        this.itemsannee = [];
        for (let i = 2022; i < 2050; i++) {
            // @ts-ignore
            this.itemsannee.push({label: +i, value: +i});
        }
        this.itemsMOIS = [];
        for (let i = 1; i < 10; i++) {
            // @ts-ignore
            this.itemsMOIS.push({label: '0' + i, value: '0' + i});
        }
        // @ts-ignore
        this.itemsMOIS.push({label: 10, value: 10});
        // @ts-ignore
        this.itemsMOIS.push({label: 11, value: 11});
        // @ts-ignore
        this.itemsMOIS.push({label: 12, value: 12});


        this.data = {

            labels: ['Lesson profit', 'bonus', 'Plan shortage'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        '#FF8C69',
                        '#43CD60',
                        '#3A5FCD'
                    ],
                    hoverBackgroundColor: [
                        '#FF8C69',
                        '#43CD60',
                        '#3A5FCD'
                    ]
                }]
        };
    }

    get currentMonthPay(): number {
        return this.salaryservice.currentMonthPay;
    }

    get selectedsalaryVo(): SalaryVo {
        return this.service.selectedsalaryVo;
    }

    set selectedsalaryVo(value: SalaryVo) {
        this.service.selectedsalaryVo = value;
    }

    get itemssalaryVo(): Array<SalaryVo> {
        return this.service.itemssalaryVo;
    }

    set itemssalaryVo(value: Array<SalaryVo>) {
        this.service.itemssalaryVo = value;
    }

    get selectessalaryVo(): Array<SalaryVo> {
        return this.service.selectessalaryVo;
    }

    set selectessalaryVo(value: Array<SalaryVo>) {
        this.service.selectessalaryVo = value;
    }

    get viewDialogCategorie(): boolean {
        return this.service.viewDialogCategorie;
    }

    set viewDialogCategorie(value: boolean) {
        this.service.viewDialogCategorie = value;
    }

    public findSalaryByDate() {
        this.selectedsalaryVo.prof.id = this.serviceUser.prof.id;
        this.service.findSalaryByDateAndProf().subscribe(data => {
            this.selectedsalaryVo = data;
        });
    }

    get monatantClassAverageBonus(): number {
        return this.salaryservice.monatantClassAverageBonus;
    }


    ngOnInit() {
        this.salaryservice.findCurrentSalaryByMoisAndAnneeAndProfId(this.serviceUser.getConnectedProf().id);
        this.sessionCoursService.findByProfId(this.serviceUser.getConnectedProf().id);
        this.salaryservice.findMontantProfId(this.serviceUser.getConnectedProf().id);
        // this.findSalaryByDate();
        this.items = [
            {label: '5 lesson Complete'},
            {label: '300$  workload bonus'},
            {label: '150$ lifeTime bonus'},
            {label: '30$ Class Average bonus'},
        ];
        this.activeItem = this.items[0];
    }

    public view() {
        this.viewDialogCategorie = true;
    }

    public Console() {
        console.log(this.itemssalaryVo);
    }

    get salaryMonth(): Salary {
        return this.salaryservice.salaryMonth;
    }


    get salaryList(): Array<Salary> {
        return this.salaryservice.salaryList;
    }

    get salary(): Salary {
        return this.salaryservice.salary;
    }

    public findSalaryByProf(mois: number, annee: number, idprof: number) {
        this.salaryservice.findSalaryByMoisAndAnneeAndProfId(mois, annee, idprof);
        this.salaryservice.findMontantByAnneeProfId(annee, idprof);
        console.log('wah wah');

        console.log(this.monatant);
    }

    get monatant(): number {
        return this.salaryservice.monatant;
    }

    get monatantGlobale(): number {
        return this.salaryservice.monatantGlobale;

    }

    get sessioncourslistProf(): Array<SessionCours> {
        return this.sessionCoursService.sessioncourslistProf;
    }

    openSalary() {
        this.displaySalary = true;
    }

    public findSalaryByMoisAndAnneeAndProfId(mois: number, annee: number, profid: number) {
        this.salaryservice.findSalaryByMoisAndAnneeAndProfId(mois, annee, profid);
    }

    public findAllWorkloadBonusProfByMoisAndAnneeAndProfId(mois: number, annee: number, profid: number) {
        this.salaryservice.findAllWorkloadBonusProfByMoisAndAnneeAndProfId(mois, annee, profid);
        console.log('hahahahahahaahahahahahahahah');
        console.log(this.salaryservice.monatantworkloadBonusProf);
    }

    get monatantworkloadBonusProf(): number {
        return this.salaryservice.monatantworkloadBonusProf;
    }

    get monatantPaiementProf(): number {
        return this.salaryservice.monatantPaiementProf;
    }

    public findAllPaiementByMoisAndAnneeAndProfId(mois: number, annee: number, profid: number) {
        this.salaryservice.findAllPaiementByMoisAndAnneeAndProfId(mois, annee, profid);
    }


}
