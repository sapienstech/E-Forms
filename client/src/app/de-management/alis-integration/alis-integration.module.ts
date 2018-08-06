import { NgModule } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { DefaultWidgetRegistry, SchemaFormModule, WidgetRegistry } from 'angular2-schema-form';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from '../../pipes/pipes.module';
import {AlisIntegrationRouterModule} from "./alis-integration.router.module";
import {AlisIntegrationComponent} from "./alis-integration.component";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [BrowserModule,AlisIntegrationRouterModule,SchemaFormModule.forRoot(),PipesModule,RouterModule],
    declarations: [AlisIntegrationComponent],
    providers: [ManagementService, { provide: WidgetRegistry, useClass: DefaultWidgetRegistry }],

})
export class AlisIntegrationModule {

    constructor() {
    }
}
