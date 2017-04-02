import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowExecuterComponent } from './flow-executer.component';

const routes: Routes = [
    { path: 'execute-flow', component: FlowExecuterComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class FlowExecuterRouterModule{

}
