import { Injectable } from '@angular/core';

import { ControllerState } from '../controller-state';
import { FlowExecutorService } from '../flow-executor.service';

import { StepStrategy } from './step-strategy';

@Injectable()
export class AsyncStepStrategy extends StepStrategy {
    constructor(flowExecutorService: FlowExecutorService) {
        super(flowExecutorService, 'async');
    }

    execute(state: ControllerState) {
        return this.executeFlowAsync(state);
    }
}
