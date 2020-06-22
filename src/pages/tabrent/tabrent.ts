import { UiControllerFunService } from './../../services/uiControllerFun.service';
import { AuthService } from './../../services/auth.service';
import { IMGURL } from './../../services/ApisConst.service';
import { PostService } from './../../services/post.service';
import { Post } from './../../interfaces/post';
import { AddpostPage } from './../addpost/addpost';
import { EditpostPage } from './../editpost/editpost';
import { PostdetailsPage } from './../postdetails/postdetails';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the TabrentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabrent',
  templateUrl: 'tabrent.html',
})
export class TabrentPage {
  rentinterface: Post[] = [
      {
        id: 2,
        post_name: "Apartment for rent",
        created_at: "2020-04-21 14:43:16",
        updated_at: "2020-04-21 14:43:16",
        desc: "apartment for sale. 5 rooms and a hall, 4 bathrooms and a kitchen Fully furnished furniture, air conditioning, excellent location, high finishing, close to Herfy Najm Al Din",
        allImages: ['./../../assets/imgs/villa1.jpg', './../../assets/imgs/villa2.jpg'],
        price: 950000,
        address: 'Riyadh, Saudi Arabia',
        phone: "+966556311000",
        email: "tarekbadry30@gmail.com",
        user_id: 1,
        status:"active",
        type:"rent"
      },
    ];
    rentposts:Post[]=[]
    posts:Post[]=[]
    imgurl:string = IMGURL;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController
    ,public translate:TranslateService, public postser:PostService, public authser:AuthService, public uiser:UiControllerFunService) {
  }
  isloading = false
  ionViewWillEnter() {
    console.log('ionViewWillEnter TabrentPage');
    this.isloading = true
    this.rentposts =[]
    this.posts =[]
    this.postser.getAllPosts().subscribe((data:Post[]) => {
      data.forEach(element => {
        if(element.type == 'rent'){
          this.rentposts.push(element)
        }
      });
      this.posts = this.rentposts.slice(0,2)
      console.log('data from server: ',this.rentposts)
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
    console.log('this.rentposts.length: ',this.rentposts.length)
    console.log('this.posts.length: ',this.posts.length)
    if(this.rentposts.length > this.posts.length){
      let l = this.rentposts.length - this.posts.length
      console.log('elfrq: ',l)
      if(l >= 2){
        console.log('hdif 1 bs ')
        this.posts = this.rentposts.slice(0, this.posts.length+2)
      }else{
        console.log('hdif klh ')
        this.posts = this.rentposts.slice(0)
      }
    }else{
      console.log('no more data to show')
    }
    event.complete();
  }

  opendetails(item){
    item.allImages=[]
    this.navCtrl.push(PostdetailsPage ,{item:item});
  }

  openaddpost(){
    if(this.authser.userData.email_verified_at){
      this.navCtrl.push(AddpostPage);
    }else{
      console.log('you not verify your email')
      this.uiser.showBasicAlertWithTranslate(this.translate.instant('TABs.title_alert'),
      this.translate.instant('TABs.subtitle_alert'),
      this.translate.instant('TABs.butt_alert_ok')
      )
    }
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
                this.rentposts.splice(this.rentposts.indexOf(item),1)
                this.uiser.dissmisloading()
                this.uiser.presentToast(result.success)
                console.log('this.allposts after deleted: ',this.rentposts)
              }else{
                this.uiser.dissmisloading()
                this.uiser.presentToast("Ooops, Mistake thing happened,Try Agin!")
                console.log('ERR: ',result.errors)
                console.log('this.allposts after no deleted: ',this.rentposts)
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
