import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BlogService} from '../../../../controller/service/blog.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-blog-details-area',
    templateUrl: './blog-details-area.component.html',
    styleUrls: ['./blog-details-area.component.scss']
})
export class BlogDetailsAreaComponent implements OnInit {

    constructor(private blogService: BlogService,
                private _activatedRoute: ActivatedRoute,
                private router: Router,
                public translate: TranslateService) {
    }

    ngOnInit(): void {
        const blogId = this._activatedRoute.snapshot.params.id;
        if (blogId !== null && blogId !== undefined) {
            this.selectedBlog = this.blogService.blogItems.find(d => d.id.toString() === blogId);
        } else {
            this.router.navigate(['/blog']);
        }
    }

    get selectedBlog(): any {
        return this.blogService.selectedBlog;
    }

    set selectedBlog(value: any) {
        this.blogService.selectedBlog = value;
    }

}
