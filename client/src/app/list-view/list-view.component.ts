import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
    selector: 'list-view',
    templateUrl: './list-view.component.html'
})
export class ListViewComponent implements OnInit {

    constructor() { }

    @ContentChild(TemplateRef)
    templateRef: any;

    ngOnInit() { }

    @Input()
    bindingPath:string;

    @Input()
    itemsSource:any[];

    @Input()
    selectedItem:any;

    @Output()
    selectedItemChanged: EventEmitter<any>;

    selected:any ={};

    itemSelected(item:any){
        Object.keys(this.selected).forEach(k=>{
           this.selected[k] = false;
        });
        this.selected[item]=true;
    }

}
