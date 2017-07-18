import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagemnentRouterModule } from './managemnent-router.module';
import { ManagementComponent } from './management.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ManagemnentRouterModule
    ],
    declarations: [
        ManagementComponent
    ]
})
export class ManagementModule { }
