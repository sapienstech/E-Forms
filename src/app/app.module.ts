import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import {
  SchemaFormModule,
  DefaultWidgetRegistry,
  WidgetRegistry
} from 'angular2-schema-form/src';
import { AccordionModule } from 'ngx-accordion';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';

import { CollapsibleWidget } from './widgets/collapsable/collapsable.widget';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    CollapsibleWidget
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),

    SchemaFormModule,
    AccordionModule,

    AppRoutingModule
  ],
  providers: [
    { provide: WidgetRegistry, useClass: DefaultWidgetRegistry }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(widgetRegistry: WidgetRegistry) {
    widgetRegistry.register('collapsible', CollapsibleWidget)
  }
}
