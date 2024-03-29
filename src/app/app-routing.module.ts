import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormLayoutDemoComponent} from './view/public/Inscription-student/formlayoutdemo.component';
import {LearnComponent} from './view/admin/learn/learn.component';
import {SectionsComponent} from './view/prof/learn-teacher/sections/sections.component';
import {CoursesComponent} from './view/prof/learn-teacher/courses/courses.component';
import {EdCoursesComponent} from './view/prof/learn-teacher/parcours/ed-courses.component';
import {SalaryComponent} from './view/prof/salary-teacher/salary/salary.component';
import {HomeComponent} from './view/prof/home/home.component';
import {InscriptionsComponent} from './view/admin/validate-inscriptions/inscriptions.component';
import {ScheduleLocalComponent} from './view/prof/schedule/schedule.component';
import {QuizPreviewComponent} from './view/admin/quiz/quiz-preview/quiz-preview.component';
import {ClassRoomListComponent} from './view/prof/Classes/profclasses/class-room-list/class-room-list.component';
import {FaqAnswerComponent} from './view/admin/faq-admin/faq-answer/faq-answer.component';
import {NewsAdminListComponent} from './view/admin/news-admin/news-admin-list/news-admin-list.component';
import {NewsTeacherListComponent} from './view/prof/news/news-teacher-list/news-teacher-list.component';
import {FaqListComponent} from './view/prof/faq/faq-list/faq-list.component';
import {SectionSimulateComponent} from './view/prof/learn-teacher/section-simulate/section-simulate.component';
import {QuizCreateComponent} from './view/admin/quiz/quiz-create/quiz-create.component';
import {QuizEtudiantViewComponent} from './view/etudiant/Quiz/quiz-etudiant-view/quiz-etudiant-view.component';
import {ProfesseurListComponent} from './view/admin/professeur/professeur-list/professeur-list.component';
import {StudentSimulateSectionComponent} from './view/etudiant/learn-etudiant/student-simulate-section/student-simulate-section.component';
import {RecommendAdminComponent} from './view/admin/recommend-admin/recommend-admin.component';
import {FaqCreateComponent} from './view/admin/faq-admin/faq-create/faq-create.component';
import {FaqStudentListComponent} from './view/etudiant/FAQ-etudiant/faq-student/faq-student-list/faq-student-list.component';
import {FaqAdminListComponent} from './view/admin/faq-admin/faq-admin-list/faq-admin-list.component';
import {FaqContactListComponent} from './view/prof/faq/faq-contact-list/faq-contact-list.component';
import {FaqStudentContactListeComponent} from './view/etudiant/FAQ-etudiant/faq-student-contact-liste/faq-student-contact-liste.component';
import {NewsEtudiantListComponent} from './view/etudiant/news-etudiant/news-etudiant-list/news-etudiant-list.component';
import {ScheduleAdminComponent} from './view/admin/schedule-admin/schedule-admin.component';
import {ScheduleStudentComponent} from './view/etudiant/schedule-student/schedule-student.component';
import {QuizUpdateComponent} from './view/admin/quiz/quiz-update/quiz-update.component';
import {QuizTakeComponent} from './view/etudiant/Quiz/quiz-take/quiz-take.component';
import {SectionItemComponent} from './view/admin/learn/section-item/section-item.component';
import {ViewQuizEtudiantComponent} from './view/admin/view-quiz-etudiant/view-quiz-etudiant.component';
import {SectionItemPreviewComponent} from './view/admin/learn/section-item-preview/section-item-preview.component';
import {RecommendationTeacherComponent} from './view/prof/recommendation-teacher/recommendation-teacher.component';
import {AdminComponent} from './view/admin/admin.component';
import {PublicComponent} from './view/public/public.component';
import {ProfComponent} from './view/prof/prof.component';
import {EtudiantComponent} from './view/etudiant/etudiant.component';
import {SyntheseSessionComponent} from './view/prof/synthese-session/synthese-session.component';
import {QuizPreviewProfComponent} from './view/prof/quiz-preview-prof/quiz-preview.component';
import {GroupeEtudeComponent} from './view/admin/groupe-etude/groupe-etude.component';
import {GroupeEtudiantComponent} from './view/admin/groupe-etudiant/groupe-etudiant.component';
import {EtudiantsComponent} from './view/admin/etudiants/etudiants.component';
import {HomeWorkComponentComponent} from './view/admin/home-work-component/home-work-component.component';
import {HomeWorkEtudiantComponent} from './view/etudiant/homeWork/home-work-etudiant/home-work-etudiant.component';
import {PageNotFoundComponent} from './view/public/page-not-found/page-not-found.component';
import {UserProfileComponent} from './view/admin/user-profile/user-profile.component';
import {ProfProfileComponent} from './view/prof/prof-profile/prof-profile.component';
import {EtudiantProfileComponent} from './view/etudiant/etudiant-profile/etudiant-profile.component';
import {HomeWorkResultComponent} from './view/etudiant/homeWork/home-work-result/home-work-result.component';
import {SessioncoursComponent} from './view/admin/sessioncours/sessioncours.component';
import {EtudiantcommentreviewComponent} from './view/prof/etudiantcommentreview/etudiantcommentreview.component';
import {PaiementlistComponent} from './view/prof/paiementlist/paiementlist.component';
import {StudentsHomeworkComponent} from './view/prof/students-homework/students-homework.component';
import {ResetPasswordComponent} from './view/public/reset-password/reset-password.component';
import {ConnectedStudentComponent} from './view/prof/connected-student/connected-student.component';
import {BonusProfComponent} from './view/admin/bonus-prof/bonus-prof.component';
import {SalarylistComponent} from './view/admin/salarylist/salarylist.component';
import {ScheduleProfComponent} from './view/admin/professeur/schedule-prof/schedule-prof.component';
import {PackStudentComponent} from './view/admin/pack-student/pack-student.component';
import {DriveApiComponent} from './view/admin/drive-api/drive-api.component';
import {ManageSectionComponent} from './view/admin/manage-section/manage-section.component';
import {HomeWorkPreviewComponent} from './view/admin/home-work-preview/home-work-preview.component';
import {ComplaintComponent} from './view/admin/complaint/complaint.component';
import {ReclamationProfComponent} from './view/prof/reclamation-prof/reclamation-prof.component';
import {ReclamationEtudiantComponent} from './view/etudiant/reclamation-etudiant/reclamation-etudiant.component';
import {TypeReclamationComponent} from './view/admin/type-reclamation/type-reclamation.component';
import {DragHomeWorkComponent} from './view/etudiant/homeWork/drag-home-work/drag-home-work.component';
import {InvitedStudentComponent} from './view/etudiant/invited-student/invited-student.component';
import {HomePageEtudiantComponent} from './view/public/home-page-etudiant/home-page-etudiant.component';
import {EtudiantpurchasepackComponent} from './view/etudiant/etudiantpurchasepack/etudiantpurchasepack.component';
import {FreetriallessonComponent} from './view/etudiant/freetriallesson/freetriallesson.component';
import {MoreInformationComponent} from './view/admin/more-information/more-information.component';
import {InfoEtudiantComponent} from './view/admin/info-etudiant/info-etudiant.component';
import {ConnectAsInvitedComponent} from './view/etudiant/connect-as-invited/connect-as-invited.component';
import {ContinueInfoComponent} from './view/etudiant/connect-as-invited/continue-info/continue-info.component';
import {InvitedListeComponent} from './view/admin/invited-liste/invited-liste.component';
import {PromotionComponent} from './view/admin/promotion/promotion.component';
import {MyPromotionListComponent} from './view/etudiant/my-promotion-list/my-promotion-list.component';
import {HomeStudentComponent} from './view/etudiant/home-student/home-student.component';
import {SaveGoogleTokenComponent} from './view/admin/drive-api/save-google-token/save-google-token.component';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {PackDetailsComponent} from './view/etudiant/packs/pack-details/pack-details.component';
import {HomeThreeComponent} from './view/public/home-principale/home-three-main/home-three.component';
import {SignInMainComponent} from './view/public/home-principale/sign-in/sign-in-main/sign-in-main.component';
import {BecomeTeacherComponent} from './view/public/home-principale/become-teacher/become-teacher.component';
import {InscriptionStudentMainComponent} from './view/public/inscription-student-main/inscription-student-main.component';
import {CoursesPageComponent} from './view/public/home-principale/courses/courses-page/courses-page.component';
import {BlogComponent} from './view/public/blog/blog-main/blog.component';
import {BlogDetailsMainComponent} from './view/public/blog-details/blog-details-main/blog-details-main.component';
import {CourseDetailsComponent} from './view/public/course-details/course-details-main/course-details.component';
import {AboutUsComponent} from './view/public/home-principale/about-us/about-us.component';
import {PrivacyPolicyComponent} from './view/public/privacy-policy/privacy-policy.component';
import {TermOfServiceComponent} from './view/public/term-of-service/term-of-service.component';
import {TestLevelComponent} from './view/etudiant/test-level/test-level.component';
import {DiscoverLevelComponent} from './view/public/discover-level/discover-level.component';
import {ContactUsMainComponent} from './view/public/home-principale/contact-us/contact-us-main/contact-us-main.component';
import {MainPaimentComponent} from './view/public/home-principale/paiment/main-paiment/main-paiment.component';
import {TestLevelInstructionsComponent} from './view/public/discover-level/test-level-instructions/test-level-instructions.component';
import {ProfesseurEditComponent} from './view/admin/professeur/professeur-edit/professeur-edit.component';
import {PayNowCoursesComponent} from './view/shared/pay-now-courses/pay-now-courses.component';
import {PayNowCourseDetailComponent} from './view/shared/pay-now-course-detail/pay-now-course-detail.component';
import {PayNowComponent} from './view/shared/pay-now/pay-now.component';
import {PaimentOkComponent} from './view/public/home-principale/paiment/paiment-ok/paiment-ok.component';
import {PaimentFailComponent} from './view/public/home-principale/paiment/paiment-fail/paiment-fail.component';
import {PaimentBackComponent} from './view/public/home-principale/paiment/paiment-back/paiment-back.component';
import {UpgdatePackComponent} from './view/etudiant/upgdate-pack/upgdate-pack.component';
import {PublicFaqComponent} from './view/public/home-principale/FAQ/public-faq/public-faq.component';
import {EmailsComponent} from './view/admin/emails/emails.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'admin', component: AdminComponent,
                children: [
                    {path: 'parcours', component: LearnComponent},
                    {path: 'drag', component: DragHomeWorkComponent},
                    {path: 'create-section-items', component: SectionItemComponent},
                    {path: 'preview-section-items', component: SectionItemPreviewComponent},
                    {path: 'quiz-preview-prof', component: QuizPreviewComponent},
                    {path: 'quiz-create', component: QuizCreateComponent},
                    {path: 'profile', component: UserProfileComponent},
                    {path: 'quiz-update', component: QuizUpdateComponent},
                    {path: 'view-quiz-etudiant', component: ViewQuizEtudiantComponent},
                    {path: 'inscription', component: InscriptionsComponent},
                    {path: 'teacher-lists', component: ProfesseurListComponent},
                    {path: 'teacher-lists/teacher', component: ProfesseurEditComponent},
                    {path: 'teacher-lists/schedule', component: ScheduleProfComponent},
                    {path: 'recommend-admin', component: RecommendAdminComponent},
                    {path: 'sessioncours', component: SessioncoursComponent},
                    {path: 'faq-admin', component: FaqAnswerComponent},
                    {path: 'faq-admin-list', component: FaqAdminListComponent},
                    {path: 'news-admin', component: NewsAdminListComponent},
                    {path: 'schedule', component: ScheduleAdminComponent},
                    {path: 'faq-create', component: FaqCreateComponent},
                    {path: 'students-List', component: EtudiantsComponent},
                    {path: 'groups-List', component: GroupeEtudeComponent},
                    {path: 'groups-students', component: GroupeEtudiantComponent},
                    {path: 'homeWork', component: HomeWorkComponentComponent},
                    {path: 'PackStudent', component: PackStudentComponent},
                    {path: 'homeWork', component: HomeWorkComponentComponent},
                    {path: 'bonus', component: BonusProfComponent},
                    {path: 'driveApi', component: DriveApiComponent},
                    {path: 'driveApi/token', component: SaveGoogleTokenComponent},
                    {path: 'salarylist', component: SalarylistComponent},
                    {path: 'manage-section', component: ManageSectionComponent},
                    {path: 'home-work-review', component: HomeWorkPreviewComponent},
                    {path: 'complaint', component: ComplaintComponent},
                    {path: 'typeofcomplaint', component: TypeReclamationComponent},
                    {path: 'moreInformation', component: MoreInformationComponent},
                    {path: 'infoEtudiant', component: InfoEtudiantComponent},
                    {path: 'invitedList', component: InvitedListeComponent},
                    {path: 'promotion', component: PromotionComponent},
                    {path: 'emails', component: EmailsComponent}
                ]
            },
            {
                path: 'prof', component: ProfComponent,
                children: [
                    {path: '', component: HomeComponent},
                    {path: 'home', component: HomeComponent},
                    {path: 'quiz-preview-prof', component: QuizPreviewComponent},
                    {path: 'courses', component: EdCoursesComponent},
                    {path: 'recommendation-teacher', component: RecommendationTeacherComponent},
                    {path: 'salary', component: SalaryComponent},
                    {path: 'classes', component: ClassRoomListComponent},
                    {path: 'synthese', component: SyntheseSessionComponent},
                    {path: 'schedule', component: ScheduleLocalComponent},
                    {path: 'news-teacher', component: NewsTeacherListComponent},
                    {path: 'faq-teacher', component: FaqListComponent},
                    {path: 'faq-teacher-answer', component: FaqContactListComponent},
                    {path: 'sections-simulate/:id', component: SectionSimulateComponent},
                    {path: 'sections', component: SectionsComponent},
                    {path: 'cours', component: CoursesComponent},
                    {path: 'quiz-preview-teacher', component: QuizPreviewProfComponent},
                    {path: 'profile', component: ProfProfileComponent},
                    {path: 'etudiantReviewcomment', component: EtudiantcommentreviewComponent},
                    {path: 'sudents-homework', component: StudentsHomeworkComponent},
                    {path: 'paiementlist', component: PaiementlistComponent},
                    {path: 'connected-student', component: ConnectedStudentComponent},
                    {path: 'reclamation-prof', component: ReclamationProfComponent}
                ]
            },
            {
                path: 'etudiant', component: EtudiantComponent,
                children: [
                    {path: 'etudiantTrialLesson', component: FreetriallessonComponent},
                    {path: 'dashboard', component: HomeStudentComponent},
                    {path: 'courses', component: EtudiantpurchasepackComponent},
                    {path: 'faq-student', component: FaqStudentListComponent},
                    {path: 'news-student', component: NewsEtudiantListComponent},
                    {path: 'schedule-student', component: ScheduleStudentComponent},
                    {path: 'simulate-sections/:id', component: StudentSimulateSectionComponent},
                    {path: 'faq-student-contact-list', component: FaqStudentContactListeComponent},
                    {path: 'etudiant-cours', component: HomeStudentComponent},
                    {path: 'quiz-view', component: QuizEtudiantViewComponent},
                    {path: 'quiz-take', component: QuizTakeComponent},
                    {path: 'etudiant-simulate-sections/quiz-review', component: QuizEtudiantViewComponent},
                    {path: 'etudiant-simulate-sections/homeWork', component: HomeWorkEtudiantComponent},
                    {path: 'homeWorkEtudiant', component: HomeWorkEtudiantComponent},
                    {path: 'homeWorkEtudiantResult', component: HomeWorkResultComponent},
                    {path: 'profile', component: EtudiantProfileComponent},
                    {path: 'reclamation-etudiant', component: ReclamationEtudiantComponent},
                    {path: 'profile', component: EtudiantProfileComponent},
                    {path: 'test-level', component: TestLevelComponent},
                    {path: 'purchase', component: UpgdatePackComponent},
                    {path: 'inviteStudent', component: InvitedStudentComponent},
                    {path: 'myPromotionList', component: MyPromotionListComponent},
                    {path: 'inviteStudent', component: InvitedStudentComponent},
                    {path: 'pack/:id', component: PackDetailsComponent},
                    {path: '*', component: HomeStudentComponent}
                ]
            },
            {
                path: '', component: PublicComponent,
                children: [
                    {path: '', component: HomeThreeComponent},
                    {path: 'public/home', component: HomeThreeComponent},
                    {path: 'public/etudianthomepage', component: HomePageEtudiantComponent},
                    {path: 'public/etudiantTrialLesson', component: FreetriallessonComponent},
                    {path: 'public/login', component: SignInMainComponent},
                    {path: 'public/inscriptionEtudiant', component: FormLayoutDemoComponent},
                    {path: 'free-trial', component: InscriptionStudentMainComponent},
                    {path: 'book-your-free-trial-session', component: InscriptionStudentMainComponent},
                    {path: 'contact', component: ContactUsMainComponent},
                    {path: 'online-english-level-test', component: DiscoverLevelComponent},
                    {path: 'start-test-level', component: TestLevelInstructionsComponent},
                    {path: 'about-us', component: AboutUsComponent},
                    {path: 'validate-account/:id/:token', component: HomePageEtudiantComponent},
                    {path: 'payment/:id', component: MainPaimentComponent},
                    {path: 'payment/:id/:studentId', component: MainPaimentComponent},
                    {
                        path: 'blog',
                        component: BlogComponent
                    },
                    {
                        path: 'faqs',
                        component: PublicFaqComponent
                    },
                    {
                        path: 'blog-details/:id',
                        component: BlogDetailsMainComponent
                    },
                    {path: 'public/connectAsInvited', component: ConnectAsInvitedComponent},
                    {path: 'public/continueInfo', component: ContinueInfoComponent},
                    {path: 'resetPassword', component: ResetPasswordComponent},
                    {path: 'public/teacher', component: BecomeTeacherComponent},
                    {path: 'courses', component: CoursesPageComponent},
                    {path: 'courses/:group', component: CoursesPageComponent},
                    {path: 'courses/:group/:price', component: CoursesPageComponent},
                    {path: 'courses/:group/:price/:level', component: CoursesPageComponent},
                    {path: 'Privacy', component: PrivacyPolicyComponent},
                    {path: 'user-agreement', component: TermOfServiceComponent},
                    {path: 'course-details/:id', component: CourseDetailsComponent},
                ]
            },
            {path: 'our-packs', component: PayNowCoursesComponent},
            {path: 'pay', component: PayNowComponent},
            {path: 'ok', component: PaimentOkComponent},
            {path: 'fail/:oid', component: PaimentFailComponent},
            {path: 'fail', component: PaimentFailComponent},
            {path: 'back', component: PaimentBackComponent},
            {path: 'our-packs/:id', component: PayNowCourseDetailComponent},
            {path: '*', component: PageNotFoundComponent},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule],
    providers: [
        {provide: LocationStrategy, useClass: PathLocationStrategy}
    ],
})
export class AppRoutingModule {
}
