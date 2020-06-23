import { Post } from './../interfaces/post';
import { AuthService } from './auth.service';
import { APIURL } from './ApisConst.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class PostService {

  constructor(private http:HttpClient, public authser:AuthService) { }
  
  getAllPosts(): Observable<any>{
    return this.http.get(APIURL+'index/')
  }

  getPost(id:string): Observable<any>{
    let param = {
      "post_id": id
    }
    return this.http.get(APIURL+'postDetails/',{ params: param })
  }

  getMyPosts(){
    let param = {
      "api_token": this.authser.userData.api_token
    }
    return this.http.post(APIURL+'myPosts',param)
  }

  addPost(){

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

}