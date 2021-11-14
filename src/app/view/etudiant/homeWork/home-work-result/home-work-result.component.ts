import { Component, OnInit } from '@angular/core';
import {HomeWorkEtudiantServiceService} from "../../../../controller/service/home-work-etudiant-service.service";
import {HomeWOrkEtudiant} from "../../../../controller/model/home-work-etudiant.model";
import {HomeWorkQST} from "../../../../controller/model/home-work-qst.model";
import {HomeWorkReponse} from "../../../../controller/model/home-work-reponse.model";
import {MenuItem, TreeNode} from "primeng/api";
import {HoweWorkQSTReponse} from "../../../../controller/model/howe-work-qstreponse.model";
import {ReponseEtudiantHomeWork} from "../../../../controller/model/reponse-etudiant-home-work.model";
import {ParcoursService} from "../../../../controller/service/parcours.service";
import {DictionaryService} from "../../../../controller/service/dictionary.service";
import {Section} from "../../../../controller/model/section.model";
import {Dictionary} from "../../../../controller/model/dictionary.model";
import {HomeWork} from "../../../../controller/model/home-work.model";
import {HomeworkService} from "../../../../controller/service/homework.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-work-result',
  templateUrl: './home-work-result.component.html',
  styleUrls: ['./home-work-result.component.scss']
})
export class HomeWorkResultComponent implements OnInit {

  nodes: TreeNode[];
  menu: MenuItem[];
  selectedsection = new Section();
  private homeWorkQstReponses: Array<HoweWorkQSTReponse>;
  hasprevious = false;
  hasNext = false;

  constructor(private router: Router, public homeworkEtudiantservice: HomeWorkEtudiantServiceService, public homeworkservice: HomeworkService, public homeWorkEtudiantservice: HomeWorkEtudiantServiceService , private parcoursservice: ParcoursService, private dictionnaryService: DictionaryService) {
  }
  get QstReponseetudiant(): Array<ReponseEtudiantHomeWork> {
    return this.homeWorkEtudiantservice.QstReponseetudiant;
  }

  get homeWorkQuestion(): HomeWorkQST {
    return this.homeWorkEtudiantservice.homeWorkQuestion;
  }

  set homeWorkQuestion(value: HomeWorkQST) {
    this.homeWorkEtudiantservice.homeWorkQuestion = value;
  }

  get homeWorkEtudiant(): HomeWOrkEtudiant {
    return this.homeWorkEtudiantservice.homeWorkEtudiant;
  }
  set itemssection2(value: Array<Section>) {
    this.parcoursservice.itemssection2 = value;
  }
  get itemssection2(): Array<Section> {
    return this.parcoursservice.itemssection2;
  }
  get itemsDict(): Array<Dictionary> {
    return this.dictionnaryService.itemsDict;
  }

  set itemsDict(value: Array<Dictionary>) {
    this.dictionnaryService.itemsDict = value;
  }
  get sectionStandard(): Array<Section> {
    return this.parcoursservice.sectionStandard;
  }
  set sectionStandard(value: Array<Section>) {
    this.parcoursservice.sectionStandard = value;
  }
  get sectionAdditional(): Array<Section> {
    return this.parcoursservice.sectionAdditional;
  }
  set sectionAdditional(value: Array<Section>) {
    this.parcoursservice.sectionAdditional = value;
  }
  get selectedDictionnary(): Dictionary {
    return this.dictionnaryService.selected;
  }

