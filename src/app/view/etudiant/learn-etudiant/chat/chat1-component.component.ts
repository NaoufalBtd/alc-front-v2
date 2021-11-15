import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ChatMessageDto} from '../../../../controller/model/chatMessageDto';
import {LoginService} from '../../../../controller/service/login.service';
import {ProfService} from '../../../../controller/service/prof.service';
import {WebSocketService} from '../../../../controller/service/web-socket.service';

@Component({
    selector: 'app-chat1',
    templateUrl: './chat1.component.html',
    styleUrls: ['./chat1.component.scss']
})
export class Chat1Component implements OnInit, OnDestroy {
    // chatstudents = this.servicelogin.etudiant.chatstudent;
    // profchat: ChatMessageDto[];
    today = Date.now();

    constructor(public webSocketService: WebSocketService, public servicelogin: LoginService, public serviceprof: ProfService) {
    }

    ngOnInit(): void {
        this.webSocketService.findbynumero(this.servicelogin.etudiant.prof.id);
        // this.servicelogin.etudiant.prof.students[0] = null;
        // this.servicelogin.etudiant.prof.students[0].chatMessageDto = null;
        // this.webSocketService.findstudentlist(this.servicelogin.etudiant.prof.id);
        this.webSocketService.openWebSocket();
    }

    ngOnDestroy(): void {
        this.webSocketService.closeWebSocket();
    }

    sendMessage(sendForm: NgForm) {
        const chatMessageDto = new ChatMessageDto(this.servicelogin.etudiant.nom, sendForm.value.message, true);
        console.log(this.servicelogin.etudiant.prof.chatMessageDto);
        console.log(chatMessageDto);
        this.webSocketService.sendMessage(chatMessageDto);
        sendForm.controls.message.reset();
    }
}
