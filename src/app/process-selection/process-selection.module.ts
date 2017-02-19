import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProcessSelectionComponent } from './process-selection.component';

const routes: Routes = [
    { path: '/select-process', component: ProcessSelectionComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ProcessSelectionComponent
    ]
})
export class ProcessSelectionModule { }
