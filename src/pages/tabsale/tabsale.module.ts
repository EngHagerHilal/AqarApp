import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsalePage } from './tabsale';

@NgModule({
  declarations: [
    TabsalePage,
  ],
  imports: [
    IonicPageModule.forChild(TabsalePage),
  ],
})
export class TabsalePageModule {}
