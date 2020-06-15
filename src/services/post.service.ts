import { APIURL } from './ApisConst.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class PostService {

  constructor(private http:HttpClient) { }
  
  getAllPosts(): Observable<any>{
    return this.http.get(APIURL+'index/')
  }

  getPost(id = 1): Observable<any>{
    const params = new HttpParams().set('Post_id', id.toString());
    return this.http.get(APIURL+'postDetails/',{params})
  }

  getMyPosts(api_token:string){

  }

  addPost(){

  }

  updatePost(id:string){

  }

  deletePost(id:string){

  }

}