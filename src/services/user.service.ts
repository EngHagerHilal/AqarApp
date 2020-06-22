import { AuthService } from './auth.service';
import { User } from './../interfaces/user';
import { APIURL } from './ApisConst.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class UserService {
    
  constructor(private http:HttpClient, public authser:AuthService) { }

  updateProfile(userdata:User){
    let params = {
        "api_token" : this.authser.userData.api_token,
        "username": userdata.name,
	      "email": userdata.email,
	      "currentPass": this.authser.userData.password,
	      "newPass": userdata.password,
	      "confirmedNewPass": userdata.password,
        "phone" : userdata.phone
    }
    console.log('my params: ',params)
    return this.http.post(APIURL+'updateProfile',params)
  }

  resendActivationLink(){
    let params = {
      "api_token" : this.authser.userData.api_token,
  }
  console.log('my params: ',params)
  return this.http.post(APIURL+'resendActivationLink',params)
  }

  resetPassword(email:string){
    let params = {
      "email" : email,
    }
  console.log('my params: ',params)
  return this.http.post(APIURL+'password/reset',params)
  }
}