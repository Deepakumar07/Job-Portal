import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router"
import {JobreduxService} from "../../service/job-redux"
import {joblist} from "../../model/joblist-model";
import {AccountService} from "../../service/account.service"

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.css']
})
export class UpdateJobComponent implements OnInit, AfterContentInit {
  jobdetail: joblist[]=[];
  updatedvalues:joblist;
  id:string 
  updatejob:any;
  constructor(private route:ActivatedRoute,private router:Router, private ReduxService:JobreduxService, private service:AccountService ) { }

  ngOnInit(): void {
  this.id= this.route.snapshot.paramMap.get("id"); 
  }
  ngOnDestroy(){
    this.jobdetail=[];
  }
  ngAfterContentInit(){

    this.getupdatedetail();

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
  onUpdate(val , valid){
    if(valid){
   
      val.id=this.id
      this.updatedvalues=val;
      // console.log(this.updatedvalues);  
      if(val.featured == ""){
        alert("Select Featured or Not");
      }
      else{
        const getUpdateJobResponce$=this.service.updatejobs(this.updatedvalues);
        getUpdateJobResponce$.subscribe(data=>{
          if(data.status == true){
            alert("Job successfully Updated");
            this.ReduxService.getalljobs(true);

          }
          else{
            alert(`error Occured ${data.Error}`);
          }
        })
      }
    }
      
    }
  

}
