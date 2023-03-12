import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {BlogService} from '../../../../controller/service/blog.service';

@Component({
    selector: 'app-blog-area',
    templateUrl: './blog-area.component.html',
    styleUrls: ['./blog-area.component.scss']
})
export class BlogAreaComponent implements OnInit {


    constructor(private blogService: BlogService,
                public translate: TranslateService,
                private router: Router) {
    }

    get blogItems(): any[] {
        return this.blogService.blogItems;
    }

    ngOnInit(): void {
    }

    toggleBlogDetails(blog: any) {
        console.log(blog);
        this.router.navigate(['/blog-details/' + blog.id]);
    }

}
