import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

@Component({
    selector: 'ef-root',
    styleUrls: ['app.component.less'],
    templateUrl: 'app.component.html'
})
export class AppComponent {

    deUp:boolean;
    constructor(http:Http){
        http.get(environment.de+'/heartbeat').subscribe(r=>{
            this.deUp = r.json();
        })
    }
}
