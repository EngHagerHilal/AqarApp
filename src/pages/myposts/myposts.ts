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
  imgurl: string = IMGURL;
  pet: string = 'All'
  myposts: Post[] = []
  isLoading = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public postser: PostService, public uiser: UiControllerFunService
    , public translate: TranslateService, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MypostsPage');
  }
  ngOnInit() {
    this.isLoading = true
    this.myposts = this.postser.MyPostsCash
    this.postser.getMyPosts().subscribe((data: any) => {
      this.postser.MyPostsCash = data
      this.myposts = this.postser.MyPostsCash
      this.isLoading = false
    },err => {
      console.log("err my posts: ", err)
    })
  }

  opendetails(item) {
    this.navCtrl.push(PostdetailsPage, { item: item });
  }

  presentActionSheetMore(item: Post) {
    const actionSheet = this.actionSheetCtrl.create({
      title: this.translate.instant('TABs.title_actionSheet'),
      buttons: [
        {
          text: this.translate.instant('TABs.butDelete_actionSheet'),
          handler: () => {
            this.uiser.presentLoading();
            this.postser.deletePost(item.id.toString()).subscribe(data => {
              let result: any = data
              if (result.success) {
                this.myposts.splice(this.myposts.indexOf(item), 1)
                this.uiser.dissmisloading()
                this.uiser.presentToast(this.translate.instant('MESSAGETOAST.deletepost_seccuss'))
              } else {
                this.uiser.dissmisloading()
                this.uiser.presentToast(this.translate.instant('MESSAGETOAST.errorRequest'))
                console.log('ERR: ', result.errors)
              }
            })
          }
        }, {
          text: this.translate.instant('TABs.butEdit_actionSheet'),
          handler: () => {
            this.navCtrl.push(EditpostPage, { item: item });
          }
        }, {
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
