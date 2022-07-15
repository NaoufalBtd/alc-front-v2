import {Component, HostListener, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-header-two',
    templateUrl: './header-two.component.html',
    styleUrls: ['./header-two.component.scss']
})
export class HeaderTwoComponent implements OnInit {

    @Input() headerShadow: string | undefined;

    headerSticky: boolean = false;
    showSidebar: boolean = false;
    showHomeDropdown: boolean = false;
    showCoursesDropdown: boolean = false;
    showBlogDropdown: boolean = false;
    showPagesDropdown: boolean = false;

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

    // home dropdown
    homeDropdown() {
        this.showHomeDropdown = !this.showHomeDropdown;
    }

    // coursesDropdown
    coursesDropdown() {
        this.showCoursesDropdown = !this.showCoursesDropdown;
    }

    // blogDropdown
    blogDropdown() {
        this.showBlogDropdown = !this.showBlogDropdown;
    }

    // pagesDropDown
    pagesDropDown() {
        this.showPagesDropdown = !this.showPagesDropdown;
    }

    constructor(public translate: TranslateService) {
    }

    ngOnInit(): void {
    }
    selectedLangage(value: any) {
        console.log(value);
        this.translate.use(value);
    }
}
