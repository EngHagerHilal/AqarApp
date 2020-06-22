import { User } from './../interfaces/user';
import { APIURL } from './ApisConst.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class AuthService {
  userData:User;
  isLogIn:Observable<boolean> | boolean;
  constructor(private http:HttpClient) { }

  Signin(username:string,password:string): Observable<any>{
    let params ={
      "email" : username,
      "password" : password
    }
    return this.http.post(APIURL+'login',params)
  }

  SignUp(userdata){
    let params ={
      "name" : userdata.UserName,
      "email" : userdata.Email,
      "password" : userdata.Password,
      "phone" : userdata.Phone
    }
    console.log('my params: ',params)
    return this.http.post(APIURL+'register',params)
  }

  SignOut(): boolean{
    this.userData = null
    localStorage.removeItem('userData');
    if(!this.userData && !localStorage.getItem('userData')){
      return true
    }else{
      return false
    }
  }

}