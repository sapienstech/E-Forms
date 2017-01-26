import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormComponent} from './examples/form/form.component';
import {MaterialComponent} from './examples/material/material.component';

const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: 'form',  component: FormComponent },
  { path: 'material',     component: MaterialComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
