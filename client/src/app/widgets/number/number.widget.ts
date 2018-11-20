import {Component} from '@angular/core';
import {ControlWidget} from 'angular2-schema-form';

@Component({
    selector: 'dec-number-widget',
    template: `
        <div class="widget form-group">
            <label [attr.for]="id" class="horizontal control-label">
                {{ schema.title }}
            </label>
            <div class="widget form-group">
                <span *ngIf="schema.description" class="formHelp">{{schema.description}}</span>
                <input [attr.readonly]="schema.readOnly?true:null" [name]="name"
                       class="text-widget integer-widget form-control" [formControl]="control"
                       [attr.type]="'number'"
                       [attr.min]="schema.minimum" [attr.max]="schema.maximum"
                       [attr.placeholder]="schema.placeholder">
            </div>
    `
})
export class NumberWidget extends ControlWidget {
    private _displayValue: string;

    ngAfterViewInit() {
        let control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (typeof this._displayValue !== 'undefined') {
                // Ignore the model value, use the display value instead
                if (control.value !== this._displayValue) {
                    control.setValue(this._displayValue, {emitEvent: false});
                }
            } else {
                if (control.value !== newValue) {
                    control.setValue(newValue, {emitEvent: false});
                }
            }
        });

        control.valueChanges.subscribe((newValue) => {
            // Store a copy of the original string value
            this._displayValue = newValue;
            this.formProperty.setValue(newValue, false);
            delete this._displayValue;
        });
    }
}
