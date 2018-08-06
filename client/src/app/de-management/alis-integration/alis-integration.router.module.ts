import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlisIntegrationComponent} from "./alis-integration.component";

const routes: Routes = [
    { path: 'alis-integration', component: AlisIntegrationComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class AlisIntegrationRouterModule{

}
