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
  userData:{UserName?:string , Password?:string, Phone?:number ,Email?:string} = {
    //UserName:'Ahmed samy',
    //Password:'4mydak59d63slp',
    //Phone:'058954785235',
    //Email:'engahmed.a@gmail.com'
  };
  isEdit:boolean = false;
  NewPasswordText:string='';
  ConfirmeNewPasswordText:string='';
  CurrentPasswordText:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams, public authser: AuthService) {
    this.userData.UserName = this.authser.userData.name
    this.userData.Password = this.authser.userData.password
    this.userData.Phone = this.authser.userData.phone
    this.userData.Email = this.authser.userData.email
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  toggelIsEdit(){
    this.isEdit = !this.isEdit;
  }
  Editprofile(){
    this.userData.Password = this.NewPasswordText
    this.NewPasswordText='';
    this.ConfirmeNewPasswordText='';
    this.CurrentPasswordText='';
    this.toggelIsEdit()

    console.log('updating data: ',this.userData)
  }

}
