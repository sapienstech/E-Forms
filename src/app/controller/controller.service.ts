import { Injectable } from '@angular/core';

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
        // Merge in the data from the UI
        this.controllerState.update(input);

        let strategy = this.findStrategy();
        strategy.execute(this.controllerState)
            .subscribe(result => {
                // Merge in the data from the execution
                this.controllerState.update(result);
                this.selectStrategy();
            });
    }

    private selectStrategy() {
        let strategy = this.findStrategy();
        if (!strategy.enter()) {
            this.execute();
        }
    }

    private findStrategy() {
        let stepType = this.controllerState.step.type;
        return this.strategies.getStrategy(stepType);
    }
}
