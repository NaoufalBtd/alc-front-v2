import { Component, OnInit } from '@angular/core';
import {PackStudentService} from '../../../../controller/service/pack-student.service';

@Component({
  selector: 'app-blog-details-title',
  templateUrl: './blog-details-title.component.html',
  styleUrls: ['./blog-details-title.component.scss']
})
export class BlogDetailsTitleComponent implements OnInit {

  constructor(private blogService: PackStudentService) { }

  ngOnInit(): void {
  }
  get selectedBlog(): any {
    return this.blogService.selectedBlog;
  }
}
