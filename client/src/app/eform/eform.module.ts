import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-accordion';
import {
    SchemaFormModule,
    DefaultWidgetRegistry,
    WidgetRegistry
} from 'angular2-schema-form';

import { EformRouterModule } from './eform-router.module';

import { PreviewComponent } from './preview/preview.component';
import { CollapsibleWidget } from '../widgets/collapsable/collapsable.widget';
import { HiddenWidget } from '../widgets/hidden/hidden.widget';

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
        CollapsibleWidget,
        HiddenWidget
    ],
    entryComponents: [CollapsibleWidget,HiddenWidget],
    providers: [
        { provide: WidgetRegistry, useClass: DefaultWidgetRegistry }
    ]
})
export class EformModule {
    constructor(widgetRegistry: WidgetRegistry) {
        widgetRegistry.register('collapsible', CollapsibleWidget);
        widgetRegistry.register('hidden', HiddenWidget);
    }
}
