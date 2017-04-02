import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardModule } from './dashboard';
import { ConfigModule } from './config';
import { ProcessSelectionModule } from './process-selection';
import { ControllerModule } from './controller';
import { EformModule } from './eform';

import { AppRouterModule } from './app-router.module';

import { UtilsService } from './services/utils.service';

import { AppComponent } from './app.component';
import { ManagementModule } from './de-management/management.module';
import { ManagementService } from './de-management/services/management.service';
import { LocalManagementService } from './de-management/services/local-management.service';
import { ManagementServiceFacade } from './de-management/services/management.service.facade';
import { FlowExecuterModule } from './de-management/flow-execution/flow-executer.module';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRouterModule,
        DashboardModule,
        ConfigModule,
        ProcessSelectionModule,
        ControllerModule,
        ManagementModule,
        FlowExecuterModule,
        EformModule
    ],

    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],

    providers: [
        ManagementService,
        LocalManagementService,
        ManagementServiceFacade,
        UtilsService
    ]
})
export class AppModule { }
