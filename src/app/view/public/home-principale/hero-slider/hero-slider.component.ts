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

    sliderNavData = [
        {
            id: 1,
            img: 'assets/img/slider/nav/slider-nav-4.jpg',
            title: '1 on 1 or Group classes',
            subtitle: 'classes with a teacher',
            bgColor: 'orange-bg',
        },
        {
            id: 2,
            img: 'assets/img/slider/nav/slider-nav-1.jpg',
            title: '60 minutes',
            subtitle: 'lesson duration',
            bgColor: 'blue-bg',
        },
        {
            id: 3,
            img: 'assets/img/slider/nav/slider-nav-2.jpg',
            title: '2-3 times a week',
            subtitle: 'recommended intensity',
            bgColor: 'pink-bg',
        },
        {
            id: 4,
            img: 'assets/img/slider/nav/slider-nav-3.jpg',
            title: 'Teacher',
            subtitle: 'local or native speaker',
            bgColor: 'green-bg',
        },
    ];

    constructor(public translate: TranslateService) {
    }

    ngOnInit(): void {
    }

}
