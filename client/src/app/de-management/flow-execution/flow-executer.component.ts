import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ManagementServiceFacade } from '../services/management.service.facade';

@Component({
    selector: 'flow-executer',
    templateUrl: './flow-executer.component.html',
    styleUrls: ['./flow-executer.component.less']
})
export class FlowExecuterComponent implements OnInit {

    flow: any;
    schema: any;
    de: any;
    output:any;
    private executionResult: any = {};

    constructor(private route: ActivatedRoute, private service: ManagementServiceFacade) {

    }

    ngOnInit() {

        this.service.isLocal$.subscribe(r => {
            if (r == null) return;

            this.route.queryParams.subscribe((params: Params) => {
                this.flow = {
                    name: params['flow-name'],
                    tagName: params['tag-name'],
                    releaseName: params['release-name']
                }
                this.de = {
                    name: params['de-name'],
                    url: params['de-url']
                }
                this.getFlowManifest();
            });

        });

    }



    private getFlowManifest() {
        this.service.getFlowManifest(this.flow, this.de).subscribe(result=>{
            this.schema = result;
        });
    }

    execute(){
        this.service.execute(this.output,this.de).subscribe(result=>{
            this.executionResult = result.data;
        });
    }
}
