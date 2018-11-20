import { NgModule } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { DefaultWidgetRegistry, SchemaFormModule, WidgetRegistry } from 'angular2-schema-form';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from '../../pipes/pipes.module';
import { HiddenWidget } from '../../widgets/hidden/hidden.widget';
import {NumberWidget} from '../../widgets/number/number.widget';
import { CollapsibleWidget } from '../../widgets/collapsable/collapsable.widget';
import { AccordionModule } from 'ngx-accordion';
import { ArrayWidget } from '../../widgets/array/array.widget';
import { QuestionnaireComponent } from './questionnaire.component';
import { QuestionnaireRouterModule } from './questionnaire.router.module';

@NgModule({
    imports: [BrowserModule,QuestionnaireRouterModule,SchemaFormModule,PipesModule,AccordionModule, ReactiveFormsModule],
    declarations: [QuestionnaireComponent, CollapsibleWidget,HiddenWidget,ArrayWidget, NumberWidget],
    providers: [ManagementService, { provide: WidgetRegistry, useClass: DefaultWidgetRegistry }],
    entryComponents: [
        CollapsibleWidget,
        HiddenWidget,
        ArrayWidget,
        NumberWidget
    ]
})
export class QuestionnaireModule {

    constructor(widgetRegistry: WidgetRegistry) {
        widgetRegistry.register('collapsible', CollapsibleWidget);
        widgetRegistry.register('hidden', HiddenWidget);
        widgetRegistry.register('array', ArrayWidget);
        widgetRegistry.register('number',NumberWidget);
    }
}
