import { AuthService } from './../../services/auth.service';
import { UiControllerFunService } from './../../services/uiControllerFun.service';
import { PostService } from './../../services/post.service';
import { IMGURL, SIZEOFRELOADING } from './../../services/ApisConst.service';
import { Post } from './../../interfaces/post';
import { AddpostPage } from './../addpost/addpost';
import { EditpostPage } from './../editpost/editpost';
import { PostdetailsPage } from './../postdetails/postdetails';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the TabsalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabsale',
  templateUrl: 'tabsale.html',
})
export class TabsalePage {
    sellingposts:Post[]=[];
    imgurl:string = IMGURL;
    posts:Post[]=[]
    constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController
    ,public translate:TranslateService, public postser:PostService, public authser:AuthService, public uiser:UiControllerFunService) {
  }

  isloading = false
  ionViewWillEnter() {
    this.isloading = true
    this.sellingposts =[]
    this.posts =[]
    console.log('ionViewWillEnter TabsalePage');
    this.postser.getAllPosts().subscribe((data:Post[]) => {
      data.forEach(element => {
        if(element.type == 'selling'){
          this.sellingposts.push(element)
        }
      });
      this.posts = this.sellingposts.slice(0,SIZEOFRELOADING)
      console.log('data from server: ',this.sellingposts)
      console.log('posts: ',this.posts)
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
    console.log('this.sellingposts.length: ',this.sellingposts.length)
    console.log('this.posts.length: ',this.posts.length)
    if(this.sellingposts.length > this.posts.length){
      let l = this.sellingposts.length - this.posts.length
      console.log('elfrq: ',l)
      if(l >= SIZEOFRELOADING){
        console.log('hdif 1 bs ')
        this.posts = this.sellingposts.slice(0, this.posts.length + SIZEOFRELOADING)
      }else{
        console.log('hdif klh ')
        this.posts = this.sellingposts.slice(0)
      }
    }else{
      console.log('no more data to show')
    }
    event.complete();
  }

  openaddpost(){
    if(this.authser.userData && this.authser.userData.email_verified_at){
      this.navCtrl.push(AddpostPage);
    }else{
      console.log('you not verify your email')
      this.uiser.showBasicAlertWithTranslate(this.translate.instant('TABs.title_alert'),
      this.translate.instant('TABs.subtitle_alert'),
      this.translate.instant('TABs.butt_alert_ok')
      )
    }
  }

  opendetails(item){
    item.allImages=[]
    this.navCtrl.push(PostdetailsPage ,{item:item});
  }

  presentActionSheetMore(item) {
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
                this.sellingposts.splice(this.sellingposts.indexOf(item),1)
                this.uiser.dissmisloading()
                this.uiser.presentToast(result.success)
                console.log('this.allposts after deleted: ',this.sellingposts)
              }else{
                this.uiser.dissmisloading()
                this.uiser.presentToast("Ooops, Mistake thing happened,Try Agin!")
                console.log('ERR: ',result.errors)
                console.log('this.allposts after no deleted: ',this.sellingposts)
              }
            })
          }
        },{
          text: this.translate.instant('TABs.butEdit_actionSheet'),
          handler: () => {
            this.navCtrl.push(EditpostPage,{item:item});
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
