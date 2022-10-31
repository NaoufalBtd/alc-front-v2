import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatMessageDto} from '../../../../controller/model/chatMessageDto';
import {LoginService} from '../../../../controller/service/login.service';
import {ProfService} from '../../../../controller/service/prof.service';
import {WebSocketService} from '../../../../controller/service/web-socket.service';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';

@Component({
    selector: 'app-chat1',
    templateUrl: './chat1.component.html',
    styleUrls: ['./chat1.component.scss']
})
export class Chat1Component implements OnInit, OnDestroy {
    message: string;
    today = Date.now();

    constructor(public webSocketService: WebSocketService, public servicelogin: LoginService, public serviceprof: ProfService) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        // this.webSocketService.closeWebSocket(this.servicelogin.etudiant);
    }

    sendMessage() {
        const chatMessageDto = new ChatMessageDto(this.servicelogin.etudiant.nom,
            this.message, true);
        chatMessageDto.prof = this.groupeEtudiant.prof;
        chatMessageDto.grpStudent = this.groupeEtudiant;
        chatMessageDto.student = null;
        chatMessageDto.quizReponse = null;
        chatMessageDto.type = 'message';
        this.webSocketService.sendMessage(chatMessageDto, 'STUDENT');
        this.message = '';
    }

    get groupeEtudiant(): GroupeEtudiant {
        return this.webSocketService.groupeEtudiant;
    }


}
