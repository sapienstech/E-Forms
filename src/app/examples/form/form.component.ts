import { Component } from '@angular/core';

@Component({
  selector: 'form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.less']
})
export class FormComponent {
  schema: any ;

  constructor() {
    this.schema = require('./sampleschema.json');
  }
}
