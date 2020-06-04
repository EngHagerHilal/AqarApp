import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddpostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpost',
  templateUrl: 'addpost.html',
})
export class AddpostPage {
  newad:any={}
  date=new Date();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpostPage');
  }
  add(){
    this.newad.created_at = this.date.toISOString()
    this.newad.created_at = this.date.toISOString()
    this.newad.status = 'active'
    this.newad.allImages = [];
    this.newad.mainImaage = '';
    this.newad.user_id = 0; //'who logedin'
    this.newad.email = 'who logedin';
    this.newad.phone = 'who logedin';
    console.log('newad: ',this.newad)
  }


}
