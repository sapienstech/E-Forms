import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { ManagementServiceFacade } from '../services/management.service.facade';
import { Observable } from 'rxjs/Observable';
import {DeDetails, FlowDetails} from "../di-integration/di-integration.component";
import {CONCLUSION_PARAM, MESSAGES_PARAM} from "../alis-integration/alis-integration.component";

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
    flow: FlowDetails;
    schema: any;
    de: DeDetails;
    output: any;
    executionResult: any[] = [];
    @ViewChild('form') form: any;
    private errorMessage: string;
    private executing: boolean = false;
    private errorTitle: string;
    private withAlisIntegration: boolean;

    constructor(private route: ActivatedRoute, private service: ManagementServiceFacade, private router: Router) {

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
                };
                this.de = {
                    name: params['de-name'],
                    url: params['de-url']
                };
                this.withAlisIntegration = params['alis-integration'];
                this.getFlowManifest().subscribe(()=>{
                    this.first();
                });
            });
        });
    }

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
        this.service.clearFlowInputs();
        this.errorMessage = null;
        this.executionResult = null;
    }

    next(firstTime: boolean = false) {
        this.executing = true;
        this.errorMessage = null;
        if (!firstTime) {
            this.service.saveFlowInputs(this.output);
        }
        let data = this.service.getFlowInputs() || {};
        this.service.execute(data, this.de).subscribe(executionResult => {
            this.executing = false;
            if (executionResult.error) {
                this.errorMessage = executionResult.error;
            }
            else {
                this.executionResult = [];

                if (executionResult.requiredFTs.length > 0) {
                    this.schema = this.service.getFlowSchemaFromRequiredFTs(executionResult.requiredFTs, this.originalManifest);
                }else {
                    if (this.isFinalResult(executionResult)) {
                        if (!this.withAlisIntegration) {
                            this.executionResult = this.extractResult(executionResult);
                        } else {
                            this.handleConclusion(executionResult);
                        }
                    }else {
                        this.errorTitle = 'No Result';
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
        return [{
            field: data.result.factTypeName,
            value: data.result.values,
            messages: data.messages ? data.messages[data.result.factTypeName] : data.messages
        }];
    }

    private handleConclusion(executionResult: any) {
        let value = executionResult.result.values;
        let messages = executionResult.messages.CriticalIllnessClaimProcessingAction[0];
        let url = `/alis-integration?${CONCLUSION_PARAM}=${value}`;
        if (messages){
            url += `&${MESSAGES_PARAM}=${messages.text}`;
        }
        this.router.navigateByUrl(url);
    }
}
