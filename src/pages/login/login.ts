import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  Login(){
    console.log('logData: ',this.logData)
  }
  resetpassword(){
    console.log('reset EmailText: ',this.EmailText)
  }
  toggelforget(){
    this.isforget =!this.isforget;
    this.EmailText='';
  }

}
