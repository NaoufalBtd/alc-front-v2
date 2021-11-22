import { Injectable } from '@angular/core';
import {WebSocketService} from './web-socket.service';
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

@Injectable({
  providedIn: 'root'
})
export class SimulateSectionService {
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
  constructor(private messageService: MessageService,
              private router: Router,
              private dictionnaryService: DictionaryService,
              private sanitizer: DomSanitizer,
              private confirmationService: ConfirmationService,
              private service: ParcoursService,
              private http: HttpClient,
              private quizService: QuizEtudiantService,
              private loginService: LoginService,
              private vocab: VocabularyService,
              private review: EtudiantReviewService,
              private sectionItemService: SectionItemService,
              private sessioncoursservice: SessionCoursService,
              private homeWorkService: HomeworkService,
              private homeWorkEtudiantService: HomeWorkEtudiantServiceService) { }
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

  set sectionStandard(value: Array<Section>) {
    this.service.sectionStandard = value;
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
  Vocab(section: Section) {
    this.sectionItemService.sectionSelected = section;

    this.sectionItemService.getSectionItems().subscribe(data => {
      this.sectionItemService.sectionSelected.sectionItems = data;
      console.log(data);
      this.showVocabulary = true;
    });

  }
  public nextSection(){

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

                  this.quizService.findQuizEtudiant(this.loginService.etudiant, this.selectedQuiz).subscribe(
                      data => {
                        this.quizEtudiantList = data;
                        console.log(this.quizEtudiantList);
                        this.quizService.findAllQuestions(this.selectedQuiz.ref).subscribe(
                            dataQuestions => {
                              if (data.questionCurrent > dataQuestions.length) {
                                this.passerQuiz = 'View Quiz';
                                this.quizView = true;
                              } else {
                                this.passerQuiz = 'Continue Quiz';
                                this.quizView = false;
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
                  this.quizService.findQuizEtudiant(this.loginService.etudiant, this.selectedQuiz).subscribe(
                      data => {
                        this.quizEtudiantList = data;
                        console.log(this.quizEtudiantList);
                        this.quizService.findAllQuestions(this.selectedQuiz.ref).subscribe(
                            dataQuestions => {
                              if (data.questionCurrent > dataQuestions.length) {
                                this.passerQuiz = 'View Quiz';
                                this.quizView = true;
                              } else {
                                this.passerQuiz = 'Continue Quiz';
                                this.quizView = false;
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
      this.nextSection();
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
                  console.log(this.Synonymes);
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

            console.log(this.listSynonymes);
            this.selected.word = this.textSeleted;
            this.submittedDict = false;
            this.TranslateSynonymeDialog = true;
            // tslint:disable-next-line:triple-equals
          } else if (this.textSeleted.length != 0 && this.selected.word != null) {
            this.selected.word = this.textSeleted;
            this.submittedDictEdit = false;
            this.editDialogDict = true;
            // console.log(this.selected.word);
          }
        });
  }

  get TranslateSynonymeDialog(): boolean {
    return this.dictionnaryService.TranslateSynonymeDialog;
  }

  set TranslateSynonymeDialog(value: boolean) {
    this.dictionnaryService.TranslateSynonymeDialog = value;
  }
  public dictEdit(dict: Dictionary) {
    this.selected = dict;
    if (this.selected.word != null) {
      this.submittedDictEdit = false;
      this.editDialogDict = true;
    }
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
}
