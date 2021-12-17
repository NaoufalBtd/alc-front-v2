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
import {AuthenticationService} from './authentication.service';
import {ParcoursService} from "./parcours.service";
import {Section} from "../model/section.model";
import {Cours} from "../model/cours.model";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    publicUrl = environment.publicUrl;
    private socketUrl = environment.socketUrl;
    private baseUrl = environment.baseUrl;
    private profUrl = environment.profUrl;
    private synchronizationUrl = 'synchronization';
    index = 0;
    webSocket: WebSocket ;
    chatMessages: ChatMessageDto[] = [];
    private _connectedUsers: any[] = [];
    actionType: Array<string> = new Array<string>();
    students: Etudiant[];
    idprof: number;
    public isInSession = false ;
    public sessionHasStarted = false;


    constructor(private serviceetudiant: EtudiantService,
                private authService: AuthenticationService,
                private http: HttpClient,
                private loginservice: LoginService, public serviceprof: ProfService,
                private simulatesectionService: SimulateSectionService,
                private parcoursService: ParcoursService,
                private router: Router
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
            //   this.updateCurrentSection(this.loginservice.prof.id, this.simulatesectionService.selectedsection);
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

    public saveCurrentSection(id: number, section: Section){
        this.http.post<number>(this.profUrl + this.synchronizationUrl + '/id/' + id, section ).subscribe(
            data => {
                if (data > 0){
                    console.log('CurrentSection saved');
                }else {
                    console.log('section not saved');
                }
            }, error => {
                console.log('problem while saving current section');
            }
        );
    }

    public updateCurrentSection(id: number, section: Section){
        this.http.post<number>(this.profUrl + this.synchronizationUrl + '/update/' + id, section ).subscribe(
            data => {
                if (data > 0){
                    console.log('CurrentSection updated');
                }else {
                    console.log('section not updated');
                }
            }, error => {
                console.log('problem while updating current section');
            }
        );
    }

    public deleteWhenSessionIsfiniched(id: number){
        this.http.get<number>(this.profUrl + this.synchronizationUrl + '/remove/' + id).subscribe(
            data => {
                if (data > 0){
                    console.log('CurrentSection removed');
                }else {
                    console.log('section not removed');
                }
            }, error => {
                console.log('problem while removing current section');
            }
        );
    }

    public findCurrentSectionForstudent(cours: Cours){
        this.http.get<Section>(this.profUrl + this.synchronizationUrl + '/id/' + this.loginservice.etudiant.prof.id).subscribe(
            async data => {
                if (data !== null){
                    this.parcoursService.selectedsection = data;
                    console.log('CurrentSection found');
                    console.log(this.parcoursService.selectedsection);
                    this.simulatesectionService.findSectionOneByOne(cours);
                    this.router.navigate(['etudiant/etudiant-simulate-sections']);
                    this.simulatesectionService.goToSection(this.parcoursService.selectedsection.categorieSection.libelle);

                }else {
                    console.log('section not found');
                }
            }, error => {
                console.log('problem while searching for current section');
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
