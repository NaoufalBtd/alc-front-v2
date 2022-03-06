import {Component, OnInit} from '@angular/core';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DictionaryService} from '../../../../controller/service/dictionary.service';
import {Quiz} from '../../../../controller/model/quiz.model';
import {QuizService} from '../../../../controller/service/quiz.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-quiz-update',
    templateUrl: './quiz-update.component.html',
    styleUrls: ['./quiz-update.component.scss']
})
export class QuizUpdateComponent implements OnInit {
    stateOptions = [{value: 'true'}, {value: 'false'}];

    constructor(private quizEtudiantService: QuizEtudiantService,
                private quizService: QuizService,
                private messageService: MessageService,
                private router: Router,
                private dictionnaryService: DictionaryService,
                private confirmationService: ConfirmationService,
    ) {
    }

    get selectedQuiz(): Quiz {
        return this.quizEtudiantService.selectedQuiz;
    }

    set selectedQuiz(value: Quiz) {
        this.quizEtudiantService.selectedQuiz = value;
    }

    ngOnInit(): void {
        console.log(this.selectedQuiz);
    }


    getEtaReps(eta: string): boolean {
        if (eta === 'true') {
            return true;
        } else {
            return false;
        }
    }

    save() {
        this.quizService.update(this.selectedQuiz).subscribe(data => {
            console.log(data);
            this.selectedQuiz = data;
            this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'Quiz updated successfully',
                life: 4000
            });
            this.router.navigate(['/admin/quiz-preview-prof']);
        }, error => {
            console.log(error);
            this.messageService.add({
                severity: 'error',
                summary: 'Error!',
                detail: 'Error to update quiz. please try again !',
                life: 3000
            });
        });
    }
}
