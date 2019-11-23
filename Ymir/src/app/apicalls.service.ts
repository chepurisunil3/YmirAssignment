import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {

  constructor(private http:HttpClient) {

   }

   loginUser(email,password):Observable<any> {
      return this.http.get("http://localhost:3000/userLogin?email="+email+"&password="+password);
   }
   registerUser(email,password,username):Observable<any> {
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    let body={
      email:email,
      password:password,
      username:username
    };
    return this.http.post('http://localhost:3000/saveUserDetails',JSON.stringify(body),{headers:headers})
   }
   getTextFromImage(email,image):Observable<any> {
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    let body={
      email:email,
      uploadedImage:image,
    };
    return this.http.post('http://localhost:3000/getTextFromFile',JSON.stringify(body),{headers:headers})
   }
   getPreviousData(email):Observable<any> {
    return this.http.get("http://localhost:3000/getHistoryData?email="+email);
   }
}
