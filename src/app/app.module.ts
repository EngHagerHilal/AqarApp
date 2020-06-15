import { AuthService } from './../services/auth.service';
import { PostService } from './../services/post.service';
import { LanguageService } from './../services/language.service';
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
import { MypostsPage } from './../pages/myposts/myposts';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import {TranslateModule , TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { IonicStorageModule} from '@ionic/storage';
import { UiControllerFunService } from '../services/uiControllerFun.service';

export function createTeanslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json')
}

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
    EditpostPage,
    MypostsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTeanslateLoader),
        deps: [HttpClient]
      }
    })
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
    EditpostPage,
    MypostsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LanguageService,
    PostService,
    AuthService,
    UiControllerFunService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
