import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
    selector: 'ef-form',
    template:
    `
      <div>
        <sf-form  *ngIf="schema" [schema]="schema"  (onChange)="dataChanged($event)" ></sf-form>
      </div>
        `
})
export class EformComponent implements OnChanges {
    @Input() metadata: any;
    @Input() model: any;
    @Input() layout: any;
    schema: any;

    @Output() onChange = new EventEmitter<{ value: any }>();


    ngOnChanges(changes: any): void {
        this.schema = changes.metadata.currentValue;
    }

    dataChanged(data) {
        this.onChange.emit(data);
    }
}

