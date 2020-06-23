import { Post } from './../../interfaces/post';
import { PostService } from './../../services/post.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MypostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myposts',
  templateUrl: 'myposts.html',
})
export class MypostsPage {
  pet:string = 'All'
  activeSelling:Post[]=[]
  activeRent:Post[]=[]
  allActive:Post[]=[]
  allDisActive:Post[]=[]
  constructor(public navCtrl: NavController, public navParams: NavParams, public postser:PostService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MypostsPage');
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter MypostsPage');
    /*this.postser.getMyPosts().subscribe(data => {
      console.log('my data: ',data)
      let myposts:any = JSON.stringify(data)
      console.log('my rent Posts: ',myposts.rentPosts)
      console.log('my sell Posts: ',myposts.sellPosts.active)

    })*/
  }

}
