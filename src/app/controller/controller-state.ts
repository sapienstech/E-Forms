export class ControllerState {
    private _step;

    process;
    currentStep: number;

    lastOutput;
    input;

    get active() {
        return !!this.process;
    }

    get step() {
        return this._step;
    }

    initialize(process) {
        this.process = process;
        this.currentStep = 0;

        this.updateStep();
    }

    update(lastOutput) {
        this.currentStep += 1;
        if (this.currentStep >= this.process.steps.length) {
            this.clear();
            return;
        }

        this.updateStep();

        this.lastOutput = lastOutput;
        this.input = this.mergeOutput(lastOutput);
    }

    private updateStep() {
        this._step = this.process.steps[this.currentStep];
    }

    private clear() {
        this.process = undefined;
        this.currentStep = undefined;
        this.lastOutput = undefined;
        this.input = undefined;
    }

    private mergeOutput(output) {
        return output;
    }
}
