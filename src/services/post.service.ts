import { Post } from './../interfaces/post';
import { AuthService } from './auth.service';
import { APIURL, HttpHeader } from './ApisConst.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

@Injectable()

export class PostService {

  constructor(private http:HttpClient, public authser:AuthService) { }
  
  getAllPosts(){
    return this.http.get(APIURL+'index/')
  }

  getPost(id:string){
    let param = {
      "post_id": id
    }
    return this.http.get(APIURL+'postDetails/',{params:param })
  }

  getMyPosts(){
    let param = {
      "api_token": this.authser.userData.api_token
    }
    return this.http.post(APIURL+'myPosts',param)
  }

  addPost(item:Post){
    let param = {
      "api_token": this.authser.userData.api_token,
      "post_name" : item.post_name,
      "post_desc" : item.desc,
      "post_address" : item.address,
      "type" : item.type,
      "mobile" : item.phone,
      "email" : item.email,
      "price" : item.price,
      "img" : item.allImages
    }
    console.log('param', param)
    return this.http.post(APIURL+'insertPost',param)
  }

  updatePost(item:Post){
    let param = {
      "api_token": this.authser.userData.api_token,
      "post_id": item.id,
      "post_name" : item.post_name,
      "post_desc" : item.desc,
      "post_address" : item.address,
      "type" : item.type,
      "mobile" : item.phone,
      "email" : item.email,
      "price" : item.price,
      "status" : item.status
    }
    console.log('param', param)
    return this.http.post(APIURL+'updatePost',param)
  }

  deletePost(id:string){
    let param = {
      "api_token": this.authser.userData.api_token,
      "post_id": id
    }
    console.log('param', param)
    return this.http.post(APIURL+'deletePost/',param)
  }

  Search(text:string , type?:string){
    let param = {}
    if(type){
       param = {
        "searchFor": text,
        "filterType": type
      }
    }else{
      param = {
        "searchFor": text
      }
    }
    console.log('param', param)
    return this.http.get(APIURL+'search/',{ params: param })
  }

}