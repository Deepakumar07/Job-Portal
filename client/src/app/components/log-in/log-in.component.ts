import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from "@angular/router";
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, VKLoginProvider } from "angularx-social-login";
import { Store } from '@ngrx/store';
import { loginReducerState } from '../../Reducer/index'
import { LoadFailure, LoadValues, LoadValuesSuccess } from 'src/app/actions/loginaction';
import { AccountService } from "../../service/account.service"
import { login } from "../../model/login-model"


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit,DoCheck{
  error: boolean;
  login: login[];
  name: string;
  token:string;
  username:string;
  password:string;

  Remember:boolean;

  constructor(private router: Router, 
              private authservice: SocialAuthService, 
              private store: Store<loginReducerState>, 
              private service: AccountService
              ) { }


  ngOnInit() {

    this.username=localStorage.getItem("username");
    this.password=localStorage.getItem("password");
    

  }
  ngDoCheck(){
    this.rememberme()
  }

  async socialsignIN(socialplatform: string) {
    let socialplatformprovider;

    if (socialplatform == "facebook") {
      socialplatformprovider = FacebookLoginProvider.PROVIDER_ID;
    }

    if (socialplatform == "google") {
      socialplatformprovider = GoogleLoginProvider.PROVIDER_ID;
    }

    if (socialplatform == "linkedin") {
      socialplatformprovider = VKLoginProvider.PROVIDER_ID;
    }


    this.store.dispatch(new LoadValues);


    await this.authservice.signIn(socialplatformprovider).then(data => {
      // console.log(data);

      this.store.dispatch(new LoadValuesSuccess({ data }));

      if (data) {
        this.error = false;
      }

    }).catch(err => {
      this.store.dispatch(new LoadFailure({ err }));
      if (!err) {
        this.error = true;
      } else {
        console.log(err);
      }

    })
    if (this.error == false) {
      this.router.navigate(['/Home']);
    }
  }


  onsubmit(data ,valid) {
    if(valid){
    

      this.username=data.username;
    this.password=data.password;
    this.Remember=data.RememberMe;
  
    this.login = data;
    const getloginvalues$ = this.service.getloginvalues(this.login);
    this.store.dispatch(new LoadValues);
    getloginvalues$.subscribe(data => {
      if (data.code == "401" && data.status == "not valid email") {
        alert("Invaid Username");
      }
      else if (data.code == "401" && data.status == "password not valid") {
        alert("Invaid password");
      }
      else {
        this.store.dispatch(new LoadValuesSuccess({data}));
        this.name=data.result[0].username;
        this.token=data.result[0].jwtToken;
      
        this.router.navigate(["/Home"]);
        
      }
    }),error=>{
      this.store.dispatch(new LoadFailure(error));
    }
    }
    
  }

  rememberme(){
    if(this.Remember == true){
        localStorage.setItem("username",this.username);
        localStorage.setItem("password",this.password);
    }
  }
}
