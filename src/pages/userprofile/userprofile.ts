import { EmailComposer } from '@ionic-native/email-composer';
import { PostdetailsPage } from './../postdetails/postdetails';
import { IMGURL, POST_EMAIL_subject } from './../../services/ApisConst.service';
import { Post } from './../../interfaces/post';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user';

/**
 * Generated class for the UserprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {
  imgurl: string = IMGURL;
  isSelling:boolean = false;
  isRent:boolean = false;
  user_id:any;
  RentPosts:Post[]=[]
  SellingPosts:Post[]=[]
  userProfile: User={}
  isLoading:boolean = false;
  subject:string = POST_EMAIL_subject
  constructor(public navCtrl: NavController, public navParams: NavParams, public userser:UserService, public email:EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
  }

  ngOnInit(){
    this.user_id = this.navParams.get('user_id')
    this.isLoading = true
    this.userser.getUserById(this.user_id).subscribe( (result:any) =>{
      this.RentPosts = result.posts.rent
      this.SellingPosts = result.posts.selling
      this.userProfile = result.user
      this.isLoading = false
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
  
  toggelSelling(){
    this.isSelling = ! this.isSelling
  }
  toggelRent(){
    this.isRent = ! this.isRent
  }
  opendetails(item) {
    this.navCtrl.push(PostdetailsPage, { item: item });
  }
}
