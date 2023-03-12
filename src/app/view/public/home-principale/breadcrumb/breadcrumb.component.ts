import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

    @Input() title: string | undefined;
    @Input() subtitle: string | undefined;

    constructor(public translate: TranslateService) {
    }

    ngOnInit(): void {
    }

}
