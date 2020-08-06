import { TranslateService } from '@ngx-translate/core';
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
  isLoading:boolean = false;
  isClickEdit = false
  isClickResend = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public authser: AuthService, public userser:UserService
    , public uiser:UiControllerFunService, public translate:TranslateService) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  ngOnInit(){
    this.userData.name = this.authser.userData.name
    this.userData.password = this.authser.userData.password
    this.userData.phone = this.authser.userData.phone
    this.userData.email = this.authser.userData.email
    this.isLoading = true
    this.userser.getUserById(this.authser.userData.id).subscribe( (result:any) =>{
      this.authser.userData = result.user
      this.authser.userData.password = this.userData.password
      localStorage.setItem('userData',JSON.stringify(this.authser.userData))
      this.isLoading = false
    })
  }
  toggelIsEdit(){
    this.userData.name = this.authser.userData.name
    this.userData.password = this.authser.userData.password
    this.userData.phone = this.authser.userData.phone
    this.userData.email = this.authser.userData.email
    this.isEdit = !this.isEdit;
  }
  
  Editprofile(){
    this.isClickEdit = true
    this.userData.password = this.NewPasswordText
    this.userser.updateProfile(this.userData,this.authser.userData.email).subscribe( data =>{
      let result:any = data
      if(result.success){
        this.authser.userData = result.user
        this.authser.userData.password = this.userData.password
        localStorage.setItem('userData',JSON.stringify(this.authser.userData))
        this.NewPasswordText='';
        this.ConfirmeNewPasswordText='';
        this.CurrentPasswordText='';
        this.toggelIsEdit()
        this.uiser.presentToast(this.translate.instant('MESSAGETOAST.editprofile_seccuss'))
      }else{
        this.uiser.presentToast(this.translate.instant('MESSAGETOAST.errorRequest'))
      }
      this.isClickEdit = false
    })
  }

  ResendActivationEmail(){
    this.isClickResend = true
    this.userser.resendActivationLink().subscribe( data => {
      let result:any = data
      if(result.success){
        this.uiser.presentToast(this.translate.instant('MESSAGETOAST.ActivationEmail_seccuss'))
      }else{
        this.uiser.presentToast(this.translate.instant('MESSAGETOAST.errorRequest'))
      }
      this.isClickResend = false
    })
  }

}
