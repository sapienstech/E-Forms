import {Component} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ManagementServiceFacade} from "../services/management.service.facade";
import {ExecutionResult} from "../../model";

@Component({
    selector: 'di-integration',
    styleUrls: ['./di-integration.component.less'],
    template: `
        <div class="main">
            <div class="main-header">
                <div>
                    <img src="icons/logo.png">
                    <h2>DE Management Console</h2>
                </div>
            </div>
            <div class="header">
                <h2 class="flah">FLOW</h2>
                <h2>{{flowDetails?.realName}} -V{{flowDetails?.version}}</h2>
            </div>
            <div class="main-content">
                <div *ngIf="!errorMessage">
                    <h4>Please enter your client id:</h4>
                    <input #clientId/>
                    <button (click)="callDi(clientId.value)">Submit</button>
                </div>
                <div *ngIf="errorMessage"><h1>{{errorMessage}}</h1></div>
            </div>
        </div>

    `,

})
export class DiIntegrationComponent {
    private flowDetails: FlowDetails;
    private deDetails: DeDetails;
    errorMessage: string;

    constructor(private route: ActivatedRoute, private service: ManagementServiceFacade, private router: Router) {
    }

    ngOnInit() {
        this.service.isLocal$.subscribe(r => {
            if (r == null) return;

            this.route.queryParams.subscribe((params: Params) => {
                this.flowDetails = {
                    name: params['flow-name'],
                    realName: params['flow-real-name'],
                    tagName: params['tag-name'],
                    version: params['version'],
                    releaseName: params['release-name']
                };
                this.deDetails = {
                    name: params['de-name'],
                    url: params['de-url']
                };
            });
        });
    }

    callDi(clientId: string) {
        this.service.executeDi(clientId, this.deDetails, this.flowDetails).subscribe((executionResult: ExecutionResult) => {
            if (executionResult.error) {
                this.errorMessage = executionResult.error;
            } else {
                let url = '/questionnaire?flow-name=' + this.flowDetails.name +
                    '&flow-real-name=' + this.flowDetails.realName +
                    '&tag-name=' + this.flowDetails.tagName +
                    '&version=' + this.flowDetails.version +
                    '&release-name=' + this.flowDetails.releaseName;

                if (this.deDetails) {
                    url = url +
                        '&de-name=' + this.deDetails.name +
                        '&de-url=' + this.deDetails.url;
                }

                this.router.navigateByUrl(url);
            }
        })
    }
}

export type FlowDetails = {
    name: string,
    realName: string,
    tagName: string,
    version: string,
    releaseName: string
}

export type DeDetails = {
    name: string,
    url: string
}
