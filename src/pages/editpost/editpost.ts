import { Post } from './../../interfaces/post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditpostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editpost',
  templateUrl: 'editpost.html',
})
export class EditpostPage {
  myitem:Post
  date=new Date();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myitem = this.navParams.get('item')
    console.log('this.myitem: ',this.myitem)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditpostPage');
  }
  updatepost(){
    this.myitem.updated_at = this.date.toISOString()
    console.log('updated item: ',this.myitem)
  }

}
