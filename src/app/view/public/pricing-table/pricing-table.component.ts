import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-pricing-table',
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.scss']
})
export class PricingTableComponent implements OnInit {

  constructor(public elementRef: ElementRef) { }

  ngOnInit(): void {
  }

}
