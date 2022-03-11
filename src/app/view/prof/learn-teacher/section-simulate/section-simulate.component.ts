import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Section} from '../../../../controller/model/section.model';
import {ConfirmationService, MenuItem, MessageService, TreeNode} from 'primeng/api';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {Cours} from '../../../../controller/model/cours.model';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {Quiz} from '../../../../controller/model/quiz.model';
import {QuizService} from '../../../../controller/service/quiz.service';
import {Router} from '@angular/router';
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
import {HomeWorkEtudiantServiceService} from '../../../../controller/service/home-work-etudiant-service.service';
import {HomeWork} from '../../../../controller/model/home-work.model';
import {MenuService} from '../../../shared/slide-bar/app.menu.service';

@Pipe({name: 'safe'})
export class SafePipe1 implements PipeTransform {

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
    synonymes: string;
    searchInput: string;
    prof: Prof = new Prof();
    nodes: TreeNode[];
    textSeleted: string;
    srcImg: string;
    value = 0;
    word: string;
    showTakeQuiz = false;
    showViewQuiz = false;

    // tslint:disable-next-line:max-line-length
    constructor(private sectionItemService: SectionItemService,
                private sessionservice: SessionCoursService,
                public loginService: LoginService,
                public webSocketService: WebSocketService,
                private menuService: MenuService,
                private learnService: LearnService,
                private messageService: MessageService,
                private dictionnaryService: DictionaryService,
                private router: Router,
                private app: AppComponent,
                private homeWorkService: HomeworkService,
                private serviceQuiz: QuizService, private sanitizer: DomSanitizer, private quizService: QuizEtudiantService, private confirmationService: ConfirmationService,
                private service: ParcoursService, private http: HttpClient, private review: EtudiantReviewService) {
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

    set sectionAdditional(value: Array<Section>) {
        this.service.sectionAdditional = value;
    }

    get homeWorkSelected(): HomeWork {
        return this.homeWorkService.homeWorkSelected;
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

    public Review() {
        this.review.viewDialogProf = true;
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

    set itemsDict(value: Array<Dictionary>) {
        this.dictionnaryService.itemsDict = value;
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

    // tslint:disable-next-line:adjacent-overload-signatures
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

    public Section(libelle: string) {
        this.service.afficheSection(libelle).subscribe(
            data => {
                this.selectedsection = data;
                if (data.categorieSection.libelle === 'Vocabulary') {
                    this.Vocab(data);
                } else {
                    this.showVocabulary = false;
                }
                this.quizService.findQuizBySection(this.selectedsection.id).subscribe(
                    data => {
                        this.selectedQuiz = data;
                    });
            }, error => console.log('erreeeeeeeeeeeeeeeeur'));
    }

    public quiz() {
        this.serviceQuiz.refQuiz = this.selectedQuiz.ref;
        console.log(this.serviceQuiz.refQuiz);
        this.router.navigate(['/prof/quiz-preview-teacher']);
    }

    public dict() {
        const selection = window.getSelection();
        this.textSeleted = selection.toString();
        console.log(this.textSeleted);
        this.dictionnaryService.FindAllWord().subscribe(
            data => {
                this.itemsDict = data;
            });
        for (let i = 0; i < this.itemsDict.length; i++) {
            if (this.textSeleted.length !== 0) {
                this.selected.word = this.textSeleted;
                this.submittedDict = false;
                this.createDialogDict = true;
            }
        }
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
            }, error => console.log('erreeeeeeeeeeeeeeeeur'));
        document.getElementById('dictionary').style.visibility = 'visible';
    }

    ngOnInit(): void {
        this.showAppMenu = false;
        this.prof = this.loginService.getConnectedProf();

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
            this.service.afficheOneSection2().subscribe(data => {
                this.selectedsection = data;
                if (data.categorieSection.libelle === 'Vocabulary') {
                    this.Vocab(data);
                } else {
                    this.showVocabulary = false;
                }
                this.quizService.findQuizBySection(this.selectedsection.id).subscribe(
                    dataQuiz => {
                        this.selectedQuiz = dataQuiz;
                    });
            });
        } else {
            this.selectedsection.numeroOrder = this.itemssection2.length + 1;
            this.NextSection();
        }
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
        console.log(this.service.video);
        // return this.sanitizer.bypassSecurityTrustResourceUrl(this.service.video);
        return this.service.video;
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
        console.log(this.service.contenu);
        return this.service.contenu;
    }

    NextSection() {
        //this.quizService.section.id = this.selectedsection.id;
        //this.quizService.findQuizSection().subscribe( data => this.selectedQuiz = data);
        this.service.affichelistSection().subscribe(
            data => {
                this.itemssection2 = data;
                // tslint:disable-next-line:no-shadowed-variable
            });
        this.selectedsection.numeroOrder = this.selectedsection.numeroOrder + 1;
        // tslint:disable-next-line:triple-equals
        if (this.selectedsection.numeroOrder <= this.itemssection2.length) {
            this.service.afficheOneSection2().subscribe(
                data => {
                    this.selectedsection = data;
                    if (data.categorieSection.libelle === 'Vocabulary') {
                        this.Vocab(data);
                    } else {
                        this.showVocabulary = false;
                    }
                    this.quizService.findQuizBySection(this.selectedsection.id).subscribe(
                        data => {
                            this.selectedQuiz = data;
                        });
                });
        } else {
            this.selectedsection.numeroOrder = 0;
            this.PreviousSection();
        }
    }

    public goToSection(type: string, message: string) {
        if (this.webSocketService.sessionHasStarted) {
            const chatMessageDto = new ChatMessageDto(this.prof.nom, message, false);
            chatMessageDto.student = this.prof.students;
            chatMessageDto.prof = this.prof;
            chatMessageDto.type = type;
            this.webSocketService.sendMessage(chatMessageDto, 'PROF');
        } else {
            if (type === 'NEXT') {
                this.NextSection();
            } else if (type === 'PREVIOUS') {
                this.PreviousSection();
            }
        }
    }

    get showVocabulary(): boolean {
        return this.sectionItemService.showVocabulary;
    }

    set showVocabulary(value: boolean) {
        this.sectionItemService.showVocabulary = value;
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

    get showTpBar(): boolean {
        return this.menuService.showTpBar;
    }

    set showTpBar(value: boolean) {
        this.menuService.showTpBar = value;
    }


    closeSession() {
        this.showTpBar = true;
        this.webSocketService.deleteWhenSessionIsfiniched(this.prof.id);
        this.webSocketService.closeWebSocket(this.prof);
        this.participants.delete(this.prof.id);
        this.connectedUsers.splice(0, this.connectedUsers.length);
        console.log(this.participants);
        this.studentsEnLigne.clear();
    }

    get connectedUsers(): any[] {
        return this.webSocketService.connectedUsers;
    }

    set connectedUsers(value: any[]) {
        this.webSocketService.connectedUsers = value;
    }

    getData() {
        const grp = this.participants.get(this.prof.id);
        console.log(grp);
        console.log(this.participants);
    }


    get studentsEnLigne(): Map<number, Etudiant> {
        return this.webSocketService.studentsEnLigne;
    }

    public saveSessionCoursForGroupEtudiant(idprof: number, idcours: number) {
        this.sessionservice.saveSessionCoursForGroupEtudiant(idprof, idcours);
    }

    getLanguages(): Array<any> {
        return this.app.languages;
    }

    getSelectedLanguage() {
        console.log(this.selectedLanguage);

    }

    get selectedLanguage(): any {
        return this.learnService.selectedLanguage;
    }

    set selectedLanguage(value: any) {
        this.learnService.selectedLanguage = value;
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
        console.log(this.participants.get(this.loginService.getConnectedProf().id));
        for (const etudiant of this.participants.get(this.loginService.getConnectedProf().id)) {
            dict.etudiant = etudiant;
            this.dictionnaryService.addToDictionary(dict).subscribe(data => {
                this.itemsDict.push({...data});
                this.searchInput = String();
                this.synonymes = String();
            }, error => {
                console.log(error);
                this.messageService.add({severity: 'error', life: 3000, detail: 'Text is too long! try again with small text'});

            });
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

    set editDialogDict(value: boolean) {
        this.dictionnaryService.editDialogDict = value;
    }

    get submittedDictEdit(): boolean {
        return this.dictionnaryService.submittedDictEdit;
    }

    set submittedDictEdit(value: boolean) {
        this.dictionnaryService.submittedDictEdit = value;
    }

}
