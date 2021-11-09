import {Injectable} from '@angular/core';
import {ChatMessageDto} from '../model/chatMessageDto';
import {EtudiantService} from './etudiant.service';
import {Etudiant} from '../model/etudiant.model';
import {LoginService} from './login.service';
import {ProfService} from './prof.service';
import {Prof} from '../model/prof.model';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private socketUrl = environment.socketUrl;

    webSocket: WebSocket;
    chatMessages: ChatMessageDto[] = [];
    students: Etudiant[];
    idprof: number;


    constructor(private serviceetudiant: EtudiantService, private loginservice: LoginService, public serviceprof: ProfService) {
    }

    public openWebSocket() {
        this.webSocket = new WebSocket(this.socketUrl);
        this.webSocket.onopen = (event) => {
            console.log('Open: ', event);
        };
        // this.findbynumero(this.loginservice.prof.id);
        this.webSocket.onmessage = (event) => {
            const chatMessageDto = JSON.parse(event.data);
            this.chatMessages.push(chatMessageDto);
        };

        this.webSocket.onclose = (event) => {
            console.log('Close: ', event);
        };
    }

    public sendMessage(chatMessageDto: ChatMessageDto) {
        this.webSocket.send(JSON.stringify(chatMessageDto));
    }

    public findstudentlist(idprof: number): Etudiant[] {
        this.serviceetudiant.findetudiantProf1(idprof).subscribe(
            data => {
                console.log(data);
                this.students = data;
                console.log('listetudiant ana kayn');
            }, error => {
                console.log('la fonction ne fonctionne pas');
            }
        );
        this.idprof = idprof;
        this.loginservice.prof.students = this.students;
        return this.students;
    }

    public savechat(prof: Prof) {
        this.serviceprof.savechatmsgs(prof).subscribe(
            data => {
                console.log('chat tsavat mn 3nd prof');
            }, error => {
                console.log('madaztch');
            }
        );
    }


    public findbynumero(num: number) {
        this.serviceprof.findbyid(num).subscribe(
            data => {
                console.log('data dlprof' + data);
                // this.loginservice.etudiant.prof.chatMessageDto = data.chatMessageDto;
                // this.loginservice.prof = data;
            },
            error => {
                console.log('erreur achrif');
            }
        );
        console.log('hahowa prof : ' + this.loginservice.prof);
    }


    public closeWebSocket() {
        this.webSocket.close();
    }
}
