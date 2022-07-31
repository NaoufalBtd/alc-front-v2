import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in-main',
  templateUrl: './sign-in-main.component.html',
  styleUrls: ['./sign-in-main.component.scss']
})
export class SignInMainComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

}
