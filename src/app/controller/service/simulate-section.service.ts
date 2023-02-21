import {Injectable} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService, TreeNode} from 'primeng/api';
import {Router} from '@angular/router';
import {DictionaryService} from './dictionary.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ParcoursService} from './parcours.service';
import {HttpClient} from '@angular/common/http';
import {QuizEtudiantService} from './quiz-etudiant.service';
import {LoginService} from './login.service';
import {VocabularyService} from './vocabulary.service';
import {EtudiantReviewService} from './etudiant-review.service';
import {SectionItemService} from './section-item.service';
import {SessionCoursService} from './session-cours.service';
import {HomeworkService} from './homework.service';
import {HomeWorkEtudiantServiceService} from './home-work-etudiant-service.service';
import {Dictionary} from '../model/dictionary.model';
import {EtudiantCours} from '../model/etudiant-cours.model';
import {Quiz} from '../model/quiz.model';
import {Etudiant} from '../model/etudiant.model';
import {QuizEtudiant} from '../model/quiz-etudiant.model';
import {Cours} from '../model/cours.model';
import {HomeWork} from '../model/home-work.model';
import {Section} from '../model/section.model';
import {environment} from '../../../environments/environment';
import {LearnService} from './learn.service';
import {SessionCours} from '../model/session-cours.model';
import {SectionEnum} from '../../enum/SectionEnum';

@Injectable({
    providedIn: 'root'
})
export class SimulateSectionService {
    private _showLesson = true;
    private _showSummary = false;
    private _data: any;
    private _finishedAdditionalSection = 0;
    private _finishedSection = 0;
    private _showRatingLessonTemplate = false;
    private _vocabularySection: Section = new Section();
    private _getToKnowSection: Section = new Section();
    private _showViewQuiz = false;
    private _images: any[];
    private _showGalleria: boolean;
    private _listOfContent: string[];

    constructor(private messageService: MessageService,
                private router: Router,
                private dictionnaryService: DictionaryService,
                private sanitizer: DomSanitizer,
                private confirmationService: ConfirmationService,
                private service: ParcoursService,
                private http: HttpClient,
                private learnService: LearnService,
                private quizService: QuizEtudiantService,
                private loginService: LoginService,
                private vocab: VocabularyService,
                private review: EtudiantReviewService,
                private sectionItemService: SectionItemService,
                private sessioncoursservice: SessionCoursService,
                private homeWorkService: HomeworkService,
                private homeWorkEtudiantService: HomeWorkEtudiantServiceService) {
    }


    get images(): any[] {
        return this._images;
    }

    set images(value: any[]) {
        this._images = value;
    }

    get showGalleria(): boolean {
        return this._showGalleria;
    }

    set showGalleria(value: boolean) {
        this._showGalleria = value;
    }

    get listOfContent(): string[] {
        return this._listOfContent;
    }

    set listOfContent(value: string[]) {
        this._listOfContent = value;
    }

    get showViewQuiz(): boolean {
        return this._showViewQuiz;
    }

    set showViewQuiz(value: boolean) {
        this._showViewQuiz = value;
    }

    get vocabularySection(): Section {
        return this._vocabularySection;
    }

    set vocabularySection(value: Section) {
        this._vocabularySection = value;
    }

    get getToKnowSection(): Section {
        return this._getToKnowSection;
    }

    set getToKnowSection(value: Section) {
        this._getToKnowSection = value;
    }

    get showRatingLessonTemplate(): boolean {
        return this._showRatingLessonTemplate;
    }

    set showRatingLessonTemplate(value: boolean) {
        this._showRatingLessonTemplate = value;
    }

    get data(): any {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }

    get finishedAdditionalSection(): number {
        return this._finishedAdditionalSection;
    }

    set finishedAdditionalSection(value: number) {
        this._finishedAdditionalSection = value;
    }

    get finishedSection(): number {
        return this._finishedSection;
    }

    set finishedSection(value: number) {
        this._finishedSection = value;
    }

