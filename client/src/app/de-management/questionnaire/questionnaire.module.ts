import { NgModule } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { DefaultWidgetRegistry, SchemaFormModule, WidgetRegistry } from 'angular2-schema-form';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from '../../pipes/pipes.module';
import { HiddenWidget } from '../../widgets/hidden/hidden.widget';
import { CollapsibleWidget } from '../../widgets/collapsable/collapsable.widget';
import { AccordionModule } from 'ngx-accordion';
import { ArrayWidget } from '../../widgets/array/array.widget';
import { QuestionnaireComponent } from './questionnaire.component';
import { QuestionnaireRouterModule } from './questionnaire.router.module';

@NgModule({
    imports: [BrowserModule,QuestionnaireRouterModule,SchemaFormModule.forRoot(),PipesModule,AccordionModule],
    declarations: [QuestionnaireComponent, CollapsibleWidget,HiddenWidget,ArrayWidget],
    providers: [ManagementService, { provide: WidgetRegistry, useClass: DefaultWidgetRegistry }],
    entryComponents: [
        CollapsibleWidget,
        HiddenWidget,
        ArrayWidget
    ]
})
export class QuestionnaireModule {

    constructor(widgetRegistry: WidgetRegistry) {
        widgetRegistry.register('collapsible', CollapsibleWidget);
        widgetRegistry.register('hidden', HiddenWidget);
        widgetRegistry.register('array', ArrayWidget);
    }
}
