import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connect-as-invited',
  templateUrl: './connect-as-invited.component.html',
  styleUrls: ['./connect-as-invited.component.scss']
})
export class ConnectAsInvitedComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }


}
