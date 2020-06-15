import { TabrentPage } from './../tabrent/tabrent';
import { TabsalePage } from './../tabsale/tabsale';
import { TabhomePage } from './../tabhome/tabhome';
import { Component, ViewChild } from '@angular/core';
import { NavController, Tab } from 'ionic-angular';

@Component({
  selector: 'page-tabshome',
  templateUrl: 'home.html'
})
export class TabsHomePage {
  tabHomeRoot = TabhomePage;
  tabSaleRoot = TabsalePage;
  tabRentRoot = TabrentPage;
  myIndex:number = 1;
  @ViewChild('myTabs') tabs: Tab;
  constructor(public navCtrl: NavController) {

  }
  async click(){
    console.log('clicked')
    this.navCtrl.setRoot(await this.navCtrl.setRoot('TabhomePage'));
  }
  ionSelected(tab: Tab,e){
    //this.scrollArea.scrollToTop();
    //this.refresh()
    console.log('clicked',this.navCtrl.getActive())
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
}

}
