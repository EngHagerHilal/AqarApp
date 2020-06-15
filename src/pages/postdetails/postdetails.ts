import { IMGURL } from './../../services/ApisConst.service';
import { Post } from './../../interfaces/post';
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
  myitem:Post={allImages:[]};
  imgurl:string = IMGURL;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myitem = this.navParams.get('item')
    this.myitem.allImages.push(this.myitem.mainImage)
    this.myitem.allImages.push(this.myitem.mainImage)
    this.myitem.allImages.push(this.myitem.mainImage)
    console.log('this.myitem: ',this.myitem)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostdetailsPage');
  }

}
