import {Injectable} from '@angular/core';
import {ChatMessageDto} from '../model/chatMessageDto';
import {EtudiantService} from './etudiant.service';
import {Etudiant} from '../model/etudiant.model';
import {LoginService} from './login.service';
import {ProfService} from './prof.service';
import {Prof} from '../model/prof.model';
import {environment} from '../../../environments/environment';
import {StudentSimulateSectionComponent} from '../../view/etudiant/learn-etudiant/student-simulate-section/student-simulate-section.component';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {DictionaryService} from './dictionary.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ParcoursService} from './parcours.service';
import {HttpClient} from '@angular/common/http';
import {QuizEtudiantService} from './quiz-etudiant.service';
import {VocabularyService} from './vocabulary.service';
import {EtudiantReviewService} from './etudiant-review.service';
import {SectionItemService} from './section-item.service';
import {SessionCoursService} from './session-cours.service';
import {HomeworkService} from './homework.service';
import {HomeWorkEtudiantServiceService} from './home-work-etudiant-service.service';
import {User} from '../model/user.model';
import {AuthenticationService} from './authentication.service';

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
                private loginservice: LoginService, public serviceprof: ProfService) {
    }

    public openWebSocket(user: User) {
        this.webSocket = new WebSocket(this.socketUrl);
        this.webSocket.onopen = (event) => {
            this.webSocket.send(JSON.stringify(user));
            // this.connectedUsers.push(this.webSocket.)
        };
        // this.findbynumero(this.loginservice.prof.id);
        this.webSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'message') {
                this.chatMessages.push(data);
                console.log(data);
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
        return this._connectedUsers;
    }

    set connectedUsers(value: any[]) {
        this._connectedUsers = value;
    }
}
