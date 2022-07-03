import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-three',
  templateUrl: './home-three.component.html',
  styleUrls: ['./home-three.component.scss']
})
export class HomeThreeComponent implements OnInit {
  displayModal: boolean;
  numberOfTime = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      if (this.numberOfTime === 0){
        this.displayModal = true;
      }
      this.numberOfTime = 1;
    }, 15000);
  }

}
