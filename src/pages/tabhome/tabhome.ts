import { PostdetailsPage } from './../postdetails/postdetails';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  urlBack:string = './../../assets/imgs/home.jpg';
  offerinterface: {
    id?: string, title: string, description: string, date: Date | string, imgs: string[],
    price: number, location: string, phone: string, email: string
  }[] = [
      {
        id: "1",
        title: "Villa for sale",
        date: "2020-04-21 14:43:16",
        description: "Villa for sale, Al-Manar neighborhood. The area is 250 meters. Specifications Hall drawer, 4 rooms , 3 halls, 1 Basement, 4 bathrooms. There is a driver room. There is a room with a roof top.",
        imgs: ['./../../assets/imgs/villa2.jpg', './../../assets/imgs/villa1.jpg'],
        price: 950000,
        location: 'Riyadh, Saudi Arabia',
        phone: "+966556311000",
        email: "tarekbadry30@gmail.com"
      },
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
    console.log('ionViewDidLoad TabhomePage');
  }

  getItems(event){
    let data = event.target.value
    console.log(data)
  }

  opendetails(item){
    this.navCtrl.push(PostdetailsPage ,{item:item});
  }

}
