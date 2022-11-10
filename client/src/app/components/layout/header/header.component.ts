import { Component, DoCheck, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RemoveLoad } from 'src/app/actions/loginaction';

import { getloginloading, getlogivalues } from 'src/app/Selectors/login-selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
 
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit,DoCheck {

  date = null;
  val:string;
  username:string;
 

  constructor(private router:Router, private store:Store) {
   
    this.getloginvalue();
  }

  ngOnInit(){
   
    

    this.getdate();
    setInterval(() => {
      this.getdate();
    }, 1000);


  }
 
 
  ngDoCheck(): void {

   
    if(this.username == null){
      this.val="SignIn";
      
    }
    else{
      this.val="SignOut";
    }
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
        this.username=data.name;
         
       }
       else{
        this.username=data.result[0].username;
       }
    })
  }

  getdate() {
    var setdate = new Date();
    this.date = setdate;
  }
  async postjob(){

    if(this.username == null){

     this.router.navigate(["/login"])
      alert("You should have to SignIn First to Post a Job");
    }
    else{
      this.router.navigate(["/postjob"]);
    }
  }

  logoutOrLogIn(){
    if(this.username == null){
      this.router.navigate(['/login']);
    }
    else{
      this.store.dispatch(new RemoveLoad());
    this.router.navigate(['/login']);
    }
    
  }



}

