import { Component, OnInit } from '@angular/core';

import { ControllerState } from '../controller-state';

@Component({
    templateUrl: './process-step.component.html',
    styleUrls: ['./process-step.component.less']
})
export class ProcessStepComponent implements OnInit {
    step: number;

    constructor(private state: ControllerState) {
        this.step = this.state.step.title;
    }

    ngOnInit() {
    }
}
