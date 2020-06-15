import { MypostsPage } from './../pages/myposts/myposts';
import { AuthService } from './../services/auth.service';
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

  pages: Array<{index:number, title: string, component: any , icon:string, isActive:boolean,isLogIn?:any}>;
  lastpage: {index:number, title: string, component: any , icon:string, isActive:boolean, isLogIn?:any};
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen
    ,private languageService:LanguageService, public authser:AuthService) {
    this.initializeApp();
    console.log('localStorage user: ', localStorage.getItem('userData'))
    this.authser.userData = JSON.parse(localStorage.getItem('userData'))
    console.log('authser.userData: ', this.authser.userData)
    if(localStorage.getItem('userData')){
      this.authser.isLogIn = true
    }else{
      this.authser.isLogIn = false
    }
    // used for an example of ngFor and navigation
    this.pages = [
      { index:0 , title: 'MENU.homePage', component: TabsHomePage ,icon:'home' ,isActive:true, isLogIn: true},
      { index:1 , title: 'MENU.ProfilePage', component: ProfilePage ,icon:'person' ,isActive:false, isLogIn: this.authser.userData},
      { index:5 , title: 'MENU.mypostsPage', component: MypostsPage ,icon:'document' ,isActive:false, isLogIn: this.authser.userData},
      { index:2 , title: 'MENU.SignInPage', component: LoginPage ,icon:'log-in' ,isActive:false, isLogIn: !this.authser.userData},
      { index:3 , title: 'MENU.SignUpPage', component: RegisterPage ,icon:'happy' ,isActive:false, isLogIn: !this.authser.userData},
      { index:4 , title: 'MENU.ContactUsPage', component: ContactusPage ,icon:'mail' ,isActive:false, isLogIn: true},
      { index:5 , title: 'MENU.AboutUsPage', component: AboutusPage ,icon:'information-circle' ,isActive:false, isLogIn: true}
    ];
    console.log('pages: ', this.pages)
    this.lastpage = this.pages[0]
  }

  ionViewWillEnter(){
    console.log('menu enter')
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.languageService.setInitialAppLanguage();
      this.selected = this.languageService.selected;
    });
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.isActive(page);
  }
  signOut(){
    let result: boolean = this.authser.SignOut()
    if(result == true){
      this.authser.isLogIn = false
      console.log('signOut done')
      console.log('localStorage user: ', localStorage.getItem('userData'))
      console.log('authser.userData: ', this.authser.userData)
      console.log('authser.isLogIn: ', this.authser.isLogIn)
      console.log('pages: ', this.pages)
    }else{
      console.log('signOut no')
      console.log('localStorage user: ', localStorage.getItem('userData'))
      console.log('authser.userData: ', this.authser.userData)
    }
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
