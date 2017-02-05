import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';

import {
  SchemaFormModule,
  DefaultWidgetRegistry,
  WidgetRegistry
} from 'angular2-schema-form/src';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {EditorComponent} from './editor/editor.component';
import {AccordionModule} from 'ngx-accordion';
import {CollapsibleWidget} from './widgets/collapsable/collapsable.widget';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    CollapsibleWidget
  ],
  entryComponents: [CollapsibleWidget],
  imports: [
    AccordionModule,
    AppRoutingModule,
    SchemaFormModule,
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [{provide: WidgetRegistry, useClass: DefaultWidgetRegistry}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(widgetRegistry: WidgetRegistry) {
    widgetRegistry.register('collapsible', CollapsibleWidget)
  }
}
