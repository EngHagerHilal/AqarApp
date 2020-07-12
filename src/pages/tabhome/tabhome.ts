import { UiControllerFunService } from './../../services/uiControllerFun.service';
import { AuthService } from './../../services/auth.service';
import { IMGURL, SIZEOFRELOADING } from './../../services/ApisConst.service';
import { PostService } from './../../services/post.service';
import { Post } from './../../interfaces/post';
import { EditpostPage } from './../editpost/editpost';
import { AddpostPage } from './../addpost/addpost';
import { PostdetailsPage } from './../postdetails/postdetails';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the TabhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabhome',
  templateUrl: 'tabhome.html',
})
export class TabhomePage {
  imgurl:string = IMGURL;
  allposts:Post[]=[]
  posts:Post[]=[]
  searchQuery:string='';
  isSearchLoading:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController
      ,public translate:TranslateService, public postser:PostService, public authser:AuthService, public uiser:UiControllerFunService) {
      console.log('user id ',this.authser.userData)
      //alert('hi testing')
  }
  isloading = false
  ionViewWillEnter() {
    this.searchQuery=''
    this.isloading = true
    console.log('ionViewWillEnter TabhomePage');
    this.postser.getAllPosts().subscribe((data:Post[]) => {
      this.allposts = data
      this.posts = this.allposts.slice(0,SIZEOFRELOADING)
      console.log('data from server: ',this.allposts)
      console.log('posts slice: ',this.posts)
      this.isloading = false
    }, err => {
      console.log('err: ',err)
      this.isloading = false
    })
  }
  
  async doRefresh(event) {
    console.log('refresher async operation');
    await this.ionViewWillEnter();
    console.log('refresher Async operation has ended');
    event.complete();
  }

  loadData(event) {
    console.log('=================================')
    console.log('this.allposts.length: ',this.allposts.length)
    console.log('this.posts.length: ',this.posts.length)
    if(this.allposts.length > this.posts.length){
      let l = this.allposts.length - this.posts.length
      console.log('elfrq: ',l)
      if(l >= SIZEOFRELOADING){
        console.log('hdif 10 ')
        this.posts = this.allposts.slice(0, this.posts.length+SIZEOFRELOADING)
      }else{
        console.log('hdif klh ')
        this.posts = this.allposts.slice(0)
      }
    }else{
      console.log('no more data to show')
    }
    event.complete();
  }

  getItems(event){
    let key = event.target.value
    console.log(key)
    console.log("searchQuery: ",this.searchQuery)
    if (key != "") {
      this.isSearchLoading = true
      this.postser.Search(key).subscribe(data => {
        let result: any = data
        console.log('search result: ', data)
        if (result.success) {
          this.posts = result.data
          console.log('posts = data: ', result.data)
        }
        this.isSearchLoading = false
      })
    }else{
      this.posts = this.allposts.slice(0,SIZEOFRELOADING)
      console.log('posts = this.allposts slice: ', this.allposts.slice(0,SIZEOFRELOADING))
      this.isSearchLoading = false
    }
  }

  getallItems(event){
    let key = event.target.value
    if(!key){
      this.isSearchLoading = true
      console.log(key)
      console.log("keynot: ",key)
      this.posts = this.allposts.slice(0,SIZEOFRELOADING)
      console.log('posts = all this.allposts slice: ', this.allposts.slice(0,SIZEOFRELOADING))
      this.isSearchLoading = false
    }
  }

  opendetails(item){
    item.allImages=[]
    this.navCtrl.push(PostdetailsPage ,{item:item});
  }

  openaddpost(){
    if(this.authser.userData && this.authser.userData.email_verified_at){
      this.navCtrl.push(AddpostPage);
    }else if(this.authser.userData){
      //this.navCtrl.push(AddpostPage);
      console.log('you not verify your email')
      this.uiser.showBasicAlertWithTranslate(this.translate.instant('TABs.title_alert'),
      this.translate.instant('TABs.subtitle_alert'),
      this.translate.instant('TABs.butt_alert_ok')
      )
    }else{
      console.log('ro7 yad e3ml login')
      this.uiser.showBasicAlertWithTranslate(this.translate.instant('TABs.title_alert2'),
      this.translate.instant('TABs.subtitle_alert2'),
      this.translate.instant('TABs.butt_alert_ok'))
    }
  }

  presentActionSheetMore(item:Post) {
    const actionSheet = this.actionSheetCtrl.create({
      title: this.translate.instant('TABs.title_actionSheet'),
      buttons: [
        {
          text: this.translate.instant('TABs.butDelete_actionSheet'),
          handler: () => {
            this.uiser.presentLoading();
            console.log('Delete clicked id:', item.id);
            this.postser.deletePost(item.id.toString()).subscribe(data=>{
              let result:any = data
              console.log('delete response data: ',result)
              if(result.success){
                this.allposts.splice(this.allposts.indexOf(item),1)
                this.posts.splice(this.posts.indexOf(item),1)
                this.uiser.dissmisloading()
                this.uiser.presentToast(this.translate.instant('MESSAGETOAST.deletepost_seccuss'))
                console.log('this.allposts after deleted: ',this.allposts)
              }else{
                this.uiser.dissmisloading()
                this.uiser.presentToast(this.translate.instant('MESSAGETOAST.errorRequest'))
                console.log('ERR: ',result.errors)
                console.log('this.allposts after no deleted: ',this.allposts)
              }
            })
          }
        },{
          text: this.translate.instant('TABs.butEdit_actionSheet'),
          handler: () => {
            this.navCtrl.push(EditpostPage,{item:item
              //,callback: this.myCallbackFunction;
         });
            console.log('Edit clicked');
          }
        },{
          text: this.translate.instant('TABs.butCancel_actionSheet'),
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


}
