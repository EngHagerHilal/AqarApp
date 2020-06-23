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
  date=new Date();
  constructor(public navCtrl: NavController, public navParams: NavParams, public images:ImagePicker, public file:File) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpostPage');
  }
  add(){
    this.newad.created_at = this.date.toISOString()
    this.newad.updated_at = this.date.toISOString()
    this.newad.status = 'active'
    this.newad.allImages = [];
    //this.newad.mainImaage = '';
    this.newad.user_id = 0; //'who logedin'
    this.newad.email = 'who logedin';
    this.newad.phone = 'who logedin';
    console.log('newad: ',this.newad)
  }
  myImages:any[]=[]
  selectphotos(){
    let options : ImagePickerOptions ={
      maximumImagesCount : 5,
      width: 100,
      height: 100,
      quality: 100
    }
    this.myImages = [];
    this.images.getPictures(options).then((results)=>{
      alert(JSON.stringify(results))
      for (let index = 0; index < results.length; index++) {
        const element = results[index];
        let filename = element.substring(element.lastIndexOf('/')+1);
        let path = element.substring(0,element.lastIndexOf('/')+1);
        this.file.readAsDataURL(path,filename).then((base64string)=>{
          this.myImages.push(base64string);
          alert(JSON.stringify(this.myImages))
        })
      }
    }).catch(err=>{
      console.log('ERR..',err)
      alert(err)
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
