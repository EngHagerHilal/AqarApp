import { ContactusPage } from './../pages/contactus/contactus';
import { ProfilePage } from './../pages/profile/profile';
import { AboutusPage } from './../pages/aboutus/aboutus';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsHomePage } from '../pages/home/home';
import { LanguageService } from '../services/language.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsHomePage;
  selected: string = '';

  pages: Array<{index:number, title: string, component: any , icon:string, isActive:boolean}>;
  lastpage: {index:number, title: string, component: any , icon:string, isActive:boolean};

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen
    ,private languageService:LanguageService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { index:0 , title: 'MENU.homePage', component: TabsHomePage ,icon:'home' ,isActive:true},
      { index:1 , title: 'MENU.ProfilePage', component: ProfilePage ,icon:'person' ,isActive:false},
      { index:2 , title: 'MENU.SignInPage', component: LoginPage ,icon:'log-in' ,isActive:false},
      { index:3 , title: 'MENU.SignUpPage', component: RegisterPage ,icon:'happy' ,isActive:false},
      { index:4 , title: 'MENU.ContactUsPage', component: ContactusPage ,icon:'mail' ,isActive:false},
      { index:5 , title: 'MENU.AboutUsPage', component: AboutusPage ,icon:'information-circle' ,isActive:false},
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
      this.languageService.setInitialAppLanguage();
      this.selected = this.languageService.selected;
      console.log('this.selected: ',this.selected)
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
    if(this.pages[this.pages.indexOf(page)].isActive == false){
      this.pages[this.pages.indexOf(page)].isActive = true;
        this.lastpage.isActive = false
      this.lastpage = this.pages[this.pages.indexOf(page)]
    }
  }

  changelang(){
    console.log('selected: ',this.selected)
    this.languageService.setLanguage(this.selected)
  }
}
