import { Component } from '@angular/core';

@Component({
    selector: 'list-usage',
    template: `
    <div>
    <card-or-list-view
        [items]="items"
        [mode]="mode"     >
        <div *cardItem="let item">
            <h1>{{item.header}}</h1>
            <p>{{item.content}}</p>
        </div>
        <li *listItem="let item">
            {{item.header}}: {{item.content}}
        </li>
    </card-or-list-view>
</div>
    `
})
export class UsageComponent {
    mode = 'card';
    items = [
        {
            header: 'Item 1',
            content: 'Greate content!'
        },
        {
            header: 'Item 2',
            content: 'Greate content!'
        },
        {
            header: 'Item 3',
            content: 'Greate content!'
        },
        {
            header: 'Item 4',
            content: 'Greate content!'
        },
        {
            header: 'Item 5',
            content: 'Greate content!'
        },
        {
            header: 'Item 6',
            content: 'Greate content!'
        }

    ];

}
