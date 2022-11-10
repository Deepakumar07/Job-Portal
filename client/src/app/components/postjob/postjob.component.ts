import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getloginloading, getlogivalues } from 'src/app/Selectors/login-selector';
import {joblist} from "../../model/joblist-model"
import {AccountService} from "../../service/account.service";
import {JobreduxService} from "../../service/job-redux"

@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit, AfterContentInit {
  postjob:joblist[];
  adminid:string;
  

  constructor(private service:AccountService,private store:Store ,private ReduxService:JobreduxService) { }

  ngOnInit(): void {
  }
  ngAfterContentInit(){

    this.getloginvalue();
  }
  getloginvalue(){

    const loginloading$=this.store.select(getloginloading)
    loginloading$.subscribe(data=>{
      // console.log(data);
    });
    const loginvalues$=this.store.select(getlogivalues);
    loginvalues$.subscribe(data=>{
      // console.log(data);
      if(!data.result){
        this.adminid=data.id;
         
       }
       else{
        this.adminid=data.result[0]._id;
       }
    })
  }

  Onsubmit(val, valid){
    if(valid){
       // console.log(this.adminid);
    val.admin=this.adminid;
    this.postjob=val;
    // console.log(this.postjob);
    if(!val.admin){
      alert("You should have to login again");
    }
    else if(val.featured == ""){
      alert("Select Featured or Not");
    }
    else{
      const postjob$ =this.service.postJob(this.postjob);
      postjob$.subscribe(data=>{
        if(data){
          this.ReduxService.getalljobs(true);
        }
        alert(data.status);
      })
    }
    }
   
  }

}
