import { Component, OnInit } from '@angular/core';

import { ConfigService, ProcessConfig } from '../config';
import { ControllerService } from '../controller';

@Component({
    selector: 'ef-process-selection',
    templateUrl: './process-selection.component.html',
    styleUrls: ['./process-selection.component.less']
})
export class ProcessSelectionComponent implements OnInit {
    processes: ProcessConfig[];
    error: boolean;

    constructor(
        private configService: ConfigService,
        private controller: ControllerService) {
    }

    ngOnInit() {
        this.configService.getProcessConfig()
            .subscribe(processes => {
                this.processes = processes;
            });
    }

    execute(process: ProcessConfig) {
        if (this.validateProcess(process)) {
            this.controller.select(process);
        }
    }

    private validateProcess(process: ProcessConfig) {
        this.error = !process.steps || process.steps.length === 0;
        return !this.error;
    }
}
