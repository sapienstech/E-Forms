import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';

import { FormSchema } from '../model';
import { ConfigService, ValidationConfig, ValidationValidConfig } from '../config';

import { ControllerState } from './controller-state';
import { FlowExecutorService, ExecutionResponse } from './flow-executor.service';

export interface ShowFormEvent {
    schema: FormSchema;
    model: any;
}

interface ExecuteSubscriber {
    complete(): void;
    error(error: any): void;
}

const EmptyExecuteSubscriber: ExecuteSubscriber = {
    complete() { },
    error(_) { }
};

@Injectable()
export class ControllerService {
    private _showForm: Subject<ShowFormEvent>;
    private controllerState: ControllerState;

    get showForm(): Observable<ShowFormEvent> {
        return this._showForm;
    }

    constructor(
        private config: ConfigService,
        private flowExecutor: FlowExecutorService,
        private router: Router
    ) {
        this._showForm = new Subject<ShowFormEvent>();
        this.controllerState = new ControllerState();
    }

    select(processId: string) {
        this.config.getProcess(processId)
            .subscribe(process => {
                this.controllerState.initialize(process);
                this.nextStep();
            });
    }

    execute(data?: any): Observable<void> {
        return Observable.create(subscriber => {
            this.internalExecute(subscriber, data);
        });
    }

    private nextStep() {
        if (!this.controllerState.proceed()) {
            this._showForm.complete();
            this.router.navigate(['/process/end']);
            return;
        }

        if (this.controllerState.step.type !== 'ui') {
            this.internalExecute(EmptyExecuteSubscriber);
        } else {
            this.config.getFormSchema(this.controllerState.step.flow)
                .subscribe(formSchema => {
                    this._showForm.next({
                        schema: formSchema,
                        model: this.controllerState.data
                    });
                });
        }
    }

    private internalExecute(subscriber: ExecuteSubscriber, data?: any) {
        // Merge in the data from the UI
        this.controllerState.update(data);

        this.executeFlow().subscribe(
            result => this.afterExecution(subscriber, result),
            error => subscriber.error(error),
            () => this.afterExecution(subscriber)
        );
    }

    private afterExecution(subscriber: ExecuteSubscriber, data?: any) {
        subscriber.complete();

        if (data) {
            this.controllerState.update(data);
        }

        this.nextStep();
    }

    private executeFlow() {
        let execution = this.flowExecutor.execute(
            this.controllerState.step.flow,
            this.controllerState.data
        );
        if (this.controllerState.step.type !== 'async') {
            return execution.mergeMap(response => this.mapResponse(response));
        }

        execution.subscribe();
        return Observable.empty<any>();
    }

    private mapResponse(response: ExecutionResponse) {
        let validation = this.controllerState.step.validation;
        if (!validation || this.isValid(response, validation)) {
            return Observable.of(validation);
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
            ? conclusion === config.valid
            : conclusion !== config.invalid;
    }

    private isValidValidationConfig(config: ValidationConfig): config is ValidationValidConfig {
        return config.hasOwnProperty('valid');
    }
}
