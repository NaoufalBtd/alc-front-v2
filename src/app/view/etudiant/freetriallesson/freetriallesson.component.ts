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
  datebirth: Date;
  dayoption: string;
  timeoption: string;
  teacherlocality: string;
  agerange: string;
  teachergendervalue: string;
  teacherperson: string;
  activeIndex: number = 0;
  maleselected = false;
  femaleselected = false;
  daysOptions: any[];
  timeOptions: any[];
  teacherlolality: any[];
  teacherAgerange: any[];
  teacherGneder: any[];
  teacherPersonnality: any[];


  constructor(private messageService: MessageService) {
    this.daysOptions = [
      { name: '1 day', value: 1 },
      { name: '2 to 3 days', value: 2 },
      { name: '4 to 6 days', value: 3 },
    ];
    this.timeOptions = [
      { name: 'mornings', value: 1 },
      { name: 'afternoon', value: 2 },
      { name: 'night', value: 3 },
    ];
    this.teacherlolality = [
      { name: 'native', value: 1 },
      { name: 'non native', value: 2 },
      { name: 'doesn\'t matter', value: 3 },
    ];
    this.teacherAgerange = [
      { name: '25 plus', value: 1 },
      { name: '35 plus', value: 2 },
      { name: '45 plus', value: 3 },
    ];
    this.teacherGneder = [
      { name: 'male', value: 1 },
      { name: 'female', value: 2 },
      { name: 'doesn\'t matter', value: 3 },
    ];
    this.teacherPersonnality = [
      { name: 'strict', value: 1 },
      { name: 'lenient', value: 2 },
      { name: 'moderate', value: 3 },
    ];
  }

  ngOnInit() {
    this.items = [
        {
         label: 'Personal',

       },
      {
        label: 'Status',

      },
      {
        label: 'Schedule & Teacher',

      },
      {
        label: 'Confirmation',

      }
    ];
  }
  public disabelcard(gender: string){
     if (gender === 'male'){
       this.maleselected = false;
       this.femaleselected = true;
     }
     else if (gender === 'female'){
       this.femaleselected = false;
       this.maleselected = true;
     }
  }
}
