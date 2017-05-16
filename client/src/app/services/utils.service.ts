import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PARSE_ERROR } from '../types/constants';
declare var FileReader : any;

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
    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    return hostname;
}
}
