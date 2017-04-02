import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouterModule } from './app-router.module';

import { UtilsService } from './services/utils.service';

import { AppComponent } from './app.component';
import { ManagementModule } from './de-management/management.module';
import { ManagementService } from './de-management/services/management.service';
import { LocalManagementService } from './de-management/services/local-management.service';
import { ManagementServiceFacade } from './de-management/services/management.service.facade';
import { FlowExecuterModule } from './de-management/flow-execution/flow-executer.module';
import { TransformationService } from './de-management/services/transformation.service';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRouterModule,
        ManagementModule,
        FlowExecuterModule,
    ],

    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],

    providers: [
        TransformationService,
        ManagementService,
        LocalManagementService,
        ManagementServiceFacade,
        UtilsService
    ]
})
export class AppModule { }
