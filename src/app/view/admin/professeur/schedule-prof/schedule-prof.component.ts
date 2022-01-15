import {Component, OnInit, ViewChild} from '@angular/core';
import {addClass, extend} from '@syncfusion/ej2-base';
import {
    EventSettingsModel,
    View,
    GroupModel,
    ResourceDetails,
    TreeViewArgs,
    PopupOpenEventArgs,
    ScheduleComponent,
    ActionEventArgs,
    EventFieldsMapping,
    RenderCellEventArgs,
    MonthService,
    WorkWeekService, TimeScaleModel,
} from '@syncfusion/ej2-angular-schedule';
import {ScheduleProf} from '../../../../controller/model/calendrier-prof.model';
import {ScheduleService} from '../../../../controller/service/schedule.service';

@Component({
    selector: 'app-schedule-prof',
    templateUrl: './schedule-prof.component.html',
    styleUrls: ['./schedule-prof.component.scss']
})
export class ScheduleProfComponent implements OnInit {
    public selectedDate: Date = new Date();
    public currentView: View = 'Week';
    public allowResizing: boolean = false;
    public allowDragDrop: boolean = false;
    public timeScale: TimeScaleModel = {interval: 60, slotCount: 1};
    public resourceDataSource: Object[] = [
        {
            text: this.scheduleProfs[0]?.prof?.nom,
            id: 0,
            color: '#ea7a57',
            startHour: '08:00',
            endHour: '15:00',
        }
    ];
    public group: GroupModel = {byDate: true, resources: ['Profs']};
    public eventSettings: EventSettingsModel = {
        dataSource: this.scheduleProfs,
        fields: {
            id: 'id',
            subject: {name: 'subject', title: 'subject'},
            startTime: {name: 'startTime', title: 'startTime'},
            endTime: {name: 'endTime', title: 'endTime'}
        }
    };
    public workHours1: any = [
        {startHour: '07:00', endHour: '16:00', groupIndex: 0}, // for Sunday
        {startHour: '06:00', endHour: '17:00', groupIndex: 0}, // for Monday
        {startHour: '05:00', endHour: '18:00', groupIndex: 0}, // for Tuesday
        {startHour: '06:30', endHour: '19:00', groupIndex: 0}, // for Wednesday
        {startHour: '05:30', endHour: '20:00', groupIndex: 0}, // for Thursday
        {startHour: '10:00', endHour: '21:00', groupIndex: 0}, // for Friday
        {startHour: '13:00', endHour: '22:00', groupIndex: 0}, // for Saturday
    ];

    get scheduleProfs(): Array<ScheduleProf> {
        return this.scheduleService.scheduleProfs;
    }


    set scheduleProfs(value: Array<ScheduleProf>) {
        this.scheduleService.scheduleProfs = value;
    }

    public islayoutChanged: boolean = false;
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;

    constructor(private scheduleService: ScheduleService) {
    }


    onActionBegin(args: ActionEventArgs): void {
        let isEventChange: boolean = args.requestType === 'eventChange';
        if (
            (args.requestType === 'eventCreate' &&
                (<Object[]> args.data).length > 0) ||
            isEventChange
        ) {
            let eventData: { [key: string]: Object } = isEventChange
                ? (args.data as { [key: string]: Object })
                : (args.data[0] as { [key: string]: Object });
            let eventField: EventFieldsMapping = this.scheduleObj.eventFields;
            let startDate: Date = eventData[eventField.startTime] as Date;
            let endDate: Date = eventData[eventField.endTime] as Date;
            let resourceIndex: number = [1, 2, 3].indexOf(
                eventData.DoctorId as number
            );
            args.cancel = !this.isValidateTime(startDate, endDate, resourceIndex);
            if (!args.cancel) {
                args.cancel = !this.scheduleObj.isSlotAvailable(
                    startDate,
                    endDate,
                    resourceIndex
                );
            }
        }
    }

    isValidateTime(startDate: Date, endDate: Date, resIndex: number): boolean {
        let resource: ResourceDetails =
            this.scheduleObj.getResourcesByIndex(resIndex);
        let startHour: number = parseInt(
            resource.resourceData.startHour.toString().slice(0, 2),
            10
        );
        let endHour: number = parseInt(
            resource.resourceData.endHour.toString().slice(0, 2),
            10
        );
        return startHour <= startDate.getHours() && endHour >= endDate.getHours();
    }

    onPopupOpen(args: PopupOpenEventArgs): void {
        console.log(this.scheduleObj.eventSettings.dataSource);
        console.log(this.scheduleProfs);
        if (args.target && args.target.classList.contains('e-work-cells')) {
            args.cancel = !args.target.classList.contains('e-work-hours');
        }
    }

    onDataBound(args): void {
        this.scheduleObj.eventSettings.dataSource = this.scheduleProfs;
        this.eventSettings = {
            dataSource: this.scheduleProfs,
            fields: {
                id: 'id',
                subject: {name: 'subject', title: 'subject'},
                startTime: {name: 'startTime', title: 'startTime'},
                endTime: {name: 'endTime', title: 'endTime'}
            }
        };
        this.scheduleObj.resetWorkHours();
        if (this.islayoutChanged) {
            const dates = this.scheduleObj.activeView.getRenderDates();
            for (const date of dates) {
                this.scheduleObj.setWorkHours(
                    [date],
                    this.workHours1[date.getDay()].startHour,
                    this.workHours1[date.getDay()].endHour,
                    this.workHours1[date.getDay()].groupIndex
                );
            }

        }
    }

    onActionComplete(args: ActionEventArgs): void {
        if (
            args.requestType === 'toolBarItemRendered' ||
            args.requestType === 'dateNavigate' ||
            args.requestType === 'viewNavigate'
        ) {
            this.islayoutChanged = true;
        }
    }

    onRenderCell(args: RenderCellEventArgs): void {
        if (
            args.element.classList.contains('e-work-hours') ||
            args.element.classList.contains('e-work-cells')
        ) {
            addClass(
                [args.element], 'willsmith'[
                    parseInt(args.element.getAttribute('data-group-index'), 10)
                    ]
            );
        }
    }


    ngOnInit(): void {
        console.log(this.scheduleProfs);
    }

}
