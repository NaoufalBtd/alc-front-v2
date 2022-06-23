import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-home-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @Input() footerPadd: string | undefined;

    constructor() {
    }

    ngOnInit(): void {
    }

}
