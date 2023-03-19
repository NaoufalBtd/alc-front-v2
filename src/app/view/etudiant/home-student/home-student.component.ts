import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../../controller/service/login.service';
import {InscriptionService} from '../../../controller/service/inscription.service';
import {Inscription} from '../../../controller/model/inscription.model';

@Component({
    selector: 'app-home-student',
    templateUrl: './home-student.component.html',
    styleUrls: ['./home-student.component.scss']
})
export class HomeStudentComponent implements OnInit {


    get inscreption(): Inscription {
        return this.loginService.inscreption;
    }

    set inscreption(value: Inscription) {
        this.loginService.inscreption = value;
    }

    constructor(private loginService: LoginService,
                private inscriptionService: InscriptionService
    ) {
    }

    ngOnInit(): void {
        if (this.inscreption.id === undefined || this.inscreption.id === 0) {
            this.inscriptionService.findByEtudiantId(this.loginService.getConnectedStudent().id).subscribe(data => {
                this.inscreption = data;
                console.log(this.inscreption?.etatInscription?.libelle);
            });
        }
    }

}
