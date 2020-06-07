import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { TabsHomePage } from '../pages/home/home';
import { TabrentPage } from './../pages/tabrent/tabrent';
import { TabsalePage } from './../pages/tabsale/tabsale';
import { TabhomePage } from './../pages/tabhome/tabhome';
import { PostdetailsPage } from './../pages/postdetails/postdetails';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { AddpostPage } from './../pages/addpost/addpost';
import { AboutusPage } from './../pages/aboutus/aboutus';
import { ProfilePage } from './../pages/profile/profile';
import { ContactusPage } from './../pages/contactus/contactus';
import { EditpostPage } from './../pages/editpost/editpost';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsHomePage,
    TabhomePage,
    TabsalePage,
    TabrentPage,
    PostdetailsPage,
    LoginPage,
    RegisterPage,
    AddpostPage,
    AboutusPage,
    ProfilePage,
    ContactusPage,
    EditpostPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsHomePage,
    TabhomePage,
    TabsalePage,
    TabrentPage,
    PostdetailsPage,
    LoginPage,
    RegisterPage,
    AddpostPage,
    AboutusPage,
    ProfilePage,
    ContactusPage,
    EditpostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
