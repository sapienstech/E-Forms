import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SchemaFormModule } from 'angular2-schema-form/src';

import { ProcessRouteGuard } from './process-router.guard';

import { ProcessComponent } from './process';
import { ProcessCompleteComponent } from './process-complete';

const routes: Routes = [
    {
        path: 'process',
        canActivate: [
            // ProcessRouteGuard
        ],
        children: [
            { path: ':id', component: ProcessComponent },
            { path: 'end', component: ProcessCompleteComponent }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        SchemaFormModule
    ],
    providers: [
        ProcessRouteGuard
    ],
    declarations: [
        ProcessComponent,
        ProcessCompleteComponent
    ]
})
export class ControllerRouterModule { }
