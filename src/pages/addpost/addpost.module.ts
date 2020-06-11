import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddpostPage } from './addpost';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddpostPage,
  ],
  imports: [
    IonicPageModule.forChild(AddpostPage),
    TranslateModule,
  ],
})
export class AddpostPageModule {}
