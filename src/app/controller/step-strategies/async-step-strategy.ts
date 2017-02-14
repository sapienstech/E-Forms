import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

import { ControllerState } from '../controller-state';
import { FlowExecutorService } from '../flow-executor.service';

import { StepStrategy } from './step-strategy';

@Injectable()
export class AsyncStepStrategy extends StepStrategy {
    constructor(flowExecutorService: FlowExecutorService) {
        super(flowExecutorService, 'async');
    }

    execute(state: ControllerState) {
        this.executeFlowAsync(state);
        return Observable.empty<any>();
    }
}
