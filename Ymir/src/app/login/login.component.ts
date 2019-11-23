import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ApicallsService } from '../apicalls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin:boolean = true;
  registerStatus:string = "Not yet Registered?";
  buttonText:string  = "Login";
  emailId:string = "";
  password:string = "";
  username:string = "";
  showPopup:boolean = false;
  popupText:string = "";
  popupClass:string = "errorText";
  @Output() public loginDone:EventEmitter<string> = new EventEmitter<string>();
  constructor(private apiCalls:ApicallsService) { }

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
    var x=this.emailId;  
      var atposition=x.indexOf("@");  
      var dotposition=x.lastIndexOf(".");  
      if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
        this.showPopup = true;
        this.popupText = "Invalid EmailID";
        let me = this;
            setTimeout(function() {
                me.showPopup  = false;
                me.popupText = "";
            },2000);
      }
      else {
        this.emailId = this.emailId.toLowerCase();
        if(this.isLogin) {
          this.apiCalls.loginUser(this.emailId,this.password).subscribe(data=> {
            if(data.success) {
              this.apiCalls.userData = {
                email:this.emailId,
                username:data.username
              };
              sessionStorage.setItem("isLoggedin",JSON.stringify(this.apiCalls.userData));
              this.loginDone.emit("Done");
            }
            else {
              console.log(" in else");
              this.showPopup = true;
              this.popupText = data.message;
            }
            let me = this;
            setTimeout(function() {
                me.showPopup  = false;
                me.popupText = "";
            },2000);
          });
      }
      else {
        this.apiCalls.registerUser(this.emailId,this.password,this.username).subscribe(data=>{
          console.log(data);
          console.log(data.success);
          if(data.success) {
            this.apiCalls.userData = {
              email:this.emailId,
              username:this.username
            };
            this.loginDone.emit("Done");
            sessionStorage.setItem("isLoggedin",JSON.stringify(this.apiCalls.userData));
          }
          else {
            console.log(" in else");
            this.showPopup = true;
            this.popupText = data.message;
            let me = this;
            setTimeout(function() {
                me.showPopup  = false;
                me.popupText = "";
            },2000);
          }
        })
      }
      }  
    
  }

}
