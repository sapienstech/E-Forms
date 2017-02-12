import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ProcessSelectionComponent } from './process-selection/';

const routes: Routes = [
    { path: 'process', component: ProcessSelectionComponent },
    // { path: 'step/:id', /* component: ProcessStepComponent */ },
    // { path: 'end', /* component: ProcessCompleteComponent */ }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class ControllerRouterModule { }
