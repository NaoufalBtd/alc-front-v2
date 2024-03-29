import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from '../../../../controller/service/web-socket.service';
import {ChatMessageDto} from '../../../../controller/model/chatMessageDto';
import {LoginService} from '../../../../controller/service/login.service';
import {ProfService} from '../../../../controller/service/prof.service';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';
import {LearnService} from '../../../../controller/service/learn.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
    today = Date.now();
    message: string;

    constructor(public webSocketService: WebSocketService,
                private learnService: LearnService,
                public loginService: LoginService, public serviceprof: ProfService) {
    }

    get badgeNrMsg(): number {
        return this.learnService.badgeNrMsg;
    }

    set badgeNrMsg(value: number) {
        this.learnService.badgeNrMsg = value;
    }

    ngOnInit(): void {
        this.webSocketService.findstudentlist(this.loginService.prof.id);

    }

    get listStudent(): Array<Etudiant> {
        return this.serviceprof.listStudent;
    }

    ngOnDestroy(): void {
    }


    sendMessage() {
        const chatMessageDto = new ChatMessageDto(this.loginService.prof.nom,
            this.message, false);
        chatMessageDto.student = null;
        chatMessageDto.dateSent = new Date();
        chatMessageDto.quizReponse = null;
        chatMessageDto.isStudent = false;
        chatMessageDto.prof = this.loginService.prof;
        chatMessageDto.type = 'message';
        this.webSocketService.sendMessage(chatMessageDto, 'PROF');
        this.message = '';
    }

    get groupeEtudiant(): GroupeEtudiant {
        return this.webSocketService.groupeEtudiant;
    }


}
