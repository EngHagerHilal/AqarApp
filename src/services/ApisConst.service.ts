import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
export const APIURL = 'https://alrowadco.com.sa/api/';
export const IMGURL = 'https://alrowadco.com.sa/public/';

export const CONTACTUS_EMAIL_TO = 'Info@alrowadco.com.sa';
export const POST_EMAIL_subject : string = "About Your Post On Elrawad App";

export const SIZEOFRELOADING : number = 10;
export const IMGS_SLIDES : {id:any ,name:string, src:string}[] = [
  {id: 1,name:'HOMETABSLIDES.macca', src: "https://alrowadco.com.sa/public//img/city/1.jpg"},
  {id: 2,name:'HOMETABSLIDES.medina', src: "https://alrowadco.com.sa/public//img/city/2.jpg"},
  {id: 3,name:'HOMETABSLIDES.riyadh', src: "https://alrowadco.com.sa/public//img/city/3.jpg"},
  {id: 4,name:'HOMETABSLIDES.jeddah', src: "https://alrowadco.com.sa/public//img/city/4.jpg"},
  {id: 5,name:'HOMETABSLIDES.dammam', src: "https://alrowadco.com.sa/public//img/city/5.jpg"},
  {id: 6,name:'HOMETABSLIDES.qassem', src: "https://alrowadco.com.sa/public//img/city/6.jpg"},
  {id: 7,name:'HOMETABSLIDES.khobar', src: "https://alrowadco.com.sa/public//img/city/7.jpg"}
];

export const CITIES_SELECT : {id:any ,name:string}[] = [
  {id: 0, name : 'CITY-All'}, {id: 1, name : 'CITY-macca'}, {id: 2,name : 'CITY-Medina'}, {id: 3,name : 'CITY-Riyadh'}, {id: 4,name : 'CITY-Jeddah'}, {id: 5,name : 'CITY-Dammam'}, {id: 6,name : 'CITY-Qassem'},
  {id: 7,name : 'CITY-Khobar'}, {id: 8,name : 'CITY-Buraidah'}, {id: 9,name : 'CITY-Al_Bahah'}, {id: 10,name : 'CITY-Yanbu'}, {id: 11,name : 'CITY-Najran'}, {id: 12,name : 'CITY-Jubail'},
  {id: 13,name : 'CITY-Qatif'}, {id: 14,name : 'CITY-KhamisMushait'}, {id: 15,name : 'CITY-Hail'}, {id: 16,name : 'CITY-Dhahran'}, {id: 17,name : 'CITY-Jizan'}, {id: 18,name : 'CITY-Hafar'},
  {id: 19,name : 'CITY-Sakakah'}, {id: 20,name : 'CITY-Hofuf'}, {id: 21,name : 'CITY-al-Qunfudhah'}, {id: 22,name : 'CITY-Dhurma'}, {id: 23,name : 'CITY-Baljurashi'}, {id: 24,name : 'CITY-Khafji'}, {id: 25,name : 'CITY-RasTanura'},
  {id: 26,name : 'CITY-Abqaiq'}, {id: 27,name : 'CITY-Rafha'}, {id: 28,name : 'CITY-AlSulayyil'}, {id: 29,name : 'CITY-Afif'}, {id: 30,name : 'CITY-Al-Namas'}, {id: 31,name : 'CITY-Diriyah'},
  {id: 32,name : 'CITY-Al-Kharj'}, {id: 33,name : 'CITY-Tabuk'}, {id: 34,name : 'CITY-Qurayyat'}, {id: 35,name : 'CITY-Al-Ahsa'}, {id: 36,name : 'CITY-Duba'}, {id: 37,name : 'CITY-Umluj'},
  {id: 38,name : 'CITY-Unaizah'}, {id: 39,name : 'CITY-AlWajh'}, {id: 40,name : 'CITY-Al-Ula'}, {id: 41,name : 'CITY-Dawadmi'}, {id: 42,name : 'CITY-Bisha'}, {id: 43,name : 'CITY-Tanomah'},
  {id: 44,name : 'CITY-KingAbdullah'}, {id: 45,name : 'CITY-AlJawf'}, {id: 46,name : 'CITY-Farasan'}, {id: 47,name : 'CITY-bhahran'},
];
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
