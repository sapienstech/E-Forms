import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { ControllerModule } from './controller/controller.module';
import { EformModule } from './eform/eform.module';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,

        MaterialModule.forRoot(),

        ControllerModule,
        EformModule
    ],

    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
