import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
@Injectable()

export class UiControllerFunService {
    loader:any;
    pages: Array<{index:number, title: string, component: any , icon:string, isActive:boolean,isLogIn?:any}>;
  constructor(public toastCtrl: ToastController,public loadingCtrl: LoadingController, public alertCtrl:AlertController) { }
  
  presentToast(msg:string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  dissmisloading(){
    this.loader.dismiss();
  }

  showBasicAlertWithTranslate(titletxt:string , masstxt:string, buttOk: string) {
    const alert = this.alertCtrl.create({
      title: titletxt,
      subTitle: masstxt,
      buttons: [buttOk]
    });
    alert.present();
  }

}