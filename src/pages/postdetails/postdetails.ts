import { EmailComposer } from '@ionic-native/email-composer';

import { CallNumber } from '@ionic-native/call-number';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public postser:PostService, public call:CallNumber
    , public email:EmailComposer) {
    this.myitem = this.navParams.get('item')
    //this.myitem.allImages.push(this.myitem.mainImage), public CallNum: CallNumber
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

  MakeCall(phonenum){
    this.call.callNumber(phonenum,true).then(data=>{
      console.log('made a call: ',data)
    }).catch(err=>{
      console.log('ERR..made a call: ',err)
    })
    console.log('phone to call: ',phonenum)
  }

  SendEmail(emailto:string){
    let email= {
      to: emailto,
      subject: "About Your Post On Elrawad App",
      isHtml : true
    }
    console.log('my param: ',email)
    this.email.open(email);
  }

}
