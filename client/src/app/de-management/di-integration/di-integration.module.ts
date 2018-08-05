import { NgModule } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { DefaultWidgetRegistry, SchemaFormModule, WidgetRegistry } from 'angular2-schema-form';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from '../../pipes/pipes.module';
import { AccordionModule } from 'ngx-accordion';
import {DiIntegrationRouterModule} from "./di-integration.router.module";
import {DiIntegrationComponent} from "./di-integration.component";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [BrowserModule,DiIntegrationRouterModule,SchemaFormModule.forRoot(),PipesModule,AccordionModule, RouterModule],
    declarations: [DiIntegrationComponent],
    providers: [ManagementService, { provide: WidgetRegistry, useClass: DefaultWidgetRegistry }],

})
export class DiIntegrationModule {

    constructor() {
    }
}
