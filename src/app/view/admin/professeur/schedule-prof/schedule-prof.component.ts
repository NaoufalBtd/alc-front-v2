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
import {ProfService} from '../../../../controller/service/prof.service';
import {Prof} from '../../../../controller/model/prof.model';

@Component({
    selector: 'app-schedule-prof',
    templateUrl: './schedule-prof.component.html',
    styleUrls: ['./schedule-prof.component.scss']
})
export class ScheduleProfComponent implements OnInit {

    constructor(private profService: ProfService,
                private trancheHoraireProfService: TrancheHoraireProfService,
                private scheduleService: ScheduleService) {

    }

    get trancheHoraireProfList(): Array<TrancheHoraireProf> {
        return this.trancheHoraireProfService.trancheHoraireProfList;
    }

    set trancheHoraireProfList(value: Array<TrancheHoraireProf>) {
        this.trancheHoraireProfService.trancheHoraireProfList = value;
    }

    public profs: Array<Prof> = new Array<Prof>();
    public scheduleProfs: Array<ScheduleProf> = new Array<ScheduleProf>();
    @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
    public data: Record<string, any>[] = extend([], null, true) as Record<string, any>[];
    public selectedDate: Date = new Date();
    public currentView: View = 'Week';
    public profsDataSource: Record<string, any> = this.profs;
    public group: GroupModel = {enableCompactView: false, resources: ['profs']};
    public allowMultiple = true;
    public eventSettings: EventSettingsModel = {
        dataSource: this.scheduleProfs,
        fields: {
            id: 'Id',
            subject: {name: 'subject', title: 'subject'},
            startTime: {name: 'startTime', title: 'startTime'},
            endTime: {name: 'endTime', title: 'endTime'},
            recurrenceID: {name: 'profName', title: 'profName'}
        }
    };
    public timeScale: TimeScaleModel = {interval: 60, slotCount: 1};

    public islayoutChanged: boolean = false;
    public selectedProf: Prof = new Prof();
    public allProfs: Array<Prof> = new Array<Prof>();


    ngOnInit(): void {
        this.profService.findAll().subscribe(data => {
            for (const d of data) {
                this.allProfs.push({...d});
            }
            this.profs = data;
            console.log(this.allProfs);
            this.profsDataSource = this.profs;
        });

        this.trancheHoraireProfService.findAll().subscribe(
            dataTranche => {
                this.trancheHoraireProfList = dataTranche;
                this.onDataBound(dataTranche);
            }, err => {
                console.log(err);
            }
        );
        this.scheduleService.findAll().subscribe(data => {
            this.scheduleProfs = data;
            console.log(this.scheduleProfs);
            this.data = extend([], this.scheduleProfs, null, true) as Record<string, any>[];
            this.scheduleObj.eventSettings.dataSource = null;
            this.scheduleObj.eventSettings = {
                dataSource: this.scheduleProfs,
                fields: {
                    id: 'Id',
                    subject: {name: 'subject', title: 'subject'},
                    startTime: {name: 'startTime', title: 'startTime'},
                    endTime: {name: 'endTime', title: 'endTime'},
                    isBlock: 'true',
                }
            };
        });
    }

    public onPopupOpen(args: PopupOpenEventArgs): void {
        console.log(args.data);
    }

    onDataBound(trancheHoraireProfList: Array<TrancheHoraireProf>): void {
        console.log('=================== trancheHoraireProfList =====================');
        console.log(trancheHoraireProfList);
        this.scheduleObj.resetWorkHours();
        if (this.islayoutChanged) {
            const dates = this.scheduleObj.activeView.getRenderDates();
            for (const tranche of trancheHoraireProfList) {
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
            this.onDataBound(this.trancheHoraireProfList);
        }
        this.scheduleObj.eventSettings.dataSource = null;
        this.scheduleObj.eventSettings.dataSource = this.scheduleProfs;
        console.log(this.scheduleObj.eventSettings.dataSource);
    }

    filterProf() {
        let profList: Array<Prof> = new Array<Prof>();
        console.log(this.selectedProf.id);
        for (const item of this.profs) {
            if (item.id === this.selectedProf.id) {
                profList.push({...item});
            }
        }
        this.trancheHoraireProfService.findTrancheHoraireByProfId(profList[0]).subscribe(data => {
            this.trancheHoraireProfList = data;
            this.onDataBound(data);
        });
        console.log(this.profs);
        this.profsDataSource = null;
        this.profsDataSource = profList;
    }
}
