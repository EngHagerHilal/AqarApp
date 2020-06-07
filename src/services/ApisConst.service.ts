import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export const APIURL = 'http:';
const httpOptions = {
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
