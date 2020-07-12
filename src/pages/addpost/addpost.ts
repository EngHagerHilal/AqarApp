import { TranslateService } from '@ngx-translate/core';
import { UiControllerFunService } from './../../services/uiControllerFun.service';
import { PostService } from './../../services/post.service';
//import { Camera , CameraOptions} from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file'
import { Post } from './../../interfaces/post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddpostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpost',
  templateUrl: 'addpost.html',
})
export class AddpostPage {
  newad:Post={};
  isClickAdd:boolean = false
  myFiles:any[]=[]
  constructor(public navCtrl: NavController, public navParams: NavParams, public images:ImagePicker, public file:File
    , public postser:PostService, public uiser:UiControllerFunService, public translate:TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpostPage');
  }
  add(){
    this.isClickAdd = true
    this.newad.allImages = this.myImages;
    console.log('new post: ',this.newad)
    this.uiser.presentToast(this.translate.instant('MESSAGETOAST.pleasewait'))
    this.postser.addPost(this.newad).subscribe((data:any)=>{
      console.log('response of add request: ',data)
      if(data.success){
        this.uiser.presentToast(this.translate.instant('MESSAGETOAST.addpost_seccuss'))
        this.navCtrl.pop()
        this.isClickAdd = false
      }else{
        this.uiser.presentToast(this.translate.instant('MESSAGETOAST.errorRequest'))
        this.isClickAdd = false
      }
    })
  }
  myImages:any[]=[]
  selectphotos(){
    this.myImages = [];
    let options : ImagePickerOptions ={
      maximumImagesCount : 5,
      width: 800,
      height: 500,
      quality: 100
    }
    this.images.getPictures(options).then((results)=>{
      //alert(JSON.stringify(results))
      this.myFiles = results
      for (let index = 0; index < results.length; index++) {
        const element = results[index];
        let filename = element.substring(element.lastIndexOf('/')+1);
        let path = element.substring(0,element.lastIndexOf('/')+1);
        this.file.readAsDataURL(path,filename).then((base64string)=>{
          this.myImages.push(base64string);
          //alert(JSON.stringify(this.myImages))
        })
      }
    }).catch(err=>{
      console.log('ERR on select photos..',err)
      //alert(err)
    })
    /*
    let options = {
      quality: 100,
      destinationType: thiresultss.cam.DestinationType.FILE_URI,
      mediaType: this.cam.MediaType.PICTURE,
      sourceType: this.cam.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      maxImagesCount: 10
    }
    console.log('my options: ',options)
    this.cam.getPicture(options).then(data => {
      alert(JSON.stringify(data))
    }).catch(err =>{
      alert('ERR..'+err)
    })*/
  }


}
