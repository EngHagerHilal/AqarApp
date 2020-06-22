import { UiControllerFunService } from './../../services/uiControllerFun.service';
import { UserService } from './../../services/user.service';
import { User } from './../../interfaces/user';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userData:User = {}
  isEdit:boolean = false;
  NewPasswordText:string='';
  ConfirmeNewPasswordText:string='';
  CurrentPasswordText:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams, public authser: AuthService, public userser:UserService
    , public uiser:UiControllerFunService) {
    this.userData.name = this.authser.userData.name
    this.userData.password = this.authser.userData.password
    this.userData.phone = this.authser.userData.phone
    this.userData.email = this.authser.userData.email
    console.log('this.userData: ',this.userData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  toggelIsEdit(){
    this.isEdit = !this.isEdit;
  }
  isClickEdit = false
  Editprofile(){
    this.isClickEdit = true
    this.userData.password = this.NewPasswordText
    console.log('obj to updating user: ',this.userData)
    this.userser.updateProfile(this.userData).subscribe( data =>{
      let result:any = data
      if(result.success){
        this.authser.userData.name = this.userData.name
        this.authser.userData.password = this.userData.password
        this.authser.userData.phone = this.userData.phone
        this.authser.userData.email = this.userData.email
        localStorage.setItem('userData',JSON.stringify(this.authser.userData))
        this.NewPasswordText='';
        this.ConfirmeNewPasswordText='';
        this.CurrentPasswordText='';
        this.uiser.presentToast(result.success)
        this.toggelIsEdit()
      }else{
        this.uiser.presentToast(result.errors)
      }
      console.log('after updating user: ',this.authser.userData)
      console.log('storge after updating user: ',localStorage.getItem('userData'))
      this.isClickEdit = false
    })
  }

  isClickResend = false
  ResendActivationEmail(){
    this.isClickResend = true
    this.userser.resendActivationLink().subscribe( data => {
      let result:any = data
      if(result.success){
        this.uiser.presentToast(result.success)
      }else{
        this.uiser.presentToast(result.message)
      }
      this.isClickResend = false
    })
  }

}
