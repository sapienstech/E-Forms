import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {AppComponent} from './app.component';
import {EformModule} from './eform/eform.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    EformModule,
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {

}
