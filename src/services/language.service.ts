import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable()
export class LanguageService {
    selected ='';

    constructor(private translate: TranslateService, private storage:Storage) {
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
        localStorage.setItem('LANGSTORAGE',lng)
        console.log('localStorage updated: ',localStorage.getItem('LANGSTORAGE'))
    }
}