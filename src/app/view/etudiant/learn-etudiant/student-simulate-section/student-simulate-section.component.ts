/* tslint:disable:no-shadowed-variable whitespace */
import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Section} from '../../../../controller/model/section.model';
import {Cours} from '../../../../controller/model/cours.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {HttpClient} from '@angular/common/http';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {Quiz} from '../../../../controller/model/quiz.model';
import {LoginService} from '../../../../controller/service/login.service';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {DictionaryService} from '../../../../controller/service/dictionary.service';
import {Dictionary} from '../../../../controller/model/dictionary.model';
import {ActivatedRoute, Router} from '@angular/router';
import {VocabularyService} from '../../../../controller/service/vocabulary.service';
import {EtudiantCours} from '../../../../controller/model/etudiant-cours.model';
import {SectionItemService} from '../../../../controller/service/section-item.service';
import {EtudiantReview} from '../../../../controller/model/etudiant-review.model';
import {EtudiantReviewService} from '../../../../controller/service/etudiant-review.service';
import {SessionCoursService} from '../../../../controller/service/session-cours.service';
import {HomeWork} from '../../../../controller/model/home-work.model';
import {HomeWorkEtudiantServiceService} from '../../../../controller/service/home-work-etudiant-service.service';
import {WebSocketService} from '../../../../controller/service/web-socket.service';
import {LearnService} from '../../../../controller/service/learn.service';
import {Prof} from '../../../../controller/model/prof.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {AppComponent} from '../../../../app.component';
import {MenuService} from '../../../shared/slide-bar/app.menu.service';
import {SimulateSectionService} from '../../../../controller/service/simulate-section.service';
import {ChatMessageDto} from '../../../../controller/model/chatMessageDto';
import {HomeWorkEtudiantComponent} from '../../homeWork/home-work-etudiant/home-work-etudiant.component';
import {HomeWorkSimulateService} from '../../../../controller/service/home-work-simulate.service';
import {CategoriesSectionItemEnum} from '../../../../enum/CategoriesSectionItemEnum';
import {ScheduleService} from '../../../../controller/service/schedule.service';
import {AnimationService} from '../../../../controller/service/animation.service';
import {UserVo} from '../../../../controller/vo/UserVo';
import {ScheduleProf} from '../../../../controller/model/calendrier-prof.model';

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
    selectedLesson: ScheduleProf;
    usersConnected: UserVo[];
    activeIndex = 0;
    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

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
    public CategoriesSectionItemEnum = CategoriesSectionItemEnum;
    showSidBar: boolean;

    constructor(private messageService: MessageService,
                private router: Router,
                public webSocketService: WebSocketService,
                public scheduleService: ScheduleService,
                public animationService: AnimationService,
                private dictionnaryService: DictionaryService,
                private sanitizer: DomSanitizer,
                private confirmationService: ConfirmationService,
                private service: ParcoursService,
                private menuService: MenuService,
                private http: HttpClient,
                private homeWorkEtudiantComponent: HomeWorkEtudiantComponent,
                private quizService: QuizEtudiantService,
                public loginService: LoginService,
                private vocab: VocabularyService,
                private review: EtudiantReviewService,
                private sectionItemService: SectionItemService,
                private sessioncoursservice: SessionCoursService,
                private homeWorkService: HomeWorkSimulateService,
                private homeWorkEtudiantService: HomeWorkEtudiantServiceService,
                private learnService: LearnService,
                private app: AppComponent,
                private route: ActivatedRoute,
                private simulateSectionService: SimulateSectionService,
    ) {
    }

    get numberResponseOfQuizQuestion(): number {
        return this.learnService.numberResponseOfQuizQuestion;
    }


    get minute(): number {
        return this.webSocketService.minute;
    }

    set minute(value: number) {
        this.webSocketService.minute = value;
    }

    get seconde(): number {
        return this.webSocketService.seconde;
    }

    set seconde(value: number) {
        this.webSocketService.seconde = value;
    }

    get lessonStarted(): boolean {
        return this.webSocketService.lessonStarted;
    }


    get vocabularySection(): Section {
        return this.simulateSectionService.vocabularySection;
    }


    get getToKnowSection(): Section {
        return this.simulateSectionService.getToKnowSection;
    }

    get badgeNrMsg(): number {
        return this.learnService.badgeNrMsg;
    }

    set badgeNrMsg(value: number) {
        this.learnService.badgeNrMsg = value;
    }

    get tabViewActiveIndex(): number {
        return this.webSocketService.tabViewActiveIndex;
    }

    set tabViewActiveIndex(value: number) {
        this.webSocketService.tabViewActiveIndex = value;
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


    get finishedSection(): number {
        return this.simulateSectionService.finishedSection;
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


    get selectedEtudiantCours(): EtudiantCours {
        return this.service.selectedEtudiantCours;
    }

    set selectedEtudiantCours(value: EtudiantCours) {
        this.service.selectedEtudiantCours = value;
    }

    set submittedDictEdit(value: boolean) {
        this.dictionnaryService.submittedDictEdit = value;
    }

    set editDialogDict(value: boolean) {
        this.dictionnaryService.editDialogDict = value;
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


    get selectedQuiz(): Quiz {
        return this.quizService.selectedQuiz;
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

    get showTpBar(): boolean {
        return this.menuService.showTpBar;
    }

    set showTpBar(value: boolean) {
        this.menuService.showTpBar = value;
    }


    get selectessection(): Array<Section> {
        return this.service.selectessection;
    }

    set selectessection(value: Array<Section>) {
        this.service.selectessection = value;
    }


    set selectedReview(value: EtudiantReview) {
        this.review.selected = value;
    }

    get connectedUsers(): any[] {
        return this.webSocketService.connectedUsers;
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

    set groupeEtudiant(value: GroupeEtudiant) {
        this.webSocketService.groupeEtudiant = value;
    }


    get images(): any[] {
        return this.simulateSectionService.images;
    }

    get showGalleria(): boolean {
        return this.simulateSectionService.showGalleria;
    }


    get listOfContent(): string[] {
        return this.simulateSectionService.listOfContent;
    }


    srcImg: string;
    value = 0;
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
        this.router.navigate(['etudiant/dashboard']);
    }


    ngOnInit(): void {
        const idCurrentDoc: string = this.route.snapshot.params.id;
        if (idCurrentDoc.includes('view')) {
            const id = idCurrentDoc.substring('view-'.length);
            this.startReview(Number(id));
        } else if (idCurrentDoc.includes('free-trial')) {
            this.startFreeLesson();
        } else {
            this.startSession(Number(idCurrentDoc));
        }


        if (this.loginService.getConnectedStudent().langue === 'fr') {
            this.selectedLanguage = {code: 'fr', name: 'French', nativeName: 'français'};
        }
        this.showAppMenu = false;
        this.animationService.showAnimation = true;
        const timer = setInterval(() => {
            this.animationService.showAnimation = false;
            this.onTabViewChange();
            clearInterval(timer);
        }, 2000);
    }

    onTabViewChange() {
        if (this.tabViewActiveIndex === 2) {
            this.dictionnaryService.FindAllWord().subscribe(
                data => {
                    this.itemsDict = data;
                });
        } else if (this.tabViewActiveIndex === 3) { // chat
            this.badgeNrMsg = 0;
        } else if (this.tabViewActiveIndex === 1) { // voc
            this.showLessonFct(this.vocabularySection);
        }
    }

    public findhomeworkbycours(cours: Cours) {
        this.homeWorkService.findhomeworkbyCoursId(cours).subscribe(
            data => {
                this.homeWorkService.homeWorkList = data;
            }, error => {
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
        if (this.selectedNow.word.length > 3) {
            if (this.selectedLanguage.code === 'ar') {
                this.quizService.translate(this.selectedNow.word).subscribe(data => {
                    this.selectedNow.definition = data;
                });
            } else if (this.selectedLanguage.code === 'fr') {
                this.quizService.translateEnFr(this.selectedNow.word).subscribe(data => {
                    this.selectedNow.definition = data;
                });
            } else if (this.selectedLanguage.code === 'ru') {
                this.quizService.translate_from_en_to_russian(this.selectedNow.word).subscribe(data => {
                    this.selectedNow.definition = data;
                });
            }
            this.createDialogDict = true;
        }
    }


    PreviousSection() {
        for (let i = 0; i < this.itemssection2.length; i++) {
            if (this.selectedsection.id === this.itemssection2[i].id) {
                this.simulateSectionService.nextSection(this.itemssection2[i - 1].id, 'PREVIOUS');
                break;
            }
        }
    }

    photoURL() {
        this.service.image = '';
        this.service.image = this.selectedsection.urlImage;
        this.srcImg = this.service.image;
        return this.srcImg;
    }

    URLVideo(urlVideo: string): string {
        let video = urlVideo.replace('watch?v=', 'embed/');
        const index = video.indexOf('&t=');
        const startTime: number = Number(video.substring(index + '&t='.length, (video.length - 1)));
        if (index !== -1) {
            video = video.substring(0, index) + '?start=' + startTime;
        }
        return video;
    }

    public NextSection() {
        for (let i = 0; i < this.itemssection2.length; i++) {
            if (this.selectedsection.id === this.itemssection2[i].id) {
                this.simulateSectionService.nextSection(this.itemssection2[i + 1].id, 'NEXT');
                break;
            }
        }
    }


    async showVocabularyComponent() {
        if (this.selectedsection.categorieSection.libelle === 'Vocabulary') {
            this.Vocab(this.selectedsection);
            this.showVocabulary = true;
        } else {
            this.showVocabulary = false;
        }
    }


    Vocab(section: Section) {
        this.sectionItemService.sectionSelected = section;

        this.sectionItemService.getSectionItems(section).subscribe(data => {
            this.sectionItemService.sectionSelected.sectionItems = data;

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
        this.showLesson = true;
        this.showSummary = false;
        this.showTpBar = true;
        let chatMessage: ChatMessageDto = new ChatMessageDto(this.loginService.getConnectedStudent().nom, 'Quit the session', true);
        chatMessage.type = 'DISCONNECT';
        chatMessage.student = this.loginService.getConnectedStudent();
        this.webSocketService.closeWebSocket(chatMessage);
        this.participants.delete(this.prof.id);
        this.connectedUsers.splice(0, this.connectedUsers.length);
    }


    getLanguages(): Array<any> {
        return this.app.languages;
    }


    findAllSynonimes(word: string) {
        if (this.selectedLanguage.code === 'ar') {
            this.quizService.translate(word).subscribe(data => {

                this.synonymes = data;
            });
        } else if (this.selectedLanguage.code === 'fr') {
            this.quizService.translateEnFr(word).subscribe(data => {
                this.synonymes = data;

            });
        } else if (this.selectedLanguage.code === 'ru') {
            this.quizService.translate_from_en_to_russian(this.selectedNow.word).subscribe(data => {
                this.synonymes = data;
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
            this.messageService.add({severity: 'error', life: 3000, detail: 'Text is too long! try again with small text'});

        });
    }

    nextSection(selectedsection: Section): string {
        for (let i = 0; i < this.itemssection2.length; i++) {
            if (selectedsection.id === this.itemssection2[i].id) {
                return this.itemssection2[i + 1].categorieSection.libelle;
            }
        }
    }

    previousSection(selectedsection: Section): string {
        for (let i = 0; i < this.itemssection2.length; i++) {
            if (selectedsection.id === this.itemssection2[i].id) {
                return this.itemssection2[i - 1].categorieSection.libelle;
            }
        }
    }


    sectionIsFinished(section: Section): boolean {
        return this.simulateSectionService.sectionIsFinished(section);
    }

    finishLesson(rating: string) {
        this.showRatingLessonTemplate = false;
    }

    showLessonFct(section: Section) {
        this.selectedHomeWork = new HomeWork();
        this.showLesson = true;
        if (!this.webSocketService.isInSession) {
            this.selectedHomeWork = new HomeWork();
            this.simulateSectionService.nextSection(section.id, 'NEXT');
        }
    }

// ---------------------------------------------------home Work--------------------------------------------/


    get homeWorkList(): Array<HomeWork> {
        return this.learnService.homeWorkList;
    }


    homeWorkSelectedFct(homeWork: HomeWork) {
        if (!this.webSocketService.isInSession) {
            this.showLesson = false;
            this.selectedsection = new Section();
            this.homeWorkService.homeWorkSelectedFct(homeWork);
        }
    }

    get selectedHomeWork(): HomeWork {
        return this.learnService.selectedHomeWork;
    }

    set selectedHomeWork(value: HomeWork) {
        this.learnService.selectedHomeWork = value;
    }

    private startSession(id: number) {
        this.animationService.showAnimation = true;
        this.scheduleService.findById(id).subscribe(
            selectedMeeting => {
                this.selectedLesson = selectedMeeting;
                this.animationService.showAnimation = false;
                this.showTpBar = false;
                this.webSocketService.isInSession = true;
                this.selectedcours = selectedMeeting.cours;
                this.prof = selectedMeeting.prof;
                this.groupeEtudiant = selectedMeeting.groupeEtudiant;
                this.simulateSectionService.findSectionOneByCoursId(selectedMeeting.cours);
                this.findhomeworkbycours(this.selectedcours);
                if (this.webSocketService.isInSession) {
                    this.webSocketService.findCurrentSectionForstudent(this.service.selectedcours, selectedMeeting.prof);
                }
                this.learnService.onStartHomeWork(this.selectedcours);
                this.homeWorkService.onStartHomeWork(this.selectedcours);
                this.review.findReview(this.selectedcours.id).subscribe(
                    data => {
                        this.selectedReview = data;
                    });
                this.webSocketService.openWebSocket(this.loginService.getConnectedStudent(),
                    selectedMeeting.groupeEtudiant.prof,
                    selectedMeeting.id,
                    selectedMeeting.groupeEtudiant, 'STUDENT');
            }, error => {
                this.animationService.showAnimation = false;
            }
        );
    }

    private startReview(id: number) {
        this.animationService.showAnimation = true;
        this.scheduleService.findById(id).subscribe(
            selectedMeeting => {
                this.selectedLesson = selectedMeeting;
                this.animationService.showAnimation = false;
                this.showTpBar = false;
                this.webSocketService.isInSession = false;
                this.selectedcours = selectedMeeting.cours;
                this.simulateSectionService.findSectionOneByCoursId(this.selectedcours);
                this.findhomeworkbycours(this.selectedcours);
                this.learnService.onStartHomeWork(this.selectedcours);
                this.homeWorkService.onStartHomeWork(this.selectedcours);
                this.review.findReview(this.selectedcours.id).subscribe(
                    data => {
                        this.selectedReview = data;
                    });
            }, error => {
                console.error(error);
                this.animationService.showAnimation = false;
            }
        );
    }

    private startFreeLesson() {
        this.animationService.showAnimation = true;
        this.animationService.showAnimation = false;
        this.showTpBar = false;
        this.webSocketService.isInSession = false;
        this.simulateSectionService.findSectionOneByCoursId(this.selectedcours);
        this.findhomeworkbycours(this.selectedcours);
        this.learnService.onStartHomeWork(this.selectedcours);
        this.homeWorkService.onStartHomeWork(this.selectedcours);
        this.review.findReview(this.selectedcours.id).subscribe(
            data => {
                this.selectedReview = data;
            });
    }

    activeIndexChange(event: any) {
        this.activeIndex = event;
    }

    getConnectedUsers() {
        this.webSocketService.getConnectedUsers().subscribe(
            data => {
                this.usersConnected = data;
            }, error => {
                console.log(error);
            }
        );
    }

    joinMeet() {
        if (this.selectedLesson?.meet !== null) {
            window.open(this.selectedLesson?.meet, '_blank');
        }
    }
}
