import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebSocketService} from '../../../../controller/service/web-socket.service';
import {ChatMessageDto} from '../../../../controller/model/chatMessageDto';
import {LoginService} from '../../../../controller/service/login.service';
import {ProfService} from '../../../../controller/service/prof.service';
import {Etudiant} from '../../../../controller/model/etudiant.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
    today = Date.now();

    constructor(public webSocketService: WebSocketService,
                public service: LoginService, public serviceprof: ProfService) {
    }

    ngOnInit(): void {
        this.serviceprof.getConnectedStudent();
        this.webSocketService.findbynumero(this.service.prof.id);
        this.webSocketService.findstudentlist(this.service.prof.id);
    }
    get listStudent(): Array<Etudiant> {
        return this.serviceprof.listStudent;
    }

    ngOnDestroy(): void {
    }


    sendMessage(sendForm: NgForm) {
        const chatMessageDto = new ChatMessageDto(this.service.prof.nom, sendForm.value.message, false);
        chatMessageDto.student = this.listStudent;
        chatMessageDto.prof = this.service.prof;
        chatMessageDto.type = 'message';
        this.webSocketService.sendMessage(chatMessageDto);
        console.log(chatMessageDto);
        sendForm.controls.message.reset();
    }
}
