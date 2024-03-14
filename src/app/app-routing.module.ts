import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NewFileComponent } from './new-file/new-file.component';
import { RepoHomeComponent } from './repo-home/repo-home.component';
import { RepoManageComponent } from './repo-manage/repo-manage.component';
import { ShowImgComponent } from './show-img/show-img.component';

import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthPageComponent } from './auth-page/auth-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path:"repo/:path",component: RepoHomeComponent},
  { path:"manageRepo/:name",component: RepoManageComponent},
  { path:"addDirectory/:path/:type",component: NewFileComponent},
  { path:"showImg/:path/:name",component: ShowImgComponent},
  { path:"authpage",component: AuthPageComponent},
  { path:"email/verification",component: EmailVerificationComponent},
  { path:"reset/password", component : ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
