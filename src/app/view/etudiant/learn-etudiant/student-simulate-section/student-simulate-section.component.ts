/* tslint:disable:no-shadowed-variable whitespace */
import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Section} from '../../../../controller/model/section.model';
import {Cours} from '../../../../controller/model/cours.model';
import {ConfirmationService, MenuItem, MessageService, TreeNode} from 'primeng/api';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {HttpClient} from '@angular/common/http';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {Quiz} from '../../../../controller/model/quiz.model';
import {LoginService} from '../../../../controller/service/login.service';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {QuizEtudiant} from '../../../../controller/model/quiz-etudiant.model';
import {DictionaryService} from '../../../../controller/service/dictionary.service';
import {Dictionary} from '../../../../controller/model/dictionary.model';
import {Router} from '@angular/router';
import {VocabularyService} from '../../../../controller/service/vocabulary.service';
import {EtudiantCours} from '../../../../controller/model/etudiant-cours.model';
import {SectionItemService} from '../../../../controller/service/section-item.service';
import {Inscription} from '../../../../controller/model/inscription.model';
import {EtudiantReview} from '../../../../controller/model/etudiant-review.model';
import {EtudiantReviewService} from '../../../../controller/service/etudiant-review.service';
import {SessionCours} from '../../../../controller/model/session-cours.model';
import {SessionCoursService} from '../../../../controller/service/session-cours.service';
import {logging} from 'protractor';
import {HomeworkService} from '../../../../controller/service/homework.service';
import {HomeWork} from '../../../../controller/model/home-work.model';
import {HomeWorkEtudiantServiceService} from '../../../../controller/service/home-work-etudiant-service.service';
import {WebSocketService} from '../../../../controller/service/web-socket.service';
import {LearnService} from '../../../../controller/service/learn.service';
import {QuizReponse} from '../../../../controller/model/quiz-reponse';
import {Prof} from '../../../../controller/model/prof.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {GroupeEtudiantService} from '../../../../controller/service/groupe-etudiant-service';
import {AppComponent} from '../../../../app.component';
import {newArray} from '@angular/compiler/src/util';
import {MenuService} from '../../../shared/slide-bar/app.menu.service';
import {SimulateSectionService} from '../../../../controller/service/simulate-section.service';
import {ChatMessageDto} from '../../../../controller/model/chatMessageDto';
import {User} from '../../../../controller/model/user.model';

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }

    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}


@Component({
    selector: 'app-student-simulate-section',
    templateUrl: './student-simulate-section.component.html',
    styleUrls: ['./student-simulate-section.component.scss']
})
export class StudentSimulateSectionComponent implements OnInit, OnDestroy {
    synonymes: string;
    options: any = {
        title: {
            display: false,
            text: 'Summary',
            fontSize: 16,

        },
        legend: {
            position: 'bottom'
        },
    };

    // tslint:disable-next-line:max-line-lengthg max-line-length
    constructor(private messageService: MessageService,
                private router: Router,
                public webSocketService: WebSocketService,
                private dictionnaryService: DictionaryService,
                private sanitizer: DomSanitizer,
                private confirmationService: ConfirmationService,
                private service: ParcoursService,
                private menuService: MenuService,
                private http: HttpClient,
                private quizService: QuizEtudiantService,
                public loginService: LoginService,
                private vocab: VocabularyService,
                private review: EtudiantReviewService,
                private sectionItemService: SectionItemService,
                private sessioncoursservice: SessionCoursService,
                private homeWorkService: HomeworkService,
                private homeWorkEtudiantService: HomeWorkEtudiantServiceService,
                private learnService: LearnService,
                private app: AppComponent,
                private simulateSectionService: SimulateSectionService,
                private grpEtudiantService: GroupeEtudiantService,
    ) {
    }

    get showRatingLessonTemplate(): boolean {
        return this.simulateSectionService.showRatingLessonTemplate;
    }

    set showRatingLessonTemplate(value: boolean) {
        this.simulateSectionService.showRatingLessonTemplate = value;
    }

    get data(): any {
        return this.simulateSectionService.data;
    }

    set data(value: any) {
        this.simulateSectionService.data = value;
    }

    get finishedAdditionalSection(): number {
        return this.simulateSectionService.finishedAdditionalSection;
    }

    set finishedAdditionalSection(value: number) {
        this.simulateSectionService.finishedAdditionalSection = value;
    }

    get finishedSection(): number {
        return this.simulateSectionService.finishedSection;
    }

    set finishedSection(value: number) {
        this.simulateSectionService.finishedSection = value;
    }

