import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private _selectedBlog: any;


    private _blogItems = [
        {
            id: 1,
            blogImg: 'assets/img/blog/blog-1.webp',
            title: 'Taking Breaks & Avoiding Language Loss',
            authorImg: 'assets/images/kamal-zouani.webp',
            authorName: 'Kamal Zouani',
            category: 'Learning',
            date: new Date(2023, 1, 14),
            color: 'green'
        },
        {
            id: 2,
            blogImg: 'assets/img/blog/blog-2.webp',
            title: 'Improve English Pronunciation & Your Mindset with Kamal Zouani',
            authorImg: 'assets/images/kamal-zouani.webp',
            authorName: 'Kamal Zouani',
            category: 'English Pronunciation',
            date: new Date(2022, 11, 30),
            color: 'sky-blue'
        },
        {
            id: 3,
            blogImg: 'assets/img/blog/blog-2.webp',
            title: '10 tips to succeed in a job interview in English',
            authorImg: 'assets/images/kamal-zouani.webp',
            authorName: 'Kamal Zouani',
            category: 'Job Interview in English',
            date: new Date(2023, 2, 10),
            color: 'sky-blue'
        },
    ];

    constructor() {
    }


    get blogItems(): any[] {
        return this._blogItems;
    }

    get selectedBlog(): any {
        return this._selectedBlog;
    }

    set selectedBlog(value: any) {
        this._selectedBlog = value;
    }
}
