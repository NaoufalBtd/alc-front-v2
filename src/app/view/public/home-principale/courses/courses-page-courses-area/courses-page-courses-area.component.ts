import {Component, OnInit} from '@angular/core';
import {PackStudentService} from '../../../../../controller/service/pack-student.service';
import {PackStudent} from '../../../../../controller/model/pack-student.model';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-courses-page-courses-area',
    templateUrl: './courses-page-courses-area.component.html',
    styleUrls: ['./courses-page-courses-area.component.scss']
})
export class CoursesPageCoursesAreaComponent implements OnInit {
    selectedOption: boolean = null;
    selectedLevel: string;

    constructor(private packStudentService: PackStudentService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
    }

    get packs(): Array<PackStudent> {
        return this.packStudentService.packs;
    }

    set packs(value: Array<PackStudent>) {
        this.packStudentService.packs = value;
    }

    getCourses(b: boolean) {
        this.selectedOption = b;
        this.packStudentService.findPackIndividualOrgroupe(b);
    }

    searchByLevel() {
        console.log(this.selectedLevel);
        if (this.selectedOption !== null) {
            if (this.selectedLevel !== undefined) {
                this.packStudentService.findPackByLevel(this.selectedOption).subscribe(
                    data => {
                        const packList = data.filter(p => p.level?.libelle?.toLowerCase() === this.selectedLevel.toLowerCase());
                        if (packList?.length === 0) {
                            this.packs = data;
                            this.messageService.add({
                                severity: 'info',
                                summary: 'Info',
                                detail: 'Not found !',
                                life: 4000
                            });
                        } else {
                            this.packs = packList;
                        }
                    }
                );
            } else {
                this.packStudentService.findPackIndividualOrgroupe(this.selectedOption);
            }
        } else {
            if (this.selectedLevel !== undefined) {
                this.packStudentService.findAllPacksByLevel().subscribe(
                    data => {
                        const packList = data.filter(p => p.level?.libelle?.toLowerCase() === this.selectedLevel.toLowerCase());
                        if (packList?.length === 0) {
                            this.packs = data;
                            this.messageService.add({
                                severity: 'info',
                                summary: 'Info',
                                detail: 'Not found !',
                                life: 4000
                            });
                        } else {
                            this.packs = packList;
                        }
                    }
                );
            } else {
                this.packStudentService.findAllPacks();
            }
        }
    }
}
