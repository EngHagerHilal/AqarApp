import { TranslateService } from '@ngx-translate/core';
import { UiControllerFunService } from './../../services/uiControllerFun.service';
import { EditpostPage } from './../editpost/editpost';
import { PostdetailsPage } from './../postdetails/postdetails';
import { IMGURL } from './../../services/ApisConst.service';
import { Post } from './../../interfaces/post';
import { PostService } from './../../services/post.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the MypostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myposts',
  templateUrl: 'myposts.html',
})
export class MypostsPage {
  imgurl:string = IMGURL;
  pet:string = 'All'
  myposts:Post[]=[]
  isLoading = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public postser:PostService, public uiser:UiControllerFunService
    ,public translate:TranslateService, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MypostsPage');
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter MypostsPage');
    this.myposts=[]
    this.isLoading = true
    this.postser.getMyPosts().subscribe((data:any) => {
      this.myposts = data.myposts
      this.isLoading = false
      console.log("my posts: ",this.myposts)
    })
  }

  opendetails(item){
    item.allImages=[]
    this.navCtrl.push(PostdetailsPage ,{item:item});
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
                this.myposts.splice(this.myposts.indexOf(item),1)
                this.uiser.dissmisloading()
                this.uiser.presentToast(this.translate.instant('MESSAGETOAST.deletepost_seccuss'))
                console.log('this.myposts after deleted: ',this.myposts)
              }else{
                this.uiser.dissmisloading()
                this.uiser.presentToast(this.translate.instant('MESSAGETOAST.errorRequest'))
                console.log('ERR: ',result.errors)
                console.log('this.myposts after no deleted: ',this.myposts)
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
