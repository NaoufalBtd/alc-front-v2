import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-become-teacher',
  templateUrl: './become-teacher.component.html',
  styleUrls: ['./become-teacher.component.scss']
})
export class BecomeTeacherComponent implements OnInit {

  constructor( private translate: TranslateService) { }

  ngOnInit(): void {
  }

}
