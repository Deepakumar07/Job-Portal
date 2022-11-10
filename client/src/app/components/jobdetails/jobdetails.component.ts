import { AfterContentInit, AfterViewInit, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router"
import {joblist} from "../../model/joblist-model";
import {JobreduxService} from "../../service/job-redux";
import {applyjob} from "../../model/applyJob"
import {AccountService} from "../../service/account.service"
@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.css']
})
export class JobdetailsComponent implements OnInit ,AfterContentInit, OnDestroy, DoCheck{
  applyjobdetail:applyjob;
  similarjobs:joblist[]=[];
  jobdetail: joblist[]=[];
  id:string;
  arrayslice:number=2;

  constructor(private route:ActivatedRoute,private router:Router, private ReduxService:JobreduxService, private service:AccountService ) {

    this.id= this.route.snapshot.paramMap.get("id");
   }

  ngOnInit(): void {
    
    this.getupdatedetail();
    
  }
  ngDoCheck(){
    this.id= this.route.snapshot.paramMap.get("id");
  }
  ngOnDestroy(){
    this.jobdetail=[];
    this.similarjobs=[];
  }

  ngAfterContentInit(){
    this.getSimilarJobs();

  }
 

  getSimilarJobs(){

    let similarjob=this.jobdetail[0].jobtype;
    // console.log(similarjob);
   const getjobslist$ = this.ReduxService.getalljobs(false)[1];
   getjobslist$.subscribe(data=>{
    //  console.log(data);
     data.forEach(element => {
       if(element.jobtype == similarjob ){
         this.similarjobs.push(element);
        //  console.log(this.similarjobs);
       }
     });
   })
  }

  getupdatedetail(){

    const getjobslist$ = this.ReduxService.getalljobs(false)[1];
    const getjobsError$ = this.ReduxService.getalljobs(false)[2];
    
    getjobslist$.subscribe(result=>{
      result.forEach(element => {
        if(element._id == this.id ){
          this.jobdetail.push(element);
        }
         
      });


      // console.log(this.jobdetail);
    }),error=>{
      getjobsError$.subscribe(data=>{
        console.log(data);
      })
    }
  }
  jobdetails(id){
    // console.log(id);
    this.router.navigate(["/jobdetail", { id }]);
  }
  loadless(){
    this.arrayslice=2;
    
  }

  loadmore(){
    this.arrayslice=100;
    
  }
  applyjob(val){
    let valid:boolean=true;
    // console.log(this.id);
    val.job_id=this.id;
    this.applyjobdetail=val;
    // console.log(this.applyjobdetail);
    var email_regex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(this.applyjobdetail.app_name == "" || this.applyjobdetail.app_name == null){
      alert("Please enter correct applicant name");
      valid=false;
    }
    else if(this.applyjobdetail.app_email == "" || this.applyjobdetail.app_email == null){
      alert("Please Enter email");
      valid=false
    }
    else if(!email_regex.test(this.applyjobdetail.app_email)){
      alert("Please enter valid email");
      valid=false;
    }
    else if(this.applyjobdetail.app_number == null || this.applyjobdetail.app_number.toString().length < 10){
      alert("please enter valid phone Number");
      valid=false;
    }
    else if(this.applyjobdetail.cov_letter == ""|| this.applyjobdetail.cov_letter == null || this.applyjobdetail.cov_letter.length < 20){
      alert("Please enter minimum 20 character in cover letter");
      valid=false;
    }
    else if(valid){
      const getapplyJobResponce$=this.service.applyJobs(this.applyjobdetail);
      getapplyJobResponce$.subscribe(data=>{
        // console.log(data.status);
        if(data.status == true){
          alert("Applied Successfully");
        }
        else{
          alert("something went wrong");
        }
      })
      
    }
  }
  
}
