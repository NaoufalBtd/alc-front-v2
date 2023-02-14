import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {EtudiantService} from '../../../../controller/service/etudiant.service';

@Component({
    selector: 'app-about-area',
    templateUrl: './about-area.component.html',
    styleUrls: ['./about-area.component.scss']
})
export class AboutAreaComponent implements OnInit {

    numberOfStudent = 100;

    constructor(public translate: TranslateService,
                private studentService: EtudiantService
    ) {
    }

    ngOnInit(): void {
        this.getNumberOfStudent();
    }

    getNumberOfStudent() {
        this.studentService.getNumberOfStudents().subscribe(d => {
            this.numberOfStudent = d;
            console.log(d);
        }, error => {
            console.log(error);
        });
    }
}
