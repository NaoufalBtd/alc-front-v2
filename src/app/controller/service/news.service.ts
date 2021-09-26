import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {News} from '../model/news.model';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    private adminUrl = environment.adminUrl;


    constructor(private http: HttpClient) {
    }

    private _items: Array<News>;

    get items(): Array<News> {
        if (this._items == null) {
            this._items = new Array<News>();
        }
        return this._items;
    }

    set items(value: Array<News>) {
        this._items = value;
    }

    private _selected: News;

    get selected(): News {
        if (this._selected == null) {
            this._selected = new News();
        }
        return this._selected;
    }

    set selected(value: News) {
        this._selected = value;
    }

    private _selectes: Array<News>;

    get selectes(): Array<News> {
        if (this._selectes == null) {
            this._selectes = new Array<News>();
        }
        return this._selectes;
    }

    set selectes(value: Array<News>) {
        this._selectes = value;
    }

    private _createDialogNews: boolean;

    get createDialogNews(): boolean {
        return this._createDialogNews;
    }

    set createDialogNews(value: boolean) {
        this._createDialogNews = value;
    }

    private _editDialogNews: boolean;

    get editDialogNews(): boolean {
        return this._editDialogNews;
    }

    set editDialogNews(value: boolean) {
        this._editDialogNews = value;
    }

    private _viewDialogNews: boolean;

    get viewDialogNews(): boolean {
        return this._viewDialogNews;
    }

    set viewDialogNews(value: boolean) {
        this._viewDialogNews = value;
    }

    private _submittedNews: boolean;

    get submittedNews(): boolean {
        return this._submittedNews;
    }

    set submittedNews(value: boolean) {
        this._submittedNews = value;
    }

    public findAll(): Observable<Array<News>> {
        return this.http.get<Array<News>>(this.adminUrl + 'news/');
    }

    public findNews(destinataire: string): Observable<Array<News>> {
        return this.http.get<Array<News>>(this.adminUrl + 'news/critere/destinataire/' + destinataire);
    }

    public findByRef(): Observable<News> {
        return this.http.get<News>(this.adminUrl + 'news/ref/' + this.selected.ref);
    }

    public save(): Observable<News> {
        return this.http.post<News>(this.adminUrl + 'news/', this.selected);
    }

    public edit(): Observable<News> {
        return this.http.put<News>(this.adminUrl + 'news/', this.selected);
    }

    /*public deleteMultipleByReference(): Observable<number> {
      return this.http.post<number>(this.adminUrl + 'news/delete-multiple-by-reference' , this.selectes);
    }*/

    public deleteByReference(ref: string): Observable<number> {
        return this.http.delete<number>(this.adminUrl + 'news/ref/' + ref);
    }

    public findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    public deleteIndexById(id: number) {
        this.items.splice(this.findIndexById(id), 1);
    }

    public deleteMultipleIndexById() {
        for (const item of this.selectes) {
            this.deleteIndexById(item.id);
        }
    }
}
