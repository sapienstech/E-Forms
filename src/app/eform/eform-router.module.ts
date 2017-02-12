import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
    { path: 'preview', component: PreviewComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class EformRouterModule { }
