import { Component, OnInit } from '@angular/core';
import {ParcoursService} from "../../../../controller/service/parcours.service";
import {Parcours} from "../../../../controller/model/parcours.model";

@Component({
  selector: 'app-home-free-trial',
  templateUrl: './home-free-trial.component.html',
  styleUrls: ['./home-free-trial.component.scss']
})
export class HomeFreeTrialComponent implements OnInit {
  freeLevelsList: Array<Parcours> = new Array<Parcours>();
  constructor(private parcoursService: ParcoursService) { }

  ngOnInit(): void {
    this.parcoursService.findParcoursByCode('FREE').subscribe(dataParcours => {
      this.freeLevelsList = dataParcours;
    });
  }

}
