import { MypostsPage } from './../pages/myposts/myposts';
import { AuthService } from './../services/auth.service';
import { ContactusPage } from './../pages/contactus/contactus';
import { ProfilePage } from './../pages/profile/profile';
import { AboutusPage } from './../pages/aboutus/aboutus';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
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
  isLogIn;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen
    ,private languageService:LanguageService, public authser:AuthService,public event: Events
    ) {
      this.authser.checkInternetConnection();
      if(localStorage.getItem('userData')){
        this.authser.isLogIn = true
        this.isLogIn = true;
      }else{
        this.authser.isLogIn = false
        this.isLogIn = false;
      }
    this.initializeApp();
    this.authser.userData = JSON.parse(localStorage.getItem('userData'))
    this.pages = this.setPages(this.isLogIn)
    this.lastpage = this.pages[0]
      this.event.subscribe('userLogIn',async (data)=>{
        this.isLogIn = data;
        this.pages = await this.setPages(data)
        this.lastpage = this.pages[0]
      });
      this.event.subscribe('userLOgOut',async (data)=>{
        this.isLogIn = data;
        this.pages = await this.setPages(data)
        this.lastpage = this.pages[0]
      });
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

  setPages(isLogin:boolean){
    return this.pages = [
      { index:0 , title: 'MENU.homePage', component: TabsHomePage ,icon:'home' ,isActive:true, isLogIn: true},
      { index:1 , title: 'MENU.ProfilePage', component: ProfilePage ,icon:'person' ,isActive:false, isLogIn: isLogin},
      { index:5 , title: 'MENU.mypostsPage', component: MypostsPage ,icon:'document' ,isActive:false, isLogIn: isLogin},
      { index:2 , title: 'MENU.SignInPage', component: LoginPage ,icon:'log-in' ,isActive:false, isLogIn: !isLogin},
      { index:3 , title: 'MENU.SignUpPage', component: RegisterPage ,icon:'happy' ,isActive:false, isLogIn: !isLogin},
      { index:4 , title: 'MENU.ContactUsPage', component: ContactusPage ,icon:'mail' ,isActive:false, isLogIn: true},
      { index:5 , title: 'MENU.AboutUsPage', component: AboutusPage ,icon:'information-circle' ,isActive:false, isLogIn: true}
    ];
  }
  
  openPage(page) {
    this.nav.setRoot(page.component);
    this.isActive(page);
  }
  async signOut(){
    let result: boolean = this.authser.SignOut()
    if(result == true){
      this.authser.isLogIn = false
      await this.event.publish("userLOgOut",false)
      this.nav.setRoot(TabsHomePage);
    }else{ }
  }

  isActive(page){
    if(this.pages[this.pages.indexOf(page)].isActive == false){
      this.pages[this.pages.indexOf(page)].isActive = true;
      this.lastpage.isActive = false
      if(this.pages[this.pages.indexOf(this.lastpage)]){
        this.pages[this.pages.indexOf(this.lastpage)].isActive = false
      }
      this.lastpage = this.pages[this.pages.indexOf(page)]
    }
  }

  changelang(){
    this.languageService.setLanguage(this.selected)
  }


}
