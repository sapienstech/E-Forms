import {Component} from '@angular/core';
import {ObjectLayoutWidget} from 'angular2-schema-form/src';
@Component({
  selector: 'sf-collapsible',
  styles: [`
    .accordion-group {
      margin: 5px 0px;
      display: block;
    }
  `],
  template: `
    <accordion [closeOthers]="false">
      <accordion-group *ngFor="let fieldset of schema.fieldsets; let index = index" class="accordion-group">
        <accordion-heading>{{fieldset.title || "Section " + index}}</accordion-heading>
        <sf-form-element *ngFor='let fieldId of fieldset.fields' [formProperty]='formProperty.getProperty(fieldId)'>
        </sf-form-element>
      </accordion-group>
    </accordion>
  `
})
export class CollapsibleWidget extends ObjectLayoutWidget {
}
