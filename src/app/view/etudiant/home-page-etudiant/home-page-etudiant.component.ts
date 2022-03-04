import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PackStudentService} from '../../../controller/service/pack-student.service';

@Component({
  selector: 'app-home-page-etudiant',
  templateUrl: './home-page-etudiant.component.html',
  styleUrls: ['./home-page-etudiant.component.scss']
})
export class HomePageEtudiantComponent implements OnInit {

  constructor(private router: Router, private packService: PackStudentService) { }

  ngOnInit(): void {
  }

    navigatetopurchase() {
    this.packService.findPackIndividualOrgroupe(true);
    this.packService.findPackIndividualOrgroupe(false);
    this.router.navigate(['public/etudiantchoosepack']);
    }
}
