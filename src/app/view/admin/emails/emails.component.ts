import {Component, OnInit} from '@angular/core';
import {EmailService} from '../../../controller/service/email.service';
import {EtudiantService} from '../../../controller/service/etudiant.service';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {GroupeEtudiant} from '../../../controller/model/groupe-etudiant.model';
import {GroupeEtudiantService} from '../../../controller/service/groupe-etudiant-service';

@Component({
    selector: 'app-emails',
    templateUrl: './emails.component.html',
    styleUrls: ['./emails.component.scss']
})
export class EmailsComponent implements OnInit {


    constructor(private emailService: EmailService,
                private etudiantService: EtudiantService,
                private groupService: GroupeEtudiantService) {
    }

    get groups(): Array<GroupeEtudiant> {
        return this.emailService.groups;
    }

    set groups(value: Array<GroupeEtudiant>) {
        this.emailService.groups = value;
    }


    get students(): Array<Etudiant> {
        return this.emailService.students;
    }

    set students(value: Array<Etudiant>) {
        this.emailService.students = value;
    }

    get showDetail(): boolean {
        return this.emailService.showDetail;
    }

    set showDetail(value: boolean) {
        this.emailService.showDetail = value;
    }

    get showCompose(): boolean {
        return this.emailService.showCompose;
    }


    ngOnInit(): void {
        this.emailService.findAll();
        this.groupService.findAll().subscribe(gr => this.groups = gr);
        this.etudiantService.findAll().subscribe(customers => {
            this.students = customers;
            this.students.forEach(student => student.dateNaissance = (new Date()).toString());
        });
    }

}
