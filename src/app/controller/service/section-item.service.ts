import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Section} from '../model/section.model';
import {SectionItemModel} from '../model/section-item.model';
import {Observable} from 'rxjs';
import {Cours} from "../model/cours.model";

@Injectable({
    providedIn: 'root'
})
export class SectionItemService {

    constructor(private http: HttpClient) {
    }

    private adminUrl = environment.adminUrl;
    private _showVocabulary:boolean;
    private _coursofsection: Cours;


    get showVocabulary(): boolean {
        return this._showVocabulary;
    }


    get coursofsection(): Cours {
        if (this._coursofsection == null){
            this._coursofsection = new Cours();
        }
        return this._coursofsection;
    }

    set coursofsection(value: Cours) {
        this._coursofsection = value;
    }

    set showVocabulary(value: boolean) {
        this._showVocabulary = value;
    }

    private _sectionSelected: Section;

    get sectionSelected(): Section {
        return this._sectionSelected;
    }

    set sectionSelected(value: Section) {
        this._sectionSelected = value;
    }

    private _sectionItem: SectionItemModel;

    get sectionItem(): SectionItemModel {
        return this._sectionItem;
    }

    set sectionItem(value: SectionItemModel) {
        this._sectionItem = value;
    }

    public createSectionItems() {
        return this.http.post(
            this.adminUrl + 'sectionItem/sectionId/' + this.sectionSelected.id,
            this.sectionSelected.sectionItems);
    }

    public deleteSectionItems(ids: Array<number>) {
        return this.http.post(
            this.adminUrl + 'sectionItem/deleteMultiple/',
            ids
        );
    }

    public getSectionItems(): Observable<SectionItemModel[]> {
        console.log('Hadaa howa id=' + this.sectionSelected?.id);
        return this.http.get<SectionItemModel[]>(this.adminUrl + 'sectionItem/sectionId/' + this.sectionSelected?.id);
    }


}
