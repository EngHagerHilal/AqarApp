import { AuthService } from './auth.service';
import { User } from './../interfaces/user';
import { APIURL } from './ApisConst.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class UserService {
    
  constructor(private http:HttpClient, public authser:AuthService) { }

  getUserById(id:any){
    let params = {
      "user_id" : id,
  }
  return this.http.post(APIURL+'users/visitProfile',params)
  }

  updateProfile(userdata:User,currentEmail?:string){
    let params = {
        "api_token" : this.authser.userData.api_token,
        "username": userdata.name,
        "email": userdata.email,
	      "currentEmail": currentEmail,
	      "currentPass": this.authser.userData.password,
	      "newPass": userdata.password,
	      "confirmedNewPass": userdata.password,
        "phone" : userdata.phone
    }
    return this.http.post(APIURL+'updateProfile',params)
  }

  resendActivationLink(){
    let params = {
      "api_token" : this.authser.userData.api_token,
  }
  return this.http.post(APIURL+'resendActivationLink',params)
  }

  resetPassword(email:string){
    let params = {
      "email" : email,
    }
  return this.http.post(APIURL+'password/reset',params)
  }
}