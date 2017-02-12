import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdCardModule } from '@angular/material';

import { DashboardRouterModule } from './dashboard-router.module';

import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MdCardModule,

        DashboardRouterModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule { }
