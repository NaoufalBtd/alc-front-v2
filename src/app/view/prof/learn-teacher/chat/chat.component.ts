import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebSocketService} from '../../../../controller/service/web-socket.service';
import {ChatMessageDto} from '../../../../controller/model/chatMessageDto';
import {LoginService} from '../../../../controller/service/login.service';
import {ProfService} from '../../../../controller/service/prof.service';
import {Etudiant} from '../../../../controller/model/etudiant.model';
import {GroupeEtudiant} from '../../../../controller/model/groupe-etudiant.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
    today = Date.now();

    constructor(public webSocketService: WebSocketService,
                public loginService: LoginService, public serviceprof: ProfService) {
    }

    ngOnInit(): void {
        this.serviceprof.getConnectedStudent();
        this.webSocketService.findbynumero(this.loginService.prof.id);
        this.webSocketService.findstudentlist(this.loginService.prof.id);
    }

    get listStudent(): Array<Etudiant> {
        return this.serviceprof.listStudent;
    }

    ngOnDestroy(): void {
    }


    sendMessage(sendForm: NgForm) {
        const chatMessageDto = new ChatMessageDto(this.loginService.prof.nom + ' ' + this.loginService.prof.prenom,
            sendForm.value.message, false);
        chatMessageDto.grpStudent = this.groupeEtudiant;
        chatMessageDto.student = null;
        chatMessageDto.quizReponse = null;
        console.log('___________________________ GRP ET PROF _____________________________');
        console.log(this.groupeEtudiant);
        chatMessageDto.prof = this.loginService.prof;
        chatMessageDto.type = 'message';
        this.webSocketService.sendMessage(chatMessageDto, 'PROF');
        console.log(chatMessageDto);
        sendForm.controls.message.reset();
    }

    get groupeEtudiant(): GroupeEtudiant {
        return this.webSocketService.groupeEtudiant;
    }
}
