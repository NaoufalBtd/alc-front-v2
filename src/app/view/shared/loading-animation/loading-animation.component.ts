import {Component, OnInit} from '@angular/core';
import {AnimationService} from '../../../controller/service/animation.service';

@Component({
    selector: 'app-loading-animation',
    templateUrl: './loading-animation.component.html',
    styleUrls: ['./loading-animation.component.scss']
})
export class LoadingAnimationComponent implements OnInit {


    constructor(private animation: AnimationService) {
    }

    ngOnInit(): void {
    }

    get showAnimation(): boolean {
        return this.animation.showAnimation;
    }

    set showAnimation(value: boolean) {
        this.animation.showAnimation = value;
    }

}
