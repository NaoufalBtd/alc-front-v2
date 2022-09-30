import {Component, OnInit} from '@angular/core';
import {LearnService} from '../../../../controller/service/learn.service';
import {HomeWork} from '../../../../controller/model/home-work.model';
import {HomeWorkEtudiantServiceService} from '../../../../controller/service/home-work-etudiant-service.service';
import {HomeWorkQST} from '../../../../controller/model/home-work-qst.model';
import {Dictionary} from '../../../../controller/model/dictionary.model';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {DictionaryService} from '../../../../controller/service/dictionary.service';

@Component({
    selector: 'app-phrasebook',
    templateUrl: './phrasebook.component.html',
    styleUrls: ['./phrasebook.component.scss']
})
export class PhrasebookComponent implements OnInit {
    questions: Array<HomeWorkQST> = new Array<HomeWorkQST>();

    constructor(private learnService: LearnService,
                private homeWorkEtudiantService: HomeWorkEtudiantServiceService,
                private quizEtudiantService: QuizEtudiantService,
                private dictionnaryService: DictionaryService,
    ) {
    }


    get selectedHomeWork(): HomeWork {
        return this.learnService.selectedHomeWork;
    }

    set selectedHomeWork(value: HomeWork) {
        this.learnService.selectedHomeWork = value;
    }

    get synonymes(): string {
        return this.learnService.synonymes;
    }

    set synonymes(value: string) {
        this.learnService.synonymes = value;
    }

    get textSeleted(): string {
        return this.learnService.textSeleted;
    }

    set textSeleted(value: string) {
        this.learnService.textSeleted = value;
    }

    get selectedLanguage(): any {
        return this.learnService.selectedLanguage;
    }

    get dictionaryList(): Array<Dictionary> {
        return this.learnService.dictionaryList;
    }

    set dictionaryList(value: Array<Dictionary>) {
        this.learnService.dictionaryList = value;
    }

    set displayDictionaryDialog(value: boolean) {
        this.learnService.displayDictionaryDialog = value;
    }

    get displayDictionaryDialog(): boolean {
        return this.learnService.displayDictionaryDialog;
    }

    ngOnInit(): void {
        console.log(this.selectedHomeWork);
        this.homeWorkEtudiantService.findQuestions(this.selectedHomeWork).subscribe(qstData => {
            console.log(qstData);
            this.questions = qstData;
        });
    }

    sound(son: string) {
        const text = encodeURIComponent(son);
        const url = 'https://www.translatedict.com/speak.php?word=' + text + '&lang=en';
        const audio = new Audio(url);
        audio.play();
    }

    dict() {
        this.synonymes = String();
        const selection = window.getSelection();
        this.textSeleted = selection.toString();
        console.log(this.textSeleted.length);
        if (this.textSeleted.length > 3) {
            console.log(this.selectedLanguage.code);
            if (this.selectedLanguage.code === 'ar') {
                this.quizEtudiantService.translate(this.textSeleted).subscribe(data => {
                    console.log(data);
                    this.synonymes = data;
                });
            } else if (this.selectedLanguage.code === 'fr') {
                this.quizEtudiantService.translateEnFr(this.textSeleted).subscribe(data => {
                    this.synonymes = data;
                    console.log(data);
                });
            }
            this.displayDictionaryDialog = true;
            this.getDictionaryList();
        }
    }

    getDictionaryList() {
        this.dictionnaryService.FindAllWord().subscribe(data => {
            this.dictionaryList = data;
            console.log(this.dictionaryList);
        }, error => {
            console.log(error);
        });
    }

}
