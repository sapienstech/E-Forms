import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControllerRouterModule } from './controller-router.module';

import { ControllerState } from './controller-state';
import { ControllerService } from './controller.service';
import { FlowExecutorService } from './flow-executor.service';
import {
    StepStrategy,
    UiStepStrategy,
    AsyncStepStrategy,
    StepStrategiesService
} from './step-strategies';

@NgModule({
    imports: [
        CommonModule,

        ControllerRouterModule
    ],
    providers: [
        ControllerState,
        FlowExecutorService,
        { provide: StepStrategy, multi: true, useClass: UiStepStrategy },
        { provide: StepStrategy, multi: true, useClass: AsyncStepStrategy },
        StepStrategiesService,
        ControllerService
    ]
})
export class ControllerModule { }
