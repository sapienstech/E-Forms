import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class UtilsService {

    constructor() {

    }

  parseFileToObject(file: any) :Observable<any> {
    return Observable.create((observer)=>{

      var reader = new FileReader();
      reader.addEventListener('load', (result) => {
        observer.next( this.parseJsonFile(result));
      });
      reader.readAsText(file);
    })
  }


  private parseJsonFile(result) {
    var target: any = result.target.result;
    return JSON.parse(target);
  }
}
