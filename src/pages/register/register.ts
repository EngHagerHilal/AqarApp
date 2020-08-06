import { TranslateService } from '@ngx-translate/core';
import { TabsHomePage } from './../home/home';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UiControllerFunService } from '../../services/uiControllerFun.service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  logData:{UserName:string , Password:string, Phone:string ,Email:string} = {UserName:'',Password:'',Phone:'',Email:''};
  ConfirmePasswordText:any ='';
  loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authser: AuthService, public uiser:UiControllerFunService
    ,public event: Events, public translate:TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  
  Register(){
    this.uiser.presentLoading()
    this.authser.SignUp(this.logData).subscribe(data => {
      let response:any = data
      // go to log in after register
      if(response.userData.api_token){
        this.authser.Signin(response.userData.email , this.logData.Password).subscribe(data2 => {
          if(data2.userData){
            data2.userData.password = this.logData.Password;
            this.authser.userData = data2.userData;
            this.authser.isLogIn = true
            this.navCtrl.setRoot(TabsHomePage);
            if(!data2.userData.email_verified_at){
              this.uiser.presentToast(this.translate.instant('MESSAGETOAST.notVerifyEmail'))
            }
            localStorage.setItem('userData',JSON.stringify(this.authser.userData))
            this.event.publish('userLogIn',true)
            this.uiser.dissmisloading()
          }else{
            this.uiser.dissmisloading()
            this.uiser.presentToast(data2.message)
          }
        })
      }else{
        this.uiser.dissmisloading()
      }
      this.uiser.presentToast(this.translate.instant('MESSAGETOAST.register_seccuss'))
    })
  }

}
