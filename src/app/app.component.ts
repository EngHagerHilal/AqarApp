import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsHomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsHomePage;

  pages: Array<{index:number, title: string, component: any , icon:string, isActive:boolean}>;
  lastpage: {index:number, title: string, component: any , icon:string, isActive:boolean};

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { index:0 , title: 'Home', component: TabsHomePage ,icon:'home' ,isActive:true},
      { index:1 , title: 'My Profile', component: TabsHomePage ,icon:'person' ,isActive:false},
      { index:2 , title: 'Sign In', component: TabsHomePage ,icon:'log-in' ,isActive:false},
      { index:3 , title: 'Sign Up', component: TabsHomePage ,icon:'happy' ,isActive:false},
      { index:4 , title: 'About Us', component: TabsHomePage ,icon:'information-circle' ,isActive:false},
      //{ index:5 , title: 'List', component: ListPage ,icon:'information-circle' ,isActive:false}
    ];
    this.lastpage = this.pages[0]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.isActive(page);
  }
  signOut(){
    console.log('signOut clicked')
  }

  isActive(page){
    this.pages[this.pages.indexOf(page)].isActive = true;
    if(this.lastpage){
      this.lastpage.isActive = false
    }
    this.lastpage = this.pages[this.pages.indexOf(page)]
  }
}
