import { UserprofilePage } from './../userprofile/userprofile';
import { EmailComposer } from '@ionic-native/email-composer';

import { CallNumber } from '@ionic-native/call-number';

import { PostService } from './../../services/post.service';
import { IMGURL, POST_EMAIL_subject } from './../../services/ApisConst.service';
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
  myitem:Post={galleries:[]};
  myitem2:Post = {};
  imgurl:string = IMGURL;
  subject:string = POST_EMAIL_subject
  isLoading:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public postser:PostService, public call:CallNumber
    , public email:EmailComposer) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PostdetailsPage');
  }

  ngOnInit() {
    this.isLoading = true
    this.myitem = this.navParams.get('item')
    this.postser.getPost(this.myitem.id.toString()).subscribe((data:any) =>{
      this.myitem2 = data.post
      this.isLoading = false
    },err => {
      console.log('ERR.. ', err);
    })
  }

  userProfile() {
    this.navCtrl.push(UserprofilePage,{user_id : this.myitem2.user_id})
  }

  MakeCall(phonenum){
    this.call.callNumber(phonenum,true)
    .catch(err=>{
      console.log('ERR..made a call: ',err)
    })
  }

  SendEmail(emailto:string){
    let email= {
      to: emailto,
      subject: this.subject,
      isHtml : true
    }
    this.email.open(email).catch(err=>{
      console.log('ERR..open email app: ',err)
    });
  }

}
