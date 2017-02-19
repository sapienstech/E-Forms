import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { ConfigService, ProcessConfig } from '../config';
import { ControllerState } from './controller-state';
import { StepStrategiesService } from './step-strategies';

@Injectable()
export class ControllerService {
    constructor(
        private config: ConfigService,
        private controllerState: ControllerState,
        private strategies: StepStrategiesService
    ) {
    }

    getProcesses() {
        return this.config.getProcessConfig();
    }

    select(process: ProcessConfig) {
        this.controllerState.initialize(process);
        this.selectStrategy();
    }

    execute(input?) {
        return Observable.create(subscriber => {
            this.internalExecute(input, subscriber);
        });
    }

    private selectStrategy() {
        let strategy = this.findStrategy();
        if (!strategy.enter()) {
            this.internalExecute();
        }
    }

    private internalExecute(input?, subscriber?: Subscriber) {
        // Merge in the data from the UI
        this.controllerState.update(input);

        let strategy = this.findStrategy();
        strategy.execute(this.controllerState)
            .subscribe(result => {
                if (subscriber) {
                    subscriber.complete();
                }
                // Merge in the data from the execution
                this.controllerState.update(result);
                this.selectStrategy();
            }, error => {
                if (subscriber) {
                    subscriber.error(error);
                }
            });
    }

    private findStrategy() {
        let stepType = this.controllerState.step.type;
        return this.strategies.getStrategy(stepType);
    }
}
