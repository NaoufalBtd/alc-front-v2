import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Section} from '../../../../controller/model/section.model';
import {ConfirmationService, MessageService, TreeNode} from 'primeng/api';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {Cours} from '../../../../controller/model/cours.model';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {Quiz} from '../../../../controller/model/quiz.model';
import {QuizService} from '../../../../controller/service/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Dictionary} from '../../../../controller/model/dictionary.model';
import {DictionaryService} from '../../../../controller/service/dictionary.service';
import {EtudiantReviewService} from '../../../../controller/service/etudiant-review.service';
import {SectionItemService} from '../../../../controller/service/section-item.service';
import {ChatMessageDto} from '../../../../controller/model/chatMessageDto';
import {LoginService} from '../../../../controller/service/login.service';
import {Prof} from '../../../../controller/model/prof.model';
import {WebSocketService} from '../../../../controller/service/web-socket.service';
import {LearnService} from '../../../../controller/service/learn.service';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {SessionCoursService} from '../../../../controller/service/session-cours.service';
import {AppComponent} from '../../../../app.component';
import {HomeworkService} from '../../../../controller/service/homework.service';

import {MenuService} from '../../../shared/slide-bar/app.menu.service';
import {SimulateSectionService} from '../../../../controller/service/simulate-section.service';
import {SessionCours} from '../../../../controller/model/session-cours.model';
import {User} from '../../../../controller/model/user.model';
import {ScheduleProf} from '../../../../controller/model/calendrier-prof.model';
import {QuizReponse} from '../../../../controller/model/quiz-reponse';
import {CategoriesSectionItemEnum} from '../../../../enum/CategoriesSectionItemEnum';
import {TypeHomeWorkEnum} from '../../../../enum/type-question.enum';
import {GroupeEtudiantService} from '../../../../controller/service/groupe-etudiant-service';
import {ScheduleService} from '../../../../controller/service/schedule.service';
import {AnimationService} from '../../../../controller/service/animation.service';
import {UserVo} from '../../../../controller/vo/UserVo';

@Pipe({name: 'safe'})
export class SafePipe1 implements PipeTransform {
    public TypeHomeWorkEnum = TypeHomeWorkEnum;

    constructor(private sanitizer: DomSanitizer) {
    }

    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

@Component({
    selector: 'app-section-simulate',
    templateUrl: './section-simulate.component.html',
    styleUrls: ['./section-simulate.component.scss']
})
export class SectionSimulateComponent implements OnInit, OnDestroy {
    usersConnected: UserVo[];
    images: any[];
    showGalleria: boolean;
    listOfContent: string[];
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
    public CategoriesSectionItemEnum = CategoriesSectionItemEnum;
    lessonDurationEnSecond = 0;
    rows = 5;
    first = 0;
    sessionCour: SessionCours = new SessionCours();
    data: any;
    finishedAdditionalSection = 0;
    finishedSection = 0;
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
    public showAlert = false;


    constructor(private sectionItemService: SectionItemService,
                private sessionservice: SessionCoursService,
                public loginService: LoginService,
                public webSocketService: WebSocketService,
                private menuService: MenuService,
                private simulateSectionService: SimulateSectionService,
                private learnService: LearnService,
                private parcoursService: ParcoursService,
                private messageService: MessageService,
                private groupeEtudiantService: GroupeEtudiantService,
                private dictionnaryService: DictionaryService,
                private router: Router,
                private route: ActivatedRoute,
                private scheduleService: ScheduleService,
                private animation: AnimationService,
                private app: AppComponent,
                private homeWorkService: HomeworkService,
                private serviceQuiz: QuizService, private sanitizer: DomSanitizer, private quizService: QuizEtudiantService,
                private confirmationService: ConfirmationService,
                private service: ParcoursService, private http: HttpClient, private review: EtudiantReviewService) {
    }

    get numberResponseOfQuizQuestion(): number {
        return this.learnService.numberResponseOfQuizQuestion;
    }


