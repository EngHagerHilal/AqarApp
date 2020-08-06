import { CITIES_SELECT } from './../../services/ApisConst.service';
import { TranslateService } from '@ngx-translate/core';
import { UiControllerFunService } from './../../services/uiControllerFun.service';
import { PostService } from './../../services/post.service';
import { Post } from './../../interfaces/post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditpostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editpost',
  templateUrl: 'editpost.html',
})
export class EditpostPage {
  myitem:Post
  date=new Date();
  isClicksave = false
  select_options: any[] = CITIES_SELECT;
  constructor(public navCtrl: NavController, public navParams: NavParams, public postser:PostService, public uiser:UiControllerFunService
    ,public translate:TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditpostPage');
  }
  ngOnInit(){
    this.myitem = this.navParams.get('item')
    this.select_options.splice(0,1)
  }
  updatepost(){
    this.isClicksave = true
    this.postser.updatePost(this.myitem).subscribe(data =>{
      let result:any =data;
      if(result.success){
        this.uiser.presentToast(this.translate.instant('MESSAGETOAST.updatepost_seccuss'))
        this.navCtrl.pop();
      }else{
        this.uiser.presentToast(this.translate.instant('MESSAGETOAST.errorRequest'))
        console.log('ERR: ',result.errors)
      }
      this.isClicksave = false
    })
  }

}
