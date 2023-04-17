import {Component, OnInit} from '@angular/core';
import {LearnService} from '../../../../controller/service/learn.service';
import {HomeWork} from '../../../../controller/model/home-work.model';
import {HomeWorkEtudiantServiceService} from '../../../../controller/service/home-work-etudiant-service.service';
import {HomeWorkQST} from '../../../../controller/model/home-work-qst.model';
import {Dictionary} from '../../../../controller/model/dictionary.model';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {DictionaryService} from '../../../../controller/service/dictionary.service';

@Component({
    selector: 'app-drag-home-work',
    templateUrl: './drag-home-work.component.html',
    styleUrls: ['./drag-home-work.component.scss']
})
export class DragHomeWorkComponent implements OnInit {
    public homeWorkQuestion: HomeWorkQST = new HomeWorkQST();
    correctAnswersList: Map<number, string> = new Map<number, string>();


    sourceProducts = [
        {name: '1', text: 'I am fine'},
        {name: '2', text: 'I am okey'},
        {name: '3', text: 'I am donkey'},
        {name: '4', text: 'I am horse'},
    ];
    property: any;
    data: string;
    listOfWords: Array<string> = new Array<string>();
    listOfText: Map<number, string> = new Map<number, string>();

    constructor(private learnService: LearnService,
                private quizEtudiantService: QuizEtudiantService,
                private dictionnaryService: DictionaryService,
                private homeWorkEtudiantService: HomeWorkEtudiantServiceService,
    ) {
    }

    get selectedLanguage(): any {
        return this.learnService.selectedLanguage;
    }

    get selectedHomeWork(): HomeWork {
        return this.learnService.selectedHomeWork;
    }

    set selectedHomeWork(value: HomeWork) {
        this.learnService.selectedHomeWork = value;
    }

    set displayDictionaryDialog(value: boolean) {
        this.learnService.displayDictionaryDialog = value;
    }

    get displayDictionaryDialog(): boolean {
        return this.learnService.displayDictionaryDialog;
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

    get dictionaryList(): Array<Dictionary> {
        return this.learnService.dictionaryList;
    }

    set dictionaryList(value: Array<Dictionary>) {
        this.learnService.dictionaryList = value;
    }

    ngOnInit(): void {
        console.log(this.selectedHomeWork);
        if (this.selectedHomeWork.id !== undefined) {
            this.homeWorkEtudiantService.findQuestions(this.selectedHomeWork).subscribe(data => {
                this.homeWorkQuestion = data[0];
                this.extractData(this.homeWorkQuestion.libelle);
                console.log(this.homeWorkQuestion);
            }, error => {
                console.log(error);
            });
        }
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        this.data = String();
        this.data = ev.target.value;
        console.log(this.data);
    }

    drop(ev) {
        console.log(this.correctAnswersList);
        const id: number = ev.target.id;
        console.log(id);
        console.log(this.data);
        if (this.data === this.correctAnswersList.get(Number(id))) {
            ev.target.value = this.data;
            ev.target.style.border = '2px solid green';
            this.listOfWords.splice(this.listOfWords.indexOf(this.data), 1);
        } else {
            ev.target.style.border = '2px solid red';
        }
        console.log(this.listOfWords.length);
        if (this.listOfWords.length === 0) {
            document.getElementById('answers').style.borderRadius = '4px';
            document.getElementById('answers').style.backgroundColor = '#bcf0da';
            document.getElementById('answers').style.color = '#166a16';
        }
    }

    private extractData(homeWorkQuestion: string) {
        let libelle = homeWorkQuestion;
        console.log(libelle);
        let index = 1;
        let test = '@';
        while (test === '@') {
            const firstIndex = homeWorkQuestion.indexOf('@');
            if (firstIndex !== -1) {
                this.listOfText.set(index, homeWorkQuestion.slice(0, homeWorkQuestion.indexOf('@')));
                homeWorkQuestion = homeWorkQuestion.slice(firstIndex + 1, homeWorkQuestion.length);
                const word = homeWorkQuestion.substring(0, homeWorkQuestion.indexOf('@'));
                this.correctAnswersList.set(index, word);
                console.log(homeWorkQuestion);
                homeWorkQuestion = homeWorkQuestion.slice(word.length + 1, homeWorkQuestion.length);
                console.log('--------------------------------------------------------------');
                console.log(homeWorkQuestion);
                libelle = libelle.replace(word, ' ');
                index++;
                test = '@';
            } else {
                this.listOfText.set(index, homeWorkQuestion.slice(0, homeWorkQuestion.length));
                test = 'finish';
            }
        }
        for (const value of this.correctAnswersList.values()) {
            this.listOfWords.push(value);
        }
        this.listOfWords = this.listOfWords.sort((a, b) => b.localeCompare(a));
    }

    dict() {
        this.synonymes = String();
        const selection = window.getSelection();
        this.textSeleted = selection.toString();
        console.log(this.textSeleted.length);
        if (this.textSeleted.length > 3) {
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
            } else if (this.selectedLanguage.code === 'ru') {
                this.quizEtudiantService.translate_from_en_to_russian(this.textSeleted).subscribe(data => {
                    this.synonymes = data;
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
