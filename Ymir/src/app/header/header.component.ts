import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApicallsService } from '../apicalls.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public logoutUser:EventEmitter<string> = new EventEmitter<string>();
  constructor(private apiCalls:ApicallsService) {
   }

  ngOnInit() {
  }
  logout() {
    this.logoutUser.emit("logout");
  }
}
