import { IMGURL } from './../../services/ApisConst.service';
import { PostService } from './../../services/post.service';
import { Post } from './../../interfaces/post';
import { EditpostPage } from './../editpost/editpost';
import { AddpostPage } from './../addpost/addpost';
import { PostdetailsPage } from './../postdetails/postdetails';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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
  imgurl:string = IMGURL;
  allposts:Post[]=[]

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController
      ,public translate:TranslateService, public postser:PostService) {
        /*this.postser.getPost().subscribe(data =>{
          console.log('post from server: ',data)
        })*/
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter TabhomePage');
    this.postser.getAllPosts().subscribe((data:Post[]) => {
      this.allposts = data
      console.log('data from server: ',this.allposts)
    })
  }
  doRefresh($event){
    console.log('refreash')
  }

  getItems(event){
    let data = event.target.value
    console.log(data)
  }

  opendetails(item){
    item.allImages=[]
    this.navCtrl.push(PostdetailsPage ,{item:item});
  }

  openaddpost(){
    this.navCtrl.push(AddpostPage);
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
