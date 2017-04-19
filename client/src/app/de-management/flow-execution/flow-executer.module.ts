import { NgModule } from '@angular/core';
import { FlowExecuterComponent } from './flow-executer.component';
import { ManagementService } from '../services/management.service';
import { FlowExecuterRouterModule } from './flow-executer.router.module';
import { DefaultWidgetRegistry, SchemaFormModule, WidgetRegistry } from 'angular2-schema-form';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from '../../pipes/pipes.module';
import { HiddenWidget } from '../../widgets/hidden/hidden.widget';
import { CollapsibleWidget } from '../../widgets/collapsable/collapsable.widget';
import { AccordionModule } from 'ngx-accordion';

@NgModule({
    imports: [BrowserModule,FlowExecuterRouterModule,SchemaFormModule,PipesModule,AccordionModule],
    declarations: [FlowExecuterComponent, CollapsibleWidget,HiddenWidget],
    providers: [ManagementService, { provide: WidgetRegistry, useClass: DefaultWidgetRegistry }],
    entryComponents: [
        CollapsibleWidget,
        HiddenWidget
    ]
})
export class FlowExecuterModule {

    constructor(widgetRegistry: WidgetRegistry) {
        widgetRegistry.register('collapsible', CollapsibleWidget);
        widgetRegistry.register('hidden', HiddenWidget);
    }
}
