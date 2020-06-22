import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabrentPage } from './tabrent';

@NgModule({
  declarations: [
    TabrentPage,
  ],
  imports: [
    IonicPageModule.forChild(TabrentPage),
    TranslateModule
  ],
})
export class TabrentPageModule {}
