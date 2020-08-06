import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageService {
    selected ='';
    constructor(private translate: TranslateService , private platform:Platform) {
    }

    setInitialAppLanguage(){
        let language = this.translate.getBrowserLang();
        if(language == 'en' || language =='ar'){
        }else{
            language = 'en'
        }
        this.translate.setDefaultLang(language);
        this.selected = language;
        if(localStorage.getItem('LANGSTORAGE')){
            this.setLanguage(localStorage.getItem('LANGSTORAGE'))
        }
    }

    setLanguage(lng){
        this.translate.use(lng);
        this.selected = lng;
        if(this.selected == 'en'){
            this.platform.setDir('ltr',true)
        }else if (this.selected == 'ar'){
            this.platform.setDir('rtl',true)
        }
        localStorage.setItem('LANGSTORAGE',lng)
    }
}