import { Observable } from 'rxjs/Observable';

import { StepType } from '../../config';

import { ControllerState } from '../controller-state';
import { FlowExecutorService } from '../flow-executor.service';

export abstract class StepStrategy {
    readonly type: StepType;

    constructor(
        private flowExecutor: FlowExecutorService, type: StepType
    ) {
        this.type = type;
    }

    /**
     * Optional logic to perform when selecting this strategy.
     */
    enter() {
        return false;
    }

    /**
     * The logic to perform once input is available.
     *
     * @param state the current controller state
     * @returns an observable that resolves once execution has completed
     */
    abstract execute(state: ControllerState): Observable<any>;

    /**
     * Execute a flow and return the response.
     *
     * @param state the current controller state
     * @returns a cold observable
     */
    protected executeFlow(state: ControllerState) {
        return this.flowExecutor.execute(state.step.flow, state.data);
    }

    /**
     * Execute a flow immediately, without waiting for a response.
     *
     * @param state the current controller state
     */
    protected executeFlowAsync(state: ControllerState) {
        this.executeFlow(state).subscribe();
    }
}
