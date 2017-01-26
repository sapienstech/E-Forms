import { Component } from '@angular/core';

@Component({
    selector: 'app',
    styleUrls: ['app.component.less'],
    template: ` 
                <div>
                    <div class="main-header">
                      <h1>
                        E-Forms
                      </h1>
                    </div>
                     <div class="main-content">
                        <router-outlet></router-outlet>
                     </div>
                </div>
              `
})
export class AppComponent {
    constructor() { }


}
