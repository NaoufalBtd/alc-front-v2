import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-popular-teachers',
  templateUrl: './popular-teachers.component.html',
  styleUrls: ['./popular-teachers.component.scss']
})
export class PopularTeachersComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
