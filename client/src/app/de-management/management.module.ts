import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagemnentRouterModule } from './managemnent-router.module';
import { ManagementComponent } from './management.component';
import { ListViewComponent } from '../list-view/list-view.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ManagemnentRouterModule
    ],
    declarations: [
        ListViewComponent,
        ManagementComponent
    ]
})
export class ManagementModule { }
