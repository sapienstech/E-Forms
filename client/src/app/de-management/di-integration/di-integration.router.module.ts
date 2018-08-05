import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DiIntegrationComponent} from "./di-integration.component";

const routes: Routes = [
    { path: 'di-integration', component: DiIntegrationComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class DiIntegrationRouterModule{

}
