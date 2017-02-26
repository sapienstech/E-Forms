import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
})
export class AppRouterModule { }
