import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService, ProcessConfig } from '../config';

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
        private router: Router
    ) {
    }

    ngOnInit() {
        this.configService.getProcesses()
            .subscribe(processes => {
                this.processes = processes;
            });
    }

    execute(process: ProcessConfig) {
        if (this.validateProcess(process)) {
            this.router.navigate(['/process', process.id]);
        }
    }

    private validateProcess(process: ProcessConfig) {
        this.error = !process.steps || process.steps.length === 0;
        return !this.error;
    }
}
