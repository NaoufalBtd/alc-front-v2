import {Injectable} from '@angular/core';
import {ChatMessageDto} from '../model/chatMessageDto';
import {EtudiantService} from './etudiant.service';
import {Etudiant} from '../model/etudiant.model';
import {LoginService} from './login.service';
import {ProfService} from './prof.service';
import {Prof} from '../model/prof.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

import {User} from '../model/user.model';
import {SimulateSectionService} from './simulate-section.service';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    publicUrl = environment.publicUrl;
    private socketUrl = environment.socketUrl;
    webSocket: WebSocket;
    chatMessages: ChatMessageDto[] = [];
    private _connectedUsers: any[];
    actionType: Array<string> = new Array<string>();
    students: Etudiant[];
    idprof: number;


    constructor(private serviceetudiant: EtudiantService,
                private http: HttpClient,
                private loginservice: LoginService, public serviceprof: ProfService,
                private simulatesectionService: SimulateSectionService
                ) {
    }

    public openWebSocket(user: User) {
        this.webSocket = new WebSocket(this.socketUrl);
        this.webSocket.onopen = (event) => {
            this.webSocket.send(JSON.stringify(user));
            // this.connectedUsers.push(this.webSocket.)
        };
        // this.findbynumero(this.loginservice.prof.id);
        this.webSocket.onmessage = (event) => {
            console.log(event);
            const data = JSON.parse(event.data);
            if (data.type === 'message') {
                this.chatMessages.push(data);
                console.log(data);
            }
            else if  (data.type === 'NEXT') {
                console.log('hani ghandir next l student');
                this.simulatesectionService.nextSection();
            }
           else if (data.type === 'PREVIOUS') {
               console.log('hani ghandir previous l student');
               this.simulatesectionService.PreviousSection();
            }
            else {
                this.connectedUsers.push(data);
                console.log(this.connectedUsers);

            }
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
            }, error => {
            }
        );
        this.idprof = idprof;
        this.loginservice.prof.students = this.students;
        return this.students;
    }

    public savechat(prof: Prof) {
        this.serviceprof.savechatmsgs(prof).subscribe(
            data => {
            }, error => {
            }
        );
    }


    public findbynumero(num: number) {
        this.serviceprof.findbyid(num).subscribe(
            data => {
                // this.loginservice.etudiant.prof.chatMessageDto = data.chatMessageDto;
                // this.loginservice.prof = data;
            },
            error => {
            }
        );
    }


    public closeWebSocket(user: any) {

        alert(user.nom);
        this.webSocket.close();
    }


    get connectedUsers(): any[] {
        if (this._connectedUsers == null){
            this._connectedUsers = [];
        }
        return this._connectedUsers;
    }

    set connectedUsers(value: any[]) {
        this._connectedUsers = value;
    }
}
