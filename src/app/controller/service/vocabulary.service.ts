import {Injectable} from '@angular/core';
import {Section} from '../model/section.model';
import {Vocabulary} from '../model/vocabulary.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class VocabularyService {

    private adminUrl = environment.adminUrl;
    private studentUrl = environment.etudiantUrl;
    private profUrl = environment.profUrl;


    constructor(private http: HttpClient) {
    }

    private _sectionSelected: Section;

    get sectionSelected(): Section {
        if (this._sectionSelected == null) {
            this._sectionSelected = new Section();
        }
        return this._sectionSelected;
    }

    set sectionSelected(value: Section) {
        this._sectionSelected = value;
    }

    private _sectionSelected2: Section;

    get sectionSelected2(): Section {
        if (this._sectionSelected2 == null) {
            this._sectionSelected2 = new Section();
        }
        return this._sectionSelected2;
    }

    set sectionSelected2(value: Section) {
        this._sectionSelected2 = value;
    }

    private _selected: Vocabulary;

    get selected(): Vocabulary {
        if (this._selected == null) {
            this._selected = new Vocabulary();
        }
        return this._selected;
    }

    set selected(value: Vocabulary) {
        this._selected = value;
    }

    private _selected2: Vocabulary;

    get selected2(): Vocabulary {
        if (this._selected2 == null) {
            this._selected2 = new Vocabulary();
        }
        return this._selected2;
    }

    set selected2(value: Vocabulary) {
        this._selected2 = value;
    }

    private _items: Array<Vocabulary>;

    get items(): Array<Vocabulary> {
        if (this._items == null) {
            this._items = new Array<Vocabulary>();
        }
        return this._items;
    }

    set items(value: Array<Vocabulary>) {
        this._items = value;
    }

    private _submitted: boolean;

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    private _numVocabulary = 1;

    get numVocabulary(): number {
        return this._numVocabulary;
    }

    set numVocabulary(value: number) {
        this._numVocabulary = value;
    }

    private _idSection: number;

    get idSection(): number {
        return this._idSection;
    }

    set idSection(value: number) {
        this._idSection = value;
    }

    private _nombreVocab: number;

    get nombreVocab(): number {
        return this._nombreVocab;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set nombreVocab(value: number) {
        this._nombreVocab = value;
    }

    public save(): Observable<Vocabulary> {
        return this.http.post<Vocabulary>(this.adminUrl + 'vocabulary/save/', this.selected);
    }

    public findAll(): Observable<Array<Vocabulary>> {
        return this.http.get<Array<Vocabulary>>(this.adminUrl + 'vocabulary/');
    }

    public findAllVocabSection(): Observable<Array<Vocabulary>> {
        return this.http.get<Array<Vocabulary>>(this.adminUrl + 'vocabulary/section/id/' + this.idSection);
    }

    public findVocabularybySection(): Observable<Array<Vocabulary>> {
        // tslint:disable-next-line:max-line-length
        return this.http.get<Array<Vocabulary>>(this.adminUrl + 'vocabulary/numero/' + this.numVocabulary + '/section/id/' + this.idSection);
    }

    public findByFirstNumero(): Observable<Vocabulary> {
        return this.http.get<Vocabulary>(this.adminUrl + 'vocabulary/numero/1');
    }

    public findByNextNumero(): Observable<Vocabulary> {
        this.numVocabulary = this.numVocabulary + 1;
        return this.http.get<Vocabulary>(this.adminUrl + 'vocabulary/numero/' + this.numVocabulary);

    }

    public findByNextNumeroSection(): Observable<Array<Vocabulary>> {
        this.numVocabulary = this.numVocabulary + 1;
        // tslint:disable-next-line:max-line-length
        return this.http.get<Array<Vocabulary>>(this.adminUrl + 'vocabulary/numero/' + this.numVocabulary + '/section/id/' + this.idSection);
    }

    public findByRef(selected: Vocabulary): Observable<Vocabulary> {
        return this.http.get<Vocabulary>(this.adminUrl + 'vocabulary/ref/' + selected.ref);
    }


    public edit(): Observable<Vocabulary> {
        return this.http.put<Vocabulary>(this.adminUrl + 'vocabulary/', this.selected);
    }

    public deleteByReference(): Observable<number> {
        return this.http.delete<number>(this.adminUrl + 'vocabulary/ref/' + this.selected.ref);
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


    public findExample(text: string): Observable<string> {
        return this.http.get<string>(this.studentUrl + 'TranslateEnAr/text/example/' + text);
    }

    public findExplanation(text: string): Observable<string> {
        return this.http.get<string>(this.studentUrl + 'TranslateEnAr/text/explanation/' + text);
    }
}
