import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getloginloading, getlogivalues } from 'src/app/Selectors/login-selector';
import { AccountService } from 'src/app/service/account.service';
import {login} from "../../model/login-model";
import {NgForm} from "@angular/forms"

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterContentInit  {
  adminform:NgForm;
  @ViewChild('adminform') currentForm: NgForm;
  getlogin:login;
  updatedval:login;
  adminid:string
  constructor(private router:Router, private route:ActivatedRoute , private service:AccountService , private store:Store) { }

  ngOnInit(): void {
    this.getloginvalue();
   this.adminid=this.route.snapshot.paramMap.get("id");
  }
 ngAfterContentInit(){

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
        this.getlogin=data;
         
       }
       else{
        this.getlogin=data.result[0];
       }
    })
  }
  onsignUp(val, valid){
    if(valid){
      val.id=this.adminid;
    this.updatedval=val;
    // console.log(this.updatedval);
    if(this.adminid){
      const getResponse$=this.service.updateAccount(this.updatedval);
      getResponse$.subscribe(data=>{
        console.log(data);
        if(data.status == true){
          alert("account successfully Updated");
          this.router.navigate(["/Home"]);
        }
      })
    }
    else{
      alert("You have to login first to Update account");
    }
    }
  }
}