  set selectedDictionnary(value: Dictionary) {
    this.dictionnaryService.selected = value;
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
  get homeWorkList(): Array<HomeWork> {
    return this.homeworkservice.homeWorkList;
  }

  set homeWorkList(value: Array<HomeWork>) {
    this.homeworkservice.homeWorkList = value;
  }
  get homeWork(): HomeWork {
    return this.homeworkEtudiantservice.homeWork;
  }

  set homeWork(value: HomeWork) {
    this.homeworkEtudiantservice.homeWork = value;
  }
  ngOnInit(): void {
    this.homeWorkQuestion = this.homeWorkEtudiant.homeWork.questions[0];
    this.findByQuestionId(this.homeWorkQuestion.id);
    this.showQuestions();
    this.menu = [
      {
        icon: 'pi pi-list', command: (event) => {
          this.parcoursservice.affichelistSection().subscribe(
              data => {
                this.itemssection2 = data;
                // tslint:disable-next-line:no-shadowed-variable
              });
          document.getElementById('word').style.visibility = 'hidden';
          document.getElementById('homeWork').style.visibility = 'hidden';
          document.getElementById('word').style.height = '0px';

          document.getElementById('categoriess').style.visibility = 'visible';

          document.getElementById('categoriess').style.width = '100%';
          document.getElementById('categoriess').style.height = '100%';
          document.getElementById('categ').style.height = '100%';
          document.getElementById('chat').style.visibility = 'hidden';
        }
      }, {
        icon: 'pi pi-fw pi-comments', command: (event) => {
          document.getElementById('categoriess').style.visibility = 'hidden';
          document.getElementById('homeWork').style.visibility = 'hidden';
          document.getElementById('categoriess').style.height = '0px';
          document.getElementById('word').style.visibility = 'hidden';
          document.getElementById('word').style.height = '0px';
          document.getElementById('chat').style.visibility = 'visible';
        }
      },
      {
        icon: 'pi pi-book', style: {width: '50%'}, command: (event) => {
          this.dictionnaryService.FindAllWord().subscribe(
              data => {
                this.itemsDict = data;
              });
          document.getElementById('categoriess').style.visibility = 'hidden';
          document.getElementById('homeWork').style.visibility = 'hidden';
          document.getElementById('categoriess').style.height = '0px';
          document.getElementById('word').style.visibility = 'visible';
          document.getElementById('word').style.width = '100%';
          document.getElementById('word').style.height = '100%';
          document.getElementById('wrd').style.height = '100%';
          document.getElementById('chat').style.visibility = 'hidden';
        }
      }, {
        icon: 'pi pi-sliders-h', style: {width: '50%'}, command: (event) => {
          this.dictionnaryService.FindAllWord().subscribe(
              data => {
                this.itemsDict = data;
              });
          document.getElementById('categoriess').style.visibility = 'hidden';
          document.getElementById('categoriess').style.height = '0px';
          document.getElementById('homeWork').style.visibility = 'visible';
          document.getElementById('chat').style.visibility = 'hidden';
          document.getElementById('word').style.visibility = 'hidden';
        }
      },
    ];
/*    this.findquestion(this.homeWorkQuestion);*/
  }
  public dictEdit(dict: Dictionary){
    this.selectedDictionnary = dict;
    if (this.selectedDictionnary.word != null){
      this.submittedDictEdit = false;
      this.editDialogDict = true;
    }
  }
  public Section(section: Section){
    /*    this.quizService.findQuizEtudiant(this.etudiant, this.selectedQuiz).subscribe(
            data => {
              this.quizEtudiant = data;
              this.quizEtudiant.note = this.noteQuiz;
              this.quizEtudiant.questionCurrent = this.numQuestion;
              this.service.updateQuizEtudiant().subscribe();
            }
        );
        this.parcoursservice.afficheSection(libelle).subscribe(
            data=> {
              this.selectedsection = data;
              this.service.findQuizBySectionId(this.selectedsection).subscribe(
                  data => {
                    this.selectedQuiz = data;
                    this.service.findQuizEtudiant(this.login.etudiant, this.selectedQuiz).subscribe(
                        data => {
                          this.quizEtudiantList = data;
                          this.passerQuiz = 'View Quiz';
                          this.quizView = true;
                        },error =>
                        {
                          this.passerQuiz = 'Passer Quiz';
                          this.quizView = false;
                        }
                    );
                  },
              );
            },error => console.log('erreeeeeeeeeeeeeeeeur') );
        this.router.navigate(['/etudiant/etudiant-simulate-sections']);*/
    this.selectedsection = section;
  }
  sendhomeWork(homeWork: HomeWork) {
    this.hasNext = false;
    this.hasprevious = false;
    console.log(homeWork);
    this.homeWork = homeWork;
    this.homeworkEtudiantservice.findQuestions().subscribe(
        data => {
          if (data.length > 1){
            this.hasNext = true;
          }
          this.homeWork.questions = data;
          this.homeWorkQuestion = data[0];
          this.findReponseByQuestion();
          document.getElementById('myAnswer').style.visibility = 'hidden';
        }
    );
    this.router.navigate(['etudiant/homeWorkEtudiant']);
  }
  findquestion(quetions: HomeWorkQST) {
    this.nodes = [];
    this.homeWorkQuestion = quetions;
    this.findByQuestionId(quetions.id);
    const list = [];
    console.log(this.QstReponseetudiant);
    console.log(this.QstReponseetudiant.length);
    for (let j = 0; j < this.QstReponseetudiant.length; j++) {
      console.log(this.QstReponseetudiant[j].answer);
      const item = {
        label: this.QstReponseetudiant[j].answer,
        type: 'url'
      };

      list.push(item);
    }
    this.nodes.push(
        {
          key: quetions.numero.toString(),
          label: 'Question ' + quetions.numero + ' : ' + quetions.libelle + ' ( ' + quetions.typeDeQuestion.lib + ' ) ',
          children: list
        },
    );
  }

  public showQuestions() {
    this.nodes = [];
    for (let i = 0; i < this.homeWorkEtudiant.homeWork.questions.length; i++) {
      this.findByQuestionId(this.homeWorkEtudiant.homeWork.questions[i].id);
      const list = [];
      console.log(this.QstReponseetudiant);
      console.log(this.QstReponseetudiant.length);
      for (let j = 0; j < this.homeWorkEtudiant.reponseEtudiantHomeWork.length; j++) {
        console.log(this.homeWorkEtudiant.reponseEtudiantHomeWork[j].answer);
        if (this.homeWorkEtudiant.reponseEtudiantHomeWork[j].question.id === this.homeWorkEtudiant.homeWork.questions[i].id ){
          const item = {
          label: this.homeWorkEtudiant.reponseEtudiantHomeWork[j].answer ,
          type: 'url'
        };

          list.push(item);
        }
      }
      this.nodes.push(
          {
            key: i.toString(),
            label: 'Question ' + this.homeWorkEtudiant.homeWork.questions[i].numero + ' : ' + this.homeWorkEtudiant.homeWork.questions[i].libelle + ' ( ' + this.homeWorkEtudiant.homeWork.questions[i].typeDeQuestion.lib + ' ) ',
            children: list
          },
      );
    }
  }
  public findReponseByQuestion(){
    this.homeWorkEtudiantservice.findReponsesByQuestionId().subscribe(
        data => {
          this.homeWorkQstReponses = data;
        }
    );
  }
  public findByQuestionId(id: number){
    this.homeWorkEtudiantservice.findByQuestionId(id);
  }

}
