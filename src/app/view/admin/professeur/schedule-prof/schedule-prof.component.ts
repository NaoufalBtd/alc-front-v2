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
import {TrancheHoraireProfService} from '../../../../controller/service/tranche-horaire-prof.service';
import {TrancheHoraireProf} from '../../../../controller/model/tranche-horaire-prof.model';

@Component({
    selector: 'app-schedule-prof',
    templateUrl: './schedule-prof.component.html',
    styleUrls: ['./schedule-prof.component.scss']
})
export class ScheduleProfComponent implements OnInit {
    public selectedDate: Date = new Date();
    public currentView: View = 'Week';
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


    get scheduleProfs(): Array<ScheduleProf> {
        return this.scheduleService.scheduleProfs;
    }


    set scheduleProfs(value: Array<ScheduleProf>) {
        this.scheduleService.scheduleProfs = value;
    }

    public islayoutChanged: boolean = false;
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;

    constructor(private scheduleService: ScheduleService,
                private trancheHoraireService: TrancheHoraireProfService) {
    }


    get trancheHoraireProfList(): Array<TrancheHoraireProf> {
        return this.trancheHoraireService.trancheHoraireProfList;
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

    onDataBound(): void {
        console.log('==================== list tranche Horraire=============================');
        console.log(this.trancheHoraireProfList);
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
            for (const tranche of this.trancheHoraireProfList) {
                for (const date of dates) {
                    if (tranche.day === date.getDay()) {
                        this.scheduleObj.setWorkHours(
                            [date],
                            tranche.startHour,
                            tranche.endHour,
                            tranche.groupIndex
                        );
                    }
                }

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
        console.log('==================== list tranche Horraire=============================');
        console.log(this.trancheHoraireProfList);
        this.onDataBound();
    }

}
