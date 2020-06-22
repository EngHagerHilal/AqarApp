import { UiControllerFunService } from './../../services/uiControllerFun.service';
import { PostService } from './../../services/post.service';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public postser:PostService, public uiser:UiControllerFunService) {
    this.myitem = this.navParams.get('item')
    console.log('this.myitem: ',this.myitem)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditpostPage');
  }
  updatepost(){
    //this.myitem.updated_at = this.date.toISOString()
    this.postser.updatePost(this.myitem).subscribe(data =>{
      let result:any =data;
      console.log('response from server: ',result)
      if(result.success){
        this.uiser.presentToast(result.success)
        console.log('success: ',result.success)
        this.navCtrl.pop();
      }else{
        this.uiser.presentToast("Ooops, Mistake thing happened,Try Agin!")
        console.log('ERR: ',result.errors)
      }
    })
    //console.log('updated item: ',this.myitem)
  }

}
