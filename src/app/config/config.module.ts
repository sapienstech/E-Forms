import { NgModule } from '@angular/core';

import { TransformationService } from './transformation.service';
import { ConfigService } from './config.service';

@NgModule({
    providers: [
        TransformationService,
        ConfigService
    ]
})
export class ConfigModule { }
