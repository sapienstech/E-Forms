import { NgModule } from '@angular/core';
import { EformComponent } from './eform/eform.component';
import { PreviewComponent } from './preview/preview.component';
import { AccordionModule } from 'ngx-accordion';
import {
  SchemaFormModule,
  DefaultWidgetRegistry,
  WidgetRegistry
} from 'angular2-schema-form/src';
import { CollapsibleWidget } from '../widgets/collapsable/collapsable.widget';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UtilsService } from '../services/utils.service';
import { ManifestTransformerService } from '../services/manifest-transformer.service';
import { MaterialModule } from '@angular/material';
import { EformRouterModule } from './eform-router.module';

@NgModule({
  imports: [EformRouterModule, BrowserModule, FormsModule, AccordionModule, SchemaFormModule, MaterialModule.forRoot()],
  exports: [EformComponent, PreviewComponent],
  declarations: [EformComponent, PreviewComponent, CollapsibleWidget],
  entryComponents: [CollapsibleWidget],
  providers: [ManifestTransformerService, {provide: WidgetRegistry, useClass: DefaultWidgetRegistry}, UtilsService]
})
export class EformModule {
  constructor(widgetRegistry: WidgetRegistry) {
    widgetRegistry.register('collapsible', CollapsibleWidget)
  }
}

