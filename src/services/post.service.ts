import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class PostService {

  constructor(private http:HttpClient) { }
  
  getAllPosts(){

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