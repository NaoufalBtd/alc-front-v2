import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {PopularTeachersComponent} from './popular-teachers/popular-teachers.component';
import {HomeThreeTestimonialComponent} from './home-three-testimonial/home-three-testimonial.component';
import {HomeThreeComponent} from './home-three-main/home-three.component';
import {HomeThreeCtaComponent} from './home-three-cta/home-three-cta.component';
import {HomeThreeCoursesComponent} from './home-three-courses/home-three-courses.component';
import {HeroSliderComponent} from './hero-slider/hero-slider.component';
import {HeaderThreeComponent} from './header-three/header-three.component';
import {FooterComponent} from './footer/footer.component';
import {BrandAreaComponent} from './brand-area/brand-area.component';
import {AboutAreaComponent} from './about-area/about-area.component';
import {SwiperModule} from 'swiper/angular';
import {BlogTwoComponent} from './blog-two/blog-two.component';
import {SignInMainComponent} from './sign-in/sign-in-main/sign-in-main.component';
import {SignInAreaComponent} from './sign-in/sign-in-area/sign-in-area.component';
import {HeaderTwoComponent} from './header-two/header-two.component';
import {FormsModule} from '@angular/forms';
import {BecomeTeacherComponent} from './become-teacher/become-teacher.component';
import {FormLayoutDemoComponent} from '../Inscription-student/formlayoutdemo.component';
import {RippleModule} from 'primeng/ripple';
import {ButtonModule} from 'primeng/button';
import {InscriptionStudentMainComponent} from '../inscription-student-main/inscription-student-main.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {ContactAreaComponent} from './contact-area/contact-area.component';
import {HeaderOneComponent} from './header-one/header-one.component';
import {CoursesPageComponent} from './courses/courses-page/courses-page.component';
import {CoursesPageCoursesAreaComponent} from './courses/courses-page-courses-area/courses-page-courses-area.component';
import {CtaComponent} from './cta/cta.component';
import {CourseGridComponent} from './courses/course-grid/course-grid.component';
import {CourseListComponent} from './courses/course-list/course-list.component';
import {PaginationComponent} from './courses/pagination/pagination.component';
import {BlogComponent} from '../blog/blog-main/blog.component';
import {BlogAreaComponent} from '../blog/blog-area/blog-area.component';
import {BlogDetailsAreaComponent} from '../blog-details/blog-details-area/blog-details-area.component';
import {BlogDetailsTitleComponent} from '../blog-details/blog-details-title/blog-details-title.component';
import {BlogDetailsMainComponent} from '../blog-details/blog-details-main/blog-details-main.component';
import {BlogSidebarComponent} from '../blog/blog-sidebar/blog-sidebar.component';
import {CourseDetailsAreaComponent} from '../course-details/course-details-area/course-details-area.component';
import {CourseDetailsComponent} from '../course-details/course-details-main/course-details.component';
import {DialogModule} from 'primeng/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {PrivacyPolicyComponent} from '../privacy-policy/privacy-policy.component';
import {TermOfServiceComponent} from '../term-of-service/term-of-service.component';
import {ContactUsMainComponent} from './contact-us/contact-us-main/contact-us-main.component';
import {PaimentComponent} from './paiment/paiment/paiment.component';
import {MainPaimentComponent} from './paiment/main-paiment/main-paiment.component';
import {StepsModule} from 'primeng/steps';
import {TooltipModule} from 'primeng/tooltip';
import {InputTextModule} from 'primeng/inputtext';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {FilterCoursesComponent} from './courses/filter-courses/filter-courses.component';
import {PricesComponent} from './prices/prices.component';
import {AdvantagesComponent} from './advantages/advantages.component';
import {HeaderFourComponent} from './header-four/header-four.component';
import {PaimentOkComponent} from './paiment/paiment-ok/paiment-ok.component';
import {PaimentFailComponent} from './paiment/paiment-fail/paiment-fail.component';
import {PaimentBackComponent} from './paiment/paiment-back/paiment-back.component';
import {GalleriaModule} from 'primeng/galleria';
import { PublicFaqComponent } from './FAQ/public-faq/public-faq.component';
import {AccordionModule} from 'primeng/accordion';


@NgModule({
    declarations: [
        PopularTeachersComponent,
        HomeThreeTestimonialComponent,
        BlogTwoComponent,
        HomeThreeComponent,
        HomeThreeCtaComponent,
        HomeThreeCoursesComponent,
        CourseDetailsAreaComponent,
        CourseDetailsComponent,
        HeroSliderComponent,
        HeaderThreeComponent,
        FooterComponent,
        SignInMainComponent,
        BlogComponent,
        BlogAreaComponent,
        BlogDetailsAreaComponent,
        BlogDetailsTitleComponent,
        BlogDetailsMainComponent,
        BlogSidebarComponent,
        HeaderTwoComponent,
        SignInAreaComponent,
        BrandAreaComponent,
        AboutAreaComponent,
        BecomeTeacherComponent,
        InscriptionStudentMainComponent,
        FormLayoutDemoComponent,
        BreadcrumbComponent,
        CoursesPageComponent,
        CoursesPageCoursesAreaComponent,
        CourseGridComponent,
        CourseListComponent,
        PaginationComponent,
        ContactAreaComponent,
        HeaderOneComponent,
        CtaComponent,
        ContactUsComponent,
        AboutUsComponent,
        PrivacyPolicyComponent,
        TermOfServiceComponent,
        ContactUsMainComponent,
        PaimentComponent,
        MainPaimentComponent,
        FilterCoursesComponent,
        PricesComponent,
        AdvantagesComponent,
        HeaderFourComponent,
        PaimentOkComponent,
        PaimentFailComponent,
        PaimentBackComponent,
        PublicFaqComponent,
    ],
    providers: [
        Clipboard
    ],
    imports: [
        CommonModule,
        RouterModule,
        SwiperModule,
        FormsModule,
        RippleModule,
        ButtonModule,
        DialogModule,
        TranslateModule,
        MessagesModule,
        ToastModule,
        StepsModule,
        TooltipModule,
        InputTextModule,
        ClipboardModule,
        GalleriaModule,
        AccordionModule

    ],
    exports: [
        HeaderThreeComponent,
        HeaderTwoComponent,
        FooterComponent,
        ContactUsComponent,
        HeaderOneComponent,
        BreadcrumbComponent,
        FilterCoursesComponent,
        CourseDetailsAreaComponent,
        PaimentComponent,
        HeaderFourComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EducalModule {
}
