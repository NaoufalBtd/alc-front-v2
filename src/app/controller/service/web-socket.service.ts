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
    index = 0;
    webSocket: WebSocket ;
    chatMessages: ChatMessageDto[] = [];
    private _connectedUsers: any[] = [];
    actionType: Array<string> = new Array<string>();
    students: Etudiant[];
    idprof: number;


    constructor(private serviceetudiant: EtudiantService,
                private authService: AuthenticationService,
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
            } else if (data.type === 'NEXT') {
                // this.studentSimulateSection.ngOnInit();
                // this.studentSimulateSection.NextSection();
            } else if (data.type === 'PREVIOUS') {
                // this.studentSimulateSection.ngOnInit();
                // this.studentSimulateSection.PreviousSection();
            } else {
                console.log(data);
                console.log(this.connectedUsers);
                if (this.connectedUsers.length > 0) {
                    for (let user of this.connectedUsers) {
                        if (user.id === data.id) {
                            return;
                        }
                    }
                    this.connectedUsers.push({...data});

                } else {
                    console.log(this.connectedUsers);
                    this.connectedUsers.push({...data});
                    // this.connectedUsers = this.connectedUsers;
                    // console.log(this.webSocket.readyState);
                    console.log(this.connectedUsers);
                }


            }
        };


        this.webSocket.onclose = (event) => {
            console.log('Close: ', event);
            this.webSocket.close();
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
        this.webSocket.onclose = (event) => {
            console.log('Close: ', event);
            this.webSocket.close();
        };
        // this.webSocket.close();
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
