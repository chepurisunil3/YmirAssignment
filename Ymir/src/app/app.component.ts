import { Component } from '@angular/core';
import { ApicallsService } from './apicalls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ymir';
  isLoggedIn:boolean = false;
  userDetails:any;
  constructor(private apiCalls:ApicallsService) {
    console.log(sessionStorage.getItem("isLoggedin"));
    if(sessionStorage.getItem("isLoggedin") != null) {
        this.isLoggedIn = true;
        this.userDetails = JSON.parse(sessionStorage.getItem("isLoggedin"));
        apiCalls.userData = this.userDetails;
    }
    else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit() {
    console.log("init")
  }
  onLogin(s) {
    console.log("In the event");
    console.log(s);
    this.isLoggedIn = true;
  }
  onLogout(s) {
    sessionStorage.removeItem("isLoggedin");
    sessionStorage.clear();
    this.isLoggedIn = false;
  }
}
