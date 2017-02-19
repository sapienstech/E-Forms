import { Component } from '@angular/core';

import { FormSchema } from '../../model';

import { ControllerState } from '../controller-state';
import { ControllerService } from '../controller.service';

@Component({
    templateUrl: './process-step.component.html',
    styleUrls: ['./process-step.component.less']
})
export class ProcessStepComponent {
    step: string;
    schema: FormSchema;
    input: any;

    output: any;

    constructor(
        private state: ControllerState,
        private controllerService: ControllerService
    ) {
        this.step = this.state.step.title;
        this.schema = this.state.step.formSchema;
        this.input = this.state.data;
    }

    execute() {
        this.controllerService.execute(this.output)
            .subscribe(undefined, error => {
                console.log(error);
            });
    }
}
