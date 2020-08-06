import { UiControllerFunService } from './../../services/uiControllerFun.service';
import { AuthService } from './../../services/auth.service';
import { IMGURL, SIZEOFRELOADING, CITIES_SELECT } from './../../services/ApisConst.service';
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
  rentposts: Post[] = []
  posts: Post[] = []
  imgurl: string = IMGURL;
  select_options: any[] = CITIES_SELECT;
  selectedCity: string = ''
  searchQuery: string = '';
  isSearchLoading: boolean = false;
  lengthResultSearch:number = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController
    , public translate: TranslateService, public postser: PostService, public authser: AuthService, public uiser: UiControllerFunService) {
  }
  isloading = false
  ionViewWillEnter() {
    console.log('ionViewWillEnter TabrentPage');
    this.searchQuery = ''
    this.selectedCity = ''
    this.isloading = true
    this.rentposts = this.postser.TabRentCash
    this.posts = this.rentposts.slice(0, SIZEOFRELOADING)
    this.postser.getAllPosts().subscribe((data: any) => {
      this.postser.TabRentCash = data.rent
      this.rentposts = this.postser.TabRentCash
      this.posts = this.rentposts.slice(0, SIZEOFRELOADING)
      this.isloading = false
    })
  }

  async doRefresh(event) {
    await this.ionViewWillEnter();
    event.complete();
  }

  loadData(event) {
    if (this.rentposts.length > this.posts.length) {
      let l = this.rentposts.length - this.posts.length
      if (l >= SIZEOFRELOADING) {
        this.posts = this.rentposts.slice(0, this.posts.length + SIZEOFRELOADING)
      } else {
        this.posts = this.rentposts.slice(0)
      }
    } else { }
    event.complete();
  }

  search() {
    if(this.searchQuery !='' || this.selectedCity !=''){
      //do search
      this.isSearchLoading = true
      if(this.searchQuery ==='' && this.selectedCity ==='0'){
        this.lengthResultSearch = null
        this.searchFromTxt()
      }else{
        this.postser.Search(this.searchQuery, this.selectedCity).subscribe((result: any) => {
          if (result.posts) {
            this.posts = result.posts.rent
            this.lengthResultSearch = this.posts.length
          }
          this.isSearchLoading = false
        })
      }
    }else{
      //no searceh
      this.lengthResultSearch = null
      this.searchFromTxt()
    }
  }
 
  searchFromTxt(event?) {
    if (this.searchQuery ==='' && (this.selectedCity ==='0' || this.selectedCity ==='')) {
      this.isSearchLoading = true
      this.posts = this.rentposts.slice(0, SIZEOFRELOADING)
      this.isSearchLoading = false
      this.lengthResultSearch = null
    }else if (this.searchQuery ==='' && this.selectedCity !=''){
      this.isSearchLoading = true
      this.postser.Search(this.searchQuery, this.selectedCity).subscribe((result: any) => {
        if (result.posts) {
          this.posts = result.posts.rent
        }
        this.isSearchLoading = false
      })
    }
  }
  opendetails(item) {
    item.allImages = []
    this.navCtrl.push(PostdetailsPage, { item: item });
  }

  openaddpost() {
    if (this.authser.userData && this.authser.userData.email_verified_at) {
      this.navCtrl.push(AddpostPage);
    } else if (this.authser.userData) {
      this.uiser.showBasicAlertWithTranslate(this.translate.instant('TABs.title_alert'),
        this.translate.instant('TABs.subtitle_alert'),
        this.translate.instant('TABs.butt_alert_ok')
      )
    } else {
      this.uiser.showBasicAlertWithTranslate(this.translate.instant('TABs.title_alert2'),
        this.translate.instant('TABs.subtitle_alert2'),
        this.translate.instant('TABs.butt_alert_ok'))
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
            this.postser.deletePost(item.id.toString()).subscribe(data => {
              let result: any = data
              if (result.success) {
                this.rentposts.splice(this.rentposts.indexOf(item), 1)
                this.posts.splice(this.posts.indexOf(item), 1)
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