    get showLesson(): boolean {
        return this.simulateSectionService.showLesson;
    }

    set showLesson(value: boolean) {
        this.simulateSectionService.showLesson = value;
    }

    get showSummary(): boolean {
        return this.simulateSectionService.showSummary;
    }

    set showSummary(value: boolean) {
        this.simulateSectionService.showSummary = value;
    }


    get coursecomplited(): boolean {
        return this.review.coursecomplited;
    }

    set coursecomplited(value: boolean) {
        this.review.coursecomplited = value;
    }


    get participants(): Map<number, Array<Etudiant>> {
        return this.learnService.participants;
    }

    set participants(value: Map<number, Array<Etudiant>>) {
        this.learnService.participants = value;
    }

    get viewDialog(): boolean {
        return this.review.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.review.viewDialog = value;
    }

    get showAppMenu(): boolean {
        return this.learnService.showAppMenu;
    }

    set showAppMenu(value: boolean) {
        this.learnService.showAppMenu = value;
    }


    get showVocabulary(): boolean {
        return this.sectionItemService.showVocabulary;
    }

    get selectedNow(): Dictionary {
        return this.dictionnaryService.selectedNow;
    }

    set selectedNow(value: Dictionary) {
        this.dictionnaryService.selectedNow = value;
    }

    set showVocabulary(value: boolean) {
        this.sectionItemService.showVocabulary = value;
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

    set sectionStandard(value: Array<Section>) {
        this.service.sectionStandard = value;
    }

    get sectionAdditional(): Array<Section> {
        return this.service.sectionAdditional;
    }

    get showTpBar(): boolean {
        return this.menuService.showTpBar;
    }

    set showTpBar(value: boolean) {
        this.menuService.showTpBar = value;
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

    get selectedReview(): EtudiantReview {
        return this.review.selected;
    }

    set selectedReview(value: EtudiantReview) {
        this.review.selected = value;
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

    get TranslateSynonymeDialog(): boolean {
        return this.dictionnaryService.TranslateSynonymeDialog;
    }

    set TranslateSynonymeDialog(value: boolean) {
        this.dictionnaryService.TranslateSynonymeDialog = value;
    }

    get connectedUsers(): any[] {
        return this.webSocketService.connectedUsers;
    }

    set connectedUsers(value: any[]) {
        this.webSocketService.connectedUsers = value;
    }

    get prof(): Prof {
        return this.webSocketService.prof;
    }

    set prof(value: Prof) {
        this.webSocketService.prof = value;
    }

    get groupeEtudiant(): GroupeEtudiant {
        return this.webSocketService.groupeEtudiant;
    }


    get studentsEnLigne(): Map<number, User> {
        return this.webSocketService.studentsEnLigne;
    }

    showTakeQuiz = false;
    showViewQuiz = false;
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
    searchInput: string;

    get selectedLanguage(): any {
        return this.learnService.selectedLanguage;
    }

    set selectedLanguage(value: any) {
        this.learnService.selectedLanguage = value;
    }

    public finish() {
        this.viewDialog = true;
    }

    public view(EtudiantReview: EtudiantReview) {
        this.review.selected = {...EtudiantReview};
        this.viewDialog = true;
    }

    navigate() {
        this.router.navigate(['etudiant/etudiant-cours']);
    }

    public findByWord() {
        this.dictionnaryService.FindByWord(this.word).subscribe(
            data => {
                this.selectedDict = data;
                document.getElementById('dictionnair').style.visibility = 'visible';
                document.getElementById('dictionnair').style.width = '90%';
                document.getElementById('dictionnair').style.height = '100%';
                this.word = '';
            }, error => console.log('erreeeeeeeeeeeeeeeeur'));
        document.getElementById('dictionnair').style.visibility = 'hidden';
        document.getElementById('dictionnair').style.width = '0px';
        document.getElementById('dictionnair').style.height = '0px';
    }

    public Section(libelle: string) {
        this.service.afficheSection(libelle).subscribe(
            data => {
                this.selectedsection = data;
                if (data.categorieSection.libelle === 'Vocabulary') {
                    this.Vocab(data);
                } else {
                    this.showVocabulary = false;
                }
                this.quizService.findQuizBySectionId(this.selectedsection).subscribe(
                    data => {
                        this.selectedQuiz = data;

                        this.quizService.findQuizEtudanitByEtudiantIdAndQuizId(this.loginService.etudiant, this.selectedQuiz).subscribe(
                            data => {
                                this.quizEtudiantList = data;
                                console.log(this.quizEtudiantList);
                                this.quizService.findAllQuestions(this.selectedQuiz.ref).subscribe(
                                    dataQuestions => {
                                        if (data === null) {
                                            this.showTakeQuiz = true;
                                            this.showViewQuiz = false;
                                        } else {
                                            console.log(dataQuestions);
                                            if (data.questionCurrent > dataQuestions.length) {
                                                this.showViewQuiz = true;
                                                this.showTakeQuiz = false;
                                                // this.passerQuiz = 'View Quiz';
                                                // this.quizView = true;
                                            } else {
                                                this.showTakeQuiz = true;
                                                this.showViewQuiz = false;
                                                // this.quizView = false;
                                            }
                                        }

                                    }
                                );
                            }, error => {
                                this.passerQuiz = 'Take Quiz';
                                this.quizView = false;
                            }
                        );
                    },
                );
            }, error => console.log('erreeeeeeeeeeeeeeeeur'));
    }

    public ReviewExist() {
        this.review.findReview(this.selectedcours.id).subscribe(
            data => {
                this.selectedReview = data;
            });
    }


    public openCreateDict() {
        document.getElementById('dictionnair').style.visibility = 'hidden';
        document.getElementById('dictionnair').style.width = '0px';
        document.getElementById('dictionnair').style.height = '0px';
        this.submittedDict = false;
        this.createDialogDict = true;
        this.selectedDict = new Dictionary();
    }

    filterDict(event) {
        const filtered: any[] = [];
        const query = event.query;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.itemsDict.length; i++) {
            const dict = this.itemsDict[i];
            // tslint:disable-next-line:triple-equals
            if (dict.word.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(dict);
            }
        }

        this.filteredDict = filtered;
    }

    ngOnInit(): void {
        this.selectedsection = this.itemssection2[0];
        if (this.loginService.getConnectedStudent().langue === 'fr') {
            this.selectedLanguage = {code: 'fr', name: 'French', nativeName: 'français'};
        }
        this.showAppMenu = false;
        this.review.findReview(this.selectedcours.id).subscribe(
            data => {
                this.selectedReview = data;
            });
        this.findAllDict();
        this.quizService.section.id = this.selectedsection.id;
        this.quizService.findQuizSection().subscribe(data => this.selectedQuiz = data);
        this.quizService.findQuizBySectionId(this.selectedsection).subscribe(
            data => {
                this.selectedQuiz = data;

                this.quizService.findQuizEtudanitByEtudiantIdAndQuizId(this.loginService.etudiant, this.selectedQuiz).subscribe(
                    data => {
                        this.quizEtudiantList = data;
                        console.log(this.quizEtudiantList);
                        this.quizService.findAllQuestions(this.selectedQuiz.ref).subscribe(
                            dataQuestions => {
                                if (data === null) {
                                    this.showTakeQuiz = true;
                                    this.showViewQuiz = false;
                                } else {
                                    if (data.questionCurrent === dataQuestions.length) {
                                        // this.passerQuiz = 'View Quiz';
                                        // this.quizView = true;
                                        this.showTakeQuiz = false;
                                        this.showViewQuiz = true;
                                    } else {
                                        this.showTakeQuiz = true;
                                        this.showViewQuiz = false;
                                    }
                                }
                            }
                        );
                    }, error => {
                        this.passerQuiz = 'Take Quiz';
                        this.quizView = false;
                    }
                );
            });
        this.vocab.findAllVocabSection().subscribe(data => {
            this.vocab.nombreVocab = data.length;
        });

        this.findhomeworkbycours(this.sectionItemService.coursofsection);
        if (this.webSocketService.isInSession) {
            this.webSocketService.findCurrentSectionForstudent(this.service.selectedcours, this.prof);
            console.log(this.service.selectedsection);
        }
    }

    findAllDict() {
        this.dictionnaryService.FindAllWord().subscribe(
            data => {
                this.itemsDict = data;
            });
    }

    public findhomeworkbycours(cours: Cours) {
        console.log(cours);
        this.homeWorkService.findhomeworkbyCoursId(cours).subscribe(
            data => {
                console.log(data);
                this.homeWorkService.homeWorkList = data;
            }, error => {
                console.log('orsinakh');
            }
        );

    }

    public findCoursEtudiant(cours: Cours) {
        this.selectedEtudiantCours.cours.id = cours.id;
        this.service.findEtudiantCours().subscribe(
            data => this.selectedEtudiantCours = data
        );
    }

    public dictEdit(dict: Dictionary) {
        this.selected = dict;
        if (this.selected.word != null) {
            this.submittedDictEdit = false;
            this.editDialogDict = true;
        }
    }

    public dict() {
        this.selectedNow = new Dictionary();
        const selection = window.getSelection();
        this.selectedNow.word = selection.toString();
        console.log(this.selectedNow.word.length);
        if (this.selectedNow.word.length > 3) {
            console.log(this.selectedLanguage.code);
            if (this.selectedLanguage.code === 'ar') {
                this.quizService.translate(this.selectedNow.word).subscribe(data => {
                    console.log(data);
                    this.selectedNow.definition = data;
                });
            } else if (this.selectedLanguage.code === 'fr') {
                this.quizService.translateEnFr(this.selectedNow.word).subscribe(data => {
                    this.selectedNow.definition = data;
                    console.log(data);
                });
            }
            this.createDialogDict = true;
        }
    }


    PreviousSection() {


        this.service.affichelistSection().subscribe(
            data => {
                this.itemssection2 = data;
                // tslint:disable-next-line:no-shadowed-variable
            });
        this.selectedsection.numeroOrder = this.selectedsection.numeroOrder - 1;
        // tslint:disable-next-line:triple-equals
        if (this.selectedsection.numeroOrder != 0) {
            this.service.afficheOneSection2().subscribe(
                data => {
                    this.selectedsection = data;
                    if (data.categorieSection.libelle === 'Vocabulary') {
                        this.Vocab(data);
                    } else {
                        this.showVocabulary = false;
                    }
                    this.quizService.findQuizBySectionId(this.selectedsection).subscribe(
                        data => {
                            this.selectedQuiz = data;
                            this.quizService.findQuizEtudanitByEtudiantIdAndQuizId(this.loginService.etudiant, this.selectedQuiz).subscribe(
                                data => {
                                    this.quizEtudiantList = data;
                                    console.log(this.quizEtudiantList);
                                    this.quizService.findAllQuestions(this.selectedQuiz.ref).subscribe(
                                        dataQuestions => {
                                            if (data === null) {
                                                this.showTakeQuiz = true;
                                                this.showViewQuiz = false;
                                            } else {
                                                if (data.questionCurrent === dataQuestions.length) {
                                                    // this.passerQuiz = 'View Quiz';
                                                    // this.quizView = true;
                                                    this.showTakeQuiz = false;
                                                    this.showViewQuiz = true;
                                                } else {
                                                    this.showTakeQuiz = true;
                                                    this.showViewQuiz = false;
                                                }
                                            }
                                        }
                                    );
                                }, error => {
                                    this.passerQuiz = 'Take Quiz';
                                    this.quizView = false;
                                }
                            );
                        },
                    );
                });
        } else {
            this.selectedsection.numeroOrder = this.itemssection2.length + 1;
            this.NextSection();
        }
    }

    photoURL() {
        // this.service.image = '';
        //  for (let j = 0; j < 76 ; j++)
        //  {
        // this.service.image = this.selectedsection.urlImage;
        //  }
        //  this.service.image += 'preview';
        //  console.log(this.selectedsection.id);
        // const blob = UrlFetch(this.image,{headers})
        //  return this.sanitizer.bypassSecurityTrustResourceUrl(this.service.image);
        // return this.service.image;
        this.service.image = '';
        //  for (let j = 0; j < 76 ; j++)
        //  {
        this.service.image = this.selectedsection.urlImage;
        //  }
        //  this.service.image += 'preview';
        //  console.log(this.service.image);
        this.srcImg = this.service.image;
        return this.srcImg;

        //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.service.image);
    }

    URLVideo() {
        this.service.video = '';
        // tslint:disable-next-line:prefer-for-of
        // for (let m = 0; m < 24 ; m++)
        // {
        this.service.video = this.selectedsection.urlVideo;
        // }
        //   for (let m = 32; m < 43 ; m++)
        //   {
        //  }
        //   console.log(this.service.video);
        // return this.sanitizer.bypassSecurityTrustResourceUrl(this.service.video);
        return this.service.video;

    }

    public NextSection() {
        this.service.affichelistSection().subscribe(
            data => {
                this.itemssection2 = data;
                // tslint:disable-next-line:no-shadowed-variable
            });
        this.selectedsection.numeroOrder = this.selectedsection.numeroOrder + 1;
        // tslint:disable-next-line:triple-equals
        if (this.selectedsection.numeroOrder <= this.itemssection2.length) {
            this.service.afficheOneSection2().subscribe(
                async data => {
                    this.selectedsection = data;
                    if (data.categorieSection.libelle === 'Vocabulary') {
                        this.Vocab(data);
                    } else {
                        this.showVocabulary = false;
                    }

                    this.quizService.findQuizBySectionId(this.selectedsection).subscribe(
                        data => {
                            this.selectedQuiz = data;

                            this.quizService.findQuizEtudanitByEtudiantIdAndQuizId(this.loginService.etudiant, this.selectedQuiz).subscribe(
                                data => {
                                    this.quizEtudiantList = data;
                                    console.log(this.quizEtudiantList);
                                    this.quizService.findAllQuestions(this.selectedQuiz.ref).subscribe(
                                        dataQuestions => {
                                            if (data === null) {
                                                this.showTakeQuiz = true;
                                                this.showViewQuiz = false;
                                            } else {
                                                if (data.questionCurrent === dataQuestions.length) {
                                                    // this.passerQuiz = 'View Quiz';
                                                    // this.quizView = true;
                                                    this.showTakeQuiz = false;
                                                    this.showViewQuiz = true;
                                                } else {
                                                    this.showTakeQuiz = true;
                                                    this.showViewQuiz = false;
                                                }
                                            }
                                        }
                                    );
                                }, error => {
                                    this.passerQuiz = 'Take Quiz';
                                    this.quizView = false;
                                }
                            );
                        },
                    );
                });
        } else {
            this.selectedsection.numeroOrder = 0;
            this.PreviousSection();
        }


    }


    async showVocabularyComponent() {
        console.log('hadi kaat3yeett: ' + this.selectedsection.categorieSection.libelle);
        if (this.selectedsection.categorieSection.libelle === 'Vocabulary') {
            this.Vocab(this.selectedsection);
            this.showVocabulary = true;
        } else {
            this.showVocabulary = false;
        }
    }


    Vocab(section: Section) {
        this.sectionItemService.sectionSelected = section;

        this.sectionItemService.getSectionItems().subscribe(data => {
            this.sectionItemService.sectionSelected.sectionItems = data;
            console.log(data);
            this.showVocabulary = true;
        });

    }

    return($event: string) {
        this.showVocabulary = false;
    }


    ngOnDestroy(): void {
        this.showAppMenu = true;
    }

    closeSession() {
        this.showTpBar = true;
        let chatMessage: ChatMessageDto = new ChatMessageDto(this.loginService.getConnectedStudent().nom, 'Quit the session', true);
        chatMessage.type = 'DISCONNECT';
        chatMessage.student = this.loginService.getConnectedStudent();
        this.webSocketService.closeWebSocket(chatMessage);
        this.participants.delete(this.prof.id);
        this.connectedUsers.splice(0, this.connectedUsers.length);
        console.log(this.participants);
    }

    getData() {
        const grp = this.participants.get(this.prof.id);
        console.log(grp);
        console.log(this.participants);
    }

    getLanguages(): Array<any> {
        return this.app.languages;
    }

    getSelectedLanguage() {
        console.log(this.selectedLanguage);

    }

    findAllSynonimes(word: string) {
        console.log(word);
        console.log(this.searchInput);
        if (this.selectedLanguage.code === 'ar') {
            this.quizService.translate(word).subscribe(data => {
                console.log(data);
                this.synonymes = data;
            });
        } else if (this.selectedLanguage.code === 'fr') {
            this.quizService.translateEnFr(word).subscribe(data => {
                this.synonymes = data;
                console.log(data);
            });
        }
    }

    addToDictionary() {
        let dict: Dictionary = new Dictionary();
        dict.word = this.searchInput;
        dict.definition = this.synonymes;
        dict.etudiant = this.loginService.getConnectedStudent();

        this.dictionnaryService.addToDictionary(dict).subscribe(data => {
            this.itemsDict.push({...data});
            this.searchInput = String();
            this.synonymes = String();
            this.messageService.add({severity: 'success', life: 3000, detail: 'Word added successfully'});
        }, error => {
            console.log(error);
            this.messageService.add({severity: 'error', life: 3000, detail: 'Text is too long! try again with small text'});

        });
    }

    nextSection(selectedsection: Section): string {
        console.log(this.itemssection2);
        for (let i = 0; i < this.itemssection2.length; i++) {
            if (selectedsection.id === this.itemssection2[i].id) {
                return this.itemssection2[i + 1].libelle;
            }
        }
    }


    sectionIsFinished(section: Section): boolean {
        return this.simulateSectionService.sectionIsFinished(section);
    }

    finishLesson(rating: string) {
        this.showRatingLessonTemplate = false;
        this.closeSession();
    }
}
