import {Component, Input, OnInit} from '@angular/core';
import {SectionItemModel} from '../../../../../controller/model/section-item.model';
import {MessageService} from 'primeng/api';
import {VocabularyService} from '../../../../../controller/service/vocabulary.service';
import {VocabularySectionItemService} from '../../../../../controller/service/vocabulary-section-item.service';

@Component({
    selector: 'app-vocabulary-section-item',
    templateUrl: './vocabulary-section-item.component.html',
    styleUrls: ['./vocabulary-section-item.component.scss']
})
export class VocabularySectionItemComponent implements OnInit {

    constructor(private messageService: MessageService,
                private vocabularySectionItemService: VocabularySectionItemService,
                private vocabularyService: VocabularyService) {
    }

    get showfinish(): boolean {
        return this.vocabularyService.showfinish;
    }

    set showfinish(value: boolean) {
        this.vocabularyService.showfinish = value;
    }

    get current(): SectionItemModel {
        return this.vocabularySectionItemService.current;
    }

    @Input()
    set current(value: SectionItemModel) {
        this.vocabularySectionItemService.current = value;
    }

    get fliped(): boolean {
        return this.vocabularySectionItemService.fliped;
    }

    set fliped(value: boolean) {
        this.vocabularySectionItemService.fliped = value;
    }

    get image(): string {
        return this.vocabularySectionItemService.image;
    }

    set image(value: string) {
        this.vocabularySectionItemService.image = value;
    }

    get selected(): boolean {
        return this.vocabularySectionItemService.selected;
    }

    set selected(value: boolean) {
        this.vocabularySectionItemService.selected = value;
    }

    get cureentResponse(): string {
        return this.vocabularySectionItemService.cureentResponse;
    }

    set cureentResponse(value: string) {
        this.vocabularySectionItemService.cureentResponse = value;
    }


    ngOnInit(): void {
        console.log(this.current.imageUrl);
        this.showfinish = false;
        this.fliped = false;
    }

    checkResponse() {
        this.selected = true;
        document.getElementById('imageDiv').style.filter = 'blur(0px)';
        document.getElementById('imageDiv').style.webkitFilter = 'blur(0px)';
        this.messageService.clear();

        if (this.cureentResponse === '') {
            this.messageService.add({severity: 'warn', summary: 'HEY??', detail: 'You didn\'t write anything '});
        } else {
            if (this.cureentResponse == this.current.response) {
                this.messageService.add({severity: 'success', summary: 'GOOD', detail: 'your answer is correct'});
            } else {
                this.messageService.add({severity: 'error', summary: 'OOPS!!', detail: 'your answer is incorrect'});
            }
        }
    }


    public sound(word: string) {
        const text = encodeURIComponent(word);
        const url = 'https://www.translatedict.com/speak.php?word=' + text + '&lang=en';
        const audio = new Audio(url);
        audio.play();
    }

    getExplanation() {

    }
}
