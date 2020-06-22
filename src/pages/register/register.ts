import { TabsHomePage } from './../home/home';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
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
    ,public event: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  
  Register(){
    this.uiser.presentLoading()
    console.log('registerData: ',this.logData)
    this.authser.SignUp(this.logData).subscribe(data => {
      let response:any = data
      console.log('message: ',response.message)
      console.log(response)
      // go to log in after register
      if(response.api_token){
        this.authser.Signin(response.email , this.logData.Password).subscribe(data2 => {
          if(data2.userData){
            data2.userData.password = this.logData.Password;
            this.authser.userData = data2.userData;
            this.authser.isLogIn = true
            this.navCtrl.setRoot(TabsHomePage);
            if(!data2.userData.email_verified_at){
              this.uiser.presentToast('you need to active your acount')
            }
            this.uiser.dissmisloading()
            localStorage.setItem('userData',JSON.stringify(this.authser.userData))
            this.event.publish('userLogIn',true)
          }else{
            this.uiser.dissmisloading()
            this.uiser.presentToast(data2.message)
          }
          console.log('data response login: ',data2)
        })
      }else{
        this.uiser.dissmisloading()
      }
      this.uiser.presentToast(response.message)
    })
  }

}
