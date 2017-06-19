import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ManagementServiceFacade } from '../services/management.service.facade';
import { FormComponent } from 'angular2-schema-form';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.less'],
    animations: [
        trigger('routeAnimation', [
            state('*', style({opacity: 1})),
            state('void', style({opacity: 0})),
            transition('void => *', [style({opacity: 0}), animate(1000)
            ])

        ])
    ]
})
export class QuestionnaireComponent implements OnInit {

    originalManifest: any;
    flow: any;
    schema: any;
    de: any;
    output: any;
    executionResult: any[] = [];
    @ViewChild('form') form: FormComponent;
    private errorMessage: string;
    private executing: boolean = false;
    private errorTitle: string;

    constructor(private route: ActivatedRoute, private service: ManagementServiceFacade) {

    }

    ngOnInit() {

        this.service.isLocal$.subscribe(r => {
            if (r == null) return;

            this.route.queryParams.subscribe((params: Params) => {
                this.flow = {
                    name: params['flow-name'],
                    realName: params['flow-real-name'],
                    tagName: params['tag-name'],
                    version: params['version'],
                    releaseName: params['release-name']
                }
                this.de = {
                    name: params['de-name'],
                    url: params['de-url']
                }
                this.getFlowManifest().subscribe(()=>{
                    this.first();
                });

            });

        });

    }


    // private getFlowSchema() {
    //     this.service.getFlowSchema(this.flow, this.de).subscribe(result => {
    //         this.schema = result;
    //     });
    // }

    private getFlowManifest() {
        return Observable.create(obs=>{
            this.service.getFlowManifest(this.flow, this.de).subscribe(result => {
                this.originalManifest = result.asset[0].group.factType;
                obs.next();
            });
        })

    }

    clear() {
        this.form.reset();
        this.errorMessage = null;
        this.executionResult = null;
    }


    next(firstTime: boolean = false) {
        this.executing = true;
        this.errorMessage = null;
        let data = {};
        if (!firstTime) {
            this.service.saveFlowInputs(this.service.saveFlowInputs(this.output));
            data = this.service.getFlowInputs();
        }
        this.service.execute(data, this.de).subscribe(executionResult => {
            this.executing = false;
            if (executionResult.error) {
                this.errorMessage = executionResult.error;
            }
            else {
                this.executionResult = [];

                if (this.isFinalResult(executionResult)) {
                    this.executionResult = this.extractResult(executionResult.result);
                }
                else {
                    if (executionResult.requiredFTs.length > 0) {
                        this.schema = this.service.getFlowSchemaFromRequiredFTs(executionResult.requiredFTs, this.originalManifest);
                    } else {
                        this.errorTitle = 'Error';
                        this.errorMessage = 'The flow ended without result';
                    }
                }


            }
        }, error => {
            this.errorTitle = 'An error received during flow execution...';
            this.errorMessage = error;
        });
    }

    first() {
        this.next(true);
    }


    private isFinalResult(data: any): boolean {
        return data.result.isConclusionValues == true;
    }

    private extractResult(data: any): any {
        return [{field: data.factTypeName, value: data.values}];
    }


}
