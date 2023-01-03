import {Component, HostListener, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header-four',
  templateUrl: './header-four.component.html',
  styleUrls: ['./header-four.component.scss']
})
export class HeaderFourComponent implements OnInit {

  headerSticky: boolean = false;
  searchBar: boolean = false;
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

  handleSearch() {
    if (!this.searchBar) {
      this.searchBar = true;
    } else {
      this.searchBar = true;
    }
  }

  handleSearchClose() {
    this.searchBar = false;
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
    this.translate.use(value);
    console.log(this.translate.currentLang);
  }
}
