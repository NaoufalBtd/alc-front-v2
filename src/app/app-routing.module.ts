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
import {LoginAdminComponent} from './view/public/login-admin/login-admin.component';
import {LoginProfComponent} from './view/public/login-prof/login-prof.component';
import {LoginEtudiantComponent} from './view/public/login-etudiant/login-etudiant.component';
import {SectionSimulateComponent} from './view/prof/learn-teacher/section-simulate/section-simulate.component';
import {InscriptionAdminComponent} from './view/public/inscription-admin/inscription-admin.component';
import {InscriptionProfComponent} from './view/public/inscription-prof/inscription-prof.component';
import {QuizCreateComponent} from './view/admin/quiz/quiz-create/quiz-create.component';
import {QuizEtudiantViewComponent} from './view/etudiant/Quiz/quiz-etudiant-view/quiz-etudiant-view.component';
import {ProfesseurListComponent} from './view/admin/professeur/professeur-list/professeur-list.component';
import {EtudiantParcoursComponent} from './view/etudiant/learn-etudiant/etudiant-parcours/etudiant-parcours.component';
import {EtudiantCoursesComponent} from './view/etudiant/learn-etudiant/etudiant-courses/etudiant-courses.component';
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
import {DashboardDemoComponent} from './view/public/landing/dashboarddemo.component';
import {AdminComponent} from './view/admin/admin.component';
import {PublicComponent} from './view/public/public.component';
import {ProfComponent} from './view/prof/prof.component';
import {EtudiantComponent} from './view/etudiant/etudiant.component';
import {SyntheseSessionComponent} from './view/prof/synthese-session/synthese-session.component';
import {QuizPreviewProfComponent} from './view/prof/quiz-preview-prof/quiz-preview.component';
import {GroupeEtude} from './controller/model/groupe-etude.model';
import {GroupeEtudeComponent} from './view/admin/groupe-etude/groupe-etude.component';
import {GroupeEtudeCreateComponent} from './view/admin/groupe-etude/groupe-etude-create/groupe-etude-create.component';
import {GroupeEtudiantComponent} from './view/admin/groupe-etudiant/groupe-etudiant.component';
import {EtudiantsComponent} from './view/admin/etudiants/etudiants.component';
import {HomeWorkComponentComponent} from './view/admin/home-work-component/home-work-component.component';
import {HomeWOrkEtudiant} from './controller/model/home-work-etudiant.model';
import {HomeWorkEtudiantComponent} from './view/etudiant/homeWork/home-work-etudiant/home-work-etudiant.component';
import {ScheduleComponent} from '@syncfusion/ej2-angular-schedule';
import {AppComponent} from './app.component';
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
import {LoginComponent} from './view/public/login/login.component';
import {ConnectedStudentComponent} from './view/prof/connected-student/connected-student.component';
import {EtudiantinscriptionComponent} from './view/public/etudiantinscription/etudiantinscription.component';
import {ProfinscriptionComponent} from './view/public/profinscription/profinscription.component';
import {BonusProfComponent} from './view/admin/bonus-prof/bonus-prof.component';
import {SalarylistComponent} from './view/admin/salarylist/salarylist.component';
import {ScheduleProfComponent} from './view/admin/professeur/schedule-prof/schedule-prof.component';
import {PackStudentComponent} from './view/admin/pack-student/pack-student.component';
import {DriveApiComponent} from './view/admin/drive-api/drive-api.component';
import {ManageSectionComponent} from './view/admin/manage-section/manage-section.component';
import {HomeWorkPreviewComponent} from './view/admin/home-work-preview/home-work-preview.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'admin', component: AdminComponent,
                children: [
                    {path: 'parcours', component: LearnComponent},
                    {path: 'create-section-items', component: SectionItemComponent},
                    {path: 'preview-section-items', component: SectionItemPreviewComponent},
                    {path: 'quiz-preview-prof', component: QuizPreviewComponent},
                    {path: 'quiz-create', component: QuizCreateComponent},
                    {path: 'profile', component: UserProfileComponent},
                    {path: 'quiz-update', component: QuizUpdateComponent},
                    {path: 'view-quiz-etudiant', component: ViewQuizEtudiantComponent},
                    {path: 'inscription', component: InscriptionsComponent},
                    {path: 'teacher-lists', component: ProfesseurListComponent},
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
                    {path: 'salarylist', component: SalarylistComponent},
                    {path: 'manage-section', component: ManageSectionComponent},
                    {path: 'home-work-review', component: HomeWorkPreviewComponent}
                ]
            },
            {
                path: 'prof', component: ProfComponent,
                children: [
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
                    {path: 'sections-simulate', component: SectionSimulateComponent},
                    {path: 'sections', component: SectionsComponent},
                    {path: 'cours', component: CoursesComponent},
                    {path: 'quiz-preview-teacher', component: QuizPreviewProfComponent},
                    {path: 'profile', component: ProfProfileComponent},
                    {path: 'etudiantReviewcomment', component: EtudiantcommentreviewComponent},
                    {path: 'sudents-homework', component: StudentsHomeworkComponent},
                    {path: 'paiementlist', component: PaiementlistComponent},
                    {path: 'connected-student', component: ConnectedStudentComponent}
                ]
            },
            {
                path: 'etudiant', component: EtudiantComponent,
                children: [
                    {path: 'faq-student', component: FaqStudentListComponent},
                    {path: 'news-student', component: NewsEtudiantListComponent},
                    {path: 'schedule-student', component: ScheduleStudentComponent},
                    {path: 'etudiant-simulate-sections', component: StudentSimulateSectionComponent},
                    {path: 'faq-student-contact-list', component: FaqStudentContactListeComponent},
                    {path: 'etudiant-cours', component: EtudiantCoursesComponent},
                    {path: 'quiz-view', component: QuizEtudiantViewComponent},
                    {path: 'quiz-take', component: QuizTakeComponent},
                    {path: 'etudiant-simulate-sections/quiz-review', component: QuizEtudiantViewComponent},
                    {path: 'etudiant-simulate-sections/homeWork', component: HomeWorkEtudiantComponent},
                    {path: 'homeWorkEtudiant', component: HomeWorkEtudiantComponent},
                    {path: 'homeWorkEtudiantResult', component: HomeWorkResultComponent},
                    {path: 'profile', component: EtudiantProfileComponent}

                ]
            },
            {
                path: '', component: PublicComponent,
                children: [
                    {path: '', component: DashboardDemoComponent},
                    {path: 'public/login-admin', component: LoginAdminComponent},
                    {path: 'public/login-prof', component: LoginProfComponent},
                    {path: 'public/login-etudiant', component: LoginEtudiantComponent},
                    {path: 'public/inscriptionAdmin', component: InscriptionAdminComponent},
                    {path: 'public/inscriptionTeacher', component: InscriptionProfComponent},
                    {path: 'public/etudiantinscriptionComponent', component: EtudiantinscriptionComponent},
                    {path: 'public/profinscriptionComponent', component: ProfinscriptionComponent},
                    {path: 'public/inscriptionEtudiant', component: FormLayoutDemoComponent},
                    {path: 'resetPassword', component: ResetPasswordComponent},
                    {path: 'login', component: LoginComponent},

                ]
            },
            {path: '**', component: PageNotFoundComponent},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
