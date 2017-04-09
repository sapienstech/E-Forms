import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ManagementServiceFacade } from '../services/management.service.facade';
import { FormComponent } from 'angular2-schema-form';

@Component({
    selector: 'flow-executer',
    templateUrl: './flow-executer.component.html',
    styleUrls: ['./flow-executer.component.less'],
    animations: [
        trigger('routeAnimation', [
            state('*', style({opacity: 1})),
            state('void', style({opacity: 0})),
            transition('void => *', [style({opacity: 0}),animate(1000)
            ])

        ])
    ]
})
export class FlowExecuterComponent implements OnInit {

    flow: any;
    schema: any;
    de: any;
    output:any;
    executionResult: any = {};
    @ViewChild('form') form: FormComponent;
    private errorMessage: string;

    constructor(private route: ActivatedRoute, private service: ManagementServiceFacade) {

    }

    ngOnInit() {

        this.service.isLocal$.subscribe(r => {
            if (r == null) return;

            this.route.queryParams.subscribe((params: Params) => {
                this.flow = {
                    name: params['flow-name'],
                    tagName: params['tag-name'],
                    version: params['version'],
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

    clear(){
        this.form.reset();
    }


    execute(){
        this.errorMessage = null;
        this.service.execute(this.output,this.de).subscribe(result=>{
            if(result.error){
               this.errorMessage = result.error;
            }
            else {
                this.executionResult = result.data;
            }
        },error=>{
            this.errorMessage = error;
        });
    }
}
