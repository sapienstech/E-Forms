import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { ProcessRouteGuard } from './process-router.guard';

import { ProcessSelectionComponent } from './process-selection';
import { ProcessStepComponent } from './process-step';
import { ProcessCompleteComponent } from './process-complete';
import { ProcessInvalidComponent } from './process-invalid';

const routes: Routes = [
    { path: 'select-process', component: ProcessSelectionComponent },
    {
        path: 'process',
        canActivate: [
            ProcessRouteGuard
        ],
        children: [
            { path: 'step', component: ProcessStepComponent },
            { path: 'end', component: ProcessCompleteComponent },
            { path: 'invalid', component: ProcessInvalidComponent }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        ProcessRouteGuard
    ],
    declarations: [
        ProcessSelectionComponent,
        ProcessStepComponent,
        ProcessCompleteComponent,
        ProcessInvalidComponent
    ]
})
export class ControllerRouterModule { }
