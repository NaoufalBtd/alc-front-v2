import {Component, OnInit} from '@angular/core';
import SwiperCore, {Autoplay} from 'swiper';
import {TranslateService} from '@ngx-translate/core';

SwiperCore.use([Autoplay]);

@Component({
    selector: 'app-home-three-testimonial',
    templateUrl: './home-three-testimonial.component.html',
    styleUrls: ['./home-three-testimonial.component.scss']
})
export class HomeThreeTestimonialComponent implements OnInit {
    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    sliderData = [
        {
            id: 1,
            img: 'assets/img/testimonial/home-3/testi-1.jpg',
            name: 'Youssef EL MOUDENE',
            comment: 'كنت كانمشي لواحد center كاين ف centre ville و مع حكم الخدمة ديالي ما كانش عندي الوقت باش نمشي و نجي ديما لcenter زائد ما كانش عندهم توقيت مناسب ليا.الحمد لله شهرين هادي مع EngFlexy center أنا لي اختارت التوقيت اللي ديالي و بلا مانبقى غادي جاي لcentre ville كانقرا من الدار عندي و شي مرات من لbureau ديالي.',
            direction: 'rtl',
            work: 'Employed'
        },
        {
            id: 2,
            img: 'assets/img/testimonial/home-3/testi-2.jpg',
            name: 'Khadija Alioui',
            comment: 'Lorsque j\'ai décidé de commencer à étudier la langue anglaise, pendant environ un mois, j\'ai parcouru très méticuleusement tous les centres, comparé, calculé ce qui était le plus rentable. La même illusion de choix a été créée, mais je ne pouvais toujours rien choisir. Jusqu\'à ce que j\'obtienne une leçon gratuite à Engflexy. Ici, j\'ai d\'abord attiré l\'attention sur le fait que ce centre cherche la motivation de chaque étudiant, essayant d\'intéresser tout le monde. \n' +
                'Merci à tous et surtout monsieur James))',
            direction: 'ltr',
            work: 'Student'
        },
        {
            id: 3,
            img: 'assets/img/testimonial/home-3/testi-3.jpg',
            name: 'Khalid Zouani',
            comment: 'ماعمري فحياتي تخيلت أنه فالمغرب كاين مركز ديال الإنجليزية متطور لهاد الدرجة،الصراحة ما عندي ما نقول😌\n' +
                'من الطريقة ديال التدريس لInteractive platform👌🏾',
            direction: 'rtl',
            work: 'Employed'
        },
    ];
    images: any = [
        {
            previewImageSrc: 'assets/img/galeria/1.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/1-1.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/4.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/5.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/6.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/7.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/8.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/9.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/10.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/11.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/12.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/13.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/2.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/3.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/14.webp',
        },
        {
            previewImageSrc: 'assets/img/galeria/15.webp',
        }
    ];

    constructor(public translate: TranslateService) {
    }

    ngOnInit(): void {
    }

}
