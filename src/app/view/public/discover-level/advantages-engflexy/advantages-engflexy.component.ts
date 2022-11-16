import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-advantages-engflexy',
    templateUrl: './advantages-engflexy.component.html',
    styleUrls: ['./advantages-engflexy.component.scss']
})
export class AdvantagesEngflexyComponent implements OnInit {

    sectionIndex = 1;

    constructor() {
    }

    ngOnInit(): void {
    }

    showSection(index: number) {
        this.sectionIndex = index;
    }
}
