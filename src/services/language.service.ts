import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable()
export class LanguageService {
    selected ='';

    constructor(private translate: TranslateService, private storage:Storage) {
    }

    setInitialAppLanguage(){
        let language = this.translate.getBrowserLang();
        if(language == 'en' || language =='ar'){
        }else{
            language = 'en'
        }
        this.translate.setDefaultLang(language);
        this.selected = language;
        console.log('language: ',language)

        this.storage.get(LNG_KEY).then(val =>{
            console.log('LNG_KEY: ',val)
            if(val){
                this.setLanguage(val)
            }
        })
    }

    setLanguage(lng){
        this.translate.use(lng);
        this.selected = lng;
        this.storage.set(LNG_KEY,lng);
        console.log('=========================================')
        console.log('this.selected in ser: ',this.selected)
        //console.log('this.storage.get(LNG_KEY): ',this.storage.get(LNG_KEY))
        console.log('=========================================')
    }
}