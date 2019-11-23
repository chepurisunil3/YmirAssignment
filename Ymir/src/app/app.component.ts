import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ymir';
  isLoggedIn:boolean = false;
  userDetails:any;
  constructor() {
    if(sessionStorage.getItem("isLoggedin") != null) {
        this.isLoggedIn = true;
        this.userDetails = sessionStorage.getItem("isLoggedin");
    }
    else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit() {
    console.log("init")
  }
}
