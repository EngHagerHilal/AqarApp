import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PostdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postdetails',
  templateUrl: 'postdetails.html',
})
export class PostdetailsPage {
  myitem:{
    id?: string, title: string, description: string, date: Date | string, imgs: string[],
    price: number, location: string, phone: string, email: string
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myitem = this.navParams.get('item')
    console.log('this.myitem: ',this.myitem)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostdetailsPage');
  }

}
