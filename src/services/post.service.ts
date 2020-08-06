import { Post } from './../interfaces/post';
import { AuthService } from './auth.service';
import { APIURL } from './ApisConst.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

@Injectable()

export class PostService {
  TabHomeCash:Post[]=[];
  TabSellingCash:Post[]=[];
  TabRentCash:Post[]=[];
  TabAdminCash:Post[]=[];
  MyPostsCash:Post[]=[];
  constructor(private http:HttpClient, public authser:AuthService) { }
  //test(){
  //  return this.http.get('https://safaregy.com/api/home/')
  //}
  getAllPosts(){
    return this.http.post(APIURL+'index',{})
  }

  getPost(id:string){
    let param = {
      "post_id": id
    }
    return this.http.post(APIURL+'postDetails',param)
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

      "post_name" : item.title,
      "post_desc" : item.desc,
      "post_address" : item.address,
      "type" : item.type,
      "mobile" : item.phone,
      "email" : item.email,
      "price" : item.price,
      "img" : item.galleries,
      "city_id": item.city_id

    }
    return this.http.post(APIURL+'insertPost',param)
  }

  updatePost(item:Post){
    let param = {
      "api_token": this.authser.userData.api_token,
      "post_id": item.id,
      "post_name" : item.title,
      "post_desc" : item.desc,
      "post_address" : item.address,
      "type" : item.type,
      "phone" : item.phone,
      "email" : item.email,
      "price" : item.price,
      "status" : item.status,
      "city_id": item.city_id
    }
    return this.http.post(APIURL+'updatePost',param)
  }

  deletePost(id:string){
    let param = {
      "api_token": this.authser.userData.api_token,
      "post_id": id
    }
    return this.http.post(APIURL+'deletePost',param)
  }

  Search(text:string , city?:string){
    let param = {}
    if(text !='' && city != ''){
       param = {
        "searchFor": text,
        "city_id": city
      }
    }else if(text !=''){
      param = {
        "searchFor": text
      }
    }else if (city != ''){
      param = {
        "city_id": city
      }
    }
    return this.http.get(APIURL+'search',{params : param})
  }

}