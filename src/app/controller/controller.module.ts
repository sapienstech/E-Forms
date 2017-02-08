import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdListModule } from '@angular/material';

import { ControllerRouterModule } from './controller-router.module';

import { ControllerService } from './controller.service';

import { ProcessSelectionComponent } from './process-selection/';

@NgModule({
    imports: [
        CommonModule,
        MdListModule,

        ControllerRouterModule
    ],
    providers: [
        ControllerService
    ],
    declarations: [
        ProcessSelectionComponent
    ]
})
export class ControllerModule { }
