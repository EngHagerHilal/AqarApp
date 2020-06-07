import { Post } from './../../interfaces/post';
import { AddpostPage } from './../addpost/addpost';
import { EditpostPage } from './../editpost/editpost';
import { PostdetailsPage } from './../postdetails/postdetails';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsalePage');
  }

  openaddpost(){
    this.navCtrl.push(AddpostPage);
  }

  opendetails(item){
    this.navCtrl.push(PostdetailsPage ,{item:item});
  }

  presentActionSheetMore(item) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
          }
        },{
          text: 'Edit',
          handler: () => {
            this.navCtrl.push(EditpostPage,{item:item});
            console.log('Edit clicked');
          }
        },{
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


}
