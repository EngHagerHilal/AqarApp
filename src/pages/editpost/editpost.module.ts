import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditpostPage } from './editpost';

@NgModule({
  declarations: [
    EditpostPage,
  ],
  imports: [
    IonicPageModule.forChild(EditpostPage),
    TranslateModule
  ],
})
export class EditpostPageModule {}
