import { Component, OnInit } from '@angular/core';
import {HomeWorkReponse} from '../../../controller/model/home-work-reponse.model';
import {HomeWorkQST} from '../../../controller/model/home-work-qst.model';
import {HomeworkService} from '../../../controller/service/homework.service';
import {HomeWork} from '../../../controller/model/home-work.model';
import {multicast} from "rxjs/operators";
import {MessageService, TreeNode} from 'primeng/api';
import {TypeDeQuestion} from "../../../controller/model/type-de-question.model";
import {Section} from "../../../controller/model/section.model";
import {HoweWorkQSTReponse} from "../../../controller/model/howe-work-qstreponse.model";
import {HomeWorkEtudiantServiceService} from "../../../controller/service/home-work-etudiant-service.service";

@Component({
  selector: 'app-home-work-component',
  templateUrl: './home-work-component.component.html',
  styleUrls: ['./home-work-component.component.scss']
})
export class HomeWorkComponentComponent implements OnInit {

  nodes: TreeNode[];
  constructor(private service: HomeworkService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.questionTypes();
    this.homeworkQST.reponses = new Array<HomeWorkReponse>();
    this.homeworkQST.numero = 1;
    this.homeWork.questions = new Array<HomeWorkQST>();
    this.homeWork.section = this.service.section;
    this.homeworkReponse.numero = 1;
    console.log(this.homeWork.section);
  }
  get reponses(): Array<HomeWorkReponse>{
    return this.service.reponses;
  }
  set reponses(homeWorkReponses){
    this.service.reponses = homeWorkReponses;
  }
  get types(): Array<TypeDeQuestion>{
    return this.service.types;
  }
  set types(typeDeQuestions){
    this.service.types = typeDeQuestions;
  }
  get homeworkReponse(): HomeWorkReponse{
    return this.service.homeworkReponse;
  }
  set homeworkReponse(homeWorkReponse){
    this.service.homeworkReponse = homeWorkReponse;
  }
  get homeworkQST(): HomeWorkQST{
    return this.service.HomeWorkQST;
  }
  set homeworkQST(homeWorkQST){
    this.service.HomeWorkQST = homeWorkQST;
  }

  get homeWork(): HomeWork {
    return  this.service.HomeWork;
  }
  set homeWork(homeWork1){
    this.service.HomeWork = homeWork1;
  }

  public clonequestion(question: HomeWorkQST): HomeWorkQST{
    const myclone = new HomeWorkQST();
    myclone.pointReponsefausse = question.pointReponsefausse;
    myclone.pointReponseJuste = question.pointReponseJuste;
    myclone.libelle = question.libelle;
    myclone.typeDeQuestion = question.typeDeQuestion;
    myclone.numero = question.numero;
    myclone.reponses = question.reponses;
    myclone.ref = question.ref;
    myclone.homeWork = question.homeWork;
    return myclone;
  }
  public cloneReponse(reponse: HomeWorkReponse): HomeWorkReponse{
    const myclone = new HomeWorkReponse();
    myclone.etatReponse = reponse.etatReponse;
    myclone.lib = reponse.lib;
    myclone.numero = reponse.numero;
    myclone.ref = reponse.ref;
    myclone.homeWorkQuestion = reponse.homeWorkQuestion;
    return myclone;
  }
  public addQuestion(){

    this.homeworkQST.reponses = this.reponses;
    this.homeWork.questions.push(this.clonequestion(this.homeworkQST));
    this.nodes = [];
    for (let i = 0; i < this.homeWork.questions.length ; i++) {
      const list = [];

      for (let j = 0; j < this.homeWork.questions[i].reponses.length; j++) {
        const item = {
          label: this.homeWork.questions[i].reponses[j].lib + '\t (' + this.homeWork.questions[i].reponses[j].etatReponse + ' )',
          type: 'url'
        };
        list.push(item);
      }

      this.nodes.push(
          {
            key: i.toString(),
            label: 'Question ' + this.homeWork.questions[i].numero + ' : ' + this.homeWork.questions[i].libelle + ' ( ' + this.homeWork.questions[i].typeDeQuestion.lib + ' ) ',
            children: list
          },
      );
      this.reponses = new Array<HomeWorkReponse>();
    }

    this.homeworkQST = new HomeWorkQST() ;
    this.homeworkQST.numero = this.homeWork.questions.length + 1;
    this.homeworkQST.reponses = new Array<HomeWorkReponse>();
    this.homeworkReponse.numero = 1;
  }
  public addAnswer(){
    this.reponses.push(this.cloneReponse(this.homeworkReponse));
    this.homeworkReponse = new HomeWorkReponse();
    this.homeworkReponse.numero = this.reponses.length + 1;
  }
  public save(){
    this.service.saveHomeWork().subscribe(
         data => {
           this.messageService.add({
             severity: 'success',
             summary: 'Successful',
             detail: 'HomeWork Created',
             life: 3000
           });
         }
     );
  }
  questionTypes(){
    this.service.findType().subscribe(
        data => {
          this.types = data;
        }
    );
  }

  deleteReponse(reponse: any) {
       this.reponses.splice(this.reponses.indexOf(reponse), 1);
  }
  deleteQuestion(key: string){
    const deleteNumber = Number(key);
    this.homeWork.questions.splice(deleteNumber, 1);
    this.nodes = [];
    for (let i = 0; i < this.homeWork.questions.length; i++) {
      const list = [];

      for (let j = 0; j < this.homeWork.questions[i].reponses.length; j++) {
        const item = {
          label: this.homeWork.questions[i].reponses[j].lib + '\t (' + this.homeWork.questions[i].reponses[j].etatReponse + ' )',
          type: 'url'
        };
        list.push(item);
      }

      this.nodes.push(
          {
            key: i.toString(),
            label: 'Question ' + this.homeWork.questions[i].numero + ' : ' + this.homeWork.questions[i].libelle + ' ( ' + this.homeWork.questions[i].typeDeQuestion.lib + ' ) ',
            children: list
          },
      );
    }
  }
  updateQuestion(key: string){
    const updateNumber = Number(key);
    this.homeworkQST = this.homeWork.questions[updateNumber];
    this.reponses = this.homeworkQST.reponses;
    this.deleteQuestion(key);
  }
}
