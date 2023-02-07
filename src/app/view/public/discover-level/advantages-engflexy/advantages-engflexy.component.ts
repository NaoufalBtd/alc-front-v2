import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-advantages-engflexy',
    templateUrl: './advantages-engflexy.component.html',
    styleUrls: ['./advantages-engflexy.component.scss']
})
export class AdvantagesEngflexyComponent implements OnInit {

    sectionIndex = 1;

    constructor(public translate : TranslateService) {
    }

    ngOnInit(): void {
    }

    showSection(index: number) {
        this.sectionIndex = index;
    }
}
