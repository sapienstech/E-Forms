import { Component, OnInit } from '@angular/core';

import { ControllerService, ProcessInfo } from '../controller.service';

@Component({
    selector: 'ef-process-selection',
    templateUrl: './process-selection.component.html',
    styleUrls: ['./process-selection.component.less']
})
export class ProcessSelectionComponent implements OnInit {
    processes: ProcessInfo[];

    constructor(private controller: ControllerService) {
    }

    ngOnInit() {
        this.processes = this.controller.getProcesses();
    }

    execute(process: ProcessInfo) {
        console.log(process.title);
    }
}
