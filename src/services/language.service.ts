import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageService {
    selected ='';

    constructor(private translate: TranslateService , private platform:Platform) {
        console.log('constr',localStorage.getItem('LANGSTORAGE'))
        
    }

    setInitialAppLanguage(){
        let language = this.translate.getBrowserLang();
        if(language == 'en' || language =='ar'){
        }else{
            language = 'en'
        }
        this.translate.setDefaultLang(language);
        this.selected = language;
        console.log('language defulte: ',language);
        if(localStorage.getItem('LANGSTORAGE')){
            this.setLanguage(localStorage.getItem('LANGSTORAGE'))
        }
        /*
        this.storage.get(LNG_KEY).then(val =>{
            console.log('storage data val: ',val)
            if(val){
                this.setLanguage(val)
            }
        })*/
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
        console.log('localStorage updated: ',localStorage.getItem('LANGSTORAGE'))
    }
}