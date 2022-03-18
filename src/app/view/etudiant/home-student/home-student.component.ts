import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../../controller/service/login.service';
import {ScheduleService} from '../../../controller/service/schedule.service';
import {GroupeEtudiantService} from '../../../controller/service/groupe-etudiant-service';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {GroupeEtudeService} from '../../../controller/service/groupe-etude.service';
import {ScheduleProf} from '../../../controller/model/calendrier-prof.model';

@Component({
    selector: 'app-home-student',
    templateUrl: './home-student.component.html',
    styleUrls: ['./home-student.component.scss']
})
export class HomeStudentComponent implements OnInit {
    student: Etudiant = this.loginService.getConnectedStudent();
    scheduleProfs: Array<ScheduleProf> = new Array<ScheduleProf>();

    constructor(private loginService: LoginService,
                private scheduleService: ScheduleService,
                private groupeEtudiantService: GroupeEtudiantService,
                private groupetudeService: GroupeEtudeService,
    ) {
    }

    ngOnInit(): void {
        this.groupeEtudiantService.findGroupeEtudiantDetailByEtudiantId(this.student.id).subscribe(
            data => {
                console.log(data);
                for (const item of data) {
                    this.scheduleService.findByGroupStudentId(item.groupeEtudiant).subscribe(
                        scheduleData => {
                            this.scheduleProfs = scheduleData;
                            console.log(this.scheduleProfs);
                        }
                    );
                }
            }
        );
    }

    getHours(startTime: Date): number {
        const date = new Date(startTime);
        const hour = date.getHours();
        return hour;
    }

    getMinute(startTime: Date): string {
        const date = new Date(startTime);
        const minute = date.getMinutes();
        if (minute === 0) {
            return '00';
        } else {
            return String(minute);
        }

    }
}
