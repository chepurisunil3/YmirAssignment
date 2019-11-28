import { Component, OnInit } from '@angular/core';
import { ApicallsService } from '../apicalls.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isSelectedFromList:boolean = false;
  fileName:string = "";
  isTextProcessed:boolean = false;
  processedText = "";
  previousData = [];
  constructor(private apiCall:ApicallsService) { 
    apiCall.getPreviousData(apiCall.userData.email).subscribe(data=> {
      console.log(data);
      if(data.success) {
        this.previousData = data.data;
      }
    });
  }
  
  ngOnInit() {
  }
  fileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      this.fileName = event.target.files[0].name;
      const file = event.target.files[0];
      const reader = new FileReader();
      let me = this;
      reader.onload = function(e:any){
        me.isSelectedFromList = false;
        setTimeout(function() {
          $("#uploadedImage").attr("src",e.target.result);
          //document.getElementById("uploadedImage").src = e.target.result;
        },10);
      };
      reader.readAsDataURL(file);
      $('.popup').css("display","flex");
      this.apiCall.getTextFromImage(this.apiCall.userData.email,event.target.files).subscribe(data=>{
        console.log(data);
        $('.popup').css("display","none");
        if(data.success) {
          this.isTextProcessed = true;
            this.processedText = data.text;
            this.apiCall.getPreviousData(this.apiCall.userData.email).subscribe(data=> {
              console.log(data);
              if(data.success) {
                this.previousData = data.data;
              }
            });
        }
      });
  }
  }
  openFile() {
    document.getElementById('imageFile').click();
  }
  selectedList(s) {
    this.isSelectedFromList = true;
    this.isTextProcessed = true;
    let me = this;
    setTimeout(function() {
      $("#uploadedImage1").attr("src","http://localhost:3000/"+me.previousData[s].file);
      //document.getElementById("uploadedImage1").src = "http://localhost:3000/"+me.previousData[s].file;
      me.processedText = me.previousData[s].text;
    },10);
    
  }
}
