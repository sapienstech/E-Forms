import {Component, ElementRef, ViewChild} from '@angular/core';
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
                <input #input [attr.readonly]="schema.readOnly?true:null"
                       class="text-widget integer-widget form-control" [attr.type]="'number'"
                       [attr.min]="schema.minimum" [attr.max]="schema.maximum"
                       [attr.placeholder]="schema.placeholder">
            </div>
    `
})
export class NumberWidget extends ControlWidget {
    private _displayValue: string;

    @ViewChild('input') element: ElementRef;

    ngAfterViewInit() {
        const control = this.control;
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
            // if (newValue === '' && (<HTMLInputElement>this.element.nativeElement).validity.badInput) {
            //     // Show a custom error if the number is invalid
            //     this.formProperty.extendErrors([{
            //         path: '#'+this.formProperty.path,
            //         message: 'Invalid number',
            //     }]);
            // }
        });
    }
}
