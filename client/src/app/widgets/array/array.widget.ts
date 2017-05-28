import { Component } from '@angular/core';

import { ArrayLayoutWidget } from 'angular2-schema-form/dist/widget';

@Component({
    selector: 'dec-array-widget',
    styles: [`
    .array-property sf-form-element{
        display: inline-block;
        width: calc(100% - 44px);
    }
    `],
    template: `
  
  <div class="widget form-group">
	<label [attr.for]="id" class="horizontal control-label">
		{{ schema.title }}
	</label>
	<span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
	<div class="array-property" *ngFor="let itemProperty of formProperty.properties; let i=index">
		<sf-form-element [formProperty]="itemProperty"></sf-form-element>
		<button (click)="removeItem(i)" class="btn btn-default array-remove-button">
			<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 
		</button>
	</div>
	<button (click)="addItem()" class="btn btn-default array-add-button">
		<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
	</button>
</div>

  
  `
})
export class ArrayWidget extends ArrayLayoutWidget {

    addItem() {
        this.formProperty.addItem();
    }

    removeItem(index: number) {
        this.formProperty.removeItem(index);
    }


}
