import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common';
import {FacebookLoginProvider,GoogleLoginProvider,SocialAuthServiceConfig,SocialLoginModule,VKLoginProvider} from "angularx-social-login";
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { JoblistComponent } from './components/joblist/joblist.component';
import { PostjobComponent } from './components/postjob/postjob.component';
import {Reducer} from './Reducer/index';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {AccountService} from './service/account.service';
import { UpdateJobComponent } from './components/update-job/update-job.component';
import { InterviewComponent } from './components/interview/interview.component';
import { JobdetailsComponent } from './components/jobdetails/jobdetails.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    SignUpComponent,
    JoblistComponent,
    PostjobComponent,
    UpdateJobComponent,
    InterviewComponent,
    JobdetailsComponent,
    FooterComponent,
    HeaderComponent,
    AccountComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    SocialLoginModule,
    HttpClientModule,
    StoreModule.forRoot(Reducer),   
    
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })

  ],
  exports:[HeaderComponent, FooterComponent],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('561602290896109')
          },
          {
            id:VKLoginProvider.PROVIDER_ID,
            provider:new VKLoginProvider('7624815')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    AccountService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
