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
import {Paiement} from '../../../../controller/model/paiement.model';
import {ClassAverageBonusProf} from '../../../../controller/model/class-average-bonus-prof.model';
import {WorkloadBonusProf} from '../../../../controller/model/workload-bonus-prof.model';


@Component({
    selector: 'app-salary',
    templateUrl: './salary.component.html',
    styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
    data: any;
    items: MenuItem[];
    etatPay: MenuItem[];
    itemsannee: MenuItem[];
    activeItem: MenuItem;
    mois: string;
    annee: string;
    globalAnnee: number;
    displaySalary: boolean = false;
    itemsMOIS: MenuItem[];
    displayDetails: boolean = false;

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
                private service: ClassRoomService, private serviceUser: LoginService, private salaryservice: SalaryService, private sessionCoursService: SessionCoursService) {
        this.etatPay = [];
        // @ts-ignore
        this.etatPay.push({label: 'True', value: 1});
        // @ts-ignore
        this.etatPay.push({label: 'False', value: 0});
        this.itemsannee = [];
        for (let i = 2022; i < 2050; i++) {
            // @ts-ignore
            this.itemsannee.push({label: +i, value: +i});
        }
        this.itemsMOIS = [];
        for (let i = 1; i < 13; i++) {
            // @ts-ignore
            this.itemsMOIS.push({label: +i, value: +i});
        }
        /*        // @ts-ignore
                this.itemsMOIS.push({label: 10, value: 10});
                // @ts-ignore
                this.itemsMOIS.push({label: 11, value: 11});
                // @ts-ignore
                this.itemsMOIS.push({label: 12, value: 12});*/


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

    get profClassAverageBonusProf(): ClassAverageBonusProf {
        return this.salaryservice.profClassAverageBonusProf;
    }

    set profClassAverageBonusProf(value: ClassAverageBonusProf) {
        this.salaryservice.profClassAverageBonusProf = value;
    }

    get profWorkloadBonusProf(): WorkloadBonusProf {
        return this.salaryservice.profWorkloadBonusProf;
    }

    set profWorkloadBonusProf(value: WorkloadBonusProf) {
        this.salaryservice.profWorkloadBonusProf = value;
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

    get salarypayment(): Paiement {
        return this.salaryservice.salarypayment;
    }

    get salarypaymentList(): Array<Paiement> {
        return this.salaryservice.salarypaymentList;

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
        this.salaryservice.findAllSalaryProfID(this.serviceUser.getConnectedProf().id);
        console.log('salaaaaaaaaaaaaaaaaaaaaaaaaaaaaam');
        console.log(this.salaryList);
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

    get salarySearch(): Salary {
        return this.salaryservice.salarySearch;
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

    get salaryclassAverageBonusProf(): Array<ClassAverageBonusProf> {
        return this.salaryservice.salaryclassAverageBonusProf;
    }

    get salaryworkloadBonusProf(): Array<WorkloadBonusProf> {
        return this.salaryservice.salaryworkloadBonusProf;
    }

    get sessions(): Array<SessionCours> {

        return this.salaryservice.sessions;
    }

    set sessions(value: Array<SessionCours>) {
        this.salaryservice.sessions = value;
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

    public findAllMonatantPaiementByMoisAndAnneeAndProfId(mois: number, annee: number, profid: number) {
        this.salaryservice.findAllMonatantPaiementByMoisAndAnneeAndProfId(mois, annee, profid);
    }

    findPaiementByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.salaryservice.findPaiementByMoisAndAnneeAndProfID(mois, annee, profid);
    }

    findClassAverageBonusProfByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.salaryservice.findClassAverageBonusProfByMoisAndAnneeAndProfID(mois, annee, profid);
    }

    findMontantClassAverageBonusProfByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.salaryservice.findMontantClassAverageBonusProfByMoisAndAnneeAndProfID(mois, annee, profid);
    }

    findWorkloadBonusProfByMoisAndAnneeAndProfID(mois: number, annee: number, profid: number) {
        this.salaryservice.findWorkloadBonusProfByMoisAndAnneeAndProfID(mois, annee, profid);
    }

    showDetails(idprof: number, idsalary: number) {
        this.displayDetails = true;
        // this.findPaiementByMoisAndAnneeAndProfID(mois, annee, profid);
        this.findWorkloadBonusProfByProfIdAndSalaryId(idprof, idsalary);

        this.findClassAverageBonusProfByProfIdAndSalaryId(idprof, idsalary);
        this.findSessionCoursByProfIdAndSalaryId(idprof, idsalary);


    }

    public findAllByCriteria(profNom: string) {
        this.salaryservice.findAllByCriteria(profNom);
    }

    public findWorkloadBonusProfByProfIdAndSalaryId(idprof: number, idsalary: number) {
        this.salaryservice.findWorkloadBonusProfByProfIdAndSalaryId(idprof, idsalary);
    }

    public findClassAverageBonusProfByProfIdAndSalaryId(idprof: number, idsalary: number) {
        this.salaryservice.findClassAverageBonusProfByProfIdAndSalaryId(idprof, idsalary);

    }
    public findSessionCoursByProfIdAndSalaryId(idprof: number, idsalary: number) {
        this.salaryservice.findSessionCoursByProfIdAndSalaryId(idprof, idsalary);
    }


}
