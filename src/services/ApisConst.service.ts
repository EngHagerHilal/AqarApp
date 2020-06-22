import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export const APIURL = 'http://aqar.leen.com.eg/api/';
export const IMGURL = 'http://aqar.leen.com.eg/public/';
export const httpOptions = {
  headers: new HttpHeaders({
    "access-control-allow-headers":	"Content-Type",
    "access-control-allow-methods":	"GET, HEAD, POST, PUT, OPTIONS",
    "access-control-allow-origin":	"*",
    "content-type":	"application/json",
})
}
@Injectable()

export class ApisConstService {

  constructor(private http:HttpClient) { }
  
}