    get showLesson(): boolean {
        return this._showLesson;
    }

    set showLesson(value: boolean) {
        this._showLesson = value;
    }

    get showSummary(): boolean {
        return this._showSummary;
    }

    set showSummary(value: boolean) {
        this._showSummary = value;
    }

    get quizExist(): boolean {
        return this._quizExist;
    }

    set quizExist(value: boolean) {
        this._quizExist = value;
    }

    get coursecomplited(): boolean {
        return this.review.coursecomplited;
    }

    set coursecomplited(value: boolean) {
        this.review.coursecomplited = value;

    }

    get viewDialog(): boolean {
        return this.review.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.review.viewDialog = value;
    }

    get contenuSection(): Array<string> {
        return this.service.contenuSection;
    }

    set contenuSection(value: Array<string>) {
        this.service.contenuSection = value;
    }

    get selected(): Dictionary {
        return this.dictionnaryService.selected;
    }

    set selected(value: Dictionary) {
        this.dictionnaryService.selected = value;
    }

    get itemsDict(): Array<Dictionary> {
        return this.dictionnaryService.itemsDict;
    }

    set itemsDict(value: Array<Dictionary>) {
        this.dictionnaryService.itemsDict = value;
    }

    get image(): string {
        return this.service.image;
    }

    set image(value: string) {
        this.service.image = value;
    }

    get selectedDict(): Dictionary {
        return this.dictionnaryService.selectedDict;
    }

    set selectedDict(value: Dictionary) {
        this.dictionnaryService.selectedDict = value;
    }

    get selectedEtudiantCours(): EtudiantCours {
        return this.service.selectedEtudiantCours;
    }

    set selectedEtudiantCours(value: EtudiantCours) {
        this.service.selectedEtudiantCours = value;
    }

    get itemsEtudiantCours(): Array<EtudiantCours> {
        return this.service.itemsEtudiantCours;
    }

    set itemsEtudiantCours(value: Array<EtudiantCours>) {
        this.service.itemsEtudiantCours = value;
    }

    get submittedDictEdit(): boolean {
        return this.dictionnaryService.submittedDictEdit;
    }

    set submittedDictEdit(value: boolean) {
        this.dictionnaryService.submittedDictEdit = value;
    }

    get editDialogDict(): boolean {
        return this.dictionnaryService.editDialogDict;
    }

    set editDialogDict(value: boolean) {
        this.dictionnaryService.editDialogDict = value;
    }

    get submittedDict(): boolean {
        return this.dictionnaryService.submittedDict;
    }

    set submittedDict(value: boolean) {
        this.dictionnaryService.submittedDict = value;
    }

    get createDialogDict(): boolean {
        return this.dictionnaryService.createDialogDict;
    }

    set createDialogDict(value: boolean) {
        this.dictionnaryService.createDialogDict = value;
    }

