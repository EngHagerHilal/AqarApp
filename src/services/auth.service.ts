import { User } from './../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {
  userData:User;
  constructor(private http:HttpClient) { }

  Signin(username:string,password:string){

  }

  SignUp(){

  }

  SignOut(){

  }

}