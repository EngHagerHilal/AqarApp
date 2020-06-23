import { CONTACTUS_EMAIL_TO } from './../../services/ApisConst.service';
import { EmailComposer } from '@ionic-native/email-composer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
  contactDetails:any={}
  constructor(public navCtrl: NavController, public navParams: NavParams, public email:EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }
  Send(){
    let email= {
      to: CONTACTUS_EMAIL_TO,
      subject: "A complaint submitted by Mr."+ this.contactDetails.UserName,
      body: this.contactDetails.massege+'<br>phone to contact: '+this.contactDetails.Phone+'<br>email to contact: '+this.contactDetails.Email,
      isHtml : true
    }
    console.log('my param: ',email)
    this.email.open(email);
    //console.log('contactDetails: ',this.contactDetails)
  }

}
