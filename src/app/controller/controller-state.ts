import { FormSchema } from '../model';
import { ProcessConfig, StepConfig } from '../config';

export interface ControllerStep extends StepConfig {
    formSchema?: FormSchema;
}

export class ControllerState {
    private _step: ControllerStep;

    process: ProcessConfig;
    currentStep: number;

    data;

    get active() {
        return !!this.process;
    }

    get step() {
        return this._step;
    }

    initialize(process: ProcessConfig) {
        this.process = process;
        this.data = {};
        this.currentStep = -1;
    }

    update(data) {
        this.data = Object.assign(this.data, data);
    }

    proceed() {
        this.currentStep += 1;
        if (this.currentStep >= this.process.steps.length) {
            this.clear();
            return false;
        }

        this._step = this.process.steps[this.currentStep];
        return true;
    }

    private clear() {
        this.process = undefined;
        this.currentStep = undefined;
        this.data = undefined;
        this._step = undefined;
    }
}
