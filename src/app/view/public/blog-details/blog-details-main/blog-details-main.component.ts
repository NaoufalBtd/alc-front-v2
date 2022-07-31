import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-blog-details-main',
  templateUrl: './blog-details-main.component.html',
  styleUrls: ['./blog-details-main.component.scss']
})
export class BlogDetailsMainComponent implements OnInit {

  constructor( private translate: TranslateService) { }

  ngOnInit(): void {
  }

}
