import { PostService } from './../../services/post.service';
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
  myitem2:Post = {};
  imgurl:string = IMGURL;
  constructor(public navCtrl: NavController, public navParams: NavParams, public postser:PostService) {
    this.myitem = this.navParams.get('item')
    //this.myitem.allImages.push(this.myitem.mainImage)
    //this.myitem.allImages.push(this.myitem.mainImage)
    //this.myitem.allImages.push(this.myitem.mainImage)
    console.log('this.myitem: ',this.myitem)
    this.postser.getPost(this.myitem.id.toString()).subscribe(data =>{
      this.myitem2 = data.post
      console.log('post from server id: ',this.myitem2)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostdetailsPage');
  }

}
