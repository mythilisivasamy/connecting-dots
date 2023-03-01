import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup,FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Data} from '../data.model'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm=new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
   });
 message!:string;
 errorMessage:boolean=false;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {}

   get username(){
    return this.loginForm.get('username') as FormControl;
  }

  get password(){
    return this.loginForm.get('password') as FormControl;
  }
    
  login() {
    this.message = 'Trying to log in ...';
    const data:Data={
      username:this.username.value,
      password:this.password.value,
    }
    console.log(data);
    this.authService.login(data).subscribe((resp) => {
      localStorage.setItem('token',JSON.stringify(resp.body.token));
      if(this.authService.isLoggedIn){
        this.authService.redirectUrl=this.authService.redirectUrl || '/home';
        this.router.navigate([this.authService.redirectUrl]);
      }
    },
    (err)=>{
     console.log(err);
    });
  }

 

}
