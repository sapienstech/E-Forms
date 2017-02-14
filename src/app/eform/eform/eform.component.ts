import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormLayout, FormSchema } from '../../types/types';
import { TransformationService } from '../../services/transformation.service';

@Component({
  selector: 'ef-form',
  template:
      `
    <div>
      <sf-form *ngIf="schema" [schema]="schema" (onChange)="dataChanged($event)"></sf-form>
    </div>
  `
})
export class EformComponent implements OnChanges {

  @Input() metadata: FormSchema;
  @Input() layout: FormLayout;
  @Input() model: any;
  private schema: FormSchema;
  @Output() onChange = new EventEmitter<{ value: any }>();

  constructor(private transformationService:TransformationService){}

  ngOnChanges(): void {
    if(this.layout && this.metadata)
      this.schema = this.transformationService.mergeLayoutWithSchema(this.metadata, this.layout);
    else
      this.schema = this.metadata;
  }


  dataChanged(data) {
    this.onChange.emit(data);
  }
}

