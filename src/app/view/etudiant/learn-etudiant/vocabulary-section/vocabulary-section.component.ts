import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SectionItemModel} from '../../../../controller/model/section-item.model';
import {MessageService} from 'primeng/api';
import {SectionItemService} from '../../../../controller/service/section-item.service';
import {VocabularySectionItemComponent} from './vocabulary-section-item/vocabulary-section-item.component';
import {VocabularyService} from '../../../../controller/service/vocabulary.service';
import {ChatMessageDto} from '../../../../controller/model/chatMessageDto';
import {WebSocketService} from '../../../../controller/service/web-socket.service';
import {LoginService} from '../../../../controller/service/login.service';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {Prof} from '../../../../controller/model/prof.model';

@Component({
    selector: 'app-vocabulary-section',
    templateUrl: './vocabulary-section.component.html',
    styleUrls: ['./vocabulary-section.component.scss']
})
export class VocabularySectionComponent implements OnInit {

    @ViewChild(VocabularySectionItemComponent) private child: VocabularySectionItemComponent;

    constructor(private messageService: MessageService,
                private vocabularyService: VocabularyService,
                private login: LoginService,
                private webSocketService: WebSocketService,
                private sectionItemService: SectionItemService) {
    }
    get groupeEtudiant(): GroupeEtudiant {
        return this.webSocketService.groupeEtudiant;
    }

    get prof(): Prof {
        return this.webSocketService.prof;
    }

    get someEvent(): EventEmitter<string> {
        return this.vocabularyService.someEvent;
    }

    @Output()
    set someEvent(value: EventEmitter<string>) {
        this.vocabularyService.someEvent = value;
    }

    get listItems(): SectionItemModel[] {
        return this.vocabularyService.listItems;
    }

    set listItems(value: SectionItemModel[]) {
        this.vocabularyService.listItems = value;
    }

    get currentItem(): SectionItemModel {
        return this.vocabularyService.currentItem;
    }

    set currentItem(value: SectionItemModel) {
        this.vocabularyService.currentItem = value;
    }

    get showPrevious(): boolean {
        return this.vocabularyService.showPrevious;
    }

    set showPrevious(value: boolean) {
        this.vocabularyService.showPrevious = value;
    }

    get showNext(): boolean {
        return this.vocabularyService.showNext;
    }

    set showNext(value: boolean) {
        this.vocabularyService.showNext = value;
    }

    get showfinish(): boolean {
        return this.vocabularyService.showfinish;
    }

    set showfinish(value: boolean) {
        this.vocabularyService.showfinish = value;
    }

    get showEnd(): boolean {
        return this.vocabularyService.showEnd;
    }

    set showEnd(value: boolean) {
        this.vocabularyService.showEnd = value;
    }

    get showItems(): boolean {
        return this.vocabularyService.showItems;
    }

    set showItems(value: boolean) {
        this.vocabularyService.showItems = value;
    }

    get currentIndex(): number {
        return this.vocabularyService.currentIndex;
    }

    set currentIndex(value: number) {
        this.vocabularyService.currentIndex = value;
    }

    get fliped(): boolean {
        return this.vocabularyService.fliped;
    }

    set fliped(value: boolean) {
        this.vocabularyService.fliped = value;
    }

    get progressBarValue(): number {
        return this.vocabularyService.progressBarValue;
    }

    set progressBarValue(value: number) {
        this.vocabularyService.progressBarValue = value;
    }

    ngOnInit(): void {
        this.listItems = this.sectionItemService.sectionSelected.sectionItems;
        this.currentItem = this.listItems[0];
        this.currentIndex = this.listItems.indexOf(this.currentItem) + 1;
        this.calculProgressBarValue(this.currentIndex);
        this.showNext = true;
        this.showPrevious = false;
        this.showfinish = false;
        this.showItems = true;
        this.showEnd = false;
        this.fliped = false;
    }


    // previousItem() {
    //     const index = this.listItems.indexOf(this.currentItem);
    //     if (index > 0) {
    //         if (index - 1 >= 0) {
    //             this.showNext = true;
    //             this.currentItem = this.listItems[index - 1];
    //             this.childStudent.reloadComponent();
    //             this.showPrevious = true;
    //             this.showfinish = false;
    //         }
    //         if (index - 1 === 0) {
    //             this.showPrevious = false;
    //         }
    //     }
    // }

    nextItem() {
        if (this.webSocketService.isInSession) {
            const chatMessage: ChatMessageDto = new ChatMessageDto('VOC_NEXT', 'VOC_NEXT', true);
            chatMessage.prof = this.prof;
            chatMessage.type = 'VOC';
            this.webSocketService.sendMessage(chatMessage, 'STUDENT');
        } else {
            this.vocabularyService.nextItem();
        }
    }




    endShow() {
        if (this.webSocketService.isInSession && this.groupeEtudiant?.groupeEtude?.nombreEtudiant === 1) {
            const chatMessage: ChatMessageDto = new ChatMessageDto('VOC_FINISH', 'VOC_FINISH', true);
            chatMessage.prof = this.prof;
            chatMessage.type = 'VOC';
            this.webSocketService.sendMessage(chatMessage, 'STUDENT');
        } else {
            this.vocabularyService.endShow();
        }
    }

    finish() {
        if (this.webSocketService.isInSession && this.groupeEtudiant?.groupeEtude?.nombreEtudiant === 1) {
            const chatMessage: ChatMessageDto = new ChatMessageDto('VOC_FINISH', 'VOC_FINISH', true);
            chatMessage.prof = this.prof;
            chatMessage.type = 'VOC';
            this.webSocketService.sendMessage(chatMessage, 'STUDENT');
        } else {
            this.vocabularyService.finish();
        }
    }

    flip() {
        if (this.webSocketService.isInSession && this.groupeEtudiant?.groupeEtude?.nombreEtudiant === 1) {
            const chatMessage: ChatMessageDto = new ChatMessageDto('VOC_FLIP', 'VOC_FLIP', true);
            chatMessage.prof = this.prof;
            chatMessage.type = 'VOC';
            this.webSocketService.sendMessage(chatMessage, 'STUDENT');
        } else {
            this.vocabularyService.flip();
        }
    }


    calculProgressBarValue(index: number) {
        this.vocabularyService.calculProgressBarValue(index);
    }

}
