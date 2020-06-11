import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostdetailsPage } from './postdetails';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PostdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PostdetailsPage),
    TranslateModule,
  ],
})
export class PostdetailsPageModule {}
