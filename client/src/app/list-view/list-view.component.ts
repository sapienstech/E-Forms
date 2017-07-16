import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { CardItemDirective } from './car-item.directive';
import { ListItemDirective } from './list-item.directive';

@Component({
    selector: 'card-or-list-view',
    templateUrl: './list-view.component.html'
})
export class CardOrListViewComponent {

    @Input() items: {
        header: string,
        content: string
    }[] = [];

    @Input() mode: 'card' | 'list' = 'card';

    @ContentChild(CardItemDirective, {read: TemplateRef}) cardItemTemplate;
    @ContentChild(ListItemDirective, {read: TemplateRef}) listItemTemplate;


}
