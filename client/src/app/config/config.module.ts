import { NgModule } from '@angular/core';

import { TransformationService } from './transformation.service';
import { ConfigService } from './config.service';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './config.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: 'config', component: ConfigComponent }
];

@NgModule({
    providers: [
        TransformationService,
        ConfigService
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations:[ConfigComponent]
})
export class ConfigModule { }
