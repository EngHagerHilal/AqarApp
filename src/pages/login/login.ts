import { TranslateService } from '@ngx-translate/core';
import { UserService } from './../../services/user.service';
import { UiControllerFunService } from './../../services/uiControllerFun.service';
import { TabsHomePage } from './../home/home';
import { User } from './../../interfaces/user';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isforget:boolean = false;
  logData:{UserName:string , Password:string} = {UserName:'',Password:''}
  EmailText:string=''
  userData:User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authser: AuthService, public uiser:UiControllerFunService
    ,public event: Events, public userser: UserService, public translate:TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  isClickLogIn = false
  Login(){
    //this.uiser.presentLoading()
    this.isClickLogIn = true
    console.log('logData: ',this.logData)
    this.authser.Signin(this.logData.UserName , this.logData.Password).subscribe(async data => {
      if(data.userData){
        data.userData.password = this.logData.Password;
        this.authser.userData = data.userData;
        this.authser.isLogIn = true
        this.navCtrl.setRoot(TabsHomePage);
        if(!data.userData.email_verified_at){
          this.uiser.presentToast(this.translate.instant('MESSAGETOAST.notVerifyEmail'))
        }
        //this.uiser.dissmisloading()
        this.isClickLogIn = false
        localStorage.setItem('userData',JSON.stringify(this.authser.userData))
        await this.event.publish('userLogIn',true)
      }else{
        //this.uiser.dissmisloading()
        this.isClickLogIn = false
        this.uiser.presentToast(data.message)
      }
      console.log('data response: ',data)
    })
  }
  isClickReset = false
  resetpassword(){
    this.isClickReset = true
    this.userser.resetPassword(this.EmailText).subscribe( data => {
      let result:any = data
      if(result.success){
        this.toggelforget();
        this.uiser.presentToast(this.translate.instant('MESSAGETOAST.resetpassword_seccuss'))
      }else{
        this.uiser.presentToast(result.errors)
      }
      this.isClickReset = false
    })
    console.log('reset EmailText: ',this.EmailText)
  }
  toggelforget(){
    this.isforget =!this.isforget;
    this.EmailText='';
  }

}
