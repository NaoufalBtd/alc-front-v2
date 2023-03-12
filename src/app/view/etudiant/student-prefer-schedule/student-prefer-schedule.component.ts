import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DayService, DragAndDropService, ResizeService, TimelineMonthService, TimelineViewsService} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'app-student-prefer-schedule',
    templateUrl: './student-prefer-schedule.component.html',
    styleUrls: ['./student-prefer-schedule.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DayService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService]
})
export class StudentPreferScheduleComponent implements OnInit {

    testData = [
        {hour: 12, day: 'Monday'},
        {hour: 7, day: 'Monday'},
        {hour: 8, day: 'Monday'},
        {hour: 10, day: 'Monday'},
        {hour: 10, day: 'Tuesday'},
        {hour: 11, day: 'Tuesday'},
        {hour: 12, day: 'Tuesday'},
    ];
    disabledData = [
        {hour: 12, day: 'Thursday'},
        {hour: 7, day: 'Thursday'},
        {hour: 8, day: 'Thursday'},
        {hour: 10, day: 'Monday'},
        {hour: 10, day: 'Friday'},
        {hour: 11, day: 'Friday'},
        {hour: 12, day: 'Friday'},
    ];
    days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    hours: number[] = Array.from({length: 24}, (_, i) => i);

    ngOnInit(): void {
    }


    isCurrentTime(hour: number): boolean {
        const now = new Date();
        return now.getHours() === hour;
    }

    addEvent(hour: number, day: string, classList: DOMTokenList) {
        if (classList.contains('disabled')) {
            return;
        } else if (classList.contains('selected')) {
            this.testData.splice(this.testData.indexOf({day, hour}), 1);
        } else {
            this.testData.push({day, hour});
        }
    }

    isSelected(hour: number, day: string): boolean {
        const list = this.testData.filter(d => d.hour === hour && d.day === day);
        return list?.length > 0;
    }

    isDisabled(hour: number, day: string) {
        const list = this.disabledData.filter(d => d.hour === hour && d.day === day);
        return list?.length > 0;
    }
}
