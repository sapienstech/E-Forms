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

    originalManifest: any;
    flow: any;
    schema: any;
    de: any;
    output:any;
    executionResult: any[] = [];
    @ViewChild('form') form: FormComponent;
    private errorMessage: string;
    private executing: boolean = false;


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
                this.getFlowSchema();
                this.getFlowManifest();
            });

        });

    }



      private getFlowSchema() {
        this.service.getFlowSchema(this.flow, this.de).subscribe(result=>{
            this.schema = result;
        });
    }

    private getFlowManifest() {
        this.service.getFlowManifest(this.flow, this.de).subscribe(result=>{
            this.originalManifest = result.asset[0].group.factType;
        });
    }

    clear(){
        this.form.reset();
        this.errorMessage = null;
        this.executionResult = null;
    }


    execute(){

        this.executing = true;

        this.errorMessage = null;
        this.service.execute(this.output,this.de).subscribe(result=>{
            this.executing = false;

            if(result.error){
               this.errorMessage = result.error;
            }
            else {
                this.executionResult = [];
                let keys = Object.keys(result.data);
                keys.forEach(key=> {
                    let originalFT = this.originalManifest.find(f => f.modelMapping == key);
                    if (originalFT.isPersistent == false) {
                        this.executionResult.push({field: originalFT.name, value: result.data[key]});
                    }
                });
            }
        },error=>{
            this.errorMessage = error;
        });
    }
}
