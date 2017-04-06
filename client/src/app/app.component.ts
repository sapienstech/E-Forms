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
    constructor(private http:Http){

    }

    ngOnInit(){
        this.http.get(environment.de+'/local-heartbeat').subscribe(r=>{
            this.deUp = r.json();
        })
    }
}
