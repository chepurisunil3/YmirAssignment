import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {
  userData:any = null;
  constructor(private http:HttpClient) {

   }

   loginUser(email,password):Observable<any> {
      return this.http.get("http://localhost:3000/userLogin?email="+email+"&password="+password);
   }
   registerUser(email,password,username):Observable<any> {
     console.log(email,password,username);
     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    let body={
      email:email,
      password:password,
      username:username
    };
    return this.http.post('http://localhost:3000/saveUserDetails',JSON.stringify(body),httpOptions)
   }
   getTextFromImage(email,image):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    var fileToUpload = image.item(0); 
    let formData = new FormData(); 
    formData.append('uploadedImage', fileToUpload, fileToUpload.name); 
    formData.append('email',email);
    let body={
      email:email,
      uploadedImage:image,
    };
    return this.http.post('http://localhost:3000/getTextFromFile',formData)
   }
   getPreviousData(email):Observable<any> {
    return this.http.get("http://localhost:3000/getHistoryData?email="+email);
   }
   toFormData<T>( formValue: T ) {
    const formData = new FormData();
  
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
  
    return formData;
  }
}
