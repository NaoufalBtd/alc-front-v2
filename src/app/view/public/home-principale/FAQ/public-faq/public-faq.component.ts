import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-public-faq',
  templateUrl: './public-faq.component.html',
  styleUrls: ['./public-faq.component.scss']
})
export class PublicFaqComponent implements OnInit {

  constructor(public translate: TranslateService ) { }

  ngOnInit(): void {
  }

}
