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
import {ParcoursService} from './parcours.service';
import {Section} from '../model/section.model';
import {Cours} from '../model/cours.model';
import {Router} from '@angular/router';
import {QuizEtudiant} from '../model/quiz-etudiant.model';
import {Reponse} from '../model/reponse.model';
import {QuizReponse} from '../model/quiz-reponse';
import {LearnService} from './learn.service';
import {Question} from '../model/question.model';
import {GroupeEtudiant} from '../model/groupe-etudiant.model';
import {GroupeEtudiantService} from './groupe-etudiant-service';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    publicUrl = environment.publicUrl;
    private _prof: Prof = new Prof();
    private _studentsEnLigne: Map<number, Etudiant> = new Map<number, Etudiant>();
    private socketUrl = environment.socketUrl;
    private baseUrl = environment.baseUrl;
    private profUrl = environment.profUrl;
    private synchronizationUrl = 'synchronization';
    index = 0;
    webSocket: WebSocket;
    chatMessages: ChatMessageDto[] = [];
    private _connectedUsers: any[] = [];
    actionType: Array<string> = new Array<string>();
    students: Etudiant[];
    idprof: number;
    public isInSession = false;
    public sessionHasStarted = false;


    constructor(private serviceetudiant: EtudiantService,
                private authService: AuthenticationService,
                private http: HttpClient,
                private loginservice: LoginService, public serviceprof: ProfService,
                private simulatesectionService: SimulateSectionService,
                private parcoursService: ParcoursService,
                private router: Router,
                private groupeEtudiantService: GroupeEtudiantService,
                private learnService: LearnService
    ) {
    }


    get studentsEnLigne(): Map<number, Etudiant> {
        return this._studentsEnLigne;
    }

    set studentsEnLigne(value: Map<number, Etudiant>) {
        this._studentsEnLigne = value;
    }

    get prof(): Prof {
        return this._prof;
    }

    set prof(value: Prof) {
        this._prof = value;
    }

    get reponseQuiz(): QuizReponse {
        return this.learnService.reponseQuiz;
    }

    set reponseQuiz(value: QuizReponse) {
        this.learnService.reponseQuiz = value;
    }


    get participants(): Map<number, Array<Etudiant>> {
        return this.learnService.participants;
    }

    set participants(value: Map<number, Array<Etudiant>>) {
        this.learnService.participants = value;
    }


    get question(): Question {
        return this.learnService.question;
    }

    set question(value: Question) {
        this.learnService.question = value;
    }

    public closeWebSocket(user: any) {
        this.webSocket.send(JSON.stringify(user));
        this.webSocket.close();
        this.webSocket.onclose = (event) => {
            console.log('Clooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooose: ');
            console.log(event);
            console.log('================================================================================');
        };
    }

    public openWebSocket(user: User, prof: Prof, grpEtudiant: GroupeEtudiant, sender: string) {
        this.webSocket = new WebSocket(this.socketUrl);
        this.webSocket.onopen = (event) => {
            if (sender === 'PROF') {
                console.log('ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooopeeeeeeeeen');
                this.participants.set(prof.id, this.connectedUsers);
                console.log(this.participants);
            } else {
                this.prof = prof;
                this.groupeEtudiantService.findAllGroupeEtudiantDetail(grpEtudiant.id).subscribe(
                    data => {
                        const groupeEtudiantDetails = data;
                        for (let i = 0; i < groupeEtudiantDetails.length; i++) {
                            this.connectedUsers.push({...groupeEtudiantDetails[i].etudiant});
                        }
                        this.participants.set(prof.id, this.connectedUsers);
                    }
                );
                this.webSocket.send(JSON.stringify(user));
            }
            console.log('ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooopeeeeeeeeen');
        };
        this.webSocket.onmessage = (event) => {
            
            console.log(event);
            const data: ChatMessageDto = JSON.parse(event.data);
            if (data.type === 'message') {
                this.chatMessages.push(data);
                console.log(data);
            } else if (data.type === 'NEXT') {
                console.log('hani ghandir next l student');
                this.simulatesectionService.nextSection();

            } else if (data.type === 'PREVIOUS') {
                console.log('hani ghandir previous l student');
                this.simulatesectionService.PreviousSection();
                //   this.updateCurrentSection(this.loginservice.prof.id, this.simulatesectionService.selectedsection);
            } else if (data.type === 'FOLLOW-QUIZ') {
                this.reponseQuiz = data.quizReponse;
                this.question = this.reponseQuiz?.question;
                this.learnService.nextQuestionFct();
            } else if (data.type === 'QUIZ') {
                this.reponseQuiz = data.quizReponse;
                console.log(this.reponseQuiz);
                if (this.reponseQuiz?.question?.typeDeQuestion?.ref === 't5') {
                    this.trueOrFalse = this.reponseQuiz.lib !== 'false';
                    alert(this.trueOrFalse);
                }
                if (this.reponseQuiz.sender === 'PROF') {
                    this.learnService.saveAnswers(this.question, 'TEACHER_ANSWER');
                } else if (this.reponseQuiz.sender === 'STUDENT') {
                    this.learnService.saveAnswers(this.question, 'STUDENT_ANSWER');
                } else {
                    this.learnService.saveAnswers(this.question, 'STUDENT_DONT_KNOW');
                }

            }


                // else if (data.type === 'QUIZ') {
                //     this.reponseQuiz = JSON.parse(event.data);
                //     console.log(this.reponseQuiz);
                //     if (this.reponseQuiz?.question?.typeDeQuestion?.ref === 't5') {
                //         this.trueOrFalse = this.reponseQuiz.lib !== 'false';
                //         alert(this.trueOrFalse);
                //     }
                //     if (this.reponseQuiz.sender === 'PROF') {
                //         this.learnService.saveAnswers(this.question, 'TEACHER_ANSWER');
                //     } else if (this.reponseQuiz.sender === 'STUDENT') {
                //         this.learnService.saveAnswers(this.question, 'STUDENT_ANSWER');
                //     }
                //
                // } else if (data.type === 'FOLLOW-QUIZ') {
                //     this.reponseQuiz = JSON.parse(event.data);
                //     this.question = this.reponseQuiz?.question;
            //     this.learnService.nextQuestionFct();
            else {
                const mydata = JSON.parse(event.data);
                console.log(mydata);
                const studentList = this.participants.get(mydata?.prof?.id);
                for (const student of studentList) {
                    if (student.id === mydata.id) {
                        if (this.studentsEnLigne.get(student.id) === undefined) {
                            this.studentsEnLigne.set(student.id, student);
                        } else {
                            this.studentsEnLigne.delete(student.id);
                            console.log('========== DELETE  STUDENT ========');
                            console.log(this.studentsEnLigne);
                            console.log('========== DELETE  STUDENT ========');
                        }
                    }
                }
            }
        };

    }

    get trueOrFalse(): boolean {
        return this.learnService.trueOrFalse;
    }

    set trueOrFalse(value: boolean) {
        this.learnService.trueOrFalse = value;
    }

    public sendMessage(chatMessageDto: ChatMessageDto) {
        console.log('===========================this.webSocket.readyState ===========================');
        console.log(this.webSocket.readyState);
        console.log(this.webSocket.OPEN);
        console.log(this.webSocket.CLOSED);
        if (this.webSocket.readyState === this.webSocket.OPEN){
            this.webSocket.send(JSON.stringify(chatMessageDto));
        } else {
            this.webSocket = new WebSocket(this.socketUrl);
            this.webSocket.send(JSON.stringify(chatMessageDto));

        }
    }

    public sendReponseQuiz(reponse: QuizReponse) {
        this.webSocket.send(JSON.stringify(reponse));
        // this.webSocket.onmessage = (event) => {
        //     this.reponseQuiz = JSON.parse(event.data);
        //     console.log(this.reponseQuiz);
        //     if (this.reponseQuiz.type === 'FOLLOW-QUIZ') {
        //         this.reponseQuiz = JSON.parse(event.data);
        //         this.question = this.reponseQuiz?.question;
        //         this.learnService.nextQuestionFct();
        //     } else if (this.reponseQuiz.type === 'QUIZ') {
        //         this.reponseQuiz = JSON.parse(event.data);
        //         console.log(this.reponseQuiz);
        //         if (this.reponseQuiz?.question?.typeDeQuestion?.ref === 't5') {
        //             this.trueOrFalse = this.reponseQuiz.lib !== 'false';
        //             alert(this.trueOrFalse);
        //         }
        //         if (this.reponseQuiz.sender === 'PROF') {
        //             this.learnService.saveAnswers(this.question, 'TEACHER_ANSWER');
        //         } else if (this.reponseQuiz.sender === 'STUDENT') {
        //             this.learnService.saveAnswers(this.question, 'STUDENT_ANSWER');
        //         } else {
        //             this.learnService.saveAnswers(this.question, 'STUDENT_DONT_KNOW');
        //         }
        //
        //     }
        // };
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

    get selectedsection(): Section {
        return this.parcoursService.selectedsection;
    }

    public saveCurrentSection(id: number, section: Section) {
        console.log(this.selectedsection);
        this.http.post<number>(this.profUrl + this.synchronizationUrl + '/id/' + id, section).subscribe(
            data => {
                if (data > 0) {
                    console.log(section);
                    console.log('CurrentSection saved');
                } else {
                    console.log('section not saved');
                }
            }, error => {
                console.log('problem while saving current section');
            }
        );
    }

    public updateCurrentSection(id: number, section: Section) {
        this.http.post<number>(this.profUrl + this.synchronizationUrl + '/update/' + id, section).subscribe(
            data => {
                if (data > 0) {
                    console.log('CurrentSection updated');
                } else {
                    console.log('section not updated');
                }
            }, error => {
                console.log('problem while updating current section');
            }
        );
    }

    public deleteWhenSessionIsfiniched(id: number) {
        this.http.get<number>(this.profUrl + this.synchronizationUrl + '/remove/' + id).subscribe(
            data => {
                if (data > 0) {
                    console.log('CurrentSection removed');
                } else {
                    console.log('section not removed');
                }
            }, error => {
                console.log('problem while removing current section');
            }
        );
    }

    public findCurrentSectionForstudent(cours: Cours) {
        this.http.get<Section>(this.profUrl + this.synchronizationUrl + '/id/' + this.loginservice.etudiant.prof.id).subscribe(
            async data => {
                if (data !== null) {
                    this.parcoursService.selectedsection = data;
                    console.log('CurrentSection found');
                    console.log(this.parcoursService.selectedsection);
                    this.simulatesectionService.findSectionOneByOne(cours);
                    this.router.navigate(['etudiant/etudiant-simulate-sections']);
                    this.simulatesectionService.goToSection(this.parcoursService.selectedsection.categorieSection.libelle);

                } else {
                    console.log('section not found');
                }
            }, error => {
                console.log('problem while searching for current section');
            }
        );
    }


    get connectedUsers(): any[] {
        if (this._connectedUsers == null) {
            this._connectedUsers = [];
        }
        return this._connectedUsers;
    }

    set connectedUsers(value: any[]) {
        this._connectedUsers = value;
    }

}
