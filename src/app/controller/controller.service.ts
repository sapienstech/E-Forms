import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ConfigService, ProcessConfig } from '../config';
import { ControllerState } from './controller-state';
import { StepStrategiesService } from './step-strategies';

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
    constructor(
        private config: ConfigService,
        private controllerState: ControllerState,
        private strategies: StepStrategiesService,
        private router: Router
    ) {
    }

    select(process: ProcessConfig) {
        this.controllerState.initialize(process);
        this.selectStrategy();
    }

    execute(data?): Observable<void> {
        return Observable.create(subscriber => {
            this.internalExecute(subscriber, data);
        });
    }

    private selectStrategy() {
        if (!this.controllerState.proceed()) {
            this.router.navigateByUrl('/process/end');
            return;
        }

        this.config.getManifest(this.controllerState.step.flow)
            .subscribe(manifest => {
                this.controllerState.step.formSchema = manifest;

                let strategy = this.findStrategy();
                if (!strategy.enter()) {
                    this.internalExecute(EmptyExecuteSubscriber);
                }
            });
    }

    private internalExecute(subscriber: ExecuteSubscriber, data?) {
        // Merge in the data from the UI
        this.controllerState.update(data);

        let strategy = this.findStrategy();
        strategy.execute(this.controllerState).subscribe(
            result => {
                subscriber.complete();

                // Merge in the data from the execution
                this.controllerState.update(result);
                this.selectStrategy();
            },
            error => subscriber.error(error)
        );
    }

    private findStrategy() {
        let stepType = this.controllerState.step.type;
        return this.strategies.getStrategy(stepType);
    }
}