    get progress(): number {
        return this.service.progress;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set progress(value: number) {
        this.service.progress = value;
    }

    get selectedsection(): Section {
        return this.service.selectedsection;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set selectedsection(value: Section) {
        this.service.selectedsection = value;
    }

    get section(): Section {
        return this.quizService.section;
    }

    set section(value: Section) {
        this.quizService.section = value;
    }

    get selectedQuiz(): Quiz {
        return this.quizService.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.quizService.selectedQuiz = value;
    }

    get etudiant(): Etudiant {
        return this.loginService.etudiant;
    }


    get quizEtudiantList(): QuizEtudiant {
        return this.quizService.quizEtudiantList;
    }

    set quizEtudiantList(value: QuizEtudiant) {
        this.quizService.quizEtudiantList = value;
    }

    get passerQuiz(): string {
        return this.quizService.passerQuiz;
    }

    set passerQuiz(value: string) {
        this.quizService.passerQuiz = value;
    }

    get quizView(): boolean {
        return this.quizService.quizView;
    }

    set quizView(value: boolean) {
        this.quizService.quizView = value;
    }

    get selectedcours(): Cours {
        return this.service.selectedcours;
    }

    set selectedcours(value: Cours) {
        this.service.selectedcours = value;
    }

    get itemssection2(): Array<Section> {
        return this.service.itemssection2;
    }

    set itemssection2(value: Array<Section>) {
        this.service.itemssection2 = value;
    }

    get sectionStandard(): Array<Section> {
        return this.service.sectionStandard;
    }


    get sectionAdditional(): Array<Section> {
        return this.service.sectionAdditional;
    }

    set sectionAdditional(value: Array<Section>) {
        this.service.sectionAdditional = value;
    }

    get selectessection(): Array<Section> {
        return this.service.selectessection;
    }

    set selectessection(value: Array<Section>) {
        this.service.selectessection = value;
    }

    get homeWorkList(): Array<HomeWork> {
        return this.homeWorkService.homeWorkList;
    }

    set homeWorkList(homeWorklist: Array<HomeWork>) {
        this.homeWorkService.homeWorkList = homeWorklist;
    }

    get showVocabulary(): boolean {
        return this.sectionItemService.showVocabulary;
    }

    set showVocabulary(value: boolean) {
        this.sectionItemService.showVocabulary = value;
    }

    get showTakeQuiz(): boolean {
        return this.learnService.showTakeQuiz;
    }

    set showTakeQuiz(value: boolean) {
        this.learnService.showTakeQuiz = value;
    }

    get showQuizReview(): boolean {
        return this.learnService.showQuizReview;
    }

    set showQuizReview(value: boolean) {
        this.learnService.showQuizReview = value;
    }


    set TranslateSynonymeDialog(value: boolean) {
        this.dictionnaryService.TranslateSynonymeDialog = value;
    }

    get listSynonymes(): Array<any> {
        return this.dictionnaryService.listSynonymes;
    }

    set listSynonymes(value: Array<any>) {
        this.dictionnaryService.listSynonymes = value;
    }

    get Synonymes(): Array<any> {
        return this.dictionnaryService.Synonymes;
    }

    set Synonymes(value: Array<any>) {
        this.dictionnaryService.Synonymes = value;
    }

    nodes: TreeNode[];
    menu: MenuItem[];
    srcImg: string;
    translate: any;
    textSeleted: string;
    filteredDict: any[];
    synonym: any[];
    value = 0;
    word: string;
    wordDict: any;
    j: number;
    private profUrl = environment.profUrl;
    private synchronizationUrl = 'synchronization';
    private _quizExist: boolean;

    private sessionCour: SessionCours = new SessionCours();

    Vocab(section: Section) {
        this.sectionItemService.sectionSelected = section;

        this.sectionItemService.getSectionItems(section).subscribe(data => {
            this.sectionItemService.sectionSelected.sectionItems = data;
            this.showVocabulary = true;
        }, error => {
            console.log(error);
        });
    }

    public updateCurrentSection(id: number, section: Section) {
        this.http.post<number>(this.profUrl + this.synchronizationUrl + '/update/' + id, section).subscribe(
            data => {
            }, error => {
                console.log(error);
            }
        );
    }


    public goToSummary() {
        let index = 0;
        for (const item of this.sessionCour.sections) {
            if (item.id === this.selectedsection.id) {
                index = -2;
            }
        }
        if (index === 0) {
            this.sessionCour.sections.push({...this.selectedsection});
        }

        this.showLesson = false;
        this.showSummary = true;

        for (const item of this.sessionCour.sections) {
            for (const sec of this.sectionAdditional) {
                if (item.id === sec.id) {
                    this.finishedAdditionalSection += 1;
                }
            }
        }
        for (const item of this.sessionCour.sections) {
            for (const sec of this.sectionStandard) {
                if (item.id === sec.id) {
                    this.finishedSection += 1;
                }
            }
        }
        const keySections = (this.finishedSection / this.sectionStandard?.length) * 100;
        const keySectionsRest = 100 - keySections;
        const keySectionsAdditional = (this.finishedAdditionalSection / this.sectionAdditional?.length) * 100;
        const keySectionsRestAdditional = 100 - keySectionsAdditional;


        this.data = {
            labels: ['Finished', 'Not Finished'],
            datasets: [
                {
                    data: [keySections, keySectionsRest],
                    backgroundColor: [
                        '#FF6384',
                        '#f4f4f4'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#f4f4f4'
                    ]
                },
                {
                    data: [keySectionsAdditional, keySectionsRestAdditional],
                    backgroundColor: [
                        '#FFCE56',
                        '#f4f4f4'
                    ],
                    hoverBackgroundColor: [
                        '#FFCE56',
                        '#f4f4f4'
                    ],

                }
            ]
        };
    }

    i = 0;

    public nextSection(id: number, type: string) {
        this.i++;
        for (let i = 0; i < this.itemssection2.length; i++) {
            if (id === this.itemssection2[i].id) {
                if (i !== 0 && (type === 'NEXT')) {
                    let index = 0;
                    for (const item of this.sessionCour.sections) {
                        if (item.id === this.itemssection2[i - 1].id) {
                            index = -2;
                        }
                    }
                    if (index === 0) {
                        this.sessionCour.sections.push({...this.itemssection2[i - 1]});
                    }
                }
                this.selectedsection = this.itemssection2[i];
            }
        }
        this.verifyImagesUrl();
        if (this.selectedsection.categorieSection?.libelle?.toUpperCase()?.includes('VOCABULARY')) {
            this.Vocab(this.selectedsection);
        } else {
            this.showVocabulary = false;
            if (
                this.selectedsection.categorieSection.libelle?.toUpperCase()?.includes(SectionEnum.LETS_PRACTICE.toUpperCase()) ||
                this.selectedsection.categorieSection.libelle?.toUpperCase()?.includes(SectionEnum.LIFE_STORY.toUpperCase())
            ) {
                this.findQuiz(this.selectedsection);
            } else {
                this.quizView = false;
            }
        }
    }

    private verifyImagesUrl() {
        if (this.selectedsection?.urlImage && this.selectedsection?.urlImage2 && this.selectedsection?.urlImage3) {
            this._images = [
                {
                    previewImageSrc: this.selectedsection?.urlImage,
                    alt: 'Image 1',
                    title: 'Title 1'
                },
                {
                    previewImageSrc: this.selectedsection?.urlImage2,
                    alt: 'Image 2',
                    title: 'Title 2'
                },
                {
                    previewImageSrc: this.selectedsection?.urlImage3,
                    alt: 'Image 3',
                    title: 'Title 3'
                }
            ];
            this._listOfContent = this.selectedsection.contenu?.split(/\s\s\s+/);
            this._showGalleria = true;
        } else if (this.selectedsection?.urlImage && this.selectedsection?.urlImage2) {
            this._images = [
                {
                    previewImageSrc: this.selectedsection?.urlImage,
                    alt: 'Image 1',
                    title: 'Title 1'
                },
                {
                    previewImageSrc: this.selectedsection?.urlImage2,
                    alt: 'Image 2',
                    title: 'Title 2'
                }
            ];
            this._listOfContent = this.selectedsection.contenu?.split(/\s\s\s+/);
            this._showGalleria = true;

        } else {
            this._showGalleria = false;
        }
    }


    public dict() {
        const selection = window.getSelection();
        this.textSeleted = selection.toString();
        this.selected = new Dictionary();

        this.dictionnaryService.FindByWord(this.textSeleted).subscribe(
            data => {
                this.selected = data;
                this.wordDict = '';
                this.listSynonymes = new Array<any>();
                // tslint:disable-next-line:triple-equals no-unused-expression
                if (this.textSeleted.length != 0 && this.selected.word == null) {
                    this.dictionnaryService.Translate(this.textSeleted).subscribe(
                        data => {
                            this.Synonymes = data;
                            this.wordDict = '';
                            this.j = 0;
                            this.listSynonymes = new Array<any>();
                            for (let i = this.j; i < this.Synonymes.length; i++) {
                                // tslint:disable-next-line:triple-equals
                                if (this.Synonymes[i] == '\"') {
                                    this.j = i;
                                    // @ts-ignore
                                    for (let k = this.j + 1; k < this.Synonymes.length; k++) {
                                        // tslint:disable-next-line:triple-equals
                                        if (this.Synonymes[k] != '\"' && this.Synonymes[k] != ',') {
                                            this.wordDict = this.wordDict + this.Synonymes[k];
                                        } else if (this.Synonymes[k] == ',') {
                                            break;
                                        } else {
                                            this.listSynonymes.push(this.wordDict);
                                            this.wordDict = '';
                                            this.j = k + 1;
                                            break;
                                        }
                                    }
                                }
                            }
                        });

                    this.selected.word = this.textSeleted;
                    this.submittedDict = false;
                    this.TranslateSynonymeDialog = true;
                    // tslint:disable-next-line:triple-equals
                } else if (this.textSeleted.length != 0 && this.selected.word != null) {
                    this.selected.word = this.textSeleted;
                    this.submittedDictEdit = false;
                    this.editDialogDict = true;
                }
            });
    }

    public dictEdit(dict: Dictionary) {
        this.selected = dict;
        if (this.selected.word != null) {
            this.submittedDictEdit = false;
            this.editDialogDict = true;
        }
    }


    public findSectionOneByOne(cour: Cours): Section {
        this.selectedcours = cour;
        this.service.affichelistSection().subscribe(
            data => {
                this.itemssection2 = data;
                this.service.sectionAdditional = [];
                this.service.sectionStandard = [];
                this.itemssection2 = data;
                for (let _i = 0; _i < data.length; _i++) {
                    if (data[_i].categorieSection.superCategorieSection.libelle === 'Obligatory') {
                        this.sectionStandard.push({...data[_i]});
                    } else if (data[_i].categorieSection.superCategorieSection.libelle === 'Additional') {
                        this.sectionAdditional.push({...data[_i]});
                    }
                }

            }, error => {
                console.log(error);
            });
        this.service.image = '';
        if (this.loginService.prof !== null) {
            this.service.afficheOneSection().subscribe(
                data => {
                    this.selectedsection = data;
                    if (data.categorieSection?.libelle?.toUpperCase()?.includes('VOCABULARY')) {
                        this.Vocab(data);
                    } else {
                        this.showVocabulary = false;
                    }
                    this.quizService.findQuizBySection(this.selectedsection.id).subscribe(
                        dataQuiz => {
                            this.selectedQuiz = dataQuiz;
                            if (dataQuiz !== null) {
                                this.quizService.findQuizEtudanitByEtudiantIdAndQuizId(this.loginService.etudiant,
                                    this.selectedQuiz).subscribe(
                                    data1 => {
                                        this.quizEtudiantList = data1;
                                        if (this.quizEtudiantList.id !== 0) {
                                            this.quizView = true;
                                        } else {
                                            this.quizView = false;
                                        }
                                    }, error => {
                                        this.passerQuiz = 'Take Quiz';
                                        console.log(error);
                                        this.quizView = false;
                                    }
                                );
                            }
                        });
                    this.service.image = this.selectedsection.urlImage;
                    this.quizService.section.id = this.selectedsection.id;
                    this.quizService.findQuizSection(this.selectedsection).subscribe(dataQuiz => this.selectedQuiz = dataQuiz);
                });
        }
        return this.selectedsection;
    }

    public goToSection(libelle: string) {
        this.service.afficheSection(libelle).subscribe(
            data => {
                this.selectedsection = data;
                if (data.categorieSection?.libelle?.toUpperCase()?.includes('VOCABULARY')) {
                    this.Vocab(data);
                } else {
                    this.showVocabulary = false;
                }
                if (
                    this.selectedsection.categorieSection.libelle?.toUpperCase()?.includes(SectionEnum.LETS_PRACTICE.toUpperCase()) ||
                    this.selectedsection.categorieSection.libelle?.toUpperCase()?.includes(SectionEnum.LIFE_STORY.toUpperCase())
                ) {
                    this.findQuiz(this.selectedsection);
                } else {
                    this.quizView = false;
                }
            }, error => console.log(error));
    }

    findSectionOneByCoursId(cours: Cours) {
        return this.http.get<Array<Section>>(this.profUrl + 'section/cours/id/' + cours.id).subscribe(
            data => {
                this.itemssection2 = data;
                this.selectedsection = this.itemssection2[0];
                if (
                    this.selectedsection.categorieSection.libelle?.toUpperCase()?.includes(SectionEnum.LETS_PRACTICE.toUpperCase()) ||
                    this.selectedsection.categorieSection.libelle?.toUpperCase()?.includes(SectionEnum.LIFE_STORY.toUpperCase())
                ) {
                    this.findQuiz(this.selectedsection);
                } else {
                    this.quizView = false;
                }

                if (this.selectedsection.categorieSection.libelle?.toUpperCase()?.includes('VOCABULARY')) {
                    this.Vocab(this.selectedsection);
                } else {
                    this.showVocabulary = false;
                }
                this.service.sectionAdditional = new Array<Section>();
                this.service.sectionStandard = new Array<Section>();
                for (let _i = 0; _i < this.itemssection2.length; _i++) {
                    if (this.itemssection2[_i].categorieSection.superCategorieSection.libelle === 'Obligatory') {
                        this.sectionStandard.push({...data[_i]});
                    } else if (this.itemssection2[_i].categorieSection.superCategorieSection.libelle === 'Additional') {
                        this.sectionAdditional.push({...data[_i]});
                    }
                }
                this.vocabularySection = this.sectionStandard.filter(s =>
                    s.categorieSection?.libelle?.toUpperCase()?.includes('VOCABULARY'))[0];

                this.getToKnowSection = this.sectionStandard.filter(s =>
                    s.categorieSection?.libelle?.toUpperCase()?.includes('Get to know'))[0];
                this.displayData(this.selectedsection);
            }
        );
    }

    private findQuiz(section1: Section) {
        this.quizService.findQuizBySectionId(section1).subscribe(data12 => {
            this.quizExist = true;
            this.selectedQuiz = data12;
            if (data12 !== null) {
                this.quizService.findQuizEtudanitByEtudiantIdAndQuizId(this.loginService.etudiant, this.selectedQuiz).subscribe(
                    data1 => {
                        this.quizEtudiantList = data1;
                        if (this.quizEtudiantList?.id === 0 || this.quizEtudiantList === null
                            || this.quizEtudiantList?.id === undefined) {
                            this.quizView = false;
                        } else {
                            this.quizView = true;
                        }
                    }, error => {
                        this.passerQuiz = 'Take Quiz';
                        console.log(error);
                        this.quizView = false;
                    }
                );
            } else {
                this.quizView = false;
            }
        }, error => {
            console.log(error);
            this.quizExist = false;
        });
    }

    private displayData(section: Section) {
        this.selectedsection = section;
        this.quizService.section.id = this.selectedsection.id;
        if (
            this.selectedsection?.categorieSection?.libelle?.toUpperCase()?.includes(SectionEnum.LETS_PRACTICE.toUpperCase()) ||
            this.selectedsection?.categorieSection?.libelle?.toUpperCase()?.includes(SectionEnum.LIFE_STORY.toUpperCase())
        ) {
            this.findQuiz(this.selectedsection);
        } else {
            this.quizView = false;
        }
        this.vocab.findAllVocabSection(section).subscribe(data => {
            this.vocab.nombreVocab = data.length;
        }, error => {
            console.log(error);
        });
    }

    sectionIsFinished(section: Section): boolean {
        if (this.sessionCour.sections.length > 0) {
            for (const sec of this.sessionCour.sections) {
                if (section.id === sec.id) {
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    finishLesson() {
        this.showRatingLessonTemplate = true;
    }
}
