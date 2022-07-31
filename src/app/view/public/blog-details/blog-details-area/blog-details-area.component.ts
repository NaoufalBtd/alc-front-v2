import { Component, OnInit } from '@angular/core';
import {PackStudentService} from '../../../../controller/service/pack-student.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-blog-details-area',
  templateUrl: './blog-details-area.component.html',
  styleUrls: ['./blog-details-area.component.scss']
})
export class BlogDetailsAreaComponent implements OnInit {

  constructor( private translate: TranslateService, private blogService: PackStudentService) { }

  ngOnInit(): void {
  }
  get selectedBlog(): any {
    return this.blogService.selectedBlog;
  }
}
