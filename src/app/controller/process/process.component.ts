import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormSchema } from '../../model';

import { ControllerService } from '../controller.service';

@Component({
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.less'],
    providers: [
        ControllerService
    ]
})
export class ProcessComponent implements OnInit {
    step: string;
    schema: FormSchema;
    input: any;

    output: any;

    constructor(
        private controllerService: ControllerService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.controllerService.select(params['id']);
        });

        this.controllerService.showForm.subscribe(
            event => {
                this.schema = event.schema;
                this.input = event.model;
            },
            undefined,
            () => {
                console.log('process complete');
                this.schema = undefined;
            }
        );
    }

    execute() {
        this.controllerService.execute(this.output)
            .subscribe(undefined, e => this.executionError(e));
    }

    private executionError(error: any) {
        console.log(error);
    }
}
