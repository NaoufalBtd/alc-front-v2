import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay } from 'swiper';
import {TranslateService} from '@ngx-translate/core';

SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-brand-area',
  templateUrl: './brand-area.component.html',
  styleUrls: ['./brand-area.component.scss']
})
export class BrandAreaComponent implements OnInit {

  brandData = [
    {
      id: "1",
      img: "assets/img/brand/brand-1.webp",
    },
    {
      id: "2",
      img: "assets/img/brand/brand-2.webp",
    },
    {
      id: "3",
      img: "assets/img/brand/brand-3.webp",
    },
    {
      id: "4",
      img: "assets/img/brand/brand-4.webp",
    },
    {
      id: "5",
      img: "assets/img/brand/brand-5.webp",
    },
    {
      id: "6",
      img: "assets/img/brand/brand-6.webp",
    },
  ]

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