    get lessonStarted(): boolean {
        return this.webSocketService.lessonStarted;
    }


    get badgeNrMsg(): number {
        return this.learnService.badgeNrMsg;
    }

    set badgeNrMsg(value: number) {
        this.learnService.badgeNrMsg = value;
    }

    set groupStudent(value: GroupeEtudiant) {
        this.homeWorkService.groupStudent = value;
    }


    get selectedNow(): Dictionary {
        return this.dictionnaryService.selectedNow;
    }

    set selectedNow(value: Dictionary) {
        this.dictionnaryService.selectedNow = value;
    }

    get sectionStandard(): Array<Section> {
        return this.service.sectionStandard;
    }


    get sectionAdditional(): Array<Section> {
        return this.service.sectionAdditional;
    }


    get showAppMenu(): boolean {
        return this.learnService.showAppMenu;
    }

    set showAppMenu(value: boolean) {
        this.learnService.showAppMenu = value;
    }

    get participants(): Map<number, Array<Etudiant>> {
        return this.learnService.participants;
    }

    set participants(value: Map<number, Array<Etudiant>>) {
        this.learnService.participants = value;
    }


    get image(): string {
        return this.service.image;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set image(value: string) {
        this.service.image = value;
    }

    get contenu(): string {
        return this.service.contenu;
    }

    set contenu(value: string) {
        this.service.contenu = value;
    }

    get selectedQuiz(): Quiz {
        return this.quizService.selectedQuiz;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    set selectedQuiz(value: Quiz) {
        this.quizService.selectedQuiz = value;
    }

    get itemsDict(): Array<Dictionary> {
        return this.dictionnaryService.itemsDict;
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

    get selected(): Dictionary {
        return this.dictionnaryService.selected;
    }

    set selected(value: Dictionary) {
        this.dictionnaryService.selected = value;
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

    get selectedDict(): Dictionary {
        return this.dictionnaryService.selectedDict;
    }

    set selectedDict(value: Dictionary) {
        this.dictionnaryService.selectedDict = value;
    }

    get selectessection(): Array<Section> {
        return this.service.selectessection;
    }

    set selectessection(value: Array<Section>) {
        this.service.selectessection = value;
    }


    get groupeEtudiant(): GroupeEtudiant {
        return this.webSocketService.groupeEtudiant;
    }

    get prof(): Prof {
        return this.webSocketService.prof;
    }

    set prof(value: Prof) {
        this.webSocketService.prof = value;
    }


    get showVocabulary(): boolean {
        return this.sectionItemService.showVocabulary;
    }

    set showVocabulary(value: boolean) {
        this.sectionItemService.showVocabulary = value;
    }

    get showTpBar(): boolean {
        return this.menuService.showTpBar;
    }

    set showTpBar(value: boolean) {
        this.menuService.showTpBar = value;
    }

    get connectedUsers(): any[] {
        return this.webSocketService.connectedUsers;
    }

    set connectedUsers(value: any[]) {
        this.webSocketService.connectedUsers = value;
    }


    get studentsEnLigne(): Map<number, User> {
        return this.webSocketService.studentsEnLigne;
    }

    get selectedLanguage(): any {
        return this.learnService.selectedLanguage;
    }

    set selectedLanguage(value: any) {
        this.learnService.selectedLanguage = value;
    }

    set editDialogDict(value: boolean) {
        this.dictionnaryService.editDialogDict = value;
    }

    get submittedDictEdit(): boolean {
        return this.dictionnaryService.submittedDictEdit;
    }

    set submittedDictEdit(value: boolean) {
        this.dictionnaryService.submittedDictEdit = value;
    }

    get quizExist(): boolean {
        return this.simulateSectionService.quizExist;
    }

    set quizExist(value: boolean) {
        this.simulateSectionService.quizExist = value;
    }

    get activeIndexForTabView(): number {
        return this.webSocketService.activeIndexForTabView;
    }

    set activeIndexForTabView(value: number) {
        this.webSocketService.activeIndexForTabView = value;
    }

    synonymes: string;
    searchInput: string;
    nodes: TreeNode[];
    textSeleted: string;
    srcImg: string;
    value = 0;
    word: string;
    showTakeQuiz = false;
    showViewQuiz = false;
    showFlowMeButton: boolean;
    showLesson = true;
    showSummary = false;
    showFinishLesson = true;

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

    public Review() {
        this.review.viewDialogProf = true;
    }


    public quiz() {
        this.serviceQuiz.refQuiz = this.selectedQuiz.ref;
        this.router.navigate(['/prof/quiz-preview-teacher']);
    }


    public openCreateDict() {
        this.selectedDict = new Dictionary();
        this.submittedDict = false;
        this.createDialogDict = true;
    }

    public findByWord() {
        this.dictionnaryService.FindByWord(this.word).subscribe(
            data => {
                this.selectedDict = data;
                document.getElementById('dictionary').style.visibility = 'visible';
            }, error => console.log(error));
        document.getElementById('dictionary').style.visibility = 'visible';
    }

    ngOnInit(): void {
        const idCurrentDoc: string = this.route.snapshot.params.id;
        if (idCurrentDoc.includes('view')) {
            const id = idCurrentDoc.substring('view-'.length);
            this.startReview(Number(id));
        } else {
            this.startSession(Number(idCurrentDoc));
        }
        this.showAppMenu = false;
    }


    startReview(id: number) {
        this.scheduleService.findById(id).subscribe(
            nextLesson => {
                this.showTpBar = false;
                this.webSocketService.sessionHasStarted = false;
                this.webSocketService.isInSession = false;
                this.findAllGroupeEtudiantDetail(nextLesson.groupeEtudiant.id);
                this.selectedcours = nextLesson.cours;
                this.simulateSectionService.findSectionOneByCoursId(nextLesson.cours);
                this.sessionservice._idgroup = nextLesson.groupeEtudiant.id;
                this.groupStudent = nextLesson.groupeEtudiant;
            }, error => {
                console.log(error);
            });
    }

    startSession(id: number) {
        this.animation.showAnimation = true;
        this.scheduleService.findById(id).subscribe(
            data => {
                this.animation.showAnimation = false;
                this.selectedSchedule = data;
                this.selectedSession = data;
                this.prof = data?.prof;
                this.webSocketService.isInSession = true;
                this.showTpBar = false;
                this.webSocketService.sessionHasStarted = true;
                this.findAllGroupeEtudiantDetail(this.selectedSchedule.groupeEtudiant.id);
                this.selectedcours = this.selectedSchedule.cours;
                this.simulateSectionService.findSectionOneByCoursId(this.selectedSchedule.cours);
                this.parcoursService.afficheOneSectionByProf(this.selectedSchedule.cours).subscribe(
                    dataSection => {
                        this.webSocketService.saveCurrentSection(this.prof.id, dataSection);
                    }
                );
                this.webSocketService.openWebSocket(this.prof, this.prof, this.selectedSchedule.id, this.selectedSchedule.groupeEtudiant, 'PROF');
                this.sessionservice._idgroup = this.selectedSchedule.groupeEtudiant.id;
            }, error => {
                this.animation.showAnimation = false;
                console.log(error);
            }
        );

    }


    public findAllGroupeEtudiantDetail(id: number) {
        this.groupeEtudiantService.findAllGroupeEtudiantDetail(id).subscribe(
            data => {
                for (let i = 0; i < data?.length; i++) {
                    if (this.connectedUsers.filter(d => d?.username === data[i].etudiant.username)?.length === 0) {
                        this.connectedUsers.push(data[i].etudiant);
                    }
                }
            }
        );
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

    photoURL() {
        this.service.image = '';
        //  for (let j = 0; j < 76 ; j++)
        //  {
        this.service.image = this.selectedsection.urlImage;
        //  }
        //  this.service.image += 'preview';
        this.srcImg = this.service.image;
        return this.srcImg;
        // const blob = UrlFetch(this.image,{headers})
        //  return this.sanitizer.bypassSecurityTrustResourceUrl(this.service.image);
        // return this.service.image;
    }

    Contenu() {
        this.service.contenu = '';
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.selectedsection.contenu.length; j++) {
            // tslint:disable-next-line:triple-equals
            if (this.selectedsection.contenu[j] != '-') {
                this.service.contenu += this.selectedsection.contenu[j];
                // tslint:disable-next-line:triple-equals
            } else {
                // tslint:disable-next-line:triple-equals
                if (this.selectedsection.contenu[j] == '-') {
                    this.service.contenu += '\n';
                    this.service.contenu += this.selectedsection.contenu[j];
                }
            }
        }
        return this.service.contenu;
    }

    get grpStudentAnswers(): Map<Etudiant, QuizReponse> {
        return this.webSocketService.grpStudentAnswers;
    }

    set grpStudentAnswers(value: Map<Etudiant, QuizReponse>) {
        this.webSocketService.grpStudentAnswers = value;
    }

    PreviousSection(section: Section) {
        this.grpStudentAnswers = new Map<Etudiant, QuizReponse>();
        this.showFlowMeButton = false;
        for (let i = 0; i < this.itemssection2.length; i++) {
            if (section.id === this.itemssection2[i].id) {
                this.selectedsection = this.itemssection2[i - 1];
                this.verifyImagesUrl();
                this.webSocketService.updateCurrentSection(this.prof.id, this.itemssection2[i - 1]);
                this.goToSection(this.itemssection2[i - 1], 'PREVIOUS');
            }
        }
    }

    private verifyImagesUrl() {
        if (this.selectedsection?.urlImage && this.selectedsection?.urlImage2 && this.selectedsection?.urlImage3) {
            this.images = [
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
            this.listOfContent = this.selectedsection.contenu?.split(/\s\s\s+/);
            this.showGalleria = true;
        } else if (this.selectedsection?.urlImage && this.selectedsection?.urlImage2) {
            this.images = [
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
            this.listOfContent = this.selectedsection.contenu?.split(/\s\s\s+/);
            this.showGalleria = true;

        } else {
            this.showGalleria = false;
        }
    }

    NextSection(section: Section) {
        this.grpStudentAnswers = new Map<Etudiant, QuizReponse>();
        let index = 0;
        for (const item of this.sessionCour.sections) {
            if (item.id === section.id) {
                index = -2;
            }
        }
        if (index === 0) {
            this.sessionCour.sections.push({...section});
        }

        for (let i = 0; i < this.itemssection2.length; i++) {
            if (section.id === this.itemssection2[i].id) {
                this.selectedsection = this.itemssection2[i + 1];
                this.verifyImagesUrl();
                this.webSocketService.updateCurrentSection(this.prof.id, this.itemssection2[i + 1]);
                this.goToSection(this.itemssection2[i + 1], 'NEXT');
                this.showFlowMeButton = false;
            }
        }
    }


    public allerVerSection(section: Section) {
        let timer: any;
        if (!this.showFlowMeButton && (this.selectedsection.categorieSection?.libelle?.toUpperCase()?.includes('VOCABULARY') ||
            this.selectedsection.categorieSection?.libelle?.toUpperCase()?.includes('LET\'S PRACTICE'))) {
            this.showAlert = true;
            if (this.showAlert) {
                timer = setInterval(() => {
                    clearInterval(timer);
                    this.showAlert = false;
                }, 5000);
            }
            return;
        }
        for (const sec of this.itemssection2) {
            if (section.id === sec.id) {
                this.selectedsection = sec;
                this.verifyImagesUrl();
                this.simulateSectionService.nextSection(section.id, 'NEXT');
                this.webSocketService.updateCurrentSection(this.prof.id, sec);
                this.showFlowMeButton = true;
                this.findQuizIfExist(section);
            }
        }
    }

    public goToSection(section: Section, type: string) {
        this.simulateSectionService.nextSection(section.id, type);
        this.findQuizIfExist(section);
        this.showFlowMeButton = false;
        if (this.webSocketService.sessionHasStarted) {
            const chatMessageDto = new ChatMessageDto(type, String(section.id), false);
            chatMessageDto.prof = this.prof;
            chatMessageDto.type = 'SECTION';
            this.webSocketService.sendMessage(chatMessageDto, 'PROF');
        }
    }

    return($event: string) {
        this.showVocabulary = false;
    }

    ngOnDestroy(): void {
        this.showAppMenu = true;
    }


    closeSession() {
        this.showTpBar = true;
        const chatMessage: ChatMessageDto = new ChatMessageDto(this.loginService.getConnectedProf().nom, 'Quit the session', false);
        chatMessage.type = 'DISCONNECT';
        chatMessage.prof = this.loginService.getConnectedProf();
        this.webSocketService.deleteWhenSessionIsfiniched(this.prof.id);
        this.webSocketService.closeWebSocket(chatMessage);
        this.participants.delete(this.prof.id);
        this.connectedUsers.splice(0, this.connectedUsers.length);
        this.studentsEnLigne.clear();
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

    getLanguages(): Array<any> {
        return this.app.languages;
    }

    getSelectedLanguage() {
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
        }
    }


    addToDictionary(type: string) {
        if (type === 'SELECT') {
            this.createDialogDict = false;
            for (const etudiant of this.connectedUsers) {
                this.selectedNow.etudiant = etudiant;
                this.dictionnaryService.addToDictionary(this.selectedNow).subscribe(data => {
                    let index = 0;
                    if (this.itemsDict.length > 0) {
                        for (const item of this.itemsDict) {
                            if (item.word === data.word) {
                                index = 1;
                            }
                        }
                        if (index === 0) {
                            this.itemsDict.push({...data});
                        }
                    } else {
                        this.itemsDict.push({...data});
                    }
                }, error => {
                    this.messageService.add({severity: 'error', life: 3000, detail: 'Text is too long! try again with small text'});

                });
            }
            this.messageService.add({severity: 'success', life: 3000, detail: 'Word added successfully'});
        } else {
            const dict: Dictionary = new Dictionary();
            dict.word = this.searchInput;
            dict.definition = this.synonymes;
            for (const etudiant of this.connectedUsers) {
                dict.etudiant = etudiant;
                this.dictionnaryService.addToDictionary(dict).subscribe(data => {
                    let index = 0;
                    if (this.itemsDict.length > 0) {
                        for (const item of this.itemsDict) {
                            if (item.word === data.word) {
                                index = 1;
                            }
                        }
                        if (index === 0) {
                            this.itemsDict.push({...data});
                        }
                    } else {
                        this.itemsDict.push({...data});
                    }
                    this.searchInput = String();
                    this.synonymes = String();
                }, error => {
                    this.messageService.add({severity: 'error', life: 3000, detail: 'Text is too long! try again with small text'});

                });
            }
            this.messageService.add({severity: 'success', life: 3000, detail: 'Word added successfully'});
        }


    }

    public dictEdit(dict: Dictionary) {
        this.selected = dict;
        if (this.selected.word != null) {
            this.submittedDictEdit = false;
            this.editDialogDict = true;
        }
    }

    nextSection(selectedsection: Section): string {
        for (let i = 0; i < this.itemssection2.length; i++) {
            if (selectedsection.id === this.itemssection2[i].id) {
                return this.itemssection2[i + 1]?.categorieSection?.libelle;
            }
        }
        return 'Next';
    }

    previousSection(selectedsection: Section) {
        for (let i = 0; i < this.itemssection2.length; i++) {
            if (selectedsection.id === this.itemssection2[i].id) {
                return this.itemssection2[i - 1]?.categorieSection?.libelle;
            }
        }
        return 'Previous';
    }

    private findQuizIfExist(section: Section) {
        this.quizService.findQuizBySectionId(section).subscribe(data => {
            this.quizExist = true;
            this.selectedQuiz = data;
        }, error => {
            this.quizExist = false;
        });
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
            }
            this.createDialogDict = true;
        }
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

    showSummaryFct() {
        const chatMessage: ChatMessageDto = new ChatMessageDto('SUMMARY',
            'SUMMARY', false);
        chatMessage.prof = this.loginService.getConnectedProf();
        chatMessage.type = 'SECTION';
        this.webSocketService.sendMessage(chatMessage, 'PROF');

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

    get selectedSchedule(): ScheduleProf {
        return this.webSocketService.selectedSchedule;
    }

    set selectedSchedule(value: ScheduleProf) {
        this.webSocketService.selectedSchedule = value;
    }

    finishLesson() {
        this.showFinishLesson = false;
        this.sessionCour.prof = this.loginService.getConnectedProf();
        this.sessionCour.cours = this.selectedcours;
        this.sessionCour.groupeEtudiant = this.groupeEtudiant;
        this.sessionCour.annee = new Date().getUTCFullYear();
        this.sessionCour.dateDebut = this.selectedSchedule?.startTime;
        this.sessionCour.dateFin = this.selectedSchedule?.endTime;
        this.sessionCour.duree = new Date(this.selectedSchedule.endTime).getHours() - new Date(this.selectedSchedule.startTime).getHours();
        this.sessionCour.mois = new Date(this.selectedSchedule.startTime).getMonth();
        this.sessionCour.payer = false;
        this.sessionCour.salary = null;
        this.sessionCour.reference = this.selectedSchedule.startTime.toString() + this.groupeEtudiant.libelle;
        this.sessionCour.totalheure = new Date(this.selectedSchedule.endTime).getHours() -
            new Date(this.selectedSchedule.startTime).getHours();
        this.saveSessionCoursForGroupEtudiant(this.sessionCour.prof.id, this.sessionCour.cours.id, this.sessionCour.groupeEtudiant.id);
        const chatMessage: ChatMessageDto = new ChatMessageDto('FINISHLESSON', 'FINISHLESSON', false);
        chatMessage.prof = this.loginService.getConnectedProf();
        chatMessage.type = 'SECTION';
        this.webSocketService.sendMessage(chatMessage, 'PROF');
    }


    public saveSessionCoursForGroupEtudiant(idprof: number, idcours: number, idGroup: number) {
        this.sessionservice.saveSessionCoursForGroupEtudiant(idprof, idcours, idGroup);
    }


    onConfirm() {
        this.messageService.clear('c');
        this.finishLesson();
    }

    showSticky() {
        this.messageService.add({severity: 'success', summary: ' ', detail: 'Lesson is over', life: 5000, sticky: true});
    }


    showConfirm() {
        this.messageService.clear();
        this.messageService.add({key: 'c', sticky: true, severity: 'info', summary: 'Finish the lesson ?', detail: 'Confirm to proceed'});
    }


    onReject() {
        this.messageService.clear('c');
    }

    clear() {
        this.messageService.clear();
    }

    tabViewChange() {
        if (this.activeIndexForTabView === 2) { // chat
            this.badgeNrMsg = 0;
        }
    }

    startLesson() {
        const chatMessageDto = new ChatMessageDto('START_LESSON', 'START_LESSON', false);
        chatMessageDto.prof = this.prof;
        chatMessageDto.type = 'START_LESSON';
        this.webSocketService.sendMessage(chatMessageDto, 'PROF');
    }


    set selectedSession(value: ScheduleProf) {
        this.webSocketService.selectedSession = value;
    }

    activeIndexChange(event: any) {
        this.activeIndex = event;
    }
}
