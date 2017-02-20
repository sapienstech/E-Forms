import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PARSE_ERROR } from '../types/constants';

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
}
