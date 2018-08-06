import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, /*Router*/} from "@angular/router";
import {ManagementServiceFacade} from "../services/management.service.facade";

@Component({
    template: `
        <div class="main">
            <div class="main-header">
                <div>
                    <img src="icons/logo.png">
                    <h2>DE Management Console</h2>
                </div>
            </div>
            <div class="header">
                <h2 class="flah">DECISION RESULT</h2>
            </div>
            <div class="main-content">
                <h4>{{userMessage}}</h4>
                
            </div>
        </div>
    `,
    selector: 'alis-integration',
    styleUrls: ["./alis-integration.component.less"]
})
export class AlisIntegrationComponent implements OnInit{

    userMessage: string;
    constructor(private route: ActivatedRoute, private service: ManagementServiceFacade) {
    }

    ngOnInit(): void {
        this.service.isLocal$.subscribe(r => {
            if (r == null) return;

            this.route.queryParams.subscribe((params: Params) => {
                let conclusion = params[CONCLUSION_PARAM];
                if (conclusion === 'Create Authorized Claim') {
                     this.userMessage = 'Your claim has been submitted and approved';
                     this.createInitialNotificationClaim();
                     this.approveCiClaim();
                } else if (conclusion === 'Create Initial Notification Claim') {
                    this.userMessage = 'Your claim has been filed and we will contact you shortly';
                    this.createInitialNotificationClaim();
                } else {
                    this.userMessage = 'There is a problem with your claim, please contact a service center';
                }
                this.service.clearFlowInputs();
            });

        });
    }

    private createInitialNotificationClaim(){

    }

    private approveCiClaim(){

    }
}

export const CONCLUSION_PARAM = "conclusion";
