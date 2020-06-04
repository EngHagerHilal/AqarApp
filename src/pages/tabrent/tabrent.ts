import { AddpostPage } from './../addpost/addpost';
import { EditpostPage } from './../editpost/editpost';
import { PostdetailsPage } from './../postdetails/postdetails';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

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
  rentinterface: {
    id?: number, post_name: string, desc: string, created_at: Date | string,updated_at: Date | string, allImages: string[],
    price: number, address: string, phone: string, email: string, user_id:number, status:string, type:string
  }[] = [
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabrentPage');
  }

  opendetails(item){
    this.navCtrl.push(PostdetailsPage ,{item:item});
  }

  openaddpost(){
    this.navCtrl.push(AddpostPage);
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
