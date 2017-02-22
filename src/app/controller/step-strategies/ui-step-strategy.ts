import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ControllerState } from '../controller-state';
import { FlowExecutorService } from '../flow-executor.service';

import { StepStrategy } from './step-strategy';

@Injectable()
export class UiStepStrategy extends StepStrategy {
    constructor(
        flowExecutorService: FlowExecutorService,
        private router: Router
    ) {
        super(flowExecutorService, 'ui');
    }

    enter() {
        this.router.navigateByUrl('/process/step');
        return true;
    }

    execute(state: ControllerState) {
        return this.executeFlow(state);
    }
}
