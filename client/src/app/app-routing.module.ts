import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { LogInComponent } from "./components/log-in/log-in.component"
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { JoblistComponent } from './components/joblist/joblist.component';
import { PostjobComponent } from "./components/postjob/postjob.component";
import { HeaderComponent } from './components/layout/header/header.component'
import { UpdateJobComponent } from "./components/update-job/update-job.component"
import { InterviewComponent } from "./components/interview/interview.component";
import { JobdetailsComponent } from "./components/jobdetails/jobdetails.component"
import {AccountComponent} from "./components/account/account.component"
const routes: Routes = [

  {
    path: "", redirectTo: "Home", pathMatch: "full"
  },

  {
    path: "Home", component: HomeComponent, data: {
      animation: "homepage"
   },
  },
  {
    path:"Account", component:AccountComponent, 
  },

  {
    path: "jobdetail" , component: JobdetailsComponent,
  }, 
  
  {
    path: "Hotarticle", component: InterviewComponent, 
  },
  {
    path: "UpdateJob", component: UpdateJobComponent, 
  },
  
  {
    path: "login", component: LogInComponent, data: {
      animation: "login"
    }
  },
  {
    path: "signup", component: SignUpComponent
  },
  {
    path: "joblist", component: JoblistComponent, data: { animation: "joblist" },
  },
  {
    path: "postjob", component: PostjobComponent, data: { animation: "postjob" },
  },
  {
    path: "header", component: HeaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
