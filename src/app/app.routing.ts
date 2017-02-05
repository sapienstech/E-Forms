import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MaterialComponent} from './examples/material/material.component';
import {EditorComponent} from './editor/editor.component';

const routes: Routes = [
  { path: '', redirectTo: '/editor', pathMatch: 'full' },
  { path: 'editor',  component: EditorComponent },
  { path: 'material',     component: MaterialComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
