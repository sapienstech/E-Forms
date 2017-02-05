import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditorComponent} from './editor/editor.component';

const routes: Routes = [
  { path: '', redirectTo: '/editor', pathMatch: 'full' },
  { path: 'editor',  component: EditorComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
