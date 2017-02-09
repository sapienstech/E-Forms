import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {PARSE_ERROR} from '../types/constants';

@Injectable()
export class UtilsService {

    constructor() {

    }

  parseFileToObject(file: any) :Observable<any> {
    return Observable.create((observer)=>{

      var reader = new FileReader();
      reader.addEventListener('load', (result) => {
        try {
          let json = this.parseJsonFile(result);
          observer.next(json);
        }
        catch (er){
          observer.error(PARSE_ERROR);
        }

      });
      reader.readAsText(file);
    })
  }


  private parseJsonFile(result) {
    var target: any = result.target.result;
    return JSON.parse(target);
  }
}
