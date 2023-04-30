import {Component, HostListener, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-header-three',
    templateUrl: './header-three.component.html',
    styleUrls: ['./header-three.component.scss']
})
export class HeaderThreeComponent implements OnInit {
    headerSticky: boolean = false;
    showSidebar: boolean = false;
    langs = [
        {code: 'en', lab: 'English', img: '/assets/images/united-states-of-america-flag.png'},
        {code: 'fr', lab: 'Francais', img: '/assets/images/france-flag.png'},
        {code: 'ar', lab: 'العربية', img: '/assets/images/morocco-flag.png'}
    ];

    @HostListener('window:scroll', ['$event']) onscroll() {
        if (window.scrollY > 80) {
            this.headerSticky = true;
        } else {
            this.headerSticky = false;
        }
    }


    // handleSidebar
    handleSidebar() {
        this.showSidebar = true;
    }

    handleSidebarClose() {
        this.showSidebar = false;
    }


    constructor(public translate: TranslateService) {
    }

    ngOnInit(): void {
    }

    selectedLangage(value: any) {
        this.translate.use(value);
        console.log(this.translate.currentLang);
    }
}
