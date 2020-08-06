import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserprofilePage } from './userprofile';

@NgModule({
  declarations: [
    UserprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(UserprofilePage),
    TranslateModule
  ],
})
export class UserprofilePageModule {}
