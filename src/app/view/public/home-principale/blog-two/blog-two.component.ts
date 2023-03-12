import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {BlogService} from '../../../../controller/service/blog.service';

@Component({
    selector: 'app-blog-two',
    templateUrl: './blog-two.component.html',
    styleUrls: ['./blog-two.component.scss']
})
export class BlogTwoComponent implements OnInit {


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
        this.router.navigate(['/blog-details/' + blog.id]);
    }
}
