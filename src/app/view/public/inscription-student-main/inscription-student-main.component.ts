import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-inscription-student-main',
  templateUrl: './inscription-student-main.component.html',
  styleUrls: ['./inscription-student-main.component.scss']
})
export class InscriptionStudentMainComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

}
