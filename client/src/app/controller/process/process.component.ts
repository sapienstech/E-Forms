import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    schema: FormSchema;
    input: any;
    errors:any;
    output: any;

    constructor(
        private controllerService: ControllerService,
        private activatedRoute: ActivatedRoute,
        private router: Router
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
                this.router.navigate(['../end'], { relativeTo: this.activatedRoute });
            }
        );
    }

    execute() {
        this.controllerService.execute(this.output)
            .subscribe(undefined, e => this.executionError(e), () => this.schema = null);
    }

    private executionError(error: any) {
        this.errors = error;
    }
}
