import { Component } from '@angular/core';
import { ConfigService } from './config.service';

@Component({
    selector: 'ef-config',
    templateUrl: 'config.component.html'
})
export class ConfigComponent {

    selectedProcess: any;

    constructor(configService: ConfigService) {
        configService.getProcesses().subscribe(results => {
            this.selectedProcess = results[1];
        });
    }
}
