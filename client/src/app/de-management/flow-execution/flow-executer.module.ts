import { NgModule } from '@angular/core';
import { FlowExecuterComponent } from './flow-executer.component';
import { ManagementService } from '../services/management.service';
import { FlowExecuterRouterModule } from './flow-executer.router.module';
import { SchemaFormModule } from 'angular2-schema-form';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
    imports: [BrowserModule,FlowExecuterRouterModule,SchemaFormModule,PipesModule],
    declarations: [FlowExecuterComponent],
    providers: [ManagementService],
})
export class FlowExecuterModule {


}
