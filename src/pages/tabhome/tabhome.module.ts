import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabhomePage } from './tabhome';

@NgModule({
  declarations: [
    TabhomePage,
  ],
  imports: [
    IonicPageModule.forChild(TabhomePage),
    TranslateModule
  ],
})
export class TabhomePageModule {}
