import {EventEmitter, Injectable, Output} from '@angular/core';
import {Section} from '../model/section.model';
import {Vocabulary} from '../model/vocabulary.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SectionItemModel} from '../model/section-item.model';
import {VocabularySectionItemService} from './vocabulary-section-item.service';
import {LearnService} from './learn.service';
import {QuizEtudiantService} from './quiz-etudiant.service';

@Injectable({
    providedIn: 'root'
})
export class VocabularyService {

    private adminUrl = environment.adminUrl;
    private studentUrl = environment.etudiantUrl;
    private profUrl = environment.profUrl;


    @Output() private _someEvent = new EventEmitter<string>();

    private _listItems: SectionItemModel[];
    private _currentItem: SectionItemModel;
    private _showPrevious: boolean;
    private _showNext: boolean;
    private _showfinish: boolean;
    private _showEnd: boolean;
    private _showItems: boolean;
    private _currentIndex: number;
    private _fliped: boolean;
    private _progressBarValue: number;


    constructor(private http: HttpClient,
                private learnService: LearnService,
                private quizService: QuizEtudiantService,
                private vocabularySectionItemService: VocabularySectionItemService) {
    }


    get someEvent(): EventEmitter<string> {
        return this._someEvent;
    }

    set someEvent(value: EventEmitter<string>) {
        this._someEvent = value;
    }

    get listItems(): SectionItemModel[] {
        return this._listItems;
    }

    set listItems(value: SectionItemModel[]) {
        this._listItems = value;
    }

    get currentItem(): SectionItemModel {
        return this._currentItem;
    }

    set currentItem(value: SectionItemModel) {
        this._currentItem = value;
    }

    get showPrevious(): boolean {
        return this._showPrevious;
    }

    set showPrevious(value: boolean) {
        this._showPrevious = value;
    }

    get showNext(): boolean {
        return this._showNext;
    }

    set showNext(value: boolean) {
        this._showNext = value;
    }

    get showfinish(): boolean {
        return this._showfinish;
    }

    set showfinish(value: boolean) {
        this._showfinish = value;
    }

    get showEnd(): boolean {
        return this._showEnd;
    }

    set showEnd(value: boolean) {
        this._showEnd = value;
    }

    get showItems(): boolean {
        return this._showItems;
    }

    set showItems(value: boolean) {
        this._showItems = value;
    }

    get currentIndex(): number {
        return this._currentIndex;
    }

    set currentIndex(value: number) {
        this._currentIndex = value;
    }

    get fliped(): boolean {
        return this._fliped;
    }

    set fliped(value: boolean) {
        this._fliped = value;
    }

    get progressBarValue(): number {
        return this._progressBarValue;
    }

    set progressBarValue(value: number) {
        this._progressBarValue = value;
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

    public findAllVocabSection(section: Section): Observable<Array<Vocabulary>> {
        return this.http.get<Array<Vocabulary>>(this.adminUrl + 'vocabulary/section/id/' + section.id);
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


    // Partie de sync

    nextItem() {
        const index = this.listItems.indexOf(this.currentItem);
        if (index < this.listItems.length - 1) {
            this.vocabularySectionItemService.reloadComponent();
            this.currentItem = this.listItems[index + 1];
            this.getTranslation();
            this.currentIndex = index + 2;
            this.calculProgressBarValue(this.currentIndex);
            this.showNext = true;
            this.showfinish = false;
            this.fliped = false;
            this.vocabularySectionItemService.fliped = false;
        }
        if (index + 1 >= this.listItems.length) {
            this.showNext = false;
            this.showfinish = true;
        }
    }


    get selectedLanguage(): any {
        return this.learnService.selectedLanguage;
    }

    getTranslation() {
        if (this.selectedLanguage.code === 'ar') {
            this.quizService.translate(this.currentItem.response).subscribe(data => {
                this.currentItem.translation = data;
            });
        } else if (this.selectedLanguage.code === 'fr') {
            this.quizService.translateEnFr(this.currentItem.response).subscribe(data => {
                this.currentItem.translation = data;
            });
        }
    }


    endShow() {
        this.showItems = false;
        this.showEnd = true;
    }

    finish() {
        this.someEvent.next();
    }

    flip() {
        this.fliped = true;
        this.vocabularySectionItemService.showHidden();
        const index = this.listItems.indexOf(this.currentItem);
        if (index + 1 >= this.listItems.length) {
            this.showNext = false;
            this.showfinish = true;
        }
    }



    calculProgressBarValue(index: number) {
        const length = this.listItems.length;
        this.progressBarValue = (index * 100) / length;
    }
}
