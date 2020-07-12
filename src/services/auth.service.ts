import { UiControllerFunService } from './uiControllerFun.service';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';
import { User } from './../interfaces/user';
import { APIURL } from './ApisConst.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class AuthService {
  userData:User;
  isInternetCon:boolean=false
  isLogIn:Observable<boolean> | boolean;
  constructor(private http:HttpClient, public network:Network,public translate:TranslateService, public uiser:UiControllerFunService) { }

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

  checkInternetConnection(){
    this.network.onDisconnect().subscribe(()=> {
      this.isInternetCon = false;
      this.uiser.presentToast(this.translate.instant('MESSAGETOAST.offline_mode'))
      //alert('No Internet Connection')
    });
    this.network.onConnect().subscribe(() => {
      //setTimeout(() => {
          this.isInternetCon = true;
      //}, 3000);
      //alert('the connection available: '+this.network.type)
    });
  }
}