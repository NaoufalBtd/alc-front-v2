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
import {QuizReponse} from '../model/quiz-reponse';
import {LearnService} from './learn.service';
import {Question} from '../model/question.model';
import {GroupeEtudiant} from '../model/groupe-etudiant.model';
import {GroupeEtudiantService} from './groupe-etudiant-service';
import {MessageService} from 'primeng/api';
import {ScheduleProf} from '../model/calendrier-prof.model';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    publicUrl = environment.publicUrl;
    private _prof: Prof = new Prof();
    private _studentsEnLigne: Map<number, User> = new Map<number, User>();
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
    private _groupeEtudiant: GroupeEtudiant = new GroupeEtudiant();
    private _grpStudentAnswers: Map<Etudiant, QuizReponse> = new Map<Etudiant, QuizReponse>();
    private _selectedSchedule: ScheduleProf = new ScheduleProf();

    constructor(private serviceetudiant: EtudiantService,
                private authService: AuthenticationService,
                private http: HttpClient,
                private loginservice: LoginService, public serviceprof: ProfService,
                private simulatesectionService: SimulateSectionService,
                private parcoursService: ParcoursService,
                private messageService: MessageService,
                private router: Router,
                private groupeEtudiantService: GroupeEtudiantService,
                private learnService: LearnService
    ) {
    }


    get selectedSchedule(): ScheduleProf {
        return this._selectedSchedule;
    }

    set selectedSchedule(value: ScheduleProf) {
        this._selectedSchedule = value;
    }

    get groupeEtudiant(): GroupeEtudiant {
        return this._groupeEtudiant;
    }

    set groupeEtudiant(value: GroupeEtudiant) {
        this._groupeEtudiant = value;
    }

    get grpStudentAnswers(): Map<Etudiant, QuizReponse> {
        return this._grpStudentAnswers;
    }

    set grpStudentAnswers(value: Map<Etudiant, QuizReponse>) {
        this._grpStudentAnswers = value;
    }

    get studentsEnLigne(): Map<number, User> {
        return this._studentsEnLigne;
    }

    set studentsEnLigne(value: Map<number, User>) {
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

    public closeWebSocket(chatMessageDto: ChatMessageDto) {
        this.chatMessages = [];
        this.webSocket.send(JSON.stringify(chatMessageDto));
        this.webSocket.close();
        this.webSocket.onclose = (event) => {
        };
    }

    public openWebSocket(user: User, prof: Prof, grpEtudiant: GroupeEtudiant, sender: string) {
        this.webSocket = new WebSocket(this.socketUrl);
        this.webSocket.onopen = (event) => {
            console.log('ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooopeeeeeeeeen');
            this.prof = prof;
            this.groupeEtudiant = grpEtudiant;
            let index = 0;
            for (let item of this.connectedUsers) {
                if (item?.id === prof.id) {
                    index = -1;
                }
            }
            if (index === 0) {
                this.connectedUsers.push({...prof});
            }
            if (sender === 'PROF') {
                this.participants.set(prof.id, this.connectedUsers);
                console.log(this.participants);
                if (this.studentsEnLigne.get(prof.id) === undefined) {
                    this.studentsEnLigne.set(prof.id, prof);
                }
            } else {
                this.groupeEtudiantService.findAllGroupeEtudiantDetail(grpEtudiant.id).subscribe(
                    data => {
                        const groupeEtudiantDetails = data;
                        for (let i = 0; i < groupeEtudiantDetails.length; i++) {
                            this.connectedUsers.push({...groupeEtudiantDetails[i].etudiant});
                        }
                        this.participants.set(prof.id, this.connectedUsers);
                        if (this.studentsEnLigne.get(prof.id) === undefined) {
                            this.studentsEnLigne.set(prof.id, prof);
                        }
                    }
                );
                let chatMessage: ChatMessageDto = new ChatMessageDto(user.nom, 'join session', true);
                chatMessage.prof = prof;
                chatMessage.student = user;
                chatMessage.type = 'CONNECT';
                this.webSocket.send(JSON.stringify(chatMessage));
            }
        };
        this.webSocket.onerror = (event) => {
            console.log(event);
            alert(event);
        };
        this.webSocket.onmessage = (event) => {
            const data: ChatMessageDto = JSON.parse(event.data);
            console.log(this.participants.get(data.prof.id));
            console.log(data);
            if (data.type === 'message') {
                for (const etudiant of this.participants.get(data.prof.id)) {
                    if (etudiant.id === this.loginservice.getConnectedStudent().id) {
                        this.chatMessages.push({...data});
                    }
                }
            } else if (data.type === 'SECTION') {
                if (data?.user === 'SUMMARY' && data?.message === 'SUMMARY') {
                    for (const etudiant of this.participants.get(data.prof.id)) {
                        if (etudiant.id === this.loginservice.getConnectedStudent().id) {
                            this.simulatesectionService.goToSummary();
                        }
                    }
                } else if (data?.user === 'FINISHLESSON' && data?.message === 'FINISHLESSON') {
                    for (const etudiant of this.participants.get(data.prof.id)) {
                        if (etudiant.id === this.loginservice.getConnectedStudent().id) {
                            this.simulatesectionService.finishLesson();
                        }
                    }
                } else {
                    const sectionId = Number(data.message);
                    console.log(sectionId);
                    console.log(this.participants.get(data.prof.id));
                    for (const etudiant of this.participants.get(data.prof.id)) {
                        if (etudiant.id === this.loginservice.getConnectedStudent().id) {
                            this.simulatesectionService.nextSection(sectionId, data?.user);
                        }
                    }
                }

            } else if (data.type === 'FOLLOW-QUIZ') {
                this.reponseQuiz = data.quizReponse;
                this.question = this.reponseQuiz?.question;
                this.learnService.nextQuestionFct();
            } else if (data.type === 'QUIZ') {
                if (this.groupeEtudiant?.groupeEtude?.nombreEtudiant === 1 ||
                    data.quizReponse.sender === 'PROF') {
                    this.reponseQuiz = data.quizReponse;
                    console.log(this.reponseQuiz);
                    if (this.reponseQuiz?.question?.typeDeQuestion?.ref === 't5') {
                        this.trueOrFalse = this.reponseQuiz.lib !== 'false';
                    }
                    if (this.reponseQuiz.sender === 'PROF') {
                        this.learnService.saveAnswers(this.question, 'TEACHER_ANSWER');
                    } else if (this.reponseQuiz.sender === 'STUDENT') {
                        this.learnService.saveAnswers(this.question, 'STUDENT_ANSWER');
                    } else {
                        this.learnService.saveAnswers(this.question, 'STUDENT_DONT_KNOW');
                    }
                } else {
                    const rpsQuiz = data.quizReponse;
                    this.grpStudentAnswers.set(rpsQuiz.student, rpsQuiz);
                }
            } else if (data?.type === 'CONNECT') {
                const mydata: ChatMessageDto = JSON.parse(event.data);
                console.log(mydata);
                console.log('=============== prof ======================');
                console.log(this.prof);
                console.log('=============== prof ======================');

                let studentList = this.participants.get(this.prof.id);
                console.log(this.participants);
                for (const student of studentList) {
                    if (student.id === mydata.student.id) {
                        if (this.studentsEnLigne.get(student.id) === undefined) {
                            this.studentsEnLigne.set(student.id, student);
                            this.messageService.add({
                                severity: 'success',
                                life: 3000,
                                detail: data?.student?.nom + ' ' + data?.student?.prenom + ' join the classroom'
                            });
                        }
                    }
                }
            } else if (data?.type === 'DISCONNECT') {
                if (this.studentsEnLigne.get(data?.student?.id) !== undefined) {
                    this.studentsEnLigne.delete(data?.student?.id);
                    this.messageService.add({
                        severity: 'warn',
                        life: 4000,
                        detail: data?.student?.nom + ' ' + data?.student?.prenom + ' is out of the classroom'
                    });
                }
            }
            console.log('==================== Last readyState==============');
            console.log(this.webSocket.readyState);
        };

        if (this.webSocket.readyState === this.webSocket.CLOSING) {
            alert('Wb socket is CLOSING !');
        }
    }

    get trueOrFalse(): boolean {
        return this.learnService.trueOrFalse;
    }

    set trueOrFalse(value: boolean) {
        this.learnService.trueOrFalse = value;
    }

    public sendMessage(chatMessageDto: ChatMessageDto, sender: string) {
        console.log('----------------- STATE ------------------------------------------');
        console.log('-------------------------------------------------------------------');
        console.log(this.webSocket.readyState);
        if (this.webSocket.readyState === this.webSocket.OPEN) {
            if (chatMessageDto.type === 'message') {
                this.webSocket.send(JSON.stringify((chatMessageDto)));
            } else {
                chatMessageDto.quizReponse.question.quiz = null;
                chatMessageDto.quizReponse.question.reponses = null;
                const myData = JSON.stringify((chatMessageDto));
                this.webSocket.send(myData);
            }
            this.webSocket.onerror = (event) => {
                console.log(event);
                alert('erroor to send');
            };
        } else {
            if (chatMessageDto.type !== 'message') {
                chatMessageDto.quizReponse.question.quiz = null;
                chatMessageDto.quizReponse.question.reponses = null;
            }
            console.log('=========WEB SOCKET WAS CLOSED===============');
            if (sender === 'PROF') {
                this.openWebSocket(this.loginservice.getConnectedProf(), this.loginservice.getConnectedProf(),
                    this.groupeEtudiant, 'PROF');
                this.webSocket.onopen = (event) => {
                    this.webSocket.send(JSON.stringify(chatMessageDto));
                };
            } else {
                this.openWebSocket(this.loginservice.getConnectedStudent(), this.loginservice.getConnectedStudent().prof,
                    this.groupeEtudiant, 'STUDENT');
                this.webSocket.onopen = (event) => {
                    this.webSocket.send(JSON.stringify(chatMessageDto));
                };
            }
        }
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

    public findCurrentSectionForstudent(cours: Cours, prof: Prof) {
        this.http.get<Section>(this.profUrl + this.synchronizationUrl + '/id/' + prof.id).subscribe(
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

    //
    // private studentIsInGroup(grpStudent: GroupeEtudiant): string {
    //     this.groupeEtudiantService.findAllGroupeEtudiantDetail(grpStudent.id).subscribe(data => {
    //         this.groupeEtudiant.groupeEtudiantDetails = data;
    //         for (const grpEtudiantDetails of data) {
    //             if (this.loginservice.getConnectedStudent().id === grpEtudiantDetails.etudiant.id) {
    //                 console.log('============ ANA F TRUE ==================');
    //                 return 'true';
    //             }
    //         }
    //     });
    //     console.log('============ ANA F FALSE ==================');
    // }

    private groupeEtudiantForThisStudent(student: Etudiant, grpStudent: GroupeEtudiant) {
        this.groupeEtudiantService.findAllGroupeEtudiantDetail(grpStudent.id).subscribe(
            data => {
                const groupeEtudiantDetails = data;
                for (let i = 0; i < groupeEtudiantDetails.length; i++) {
                    if (groupeEtudiantDetails[i].etudiant.id === student.id) {
                        console.log('========================== true ======================');
                        return true;

                    }
                }
                console.log('========================== false ======================');
                return false;
            }
        );

    }
}
