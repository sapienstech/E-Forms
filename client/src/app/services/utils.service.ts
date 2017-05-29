import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PARSE_ERROR } from '../types/constants';
declare var FileReader: any;
declare var window: any;

@Injectable()
export class UtilsService {
    parseFileToObject(file: any): Observable<any> {
        return Observable.create((observer) => {
            let reader = new FileReader();
            reader.addEventListener('load', (result) => {
                try {
                    let json = this.parseJsonFile(result);
                    observer.next(json);
                } catch (er) {
                    observer.error(PARSE_ERROR);
                }

            });
            reader.readAsText(file);
        });
    }

    private parseJsonFile(result) {
        let target: any = result.target.result;
        return JSON.parse(target);
    }

    public extractHostname(url) {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get the hostname
        if (url.indexOf('://') > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }

        return hostname;
    }


    public getLocalUrl(){
        if(this.isIE()){
            return window.location.protocol + '//' + window.location.host;
        }
        else{
            return window.location.origin;
        }
    }

    private isIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0) // If Internet Explorer, return version number
        {
            return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) > 8;
        }
        else  // If another browser, return 0
        {
            return false;
        }
    }
}
