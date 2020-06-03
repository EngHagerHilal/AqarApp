import { PostdetailsPage } from './../postdetails/postdetails';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    id?: string, title: string, description: string, date: Date | string, imgs: string[],
    price: number, location: string, phone: string, email: string
  }[] = [
      {
        id: "2",
        title: "Apartment for rent",
        date: "2020-04-21 14:43:16",
        description: "apartment for sale. 5 rooms and a hall, 4 bathrooms and a kitchen Fully furnished furniture, air conditioning, excellent location, high finishing, close to Herfy Najm Al Din",
        imgs: ['./../../assets/imgs/villa1.jpg', './../../assets/imgs/villa2.jpg'],
        price: 950000,
        location: 'Riyadh, Saudi Arabia',
        phone: "+966556311000",
        email: "tarekbadry30@gmail.com"
      },
    ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabrentPage');
  }

  opendetails(item){
    this.navCtrl.push(PostdetailsPage ,{item:item});
  }

}
