import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin:boolean = true;
  registerStatus:string = "Not yet Registered?";
  buttonText:string  = "Login";
  constructor() { }

  ngOnInit() {
  }
  changeView() {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.registerStatus = "Not yet Registered?";
      this.buttonText = "Login";
    }
    else {
      this.registerStatus = "Already Registered?";
      this.buttonText = "Register & Login";
    }
  }
  loginOrderRegister() {
    if(this.isLogin) {
      
    }
    else {

    }
  }

}
