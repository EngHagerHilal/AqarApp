import { PostService } from './../../services/post.service';
import { IMGURL } from './../../services/ApisConst.service';
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
  saleinterface: Post[] = [
      {
        id: 1,
        post_name: "Villa for sale",
        created_at: "2020-04-21 14:43:16",
        updated_at: "2020-04-21 14:43:16",
        desc: "Villa for sale, Al-Manar neighborhood. The area is 250 meters. Specifications Hall drawer, 4 rooms , 3 halls, 1 Basement, 4 bathrooms. There is a driver room. There is a room with a roof top.",
        allImages: ['./../../assets/imgs/villa2.jpg', './../../assets/imgs/villa1.jpg'],
        price: 950000,
        address: 'Riyadh, Saudi Arabia',
        phone: "+966556311000",
        email: "tarekbadry30@gmail.com",
        user_id: 2,
        status:"active",
        type:"selling"
      },
    ];
    sellingposts:Post[]=[];
    imgurl:string = IMGURL;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController
    ,public translate:TranslateService, public postser:PostService) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter TabsalePage');
    this.postser.getAllPosts().subscribe((data:Post[]) => {
      data.forEach(element => {
        if(element.type == 'selling'){
          this.sellingposts.push(element)
        }
      });
      console.log('data from server: ',this.sellingposts)
    })
  }

  openaddpost(){
    this.navCtrl.push(AddpostPage);
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
            console.log('Delete clicked');
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
