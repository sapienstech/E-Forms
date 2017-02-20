import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { DashboardModule } from './dashboard';
import { ConfigModule } from './config';
import { ProcessSelectionModule } from './process-selection';
import { ControllerModule } from './controller';
import { EformModule } from './eform';

import { MockWebApi } from './mock-web-api';

import { AppRouterModule } from './app-router.module';

import { UtilsService } from './services/utils.service';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,

        InMemoryWebApiModule.forRoot(MockWebApi),

        AppRouterModule,
        DashboardModule,
        ConfigModule,
        ProcessSelectionModule,
        ControllerModule,
        EformModule
    ],

    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],

    providers: [
        UtilsService
    ]
})
export class AppModule { }
