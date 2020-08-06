import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabrowadpostsPage } from './tabrowadposts';

@NgModule({
  declarations: [
    TabrowadpostsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabrowadpostsPage),
    TranslateModule
  ],
})
export class TabrowadpostsPageModule {}
