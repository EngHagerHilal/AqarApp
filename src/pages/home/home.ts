import { TabrentPage } from './../tabrent/tabrent';
import { TabsalePage } from './../tabsale/tabsale';
import { TabhomePage } from './../tabhome/tabhome';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-tabshome',
  templateUrl: 'home.html'
})
export class TabsHomePage {
  tabHomeRoot = TabhomePage;
  tabSaleRoot = TabsalePage;
  tabRentRoot = TabrentPage;
  myIndex:number = 1;
  constructor(public navCtrl: NavController) {

  }

}
