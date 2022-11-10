import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {login} from "../../model/login-model";
import {AccountService} from "../../service/account.service";
import {NgForm} from "@angular/forms"
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupform:NgForm;
  @ViewChild('signupform') currentForm: NgForm;
  signUp:login[];
  
  constructor(private service:AccountService, private router:Router) { }

  ngOnInit(): void {

      // this.signUp=<login>{

      //   username:"",
      //   password:"",
      //   email:"",
      //   nationality:"",
      //   university:"",
      //   highest_Qualification:"",
      //   major:"",
      //   job_prefrence:"",
      // }
  }
  onsignUp(val, valid){
    if(valid){
      this.signUp=val;
      // console.log(this.signUp);
      const getadduserResponce$=this.service.addnewuser(this.signUp);
      
      getadduserResponce$.subscribe(data=>{
        // console.log(data.code);
        if(data.code == 200){
          alert("SignUp successfull");
          this.router.navigate(["/login"]);
        }
        else{
          alert("signUP faild");
        }
      })

    }

  }
}
