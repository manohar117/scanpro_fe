import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewFileComponent } from './new-file/new-file.component';
import { ShowImgComponent } from './show-img/show-img.component';
import { RepoHomeComponent } from './repo-home/repo-home.component';
import { RepoManageComponent } from './repo-manage/repo-manage.component';
import { ReactIntegrationComponent } from './react-integration/react-integration.component';

import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthPageComponent } from './auth-page/auth-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    NewFileComponent,
    ShowImgComponent,
    RepoHomeComponent,
    RepoManageComponent,
    ReactIntegrationComponent,
    EmailVerificationComponent,
    ResetPasswordComponent,
    AuthPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
