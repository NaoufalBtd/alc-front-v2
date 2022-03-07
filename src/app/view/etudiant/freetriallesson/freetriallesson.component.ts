import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
  selector: 'app-freetriallesson',
  templateUrl: './freetriallesson.component.html',
  styleUrls: ['./freetriallesson.component.scss'],
  styles: [`
        .ui-steps .ui-steps-item {
            width: 25%;
        }
        .ui-steps.steps-custom {
            margin-bottom: 30px;
        }
        .ui-steps.steps-custom .ui-steps-item .ui-menuitem-link {
            padding: 0 1em;
            overflow: visible;
        }
        .ui-steps.steps-custom .ui-steps-item .ui-steps-number {
            display: inline-block;
            width: 36px;
            margin-top: -14px;
            margin-bottom: 10px;
        }
        .ui-steps.steps-custom .ui-steps-item .ui-steps-title {
            color: #555555;
        }
    `],
  encapsulation: ViewEncapsulation.None
})
export class FreetriallessonComponent implements OnInit {

  items: MenuItem[];

  activeIndex: number = 0;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.items = [{
      label: 'Personal',

    },
      {
        label: 'Seat',

      },
      {
        label: 'Payment',

      },
      {
        label: 'Confirmation',

      }
    ];
  }
}
