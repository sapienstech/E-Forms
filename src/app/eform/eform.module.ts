import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-accordion';
import {
    SchemaFormModule,
    DefaultWidgetRegistry,
    WidgetRegistry
} from 'angular2-schema-form/src';

import { EformRouterModule } from './eform-router.module';

import { PreviewComponent } from './preview/preview.component';
import { CollapsibleWidget } from '../widgets/collapsable/collapsable.widget';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AccordionModule,
        SchemaFormModule,

        EformRouterModule
    ],
    declarations: [
        PreviewComponent,
        CollapsibleWidget
    ],
    entryComponents: [CollapsibleWidget],
    providers: [
        { provide: WidgetRegistry, useClass: DefaultWidgetRegistry }
    ]
})
export class EformModule {
    constructor(widgetRegistry: WidgetRegistry) {
        widgetRegistry.register('collapsible', CollapsibleWidget);
    }
}
