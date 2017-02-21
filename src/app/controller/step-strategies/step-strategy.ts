import { Observable } from 'rxjs/Observable';

import { StepType, ValidationConfig, ValidationValidConfig } from '../../config';

import { ControllerState } from '../controller-state';
import { FlowExecutorService, ExecutionResponse } from '../flow-executor.service';

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
        return this.flowExecutor.execute(state.step.flow, state.data)
            .map(response => this.mapResponse(response, state.step.validation));
    }

    /**
     * Execute a flow immediately, without waiting for a response.
     *
     * @param state the current controller state
     */
    protected executeFlowAsync(state: ControllerState) {
        this.executeFlow(state).subscribe();
    }

    private mapResponse(response: ExecutionResponse, validation: ValidationConfig) {
        if (!validation || this.isValid(response, validation)) {
            return response.data;
        }

        let validationMessages = response.messages[validation.conclusion];
        return Observable.throw(validationMessages);
    }

    /**
     * Checks if the validation response is valid.
     *
     * If configuration uses the 'valid' property, the response is only valid if the conclusion
     * value exists and is equal to the configured valid value.
     *
     * If configuration uses the 'invalid' property, the response is valid if the conclusion value
     * doesn't exist or it is not equal to the configured invalid value.
     *
     * @param response the execution response
     * @param config the validation configuration
     * @returns true if the response is valid, otherwise false
     */
    private isValid(response: ExecutionResponse, config: ValidationConfig) {
        let conclusion = response.data[config.conclusion];
        return this.isValidValidationConfig(config)
            ? conclusion !== undefined && conclusion === config.valid
            : conclusion === undefined || conclusion !== config.invalid;
    }

    private isValidValidationConfig(config: ValidationConfig): config is ValidationValidConfig {
        return config.hasOwnProperty('valid');
    }
}
