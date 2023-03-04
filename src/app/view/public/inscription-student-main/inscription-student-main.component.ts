import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
    selector: 'app-inscription-student-main',
    templateUrl: './inscription-student-main.component.html',
    styleUrls: ['./inscription-student-main.component.scss']
})
export class InscriptionStudentMainComponent implements OnInit {
    showCoupon = false;
    countdownDate: Date = new Date('2023-03-08 12:00:00'); // Set the countdown date and time
    countdown: any = {};

    constructor(private translate: TranslateService,
                private router: Router,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        const timer = setInterval(() => {
            clearInterval(timer);
            this.showCoupon = true;
        }, 3000);

        setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }


    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.countdownDate.getTime() - now;

        if (distance < 0) {
            this.countdown = {days: 0, hours: 0, minutes: 0, seconds: 0};
        } else {
            this.countdown = {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            };
        }
    }

    routeToCourses() {
        this.router.navigate(['/courses/Group']);
    }
}
