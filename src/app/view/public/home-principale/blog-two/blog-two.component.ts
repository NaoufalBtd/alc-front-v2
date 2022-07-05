import {Component, OnInit} from '@angular/core';
import {PackStudentService} from '../../../../controller/service/pack-student.service';
import {Route, Router} from '@angular/router';

@Component({
    selector: 'app-blog-two',
    templateUrl: './blog-two.component.html',
    styleUrls: ['./blog-two.component.scss']
})
export class BlogTwoComponent implements OnInit {

    blogItems = [
        {
            id: 1,
            blogImg: 'assets/img/blog/blog-1.jpg',
            title: 'Taking Breaks & Avoiding Language Loss',
            authorImg: 'assets/img/course/teacher/teacher-1.jpg',
            authorName: 'Kamal Zouani',
            category: 'Learning',
            date: new Date(),
            color: 'green'
        },
        {
            id: 2,
            blogImg: 'assets/img/blog/blog-2.jpg',
            title: 'Improve English Pronunciation & Your Mindset with Kamal Zouani',
            authorImg: 'assets/img/course/teacher/teacher-1.jpg',
            authorName: 'Kamal Zouani',
            category: 'English Pronunciation',
            date: new Date(),
            color: 'sky-blue'
        },
        {
            id: 3,
            blogImg: 'assets/img/blog/blog-2.jpg',
            title: '10 tips to succeed in a job interview in English',
            authorImg: 'assets/img/course/teacher/teacher-1.jpg',
            authorName: 'Kamal Zouani',
            category: 'Job Interview in English',
            date: new Date(),
            color: 'sky-blue'
        },

    ];

    constructor(private blogService: PackStudentService, private router: Router) {
    }
    get selectedBlog(): any {
        return this.blogService.selectedBlog;
    }

    set selectedBlog(value: any) {
        this.blogService.selectedBlog = value;
    }

    ngOnInit(): void {
    }

    toggleBlogDetails(blog: any) {
        this.selectedBlog = blog;
        this.router.navigate(['/blog-details']);
    }
}
