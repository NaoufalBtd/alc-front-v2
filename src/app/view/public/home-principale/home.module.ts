import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {PopularTeachersComponent} from './popular-teachers/popular-teachers.component';
import {HomeThreeTestimonialComponent} from './home-three-testimonial/home-three-testimonial.component';
import {HomeThreeComponent} from './home-three-main/home-three.component';
import {HomeThreeCtaComponent} from './home-three-cta/home-three-cta.component';
import {HomeThreeCoursesComponent} from './home-three-courses/home-three-courses.component';
import {HeroSliderComponent} from './hero-slider/hero-slider.component';
import {HeaderThreeComponent} from './header-three/header-three.component';
import {AppModule} from '../../../app.module';



@NgModule({
  declarations: [
    PopularTeachersComponent,
    HomeThreeTestimonialComponent,
    HomeThreeComponent,
    HomeThreeCtaComponent,
    HomeThreeCoursesComponent,
    HeroSliderComponent,
    HeaderThreeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EducalModule { }
