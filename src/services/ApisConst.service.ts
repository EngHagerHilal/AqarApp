import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
export const APIURL = 'https://aqar.leen.com.eg/api/';
export const IMGURL = 'https://aqar.leen.com.eg/public/';

export const CONTACTUS_EMAIL_TO = 'admin@admin.com';
export const SIZEOFRELOADING : number = 10;
export const HttpHeader = {
  headers: new HttpHeaders({
    "access-control-allow-headers":	"Content-Type",
    "access-control-allow-methods":	"GET, HEAD, POST, PUT, OPTIONS",
    "access-control-allow-origin":	"*",
    "content-type":	"application/json",
})
}
@Injectable()

export class ApisConstService {

  constructor() { }
  
}
