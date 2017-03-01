import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControllerRouterModule } from './controller-router.module';

import { FlowExecutorService } from './flow-executor.service';

@NgModule({
    imports: [
        CommonModule,

        ControllerRouterModule
    ],
    providers: [
        FlowExecutorService
    ]
})
export class ControllerModule { }
