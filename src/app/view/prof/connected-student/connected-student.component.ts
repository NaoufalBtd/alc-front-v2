import {Component, OnInit} from '@angular/core';
import {Etudiant} from '../../../controller/model/etudiant.model';
import {flatMap} from 'rxjs/internal/operators';
import {EtudiantService} from '../../../controller/service/etudiant.service';
import {ProfService} from '../../../controller/service/prof.service';
import {Prof} from '../../../controller/model/prof.model';
import {UserService} from '../../../controller/service/user.service';
import {LoginService} from '../../../controller/service/login.service';

@Component({
    selector: 'app-connected-student',
    templateUrl: './connected-student.component.html',
    styleUrls: ['./connected-student.component.scss']
})
export class ConnectedStudentComponent implements OnInit {
    public prof: Prof = new Prof();

    constructor(private etudiantService: EtudiantService,
                private loginService: LoginService,
                private profService: ProfService) {
    }

    get listStudent(): Array< Etudiant> {
        return this.profService.listStudent;
    }

    ngOnInit(): void {
        this.prof = this.loginService.getConnectedProf();
        console.log(this.listStudent);
    }

}
