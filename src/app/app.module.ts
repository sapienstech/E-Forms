import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

import { DashboardModule } from './dashboard';
import { ControllerModule } from './controller';
import { EformModule } from './eform';

import { AppRouterModule } from './app-router.module';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule.forRoot(),

        AppRouterModule,
        DashboardModule,
        ControllerModule,
        EformModule
    ],

    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
