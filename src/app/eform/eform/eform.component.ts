import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'ef-form',
    template:
        `
      <div>
        <sf-form  *ngIf="schema" [schema]="schema" [validators]="validators" (onChange)="val=$event.value"></sf-form>
      </div>
        `
})
export class EformComponent implements OnChanges {

  @Input() metadata: any;
  @Input() model: any;
  @Input() layout: any;

  private schema:any;


  ngOnChanges(changes: any): void {
    this.schema = changes.metadata.currentValue;
  }

}

