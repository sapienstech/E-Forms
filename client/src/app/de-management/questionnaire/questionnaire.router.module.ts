import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionnaireComponent } from './questionnaire.component';

const routes: Routes = [
    { path: 'questionnaire', component: QuestionnaireComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class QuestionnaireRouterModule{

}
