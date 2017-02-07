import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.less'],
  template: `
    <div>
      <div class="main-header">
        <h1>
          E-Forms
        </h1>
      </div>
      <div class="main-content">
        <ef-form-preview></ef-form-preview>
      </div>
    </div>
  `
})
export class AppComponent {
  constructor() {
  }


}
