import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import {
  SchemaFormModule,
  DefaultWidgetRegistry,
  WidgetRegistry
} from 'angular2-schema-form';
import {AppComponent} from './app.component';
import {FormComponent} from './examples/form/form.component';
import {MaterialComponent} from './examples/material/material.component';
import {AppRoutingModule} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    MaterialComponent,
    FormComponent
  ],
  imports: [
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
export class AppModule { }
