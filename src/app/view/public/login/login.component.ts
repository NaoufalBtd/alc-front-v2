import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  admin() {
    this.router.navigate(['public/login-admin']);
  }
  prof() {
    this.router.navigate(['public/login-prof']);
  }
  etudiant() {
    this.router.navigate(['public/login-etudiant']);
  }
}
