import {Component, OnInit} from '@angular/core';
import SwiperCore, {Autoplay, EffectFade} from 'swiper';
import {TranslateService} from '@ngx-translate/core';

SwiperCore.use([Autoplay, EffectFade]);

@Component({
    selector: 'app-hero-slider',
    templateUrl: './hero-slider.component.html',
    styleUrls: ['./hero-slider.component.scss']
})
export class HeroSliderComponent implements OnInit {


    constructor(public translate: TranslateService) {
    }

    ngOnInit(): void {

    }

}
