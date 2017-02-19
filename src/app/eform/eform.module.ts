import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-accordion';
import {
    SchemaFormModule,
    DefaultWidgetRegistry,
    WidgetRegistry
} from 'angular2-schema-form/src';

import { UtilsService } from '../services/utils.service';
import { TransformationService } from './services/transformation.service';

import { EformRouterModule } from './eform-router.module';

import { EformComponent } from './eform/eform.component';
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
    exports: [
        EformComponent
    ],
    declarations: [
        EformComponent,
        PreviewComponent,
        CollapsibleWidget
    ],
    entryComponents: [CollapsibleWidget],
    providers: [
        TransformationService,
        { provide: WidgetRegistry, useClass: DefaultWidgetRegistry },
        UtilsService
    ]
})
export class EformModule {
    constructor(widgetRegistry: WidgetRegistry) {
        widgetRegistry.register('collapsible', CollapsibleWidget);
    }
}
